import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestToReducer, closeModal } from '../../../../data/dispatchers'
import { GetUsersEmployeesWithDepartments, AssignProfileMethod } from '../../../../data/alias/methods'
import { usersemployeesdepartmant } from '../../../../data/alias/keys'
import Modal from 'react-bootstrap/lib/Modal'

import BootstrapTable from 'react-bootstrap-table-next'

class AssignProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            usersId: []
        }

        this.onSelect = this.onSelect.bind(this)
        this.onSelectAll = this.onSelectAll.bind(this)
        this.assignProfile = this.assignProfile.bind(this)
    }

    componentDidMount() {
        
        requestToReducer(this, GetUsersEmployeesWithDepartments, usersemployeesdepartmant)
    }

    onSelect(row, isSelect) {

        if (isSelect)
            this.setState({ usersId: [ ...this.state.usersId, row.id ] })
        else this.setState({ usersId: this.state.usersId.filter(id => id !== row.id) })
    }

    onSelectAll(isSelect, rows) {

        if (isSelect)
            this.setState({ usersId: rows.map(r => r.id) })
        else this.setState({ usersId: [] })
    }

    assignProfile() {
debugger
        requestToReducer(this, AssignProfileMethod, 'ssgn_profile', { profileId: this.props.profileId, usersId: this.state.usersId }, 'POST')
    }

    render() {

        const cols = [
            {
                dataField: 'name',
                text: 'Nome'
            }, {
                dataField: 'email',
                text: 'E-mail'
            }, {
                dataField: 'departmentName',
                text: 'Setor'
            }
        ]
        let ueds
        if (this.props.responses[usersemployeesdepartmant] !== undefined)
            ueds = this.props.responses[usersemployeesdepartmant].data
        else ueds = []

        return (
            <div>
                <Modal.Body>
                    <fieldset>
                        <legend>Lista de Usuários <i>(selecione os usuários para atribuir o perfil)</i></legend>
                        <BootstrapTable
                            keyField='id'
                            data={ueds}
                            columns={cols}
                            noDataIndication="Não há usuários!"
                            selectRow={{
                                mode: 'checkbox',
                                clickToSelect: true,
                                bgColor: '#00BFFF',
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