import React, { Component } from 'react'
import { connect } from 'react-redux'
import Status from './status'
import MessagePanel from './messagepanel'
import SysModal from './modal'

import HeaderNavBar from '../modules/users/pages/headernavbar'
import { session } from '../../data/alias/keys'
import { setReducer } from '../../data/dispatchers'

import { Navbar } from 'react-bootstrap'

class Index extends Component {
    keyCode = ""

    componentWillMount() {

        window.onkeydown = e => this.keyCode = e.keyCode
        window.onbeforeunload = () => {
            if (this.keyCode !== 116) sessionStorage.clear()
        }
    }

    componentDidMount() {
        
        if (sessionStorage.getItem(session) !== undefined) {
            setReducer(this, session, sessionStorage.getItem(session) === null ? undefined : sessionStorage.getItem(session));
        }
    }

    render() {

        return (
            <div>
                <HeaderNavBar />
                <div id="main" className="container-fluid" style={{ marginTop: "70px" }}>
                    <MessagePanel />
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
                <SysModal />
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