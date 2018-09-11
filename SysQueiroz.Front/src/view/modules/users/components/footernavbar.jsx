import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'

class FooterNavBar extends Component {

    render() {

        return (
            <Navbar fluid fixedBottom>
                <div className="text-center">
                    <div className="navbar-footer">
                        <p>{/*SysQueirozTeam*/} &copy; Todos os direitos reservados.<br /><span className="badge">Versão 1.0</span></p>
                    </div>
                </div>
            </Navbar>
        )
    }
}

export default FooterNavBar