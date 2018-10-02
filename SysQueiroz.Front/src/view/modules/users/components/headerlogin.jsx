import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux'

import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { showAlert, requestToReducer, requestToState } from '../../../../data/dispatchers'

import If, { Else } from '../../../components/if'
import { SysInput } from '../../../components/syscomponents'
import { session } from '../../../../data/alias/keys'
import { methods } from '../../../templates'

export var entrar

class HeaderLogin extends Component {

    constructor(props) {
        super(props)

        this.entrar = this.entrar.bind(this)

        window.onkeypress = (e) => {             
            if (e.keyCode === 13) {                                
                this.entrar()
            }
        }

        entrar = this.entrar
    }

    entrar(context = this, revalidation = false) {
        
        const email = document.getElementById('email').value || document.getElementById('e-mobile').value
        const password = document.getElementById('password').value || document.getElementById('p-mobile').value
        if (email === '' || password === '') {
            showAlert(context, "E-mail e senha obrigatórios", 'warning')
        } else {            
            if (revalidation) {
                requestToState(context, methods.Relogin, session, { email, password }, 'POST')
            } else {
                requestToReducer(context, methods.Login, session, { email, password }, 'POST')
            }
        }
    }

    render() {

        const { fluid, fixedTop, pullRight, revalidation, context } = this.props
        const NavbarProps = { fluid, fixedTop }
        const FormProps = { pullRight }      

        const form = (
            <div>
                <Navbar.Form {...FormProps} className="hidden-xs">
                    <div className="form-inline">
                        <SysInput className="hidden-xs" id="email" label={<FontAwesome name="at" />} type="text" placeholder="E-mail" />&nbsp;
                        <SysInput className="hidden-xs" id="password" label={<FontAwesome name="lock" />} type="password" placeholder="Senha" />
                        <button type="submit" className="btn btn-link" onClick={() => this.entrar(context, revalidation)}>Entrar</button>
                    </div>
                </Navbar.Form>
                <Nav className="hidden-sm hidden-md hidden-lg">
                    <NavItem>
                        <SysInput id="e-mobile" label={<FontAwesome name="at" />} type="text" placeholder="E-mail" />
                    </NavItem>
                    <NavItem>
                        <SysInput id="p-mobile" label={<FontAwesome name="lock" />} type="password" placeholder="Senha" />
                    </NavItem>
                    <NavItem>
                        <button className="btn btn-link btn-block" onClick={() => this.entrar(context, revalidation)}>Entrar</button>
                    </NavItem>
                </Nav>
            </div>
        )

        return (
            <Navbar {...NavbarProps}>
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