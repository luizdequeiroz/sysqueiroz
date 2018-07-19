import React, { Component } from 'react'
import { connect } from 'react-redux'

import { session, employee, menus } from '../../data/alias/keys'
import { GetEmployeeByUserId } from '../../data/alias/methods'
import { requestToOther } from '../../data/dispatchers'

class Menu extends Component {

    // para repreencher os dados do logado caso a tela seja atualziada
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
                                        <i className={`fa fa-${menu.icon} fa-5x`} />
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

export default connect(select)(Menu)