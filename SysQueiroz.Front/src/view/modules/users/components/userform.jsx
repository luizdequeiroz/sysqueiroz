import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'
import { closeModal, requestToReducer, requestToState } from '../../../../data/dispatchers'
import { GetUser, SetNewUser } from '../../../../data/alias/methods'
import { user } from '../../../../data/alias/keys'
import { SysInput } from '../../../components/syscomponents'
import { entrar } from './headerlogin';

class UserForm extends Component {

    constructor(props) {
        super(props)

        this.saveUser = this.saveUser.bind(this)
        this.alterUser = this.alterUser.bind(this)

        this.state = {
            responses: {},
            buttonSave: 'Cadastrar',
            actionUser: undefined,
            employeeValidation: undefined,
            departmentValidation: undefined
        }
    }

    componentWillUnmount = () => window.onkeypress = entrar

    componentDidMount() {

        const { edit, userId } = this.props
        if (edit) {
            this.setState({ buttonSave: 'Alterar', actionUser: this.alterUser })
            requestToReducer(this, GetUser, user, userId)
        } else this.setState({ actionUser: this.saveUser })
        
        window.onkeypress = undefined
    }

    saveUser() {

        //const employeeId = document.getElementById('employeeId').value || document.getElementById('eId-mobile').value
        //const name = document.getElementById('name').value || document.getElementById('n-mobile').value
        const email = document.getElementById('email').value || document.getElementById('e-mobile').value
        const password = document.getElementById('password').value || document.getElementById('p-mobile').value
        //const departmentId = document.getElementById('departmentId').value || document.getElementById('d-mobile').value
        //const departmentName = document.getElementById('departmentName').value || document.getElementById('dId-mobile').value

        let valid = true
        // if (employeeId.trim() === '' && name.trim() === '') {
        //     valid = false
        //     this.setState({ employeeValidation: 'Dados de funcionário obrigatórios!' })
        // }
        // if (departmentId.trim() === '' && departmentName.trim() === '') {
        //     valid = false
        //     this.setState({ departmentValidation: 'Dados de setor obrigatórios!' })
        // }
        if (email.trim() === '' || password.trim() === '') {
            valid = false
            this.setState({ emailPasswordValidation: 'E-mail e senha obrigatórios!' })
        }

        if (valid) {

            const user = {
                email,
                password,
                //employeeId: employeeId || null,
                // employee: {
                //     name: name || null,
                //     departmentId: departmentId || null,
                //     department: { name: departmentName || null }
                // }
            }

            requestToState(this, SetNewUser, 'rgstr_user', user, 'POST', true)
        }
    }

    alterUser() {
        alert("Alterar usuário!")
    }

    render() {

        const { responses } = this.props
        const u = responses[user] !== undefined ? responses[user].data : {
            email: '',
            password: ''
        }

        return (
            <div>
                <Modal.Body>
                    <div className="form-group">
                        <small className="text-danger">{this.state.emailPasswordValidation}</small>
                        <div className="form-inline">
                            <SysInput defaultValue={u.email} className="hidden-xs" id="email" label="E-mail" type="text" placeholder="E-mail de acesso." />&nbsp;
                            <SysInput defaultValue={u.password} className="hidden-xs" id="password" label="Senha" type="password" placeholder="Senha de acesso." />
                        </div>
                        <div className="hidden-sm hidden-md hidden-lg">
                            <SysInput defaultValue={u.email} id="e-mobile" label="E-mail" type="text" placeholder="E-mail de acesso." /><br />
                            <SysInput defaultValue={u.password} id="p-mobile" label="Senha" type="password" placeholder="Senha de acesso." />
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