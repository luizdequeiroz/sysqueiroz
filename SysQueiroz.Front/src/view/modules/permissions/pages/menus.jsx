import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'

import { requestToReducer, setReducer, showModal, closeModal } from '../../../../data/dispatchers'
import { menus } from '../../../../data/alias/keys'

import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory from 'react-bootstrap-table2-editor'

import AssignMenu from '../components/assignmenu'
import { SysButton } from '../../../components/syscomponents'
import MenuForm from '../components/menuform'

import { entrar } from '../../users/components/headerlogin'
import { GetAllHierarchicallyOrganizedMenuItems, DeleteMenuItem, UpdateMenuItem } from '../../../../data/alias/methods'

class Menus extends Component {

    constructor(props) {
        super(props)

        this.deleteMenu = this.deleteMenu.bind(this)
        this.saveMenu = this.saveMenu.bind(this)
        this.subTable = this.subTable.bind(this)
    }

    componentWillUnmount = () => window.onkeypress = (e) => {
        if (e.keyCode === 13) {
            entrar()
        }
    }

    componentDidMount() {

        requestToReducer(this, GetAllHierarchicallyOrganizedMenuItems, menus)

        window.onkeypress = undefined
    }

    componentWillUnmount() {

        setReducer(this, menus, undefined)
    }

    deleteMenu(id) {

        requestToReducer(this, DeleteMenuItem, 'dlt_menu', id, 'POST', true, "Deletando menu...")
        // atualizar redux com a alteração da tabela
        setTimeout(() => requestToReducer(this, GetAllHierarchicallyOrganizedMenuItems, menus), 1000);
        closeModal(this)
    }

    saveMenu(oldValue, newValue, row, column) {

        const { id, href, icon, name, superHref } = row

        if (newValue !== oldValue) {
            requestToReducer(this, UpdateMenuItem, 'upd_menu', { id, href, icon, name, superHref }, 'POST', false)
            // atualizar redux com a alteração da tabela
            requestToReducer(this, GetAllHierarchicallyOrganizedMenuItems, menus)
        }
    }

    subTable(row) {

        const cols = [
            {
                dataField: 'name',
                text: 'Nome do Item',
                headerStyle: { width: '55%' }
            }, {
                dataField: 'href',
                text: 'Caminho',
                headerStyle: { width: '20%' }
            }, {
                dataField: 'icon',
                text: 'Ícone',
                headerStyle: { width: '10%' }
            }, {
                dataField: 'actions',
                text: 'Ações',
                editable: false,
                headerStyle: { width: '15%' }
            }
        ]

        const mns = row.subMenus.map(m => ({
            ...m,
            // adicionando propriedade para mostrar botão(ões) em coluna da tabela
            actions: (
                <div className="btn-group">
                    <SysButton type="primary" size="xs" text="Atribuir" action={() => showModal(this, `Atribuir menu ${m.name}`, <AssignMenu menuId={m.id} />)} />
                    <SysButton type="danger" size="xs" text="Deletar" action={() => showModal(this, `Confirmar exclusão do menu "${m.name}"?`, (
                        <Modal.Footer>
                            <div className="btn-group">
                                <SysButton type="danger" size="md" text="Confirmar exclusão!" action={() => this.deleteMenu(m.id)} />
                                <SysButton type="default" size="md" text="Cancelar exclusão!" action={() => closeModal(this)} />
                            </div>
                        </Modal.Footer>
                    ), true, 'md')} />
                </div>
            )
        }))
        for (var i = 0; i < mns.length; i++) {
            mns[i].subMenus = mns[i].subMenus === undefined ? [] : mns[i].subMenus
        }

        return (
            <fieldset>
                <BootstrapTable
                    keyField='id'
                    data={mns}
                    columns={cols}
                    noDataIndication="Não há menus!"
                    cellEdit={cellEditFactory({
                        mode: 'dbclick',
                        blurToSave: true,
                        afterSaveCell: this.saveMenu
                    })}
                    expandRow={{
                        renderer: this.subTable,
                        nonExpandable: mns.filter(sm => sm.subMenus.length === 0).map(sm => sm.id),
                        showExpandColumn: true,
                        expandHeaderColumnRenderer: this.expandHeaderColumnIconRender,
                        expandColumnRenderer: this.expandColumnIconRender
                    }}
                />
            </fieldset>
        )
    }

    expandHeaderColumnIconRender({ isAnyExpands }) {
        if (isAnyExpands) return <i className="fa fa-minus-square" />
        else return <i className="fa fa-plus-square" />
    }

    expandColumnIconRender({ expanded }) {
        if (expanded) return <i className="fa fa-minus-circle" />
        else return <i className="fa fa-plus-circle" />
    }

    render() {

        const cols = [
            {
                dataField: 'name',
                text: 'Nome do Item',
                headerStyle: { width: '55%' }
            }, {
                dataField: 'href',
                text: 'Caminho',
                headerStyle: { width: '20%' }
            }, {
                dataField: 'icon',
                text: 'Ícone',
                headerStyle: { width: '10%' }
            }, {
                dataField: 'actions',
                text: 'Ações',
                editable: false,
                headerStyle: { width: '15%' }
            }
        ]

        let mns
        if (this.props.responses[menus] !== undefined) {
            mns = this.props.responses[menus].data.map(m => ({
                ...m,
                // adicionando propriedade para mostrar botão(ões) em coluna da tabela
                actions: (
                    <div className="btn-group">
                        <SysButton type="primary" size="xs" text="Atribuir" action={() => showModal(this, `Atribuir menu ${m.name}`, <AssignMenu menuId={m.id} />)} />
                        <SysButton type="danger" size="xs" text="Deletar" action={() => showModal(this, `Confirmar exclusão do menu "${m.name}"?`, (
                            <Modal.Footer>
                                <div className="btn-group">
                                    <SysButton type="danger" size="md" text="Confirmar exclusão!" action={() => this.deleteMenu(m.id)} />
                                    <SysButton type="default" size="md" text="Cancelar exclusão!" action={() => closeModal(this)} />
                                </div>
                            </Modal.Footer>
                        ), true, 'md')} />
                    </div>
                )
            }))
            for (var i = 0; i < mns.length; i++) {
                mns[i].subMenus = mns[i].subMenus === undefined ? [] : mns[i].subMenus
            }
        }
        else mns = []

        return (
            <fieldset>
                <legend>
                    Lista de Itens de Menu <i>(para alterar um item de menu, dê duplo clique no campo a ser editado)</i>
                    <div className="pull-right">
                        <SysButton type="primary" size="sm" text={<i className="fa fa-plus-circle" />} textHover="NOVO" action={() => showModal(this, 'Novo item de menu', <MenuForm />, true, 'lg')} />
                    </div>
                </legend>
                <BootstrapTable
                    keyField='id'
                    data={mns}
                    columns={cols}
                    noDataIndication="Não há menus!"
                    cellEdit={cellEditFactory({
                        mode: 'dbclick',
                        blurToSave: true,
                        afterSaveCell: this.saveMenu
                    })}
                    expandRow={{
                        renderer: this.subTable,
                        nonExpandable: mns.filter(sm => sm.subMenus.length === 0).map(sm => sm.id),
                        showExpandColumn: true,
                        expandHeaderColumnRenderer: this.expandHeaderColumnIconRender,
                        expandColumnRenderer: this.expandColumnIconRender
                    }}
                />
            </fieldset>
        )
    }
}

function select(state) {

    return {
        responses: state.reducers.responses
    }
}

export default connect(select)(Menus)