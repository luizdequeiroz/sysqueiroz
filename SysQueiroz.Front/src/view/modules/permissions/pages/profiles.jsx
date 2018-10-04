import React, { Component } from 'react'
import { connect } from 'react-redux'

import { requestToReducer, setReducer, showModal, closeModal } from '../../../../data/dispatchers'
import { profiles } from '../../../../data/alias/keys'

import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory from 'react-bootstrap-table2-editor'

import AssignProfile from '../components/assignprofile'
import Modal from 'react-bootstrap/lib/Modal'
import { SysButton } from '../../../components/syscomponents'

import { entrar } from '../../users/components/headerlogin'
import { GetAllProfiles, DeleteProfile, UpdateProfile } from '../../../../data/alias/methods'

class Profiles extends Component {

    constructor(props) {
        super(props)

        this.deleteProfile = this.deleteProfile.bind(this)
        this.saveProfile = this.saveProfile.bind(this)
    }

    componentWillUnmount = () => window.onkeypress = (e) => {
        if (e.keyCode === 13) {
            entrar()
        }
    }

    componentDidMount() {

        requestToReducer(this, GetAllProfiles, profiles)

        window.onkeypress = undefined
    }

    componentWillUnmount() {

        setReducer(this, profiles, undefined)
    }

    deleteProfile(id) {

        requestToReducer(this, DeleteProfile, 'dlt_profile', id, 'POST', true, "Deletando perfil...")
        // atualizar redux com a alteração da tabela
        setTimeout(() => requestToReducer(this, GetAllProfiles, profiles), 1000); 
        closeModal(this)
    }

    saveProfile(oldValue, newValue, row, column) {

        const { id, name, description } = row

        if (newValue !== oldValue) {
            requestToReducer(this, UpdateProfile, 'upd_profile', { id, name, description }, 'POST', false)
            // atualizar redux com a alteração da tabela
            setTimeout(() => requestToReducer(this, GetAllProfiles, profiles), 1000); 
        }
    }

    render() {

        const cols = [
            {
                dataField: 'name',
                text: 'Nome do Perfil',
                headerStyle: { width: '25%' }
            }, {
                dataField: 'description',
                text: 'Descrição',
                headerStyle: { width: '60%' }
            }, {
                dataField: 'actions',
                text: 'Ações',
                editable: false,
                headerStyle: { width: '15%' }
            }
        ]

        let prfls
        if (this.props.responses[profiles] !== undefined)
            prfls = this.props.responses[profiles].data.map(p => ({
                ...p,
                // adicionando propriedade para mostrar botão(ões) em coluna da tabela
                actions: (
                    <div className="btn-group">
                        <button className="btn btn-xs btn-primary" onClick={() => showModal(this, `Atribuir perfil ${p.name}`, <AssignProfile profileId={p.id} />)}>Atribuir</button>
                        <button className="btn btn-xs btn-danger" onClick={() => showModal(this, `Confirmar exclusão do perfil "${p.name}"?`, (
                            <Modal.Footer>
                                <div className="btn-group">
                                    <SysButton type="danger" text="Confirmar exclusão!" action={() => this.deleteProfile(p.id)} />
                                    <SysButton type="default" text="Cancelar exclusão!" action={() => closeModal(this)} />
                                </div>
                            </Modal.Footer>
                        ), false, 'md')}>Deletar</button>
                    </div>
                )
            }))
        else prfls = []

        return (
            <fieldset>
                <legend>
                    Lista de Perfis de Usuário <i className="h6">(para alterar um perfil de usuário, dê duplo clique no campo a ser editado)</i>
                    <div className="pull-right">
                        <SysButton type="primary" size="sm" text={<i className="fa fa-plus-circle" />} textHover="NOVO" action={() => showModal(this, 'Novo perfil de usuário', <h1>É o gera!</h1>, true, 'lg')} />
                    </div>
                </legend>
                <BootstrapTable
                    keyField='id'
                    data={prfls}
                    columns={cols}
                    noDataIndication="Não há perfis!"
                    cellEdit={cellEditFactory({
                        mode: 'dbclick',
                        blurToSave: true,
                        afterSaveCell: this.saveProfile
                    })}
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

export default connect(select)(Profiles)