import React, { Component } from 'react'
import { connect } from 'react-redux'
import Status from './status'

import HeaderNavBar from '../modules/users/pages/headernavbar'
import { session } from '../../data/alias/keys'
import { setReducer } from '../../data/dispatchers'

import { Navbar } from 'react-bootstrap'

class Index extends Component {
    keyCode = ""

    componentWillMount() {

        if (sessionStorage.getItem(session) !== undefined) {
            setReducer(this, session, sessionStorage.getItem(session) === null ? undefined : sessionStorage.getItem(session));
        }

        window.onkeydown = e => this.keyCode = e.keyCode
        window.onbeforeunload = () => {
            if (this.keyCode !== 116) sessionStorage.clear()
        }
    }

    render() {

        return (
            <div>
                <HeaderNavBar />
                <div id="main" className="container-fluid" style={{ marginTop: "70px" }}>
                    {this.props.children}
                </div>
                <Navbar fluid fixedBottom>
                    <div className="text-center">
                        <div className="navbar-footer">
                            <p>SysQueirozTeam &copy; Todos os direitos reservados.<br /><span className="badge">Versão 1.0</span></p>
                        </div>
                    </div>
                </Navbar>
                <Status />
            </div>
        );
    }
}

function select(state) {

    if (state.reducers.responses[session] !== undefined) {
        sessionStorage.setItem(session, state.reducers.responses[session])
    }

    return {
        responses: state.reducers.responses
    }
}

export default connect(select)(Index)