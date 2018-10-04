import React, { Component } from 'react'
import { connect } from 'react-redux'

import BootstrapTable from 'react-bootstrap-table-next'
import { usersemployeesdepartmant } from '../../../../data/alias/keys'
import { requestToReducer, showModal, closeModal } from '../../../../data/dispatchers'

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import { SysButton } from '../../../components/syscomponents'
import UserForm from '../components/userform'

import Modal from 'react-bootstrap/lib/Modal'
import { GetUsersEmployeesWithDepartments, DeleteUser } from '../../../../data/alias/methods'

class ListOfUsers extends Component {

    componentDidMount() {

        requestToReducer(this, GetUsersEmployeesWithDepartments, usersemployeesdepartmant)
    }

    deleteUser(id) {

        requestToReducer(this, DeleteUser, 'dlt_user', id, 'POST', true, "Deletando usuário...")
        // atualizar redux com a alteração da tabela
        setTimeout(() => requestToReducer(this, GetUsersEmployeesWithDepartments, usersemployeesdepartmant), 1000); 
        closeModal(this)
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
            }, {
                dataField: 'actions',
                text: 'Ações',
                headerStyle: { width: '15%' }
            }
        ]
        
        let ueds
        if(this.props.responses[usersemployeesdepartmant] !== undefined)
            ueds = this.props.responses[usersemployeesdepartmant].data.map(u => ({
                ...u,
                actions: (
                    <div className="btn-group">
                        <SysButton type="primary" size="xs" text="Alterar" action={() => showModal(this, 'Altear usuário', <UserForm userId={u.id} edit />, true)} />
                        <SysButton type="danger" size="xs" text="Deletar" action={() => showModal(this, `Confirmar exclusão do usuário "${u.name}"?`, (
                            <Modal.Footer>
                                <div className="btn-group">
                                    <SysButton type="danger" text="Confirmar exclusão!" action={() => this.deleteUser(u.id)} />
                                    <SysButton type="default" text="Cancelar exclusão!" action={() => closeModal(this)} />
                                </div>
                            </Modal.Footer>
                        ), false, 'md')} />
                    </div>
                )
            }))
        else ueds = []

        const { SearchBar } = Search
        return (
            <fieldset>
                <legend>Lista de Usuários</legend>
                <ToolkitProvider keyField='email' data={ueds} columns={cols} search>
                    {
                        props => (
                            <div>
                                <div className="input-group">
                                    <SearchBar { ...props.searchProps } placeholder="Buscar usuários..." />
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