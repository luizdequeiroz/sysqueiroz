import React, { Component } from 'react'
import { connect } from 'react-redux'

import BootstrapTable from 'react-bootstrap-table-next'
import { employeesdepartmant } from '../../../../data/alias/keys'
import { requestToReducer, showModal, closeModal } from '../../../../data/dispatchers'

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import { SysButton } from '../../../components/syscomponents'
import EmployeeForm from '../components/employeeform'

import Modal from 'react-bootstrap/lib/Modal'
import { GetEmployeesWithDepartments, DeleteEmployee } from '../../../../data/alias/methods'

class ListOfEmployees extends Component {

    componentDidMount() {

        requestToReducer(this, GetEmployeesWithDepartments, employeesdepartmant)
    }

    deleteEmployee(id) {

        requestToReducer(this, DeleteEmployee, 'dlt_employee', id, 'POST', true, "Deletando funcionário...")
        // atualizar redux com a alteração da tabela
        setTimeout(() => requestToReducer(this, GetEmployeesWithDepartments, employeesdepartmant), 1000); 
        closeModal(this)
    }

    render() {

        const cols = [
            {
                dataField: 'name',
                text: 'Nome'
            }, {
                dataField: 'departmentName',
                text: 'Setor'
            }, {
                dataField: 'actions',
                text: 'Ações',
                headerStyle: { width: '15%' }
            }
        ]
        
        let eds
        if(this.props.responses[employeesdepartmant] !== undefined)
            eds = this.props.responses[employeesdepartmant].data.map(e => ({
                ...e,
                actions: (
                    <div className="btn-group">
                        <SysButton type="primary" size="xs" text="Alterar" action={() => showModal(this, 'Alterar funcionário', <EmployeeForm employeeId={e.id} edit />, true)} />
                        <SysButton type="danger" size="xs" text="Deletar" action={() => showModal(this, `Confirmar exclusão do funcionário "${e.name}"?`, (
                            <Modal.Footer>
                                <div className="btn-group">
                                    <SysButton type="danger" text="Confirmar exclusão!" action={() => this.deleteEmployee(e.id)} />
                                    <SysButton type="default" text="Cancelar exclusão!" action={() => closeModal(this)} />
                                </div>
                            </Modal.Footer>
                        ), false, 'md')} />
                    </div>
                )
            }))
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