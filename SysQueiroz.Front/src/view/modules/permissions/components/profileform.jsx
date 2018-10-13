import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'
import { closeModal, requestToState, requestToReducer } from '../../../../data/dispatchers'
import { profiles } from '../../../../data/alias/keys'
import { SysInput, SysButton } from '../../../components/syscomponents'
import { entrar } from '../../users/components/headerlogin'
import { SetNewProfile, GetAllProfiles } from '../../../../data/alias/methods'

class ProfileForm extends Component {

    constructor(props) {
        super(props)

        this.saveProfile = this.saveProfile.bind(this)

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

    componentDidMount = () => window.onkeypress = undefined

    saveProfile() {

        let nameValidation
        const name = document.getElementById('name').value
        const description = document.getElementById('description').value

        let valid = true

        if (name.trim() === '') {
            valid = false
            nameValidation = 'Nome do item de menu obrigatório!'
        }

        if (valid) {
            requestToState(this, SetNewProfile, 'rgstr_profile', { name, description }, 'POST', true)
        } else {
            this.setState({ nameValidation })
        }
    }

    componentWillUpdate() {

        const { responses } = this.state
        const { status } = responses['rgstr_profile'] !== undefined ? responses['rgstr_profile'] : { status: 0 }
        if (status > 0) {
            requestToReducer(this, GetAllProfiles, profiles)
            closeModal(this)
        }
    }

    render() {

        return (
            <div>
                <Modal.Body>
                    <div className="form-group">
                        <div className="form-inline">
                            <SysInput id="name" label="Nome" type="text" placeholder="Nome do perfil." textValidation={this.state.nameValidation} /><small className="hidden-xs">&nbsp;</small>
                            <SysInput id="description" label="Descrição" type="text" placeholder="Descrição do perfil." />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="btn-group">
                        <SysButton type="default" action={() => closeModal(this)} text='Cancelar' />
                        <SysButton type="primary" action={() => this.saveProfile()} text="Criar" />
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

export default connect(select)(ProfileForm)