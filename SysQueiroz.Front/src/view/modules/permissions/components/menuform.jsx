import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'
import { closeModal, requestToState, requestToReducer } from '../../../../data/dispatchers'
import { GetUser, SetNewUser, GetAllEmployeesForNewUser, GetAllDepartments, GetUsersEmployeesWithDepartments } from '../../../../data/alias/methods'
import { user, employeesForNewUser, departments, usersemployeesdepartmant } from '../../../../data/alias/keys'
import { SysInput, SysSelect, SysButton } from '../../../components/syscomponents'
import { entrar } from './headerlogin'
import If, { Else } from '../../../components/if'

class MenuForm extends Component {

    constructor(props) {
        super(props)

        this.saveMenu = this.saveMenu.bind(this)
        this.alterMenu = this.alterMenu.bind(this)

        this.state = {
            responses: {},
            buttonSave: 'Criar',
            actionMenu: undefined,
            hrefValidation: '',
            iconValidation: '',
            nameValidation: '',
            superHrefValidation: '',
            newSuperMenu: false
        }
    }

    componentWillUnmount = () => window.onkeypress = (e) => {
        if (e.keyCode === 13) {
            entrar()
        }
    }

    componentDidMount() {

        const { edit, menuId } = this.props
        if (edit) {

            this.setState({ buttonSave: 'Alterar', actionMenu: this.alterMenu })
            requestToState(this, GetMenuItem, menuitem, menuId)
        } else {

            requestToState(this, GetAllMenuItensForNewMenuItem, menuItensForNewMenuItem)
            this.setState({ actionMenu: this.saveMenu })
        }

        window.onkeypress = undefined
    }

    saveMenu() {

        if (this.props.newSuperMenu) {

        } else {

            let hrefValidation, nameValidation
            const href = document.getElementById('href').value
            const icon = document.getElementById('icon').value
            const name = document.getElementById('name').value
            const superHref = document.getElementById('superHref').value

            let valid = true

            if (href.trim() === '') {
                valid = false
                hrefValidation = 'Href do item de menu obrigatório!'
            }

            if (name.trim() === '') {
                valid = false
                nameValidation = 'Nome do item de menu obrigatório!'
            }

            if (valid) {
                requestToState(this, SetNewMenuItem, 'rgstr_menu_item', { href, icon, name, superHref }, 'POST', true)
            } else {
                this.setState({ hrefValidation, nameValidation })
            }
        }
    }

    componentWillUpdate() {

        const { responses } = this.state
        const { status } = responses['rgstr_user'] !== undefined ? responses['rgstr_user'] : { status: 0 }
        if (status > 0) {
            requestToReducer(this, GetUsersEmployeesWithDepartments, usersemployeesdepartmant)
            closeModal(this)
        }
    }

    alterUser() {
        alert("Alterar usuário!")
    }

    render() {

        const { responses } = this.state
        const u = responses[user] !== undefined ? responses[user].data : {
            email: '',
            password: ''
        }

        const optnsEmpl = (
            u.employee !== undefined ? [u.employee] : (
                responses[employeesForNewUser] !== undefined ? responses[employeesForNewUser].data : []
            )
        ).map(e => ({ value: e.id, text: `${e.name} - ${e.departmentName}` }))

        const optnsDepa = (
            responses[departments] !== undefined ? responses[departments].data : []
        ).map(d => ({ value: d.id, text: d.name }))

        return (
            <div>
                <Modal.Body>
                    <div className="form-group">
                        <If condition={this.state.newEmployee}>
                            <div className="form-inline">
                                <div className="input-group">
                                    <SysInput id="name" label="Nome" type="text" placeholder="Nome do funcionário." textValidation={this.state.employeeValidation} />
                                    <div className="input-group-btn">
                                        <SysButton type="primary" text={<i className="fa fa-minus-circle" />} textHover="Existente" action={() => this.setState({ newEmployee: false, newDepartment: false })} size="sm" />
                                    </div>
                                </div>&nbsp;
                                <If condition={this.state.newDepartment} childrenCountIsOne>
                                    <SysInput id="departmentName" label="Setor" type="text" placeholder="Nome do setor." textValidation={this.state.departmentValidation} />
                                    <Else childrenCountIsOne>
                                        <div className="input-group">
                                            <SysSelect id="department" label="Setor" options={optnsDepa} textValidation={this.state.departmentValidation} />
                                            <div className="input-group-btn">
                                                <SysButton type="primary" text={<i className="fa fa-plus-circle" />} textHover="NOVO" action={() => this.setState({ newDepartment: true })} size="sm" />
                                            </div>
                                        </div>
                                    </Else>
                                </If>
                            </div>
                            <Else childrenCountIsOne>
                                <div className="form-inline">
                                    <div className="input-group">
                                        <SysSelect id="employee" label="Funcionário" options={optnsEmpl} textValidation={this.state.employeeValidation} />
                                        <div className="input-group-btn">
                                            <SysButton type="primary" text={<i className="fa fa-plus-circle" />} textHover="NOVO" action={() => {
                                                requestToState(this, GetAllDepartments, departments)
                                                this.setState({ newEmployee: true })
                                            }} size="sm" />
                                        </div>
                                    </div>
                                </div>
                            </Else>
                        </If>
                    </div>
                    <div className="form-group">
                        <div className="form-inline">
                            <SysInput defaultValue={u.href} id="href" label="Href" type="text" placeholder="Href do item de menu." textValidation={this.state.hrefValidation} />&nbsp;
                            <SysInput defaultValue={u.icon} id="icon" label="Ícone" type="text" placeholder="Ícone do item de menu." textValidation={this.state.iconValidation} />&nbsp;
                            <SysInput defaultValue={u.name} id="name" label="Nome" type="text" placeholder="Nome do item de menu." textValidation={this.state.nameValidation} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="btn-group">
                        <button className="btn btn-default" onClick={() => closeModal(this)}>Cancelar</button>
                        <button className="btn btn-primary" onClick={() => this.state.actionMenu()}>{this.state.buttonSave}</button>
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

export default connect(select)(MenuForm)