import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux'

import { session, employee, menus } from '../../../../data/alias/keys'
import { GetEmployeeByUserId } from '../../../../data/alias/methods'
import { requestToOther } from '../../../../data/dispatchers'

class SystemPermissionsMenu extends Component {

    // para repreencher os dados do logado caso a tela seja atualizada
    componentWillMount() {

        if (this.props.responses[session] !== undefined) {
            if (this.props.responses[employee] === undefined) {
                requestToOther(this, GetEmployeeByUserId, employee, JSON.parse(this.props.responses[session]).data, 'GET', false)
            }
        }
    }

    render() {

        let content
        if (this.props.responses[menus] !== undefined) {
            content = (
                <fieldset>
                    <legend>Menu</legend>
                    {this.props.responses[menus].data.map(menu => (
                        <a key={menu.id} className="col-md-1" href={`#${menu.href}`} style={{ minWidth: "150px" }}>
                            <div className="text-center">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <FontAwesome name={menu.icon} size="5x" />
                                    </div>
                                    <div className="panel-body">
                                        <label>{menu.name}</label>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </fieldset>
            )
        }

        return (
            <div className="container-fluid">
                {content}
            </div>
        )
    }
}

function select(state) {

    return {
        responses: state.reducers.responses
    }
}

export default connect(select)(SystemPermissionsMenu)