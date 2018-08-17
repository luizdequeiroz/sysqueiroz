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

        sessionStorage.clear()
        clearReducer(this)
    }

    render() {

        return (
            <Navbar fluid fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        {this.props.brand} | {this.props.responses[usersessiondatas] !== undefined ? this.props.responses[usersessiondatas].data.department.name | (<a href="#edit">{this.props.responses[usersessiondatas].data.employee.name}</a>) : undefined}
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem className="hidden-sm hidden-md hidden-lg">
                            <a className="btn btn-link btn-block" onClick={this.sair} href="#">Sair</a>
                        </NavItem>
                    </Nav>
                    <Navbar.Form pullRight className="hidden-xs">
                        <div className="form-inline">
                            <a className="btn btn-link btn-block" onClick={this.sair} href="#">Sair</a>
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