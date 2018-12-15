import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'
import { closeModal, requestToState, requestToReducer } from '../../../../data/dispatchers'
import { SysInput, SysButton } from '../../../components/syscomponents'
import { entrar } from '../../users/components/headerlogin'
import { SetNewClient, GetClient, UpdateClient, GetAllClients } from '../../../../data/alias/methods'
import { client, clients } from '../../../../data/alias/keys'

class ClientForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            responses: {},
            nameValidation: ''
        }
    }

    componentWillUnmount = () => window.onkeypress = (e) => {
        if (e.keyCode === 13) {
            entrar()
        }
    }

    componentDidMount() {

        const { edit, clientId } = this.props
        if (edit) {

            requestToState(this, GetClient, client, clientId)
        }

        window.onkeypress = undefined
    }

    saveClient() {

        const { edit, clientId } = this.props

        let nameValidation = ''
        const name = this.refs.name.refs.input.value

        let valid = true

        if (name.trim() === '') {
            valid = false
            nameValidation = 'Nome do cliente obrigatório!'
        }

        if (valid) {

            const client = {
                id: clientId || 0,
                name
            }

            if (edit) {
                requestToState(this, UpdateClient, 'pdt_client', client, 'POST', true)
            } else {
                requestToState(this, SetNewClient, 'rgstr_client', client, 'POST', true)
            }
        } else {
            this.setState({ nameValidation })
        }
    }

    componentWillUpdate() {

        const { responses } = this.state
        const { status } = responses['rgstr_client'] !== undefined ? responses['rgstr_client'] : responses['pdt_client'] !== undefined ? responses['pdt_client'] : { status: 0 }
        if (status > 0) {
            requestToReducer(this, GetAllClients, clients)
            closeModal(this)
        }
    }

    render() {

        const { responses } = this.state
        const c = responses[client] !== undefined ? responses[client].data : {
            name: ''
        }

        return (
            <div>
                <Modal.Body>
                    <div className="form-inline">
                        <SysInput defaultValue={c.name} ref="name" label="Nome" type="text" placeholder="Nome do cliente." textValidation={this.state.nameValidation} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="btn-group">
                        <SysButton type="default" text="Cancelar" action={() => closeModal(this)} />
                        <SysButton type="primary" text={this.props.edit ? 'Alterar' : 'Cadastrar'} action={this.saveClient.bind(this)} />
                    </div>
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

export default connect(select)(ClientForm)