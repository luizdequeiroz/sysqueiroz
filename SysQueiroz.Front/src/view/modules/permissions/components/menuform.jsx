import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'
import { closeModal, requestToState, requestToReducer } from '../../../../data/dispatchers'
import { menus, menuitensfornewmenuitem } from '../../../../data/alias/keys'
import { SysInput, SysSelect, SysCheck, SysButton } from '../../../components/syscomponents'
import { entrar } from '../../users/components/headerlogin'
import { SetNewMenuItem, GetAllHierarchicallyOrganizedMenuItems, GetAllMenuItemsWhereSuperItems } from '../../../../data/alias/methods'

class MenuForm extends Component {

    constructor(props) {
        super(props)

        this.saveMenu = this.saveMenu.bind(this)

        this.state = {
            responses: {},
            hrefValidation: '',
            iconValidation: '',
            nameValidation: '',
            superHrefValidation: ''
        }
    }

    componentWillUnmount = () => window.onkeypress = (e) => {
        if (e.keyCode === 13) {
            entrar()
        }
    }

    componentDidMount = () => {

        requestToState(this, GetAllMenuItemsWhereSuperItems, menuitensfornewmenuitem)

        window.onkeypress = undefined
    }
    saveMenu() {

        let hrefValidation, nameValidation
        const href = document.getElementById('href').value
        const icon = document.getElementById('icon').value
        const name = document.getElementById('name').value
        
        const superHrefElement = document.getElementById('superHref')
        const superHref = superHrefElement.value === 'Nenhum' ? '' : superHrefElement.value
        const isSuperItem = document.getElementById('isSuperItem').checked

        let valid = true

        if (href.trim() === '') {
            valid = false
            hrefValidation = 'Href do item de menu obrigatório!'
        }

        if (name.trim() === '') {
            valid = false
            nameValidation = 'Nome do item de menu obrigatório!'
        }

        if (valid) {
            requestToState(this, SetNewMenuItem, 'rgstr_menu_item', { href, icon, name, superHref, isSuperItem }, 'POST', true)
        } else {
            this.setState({ hrefValidation, nameValidation })
        }
    }

    componentWillUpdate() {

        const { responses } = this.state
        const { status } = responses['rgstr_menu_item'] !== undefined ? responses['rgstr_menu_item'] : { status: 0 }
        if (status > 0) {
            requestToReducer(this, GetAllHierarchicallyOrganizedMenuItems, menus)
            closeModal(this)
        }
    }

    render() {

        const { responses } = this.state

        const optnsMenuItens = (
            responses[menuitensfornewmenuitem] !== undefined ? responses[menuitensfornewmenuitem].data : []
        ).map(d => ({ value: d.href, text: d.name }))

        return (
            <div>
                <Modal.Body>
                    <div className="form-group">
                        <SysSelect id="superHref" label="Item de menu superior" firstOption="Nenhum" options={optnsMenuItens} />
                        <div className="form-inline">
                            <small className="h2 hidden-xs">&nbsp;&#10551;&nbsp;</small>
                            <SysInput id="href" label="Href" type="text" placeholder="Href do item de menu." textValidation={this.state.hrefValidation} /><small className="hidden-xs">&nbsp;</small>
                            <SysInput id="icon" label="Ícone" type="text" placeholder="Ícone do item de menu." textValidation={this.state.iconValidation} /><small className="hidden-xs">&nbsp;</small>
                            <SysInput id="name" label="Nome" type="text" placeholder="Nome do item de menu." textValidation={this.state.nameValidation} /><small className="hidden-xs">&nbsp;</small>
                            <SysCheck id="isSuperItem" text="Super" />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="btn-group">
                        <SysButton type="default" action={() => closeModal(this)} text='Cancelar' />
                        <SysButton type="primary" action={() => this.saveMenu()} text="Criar" />
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

export default connect(select)(MenuForm)