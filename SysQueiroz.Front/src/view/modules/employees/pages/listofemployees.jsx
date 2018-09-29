import React, { Component } from 'react'
import { connect } from 'react-redux'

import BootstrapTable from 'react-bootstrap-table-next'
import { employeesdepartmant } from '../../../../data/alias/keys'
import { requestToReducer, showModal } from '../../../../data/dispatchers'
import { GetEmployeesWithDepartments } from '../../../../data/alias/methods'

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import { SysButton } from '../../../components/syscomponents'
import EmployeeForm from '../components/employeeform'

class ListOfEmployees extends Component {

    componentDidMount() {

        requestToReducer(this, GetEmployeesWithDepartments, employeesdepartmant)
    }

    render() {

        const cols = [
            {
                dataField: 'name',
                text: 'Nome'
            }, {
                dataField: 'departmentName',
                text: 'Setor'
            }
        ]
        
        let eds
        if(this.props.responses[employeesdepartmant] !== undefined)
            eds = this.props.responses[employeesdepartmant].data
        else eds = []

        const { SearchBar } = Search
        return (
            <fieldset>
                <legend>Lista de Funcionários</legend>
                <ToolkitProvider keyField='id' data={eds} columns={cols} search>
                    {
                        props => (
                            <div>
                                <div className="input-group">
                                    <SearchBar {...props.searchProps} placeholder="Buscar funcionários..." />
                                    <span className="input-group-btn">                                    
                                        <SysButton type="primary" text={<i className="fa fa-plus-circle" />} textHover="NOVO" action={() => showModal(this, 'Novo funcionário', <EmployeeForm />, true, 'lg')} />
                                    </span>
                                </div>
                                <hr />
                                <BootstrapTable { ...props.baseProps } noDataIndication="Não há funcionários!" />
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

export default connect(select)(ListOfEmployees)