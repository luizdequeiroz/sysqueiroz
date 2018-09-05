import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestToReducer, closeModal, requestToState } from '../../../../data/dispatchers'
import { GetUsersEmployeesWithDepartments, AssignMenuMethod, GetUsersIdByMenu } from '../../../../data/alias/methods'
import { usersemployeesdepartmant, usersidfrommenu } from '../../../../data/alias/keys'
import Modal from 'react-bootstrap/lib/Modal'

import BootstrapTable from 'react-bootstrap-table-next'

class AssignMenu extends Component {

    constructor(props) {
        super(props)

        this.state = {
            responses: {}
        }

        this.onSelect = this.onSelect.bind(this)
        this.onSelectAll = this.onSelectAll.bind(this)
        this.assignMenu = this.assignMenu.bind(this)
    }

    componentDidMount() {

        requestToReducer(this, GetUsersEmployeesWithDepartments, usersemployeesdepartmant)
        requestToState(this, GetUsersIdByMenu, usersidfrommenu, this.props.menuId)
    }

    onSelect(row, isSelect) {

        if (isSelect)
            this.setState({ responses: { usersidfrommenu: { data: [...this.state.responses[usersidfrommenu].data, row.id] } } })
        else this.setState({ responses: { usersidfrommenu: { data: this.state.responses[usersidfrommenu].data.filter(id => id !== row.id) } } })
    }

    onSelectAll(isSelect, rows) {

        if (isSelect)
            this.setState({ responses: { usersidfrommenu: { data: rows.map(r => r.id) } } })
        else this.setState({ responses: { usersidfrommenu: { data: [] } } })
    }

    assignMenu() {

        requestToReducer(this, AssignMenuMethod, 'ssgn_menu', { menuId: this.props.menuId, all: this.props.responses[usersemployeesdepartmant].data.map(u => u.id), selecteds: this.state.responses[usersidfrommenu].data }, 'POST', true, "Atribuindo menus aos usuários selecionados...")
        closeModal(this);
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

        let selecteds
        if (this.state.responses[usersidfrommenu] !== undefined)
            selecteds = this.state.responses[usersidfrommenu].data
        else selecteds = []

        return (
            <div>
                <Modal.Body>
                    <fieldset>
                        <legend>Lista de Usuários <i>(selecione os usuários para atribuir o acesso ao menu)</i></legend>
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
                        <button className="btn btn-primary" onClick={() => this.assignMenu()}>Salvar</button>
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

export default connect(select)(AssignMenu)