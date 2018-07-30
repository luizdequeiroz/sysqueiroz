import React, { Component } from 'react'
import { connect } from 'react-redux'

import Menu from '../../menu'

class SystemPermissionsMenu extends Component {

    render() {
        
        return <Menu />
    }
}

function select(state) {

    return {
        responses: state.reducers.responses
    }
}

export default connect(select)(SystemPermissionsMenu)