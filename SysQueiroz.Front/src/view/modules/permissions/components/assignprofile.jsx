import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestToReducer, closeModal } from '../../../../data/dispatchers'
import { GetUsersEmployeesWithDepartments } from '../../../../data/alias/methods'
import { usersemployeesdepartmant } from '../../../../data/alias/keys'
import Modal from 'react-bootstrap/lib/Modal'

import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory from 'react-bootstrap-table2-filter'

class AssignProfile extends Component {

    componentDidMount() {

        if (this.props.responses[usersemployeesdepartmant] === undefined)
            requestToReducer(this, GetUsersEmployeesWithDepartments, usersemployeesdepartmant)
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
                        <legend>Lista de Usuários</legend>
                        <BootstrapTable keyField='email' data={ueds} columns={cols} noDataIndication="Não há usuários!" filter={filterFactory()} />
                    </fieldset>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <button className="btn btn-default" onClick={() => closeModal(this)}>Cancelar</button>
                        <button className="btn btn-primary" onClick={() => console.log('atribuir perfis')}>Atribuir</button>
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