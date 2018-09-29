import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'
import { HIDE_PANEL_ALERT } from '../../data/alias/actions'

class MessagePanel extends Component {

    hidePanel = () => {
        const { dispatch } = this.props;
        dispatch({ type: HIDE_PANEL_ALERT })
    }

    render() {
        const { className, icon, message, showPanel, autohide } = this.props

        if (autohide) {
            window.setTimeout(this.hidePanel, 3000)
        }

        return (
            <Panel className={`${className} rounded`} style={{ display: showPanel ? 'block' : 'none'}}>                
                <i className={icon} /> {message} { !autohide ? (<i className="fa fa-close" style={{ cursor: 'pointer', float: 'right' }} onClick={this.hidePanel} />) : undefined }
            </Panel>
        );
    }
}

function select(state) {
    return {
        icon: state.reducers.messagepanel.icon,
        className: state.reducers.messagepanel.className,
        message: state.reducers.messagepanel.message,
        showPanel: state.reducers.messagepanel.showPanel,
        autohide: state.reducers.messagepanel.autohide
    }
}

export default connect(select)(MessagePanel)

