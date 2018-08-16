import React, { Component } from 'react'
import { connect } from 'react-redux'

import BootstrapTable from 'react-bootstrap-table-next'
import { usersemployeesdepartmant } from '../../../../data/alias/keys';
import { requestToReducer } from '../../../../data/dispatchers';
import { GetUsersEmployeesWithDepartments } from '../../../../data/alias/methods';

class ListOfUsers extends Component {

    componentWillMount() {

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
        if(this.props.responses[usersemployeesdepartmant] !== undefined)
            ueds = this.props.responses[usersemployeesdepartmant].data
        else ueds = []

        return (
            <fieldset>
                <legend>Lista de Usuários</legend>
                <BootstrapTable keyField='email' data={ueds} columns={cols} noDataIndication="Não há usuários!" />
            </fieldset>
        )
    }
}

function select(state) {

    return {
        responses: state.reducers.responses
    }
}

export default connect(select)(ListOfUsers)