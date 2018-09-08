import React, { Component } from 'react'
import { connect } from 'react-redux'

import BootstrapTable from 'react-bootstrap-table-next'
import { usersemployeesdepartmant } from '../../../../data/alias/keys'
import { requestToReducer, showModal } from '../../../../data/dispatchers'
import { GetUsersEmployeesWithDepartments } from '../../../../data/alias/methods'

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import { SysButton } from '../../../components/syscomponents'
import UserForm from '../components/userform'

class ListOfUsers extends Component {

    componentDidMount() {

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

        const { SearchBar } = Search
        return (
            <fieldset>
                <legend>Lista de Usuários</legend>
                <ToolkitProvider keyField='email' data={ueds} columns={cols}>
                    {
                        props => (
                            <div>
                                <div className="input-group">
                                    <SearchBar {...props.searchProps} placeholder="Buscar usuários..." />
                                    <span className="input-group-btn">                                    
                                        <SysButton type="primary" text={<i className="fa fa-plus-circle" />} textHover="NOVO" action={() => showModal(this, 'Novo usuário', <UserForm />, true, 'lg')} />
                                    </span>
                                </div>
                                <hr />
                                <BootstrapTable { ...props.baseProps } noDataIndication="Não há usuários!" />
                            </div>
                        )
                    }
                </ToolkitProvider>
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