import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserForm extends Component {

    render() {

        return <h1>Xablau</h1>
    }
}

function select(state) {

    return {
        responses: state.reducers.responses
    }
}

export default connect(select)(UserForm)