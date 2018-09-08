import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'

const _img = require('../../../public/images/logo.png')

import HeaderLogin from '../modules/users/components/headerlogin'

import { closeModal, clearReducer, setReducer } from '../../data/dispatchers';
import { session } from '../../data/alias/keys';

class RevalidarSessao extends Component {

    constructor(props) {
        super(props)

        this.sair = this.sair.bind(this)
    }

    sair() {
        closeModal(this)
        window.location.hash = ''
        sessionStorage.clear()
        clearReducer(this)
    }

    componentWillMount = () => {
        sessionStorage.clear()
        setReducer(this, session, undefined)
    }

    render() {

        return (
            <div>
                <Modal.Body>
                    <fieldset>
                        <legend>Essa operação requere uma revalidação de sessão.</legend>
                        <HeaderLogin revalidation />
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