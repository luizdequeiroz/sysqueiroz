import React, { Component } from 'react'
import { connect } from 'react-redux'

import { requestToReducer, setReducer, showModal, closeModal } from '../../../../data/dispatchers'
import { profiles } from '../../../../data/alias/keys'

import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory from 'react-bootstrap-table2-editor'

import AssignProfile from '../components/assignprofile'
import Modal from 'react-bootstrap/lib/Modal'
import { SysButton } from '../../../components/syscomponents'
import { methods } from '../../../templates'
import { entrar } from '../../users/components/headerlogin'

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

        requestToReducer(this, methods.GetAllProfiles, profiles)

        window.onkeypress = undefined
    }

    componentWillUnmount() {

        setReducer(this, profiles, undefined)
    }

    deleteProfile(id) {

        requestToReducer(this, methods.DeleteProfile, 'dlt_profile', id, 'POST', true, "Deletando perfil...")
        // atualizar redux com a alteração da tabela
        setTimeout(() => requestToReducer(this, methods.GetAllProfiles, profiles), 1000); 
        closeModal(this)
    }

    saveProfile(oldValue, newValue, row, column) {

        const { id, name, description } = row

        if (newValue !== oldValue) {
            requestToReducer(this, methods.UpdateProfile, 'upd_profile', { id, name, description }, 'POST', false)
            // atualizar redux com a alteração da tabela
            setReducer(this, profiles, {
                data: this.props.responses[profiles].data.map(p => {
                    if (p.id === id) {
                        return ({
                            id: p.id,
                            name: name,
                            description: description,
                            profileMethods: null,
                            userProfile: null
                        })
                    } else {
                        return p
                    }
                })
            })
        }
    }

    render() {

        const cols = [
            {
                dataField: 'name',
                text: 'Nome do Perfil'
            }, {
                dataField: 'description',
                text: 'Descrição'
            }, {
                dataField: 'actions',
                text: 'Ações',
                editable: false
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
                                    <button className="btn btn-danger" onClick={() => this.deleteProfile(p.id)}>Confirmar exclusão!</button>
                                    <button className="btn btn-default" onClick={() => closeModal(this)}>Cancelar exclusão!</button>
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
                    Lista de Perfis de Usuário
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