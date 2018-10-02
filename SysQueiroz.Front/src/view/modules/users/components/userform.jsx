import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'
import { closeModal, requestToState, requestToReducer } from '../../../../data/dispatchers'
import { user, employeesForNewUser, departments, usersemployeesdepartmant } from '../../../../data/alias/keys'
import { SysInput, SysSelect, SysButton } from '../../../components/syscomponents'
import { entrar } from './headerlogin'
import If, { Else } from '../../../components/if'
import { methods } from '../../../templates'

class UserForm extends Component {

    constructor(props) {
        super(props)

        this.saveUser = this.saveUser.bind(this)
        this.alterUser = this.alterUser.bind(this)

        this.state = {
            responses: {},
            buttonSave: 'Cadastrar',
            actionUser: undefined,
            employeeValidation: '',
            departmentValidation: '',
            emailValidation: '',
            passwordValidation: '',
            newEmployee: false,
            newDepartment: false
        }
    }

    componentWillUnmount = () => window.onkeypress = (e) => {
        if (e.keyCode === 13) {
            entrar()
        }
    }

    componentDidMount() {

        const { edit, userId } = this.props
        if (edit) {

            this.setState({ buttonSave: 'Alterar', actionUser: this.alterUser })
            requestToState(this, methods.GetUser, user, userId)
        } else {

            requestToState(this, methods.GetAllEmployeesWithoutUser, employeesForNewUser)
            this.setState({ actionUser: this.saveUser })
        }

        window.onkeypress = undefined
    }

    saveUser() {

        let employeeId = '', name, departmentId = '', departmentName
        let employeeValidation = '', departmentValidation = '', emailValidation = '', passwordValidation = ''
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        let valid = true

        if (this.state.newEmployee) {
            name = document.getElementById('name').value

            if (this.state.newDepartment) {
                departmentName = document.getElementById('departmentName').value
            } else {
                departmentId = document.getElementById('department').value
            }

            if ((departmentId.trim() === '' && departmentName.trim() === '') || departmentId.trim() === 'Selecione') {
                valid = false
                departmentValidation = 'Setor obrigatório!'
            }
        } else {
            employeeId = document.getElementById('employee').value
        }

        if ((employeeId.trim() === '' && name.trim() === '') || employeeId.trim() === 'Selecione') {
            valid = false
            employeeValidation = 'Funcionário obrigatório! '
        }

        if (email.trim() === '') {
            valid = false
            emailValidation = 'E-mail obrigatório!'
        }

        if (password.trim() === '') {
            valid = false
            passwordValidation = 'Senha obrigatória!'
        }

        if (valid) {

            const user = {
                email,
                password,
                employeeId: employeeId || 0,
                employee: employeeId === '' ? {
                    name: name,
                    departmentId: departmentId || 0,
                    department: departmentId === '' ? { name: departmentName } : null
                } : null
            }

            requestToState(this, methods.SetNewUser, 'rgstr_user', user, 'POST', true)
        } else {
            this.setState({ employeeValidation, departmentValidation, emailValidation, passwordValidation })
        }
    }

    alterUser() {
        alert("Alterar usuário!")
    }

    componentWillUpdate() {

        const { responses } = this.state
        const { status } = responses['rgstr_user'] !== undefined ? responses['rgstr_user'] : { status: 0 }
        if (status > 0) {
            requestToReducer(this, methods.GetUsersEmployeesWithDepartments, usersemployeesdepartmant)
            closeModal(this)
        }
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
                                                requestToState(this, methods.GetAllDepartments, departments)
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
                            <SysInput defaultValue={u.email} id="email" label="E-mail" type="text" placeholder="E-mail de acesso." textValidation={this.state.emailValidation} />&nbsp;
                            <SysInput defaultValue={u.password} id="password" label="Senha" type="password" placeholder="Senha de acesso." textValidation={this.state.passwordValidation} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="btn-group">
                        <button className="btn btn-default" onClick={() => closeModal(this)}>Cancelar</button>
                        <button className="btn btn-primary" onClick={() => this.state.actionUser()}>{this.state.buttonSave}</button>
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

export default connect(select)(UserForm)