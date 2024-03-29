import React, { Component } from 'react'
import { connect } from 'react-redux'
import Status from './status'
import MessagePanel from './messagepanel'
import SysModal from './modal'

import HeaderNavBar from '../modules/users/pages/headernavbar'
import FooterNavBar from '../modules/users/components/footernavbar'
import { session } from '../../data/alias/keys'
import { setReducer } from '../../data/dispatchers'

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
                <FooterNavBar />
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