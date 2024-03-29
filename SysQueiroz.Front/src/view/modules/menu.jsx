import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux'

import { usersessiondatas } from '../../data/alias/keys'

class Menu extends Component {

    render() {

        let content      
        const superHref = window.location.hash.replace("#/menu", "").replace("#/", "")
        
        if (this.props.responses[usersessiondatas] !== undefined) {
            content = (
                <fieldset>
                    <legend>Menu</legend>
                    {this.props.responses[usersessiondatas].data.menu.map(menu => {
                        if ((menu.superHref === null ? '' : menu.superHref) === superHref) {
                            return (
                                <a key={menu.id} className="col-md-1" href={`#${menu.href}`} style={{ minWidth: "150px" }}>
                                    <div className="text-center">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <FontAwesome name={menu.icon} size="5x" />
                                            </div>
                                            <div className="panel-body">
                                                <label style={{ cursor: 'pointer' }}>{menu.name}</label>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            )
                        } else {
                            return false
                        } 
                    })}
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