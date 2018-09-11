import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Navbar, Nav, NavItem/*, NavDropdown, MenuItem*/ } from 'react-bootstrap'
import { clearReducer } from '../../../../data/dispatchers'
import { usersessiondatas } from '../../../../data/alias/keys'

class HeaderLogged extends Component {

    constructor(props) {
        super(props)

        this.sair = this.sair.bind(this)
    }

    sair() {
        window.location.hash = ''
        sessionStorage.clear()
        clearReducer(this)
    }

    render() {
        const isUndefined = this.props.responses[usersessiondatas] === undefined

        return (
            <Navbar fluid fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        {this.props.brand} | {isUndefined ? undefined : this.props.responses[usersessiondatas].data.department.name} | {isUndefined ? undefined : <a href="#edit">{this.props.responses[usersessiondatas].data.employee.name}</a>}
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem className="hidden-sm hidden-md hidden-lg">
                            <button className="btn btn-link btn-block" onClick={this.sair} href="#">Sair</button>
                        </NavItem>
                    </Nav>
                    <Navbar.Form pullRight className="hidden-xs">
                        <div className="form-inline">
                            <button className="btn btn-link btn-block" onClick={this.sair} href="#">Sair</button>
                        </div>
                    </Navbar.Form>
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

export default connect(select)(HeaderLogged)