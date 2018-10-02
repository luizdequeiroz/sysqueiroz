import React, { Component } from 'react'
import { connect } from 'react-redux'

import HeaderLogin from '../components/headerlogin'
import HeaderLogged from '../components/headerlogged'

import { usersessiondatas, session } from '../../../../data/alias/keys'
import { requestToReducer, setReducer } from '../../../../data/dispatchers'
import { methods } from '../../../templates'

const _img = require('../../../../www/imgs/_logo.png')

class HeaderNavBar extends Component {

    //#region [para preencher e repreencher os dados do logado quando logar e caso a tela seja atualizada]   
    componentDidUpdate() {

        if (this.props.responses[session] !== undefined) {
            if (this.props.responses[usersessiondatas] === undefined) {                
                requestToReducer(this, methods.GetUserSessionDatasByUserId, usersessiondatas, JSON.parse(this.props.responses[session]).data, 'GET', false)
            }
        } else {
            if (this.props.responses[usersessiondatas] !== undefined)
                setReducer(this, usersessiondatas, undefined)
        }
    }
    //#endregion

    render() {

        const tagsBrand = (
            <span>
                <img alt="presentation" src={_img} width="30px" />
                <i>&nbsp;</i><a href="#/"><b>React Base</b></a>
            </span>
        )
        let content

        if (this.props.responses[session] === undefined) {
            content = <HeaderLogin brand={tagsBrand} fluid fixedTop pullRight />
        } else {
            content = <HeaderLogged brand={tagsBrand} fluid fixedTop pullRight />
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