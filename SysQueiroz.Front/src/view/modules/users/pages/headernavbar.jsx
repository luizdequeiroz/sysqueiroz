import React, { Component } from 'react'
import { connect } from 'react-redux'

const _img = require('../../../../../public/images/logo.png')

import HeaderLogin from '../components/headerlogin'
import HeaderLogged from '../components/headerlogged'

import { session, employee, menus, department } from '../../../../data/alias/keys'
import { GetEmployeeByUserId, GetMenuByUserId, GetDepartmentByUserId } from '../../../../data/alias/methods'
import { requestToReducer, setReducer } from '../../../../data/dispatchers'

class HeaderNavBar extends Component {

    /// para repreencher os dados do logado caso a tela seja atualizada
    componentWillMount() {

        if (this.props.responses[session] !== undefined) {
            if (this.props.responses[employee] === undefined) {
                requestToReducer(this, GetEmployeeByUserId, employee, JSON.parse(this.props.responses[session]).data, 'GET', false)
            }
        }
    }

    componentDidUpdate() {

        if (this.props.responses[session] !== undefined) {
            if (this.props.responses[menus] === undefined)
                requestToReducer(this, GetMenuByUserId, menus, JSON.parse(this.props.responses[session]).data, 'GET', false)
            if (this.props.responses[department] === undefined)
                requestToReducer(this, GetDepartmentByUserId, department, JSON.parse(this.props.responses[session]).data, 'GET', false)
            if (this.props.responses[employee] === undefined)
                requestToReducer(this, GetEmployeeByUserId, employee, JSON.parse(this.props.responses[session]).data, 'GET', false)
        } else {
            if (this.props.responses[employee] !== undefined)
                setReducer(this, employee, undefined)
        }
    }

    render() {

        const tagsBrand = (
            <span>
                <img role="presentation" src={_img} width="30px" />
                <a href="#"><b>CL</b> <i>SysQueiroz</i></a>
            </span>
        )
        let content

        if (this.props.responses[session] === undefined) {
            content = <HeaderLogin brand={tagsBrand} />
        } else {
            content = <HeaderLogged brand={tagsBrand} />
        }

        return content
    }
}

function select(state) {

    return {
        responses: state.reducers.responses
    }
}

export default connect(select)(HeaderNavBar)