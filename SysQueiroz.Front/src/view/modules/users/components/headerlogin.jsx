import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux'

import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { showAlert, requestToReducer, closeModal } from '../../../../data/dispatchers'
import { Login, Relogin } from '../../../../data/alias/methods'
import { session } from '../../../../data/alias/keys'

import If, { Else } from '../../../components/if'
import { SysInput } from '../../../components/syscomponents';

export var entrar

class HeaderLogin extends Component {

    constructor(props) {
        super(props)

        this.entrar = this.entrar.bind(this)

        entrar = (e, revalidation) => {             
            if (e.keyCode === 13) {                                
                this.entrar(revalidation)
            }
        }

        window.onkeypress = entrar
    }

    entrar(revalidation = false) {
        const email = document.getElementById('email').value || document.getElementById('e-mobile').value || document.getElementById('e-revalidation').value || document.getElementById('e-revalidation-mobile').value
        const password = document.getElementById('password').value || document.getElementById('p-mobile').value || document.getElementById('p-revalidation').value || document.getElementById('p-revalidation-mobile').value
        if (email === '' || password === '') {
            showAlert(this, "E-mail e senha obrigatórios", 'warning')
        } else {            
            if (revalidation) {
                requestToReducer(this, Relogin, session, { email, password }, 'POST')
                closeModal(this)
            } else {
                requestToReducer(this, Login, session, { email, password }, 'POST')
            }
            //showMsgPanel(this, 'Exemplo de painel sem autohide', 'danger', true)
            /** request synchronous */
            // const response = requestSync(Login, { email, password }, 'POST')
            // if (response.code === 0) {
            //     setReducer(this, session, response.data)
            // } else {
            //     showAlert(this, response.message, response.type)
            // }
        }
    }

    render() {

        const { fluid, fixedTop, pullRight, revalidation } = this.props
        const NavbarProps = { fluid, fixedTop }
        const FormProps = { pullRight }

        const email = revalidation ? 'e-revalidation' : 'email'
        const password = revalidation ? 'p-revalidation' : 'password'

        const eMobile = revalidation ? 'e-revalidation-mobile' : 'e-mobile'
        const pMobile = revalidation ? 'p-revalidation-mobile' : 'p-mobile'        

        const form = (
            <div>
                <Navbar.Form {...FormProps} className="hidden-xs">
                    <div className="form-inline">
                        <SysInput className="hidden-xs" id={email} label={<FontAwesome name="at" />} type="text" placeholder="E-mail" />&nbsp;
                        <SysInput className="hidden-xs" id={password} label={<FontAwesome name="lock" />} type="password" placeholder="Senha" />
                        <button type="submit" className="btn btn-link" onClick={() => this.entrar(revalidation)}>Entrar</button>
                    </div>
                </Navbar.Form>
                <Nav className="hidden-sm hidden-md hidden-lg">
                    <NavItem>
                        <SysInput id={eMobile} label={<FontAwesome name="at" />} type="text" placeholder="E-mail" />
                    </NavItem>
                    <NavItem>
                        <SysInput id={pMobile} label={<FontAwesome name="lock" />} type="password" placeholder="Senha" />
                    </NavItem>
                    <NavItem>
                        <button className="btn btn-link btn-block" onClick={() => this.entrar(revalidation)}>Entrar</button>
                    </NavItem>
                </Nav>
            </div>
        )

        return (
            <Navbar {...NavbarProps} >
                <If condition={this.props.brand !== undefined}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            {this.props.brand}
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        {form}
                    </Navbar.Collapse>
                    <Else>
                        {form}
                    </Else>
                </If>
            </Navbar>
        )
    }
}

function select(state) {

    return {
        responses: state.reducers.responses
    }
}

export default connect(select)(HeaderLogin)