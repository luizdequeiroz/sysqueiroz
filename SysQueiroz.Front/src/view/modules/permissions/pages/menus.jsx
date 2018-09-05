import React, { Component } from 'react'
import { connect } from 'react-redux'

import { requestToReducer, setReducer, showModal } from '../../../../data/dispatchers'
import { GetAllMenusForListMenu, UpdateMenu, DeleteMenu } from '../../../../data/alias/methods'
import { menus } from '../../../../data/alias/keys'

import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory from 'react-bootstrap-table2-editor'

import AssignMenu from '../components/assignmenu'

class Menus extends Component {

    constructor(props) {
        super(props)

        this.deleteMenu = this.deleteMenu.bind(this)
        this.saveMenu = this.saveMenu.bind(this)
        this.subTable = this.subTable.bind(this)
    }

    componentDidMount() {

        requestToReducer(this, GetAllMenusForListMenu, menus)
    }

    componentWillUnmount() {

        setReducer(this, menus, undefined)
    }

    deleteMenu(id) {

        requestToReducer(this, DeleteMenu, 'dlt_menu', id, 'POST', true, "Deletando menu...")
        // atualizar redux com a alteração da tabela
        setReducer(this, menus, {
            data: this.props.responses[menus].data.filter(m => m.id !== id).map(m => ({
                id: m.id,
                href: m.href,
                icon: m.icon, 
                name: m.name,
                superHref: m.superHref,
                menuAccesses: null
            }))
        })
    }

    saveMenu(oldValue, newValue, row, column) {

        const { id, href, icon, name, superHref } = row

        if (newValue !== oldValue) {
            requestToReducer(this, UpdateMenu, 'upd_menu', { id, href, icon, name, superHref }, 'POST', false)
            // atualizar redux com a alteração da tabela
            setReducer(this, menus, {
                data: this.props.responses[menus].data.map(m => {
                    if (m.id === id) {
                        return ({
                            id: m.id,
                            href: m.href,
                            icon: m.icon,
                            name: name,
                            superHref: m.superHref,
                            menuAccesses: null
                        })
                    } else {
                        return m
                    }
                })
            })
        }
    }

    subTable(row) {

        const cols = [
            {
                dataField: 'name',
                text: 'Nome do Item'
            }, {
                dataField: 'href',
                text: 'Caminho',
                editable: false
            }, {
                dataField: 'actions',
                text: 'Ações',
                editable: false
            }
        ]

        const mns = row.subMenus.map(m => ({
            ...m,
            // adicionando propriedade para mostrar botão(ões) em coluna da tabela
            actions: (
                <div className="btn-group">
                    <button className="btn btn-xs btn-primary" onClick={() => showModal(this, `Atribuir menu ${m.name}`, <AssignMenu menuId={m.id} />)}>Atribuir</button>
                    <button className="btn btn-xs btn-danger" onClick={() => showModal(this, `Confirmar exclusão do menu "${m.name}"?`, <button className="btn btn-danger btn-block" onClick={() => this.deleteMenu(m.id)}>Confirmar exclusão!</button>, 'sm')}>Deletar</button>
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
        if(isAnyExpands) return <i className="fa fa-minus-square" />
        else return <i className="fa fa-plus-square" />
    }

    expandColumnIconRender({ expanded }) {
        if(expanded) return <i className="fa fa-minus-circle" />
        else return <i className="fa fa-plus-circle" />
    }

    render() {

        const cols = [
            {
                dataField: 'name',
                text: 'Nome do Item'
            }, {
                dataField: 'href',
                text: 'Caminho',
                editable: false
            }, {
                dataField: 'actions',
                text: 'Ações',
                editable: false
            }
        ]

        let mns
        if (this.props.responses[menus] !== undefined) {
            mns = this.props.responses[menus].data.map(m => ({
                ...m,
                // adicionando propriedade para mostrar botão(ões) em coluna da tabela
                actions: (
                    <div className="btn-group">
                        <button className="btn btn-xs btn-primary" onClick={() => showModal(this, `Atribuir menu ${m.name}`, <AssignMenu menuId={m.id} />)}>Atribuir</button>
                        <button className="btn btn-xs btn-danger" onClick={() => showModal(this, `Confirmar exclusão do menu "${m.name}"?`, <button className="btn btn-danger btn-block" onClick={() => this.deleteMenu(m.id)}>Confirmar exclusão!</button>, 'sm')}>Deletar</button>
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
                <legend>Lista de Itens de Menu</legend>
                <div className="pull-right">
                    <button className="btn btn-primary">NOVO</button>
                </div>
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