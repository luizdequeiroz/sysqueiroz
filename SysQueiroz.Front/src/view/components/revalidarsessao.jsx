import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'

import HeaderLogin, { entrar } from '../modules/users/components/headerlogin'

import { closeModal, clearReducer, setReducer } from '../../data/dispatchers';
import { session } from '../../data/alias/keys';

class RevalidarSessao extends Component {

    constructor(props) {
        super(props)

        this.state = {
            responses: {},
            message: "",
            showPanel: false
        }

        this.sair = this.sair.bind(this)
    }

    sair() {
        closeModal(this)
        window.location.hash = ''
        sessionStorage.clear()
        clearReducer(this)
    }

    componentWillUnmount = () => window.onkeypress = (e) => {
        if (e.keyCode === 13) {
            entrar()
        }
    }

    componentDidMount = () => window.onkeypress = (e) => {
        if (e.keyCode === 13) {
            entrar(this, true)
        }
    }

    componentWillUpdate() {

        const { responses } = this.state
        const { status } = responses[session] !== undefined ? JSON.parse(responses[session]) : { status: 0 }
        if (status > 0) {
            closeModal(this)
            setReducer(this, session, responses[session])
        }
    }

    render() {

        return (
            <div>
                <Modal.Body>
                    <fieldset>
                        <legend>Essa operação requer uma revalidação de sessão.</legend>
                        <HeaderLogin revalidation context={this} />
                        <h6>Se você não revalidar a sessão, você será redirecionado para a tela de login do sistema.</h6>
                        <h6>Não se preocupe, sua operação não está comprometida. Ela já foi efetuada!</h6>
                    </fieldset>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-default" onClick={() => this.sair()}>Cancelar</button>
                </Modal.Footer>
            </div>
        )
    }
}

function select(state) {

    return {
        responses: state.reducers.responses
    }
}

export default connect(select)(RevalidarSessao)