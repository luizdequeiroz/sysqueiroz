import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux'

import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { showAlert, requestToReducer } from '../../../../data/dispatchers';
import { Login } from '../../../../data/alias/methods';
import { session } from '../../../../data/alias/keys';

class HeaderLogin extends Component {

    constructor(props) {
        super(props)

        this.entrar = this.entrar.bind(this)

        window.onkeypress = e => {
            if (e.keyCode === 13) {
                this.entrar()
            }
        }
    }

    entrar() {
        const email = document.getElementById('email').value !== '' ? document.getElementById('email').value : document.getElementById('e-mobile').value
        const password = document.getElementById('password').value !== '' ? document.getElementById('password').value : document.getElementById('s-mobile').value
        if (email === '' || password === '') {
            showAlert(this, "E-mail e senha obrigatórios", 'warning')
        } else {
            requestToReducer(this, Login, session, { email, password }, 'POST')
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

        return (
            <Navbar fluid fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        {this.props.brand}
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Form pullRight className="hidden-xs">
                        <div className="form-inline">
                            <div className="input-group hidden-xs">
                                <label className="input-group-addon" htmlFor="email"><FontAwesome name="at" /></label>
                                <input id="email" type="text" className="form-control" placeholder="E-mail" />
                            </div>&nbsp;
                            <div className="input-group hidden-xs">
                                <label className="input-group-addon" htmlFor="password"><FontAwesome name="lock" /></label>
                                <input id="password" type="password" className="form-control" placeholder="Senha" />
                            </div>
                            <button type="submit" className="btn btn-link" onClick={this.entrar}>Entrar</button>
                        </div>
                    </Navbar.Form>
                    <Nav className="hidden-sm hidden-md hidden-lg">
                        <NavItem>
                            <div className="input-group">
                                <label className="input-group-addon" htmlFor="email"><FontAwesome name="at" /></label>
                                <input id="e-mobile" type="text" className="form-control" placeholder="E-mail" />
                            </div>
                        </NavItem>
                        <NavItem>
                            <div className="input-group">
                                <label className="input-group-addon" htmlFor="password"><FontAwesome name="lock" /></label>
                                <input id="s-mobile" type="password" className="form-control" placeholder="Senha" />
                            </div>
                        </NavItem>
                        <NavItem>
                            <button className="btn btn-link btn-block" onClick={this.entrar}>Entrar</button>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
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