import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestToReducer, closeModal, requestToState, showModal } from '../../../../data/dispatchers'
import { users, usersidfromprofile } from '../../../../data/alias/keys'
import Modal from 'react-bootstrap/lib/Modal'

import RevalidarSessao from '../../../components/revalidarsessao'

import BootstrapTable from 'react-bootstrap-table-next'
import { GetAllUsers, GetUsersIdByProfile, AssignProfileMethod } from '../../../../data/alias/methods'


class AssignProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            responses: {}
        }

        this.onSelect = this.onSelect.bind(this)
        this.onSelectAll = this.onSelectAll.bind(this)
        this.assignProfile = this.assignProfile.bind(this)
    }

    componentDidMount() {

        requestToReducer(this, GetAllUsers, users)
        requestToState(this, GetUsersIdByProfile, usersidfromprofile, this.props.profileId)
    }

    onSelect(row, isSelect) {

        if (isSelect)
            this.setState({ responses: { usersidfromprofile: { data: [...this.state.responses[usersidfromprofile].data, row.id] } } })
        else this.setState({ responses: { usersidfromprofile: { data: this.state.responses[usersidfromprofile].data.filter(id => id !== row.id) } } })
    }

    onSelectAll(isSelect, rows) {

        if (isSelect)
            this.setState({ responses: { usersidfromprofile: { data: rows.map(r => r.id) } } })
        else this.setState({ responses: { usersidfromprofile: { data: [] } } })
    }

    assignProfile() {

        requestToReducer(this, AssignProfileMethod, 'ssgn_profile', { profileId: this.props.profileId, all: this.props.responses[users].data.map(u => u.id), selecteds: this.state.responses[usersidfromprofile].data }, 'POST', true, "Atribuindo perfis aos usuários selecionados...")
        closeModal(this);
        
        window.setTimeout(() => showModal(this, 'Revalidar sessão.', <RevalidarSessao />, false, 'medium'), 3000)
    }

    render() {

        const cols = [
            {
                dataField: 'name',
                text: 'Nome',
                headerStyle: { width: '33.33%' }
            }, {
                dataField: 'email',
                text: 'E-mail',
                headerStyle: { width: '33.33%' }
            }, {
                dataField: 'departmentName',
                text: 'Setor',
                headerStyle: { width: '33.33%' }
            }
        ]
        let ueds
        if (this.props.responses[users] !== undefined)
            ueds = this.props.responses[users].data
        else ueds = []

        let selecteds
        if (this.state.responses[usersidfromprofile] !== undefined)
            selecteds = this.state.responses[usersidfromprofile].data
        else selecteds = []

        return (
            <div>
                <Modal.Body>
                    <fieldset>
                        <legend>Lista de Usuários <i className="h6">(selecione os usuários para atribuir o perfil)</i></legend>
                        <BootstrapTable
                            keyField='id'
                            data={ueds}
                            columns={cols}
                            noDataIndication="Não há usuários!"
                            selectRow={{
                                mode: 'checkbox',
                                clickToSelect: true,
                                bgColor: '#00BFFF',
                                selected: selecteds,
                                onSelect: this.onSelect,
                                onSelectAll: this.onSelectAll
                            }} />
                    </fieldset>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <button className="btn btn-default" onClick={() => closeModal(this)}>Cancelar</button>
                        <button className="btn btn-primary" onClick={() => this.assignProfile()}>Salvar</button>
                    </div>
                </Modal.Footer>
            </div>
        )
    }
}

function select(state) {

    return {
        responses: state.reducers.responses
    }
}

export default connect(select)(AssignProfile)