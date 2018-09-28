import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'
import { closeModal, requestToState, requestToReducer } from '../../../../data/dispatchers'
import { GetAllHierarchicallyOrganizedMenuItems, GetMenuItem, GetAllMenuItemsWhereSuperItems, SetNewMenuItem } from '../../../../data/alias/methods'
import { menus, menuitem, menuItensForNewMenuItem } from '../../../../data/alias/keys'
import { SysInput, SysSelect, SysCheck, SysButton } from '../../../components/syscomponents'
import { entrar } from '../../users/components/headerlogin'

class MenuForm extends Component {

    constructor(props) {
        super(props)

        this.saveMenu = this.saveMenu.bind(this)
        this.alterMenu = this.alterMenu.bind(this)

        this.state = {
            responses: {},
            buttonSave: 'Criar',
            actionMenu: undefined,
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

    componentDidMount() {

        const { edit, menuId } = this.props
        if (edit) {

            this.setState({ buttonSave: 'Alterar', actionMenu: this.alterMenu })
            requestToState(this, GetMenuItem, menuitem, menuId)
        } else {

            requestToState(this, GetAllMenuItemsWhereSuperItems, menuItensForNewMenuItem)
            this.setState({ actionMenu: this.saveMenu })
        }

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

    alterMenu() {
        alert("Alterar item de menu!")
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
        const m = responses[menuitem] !== undefined ? responses[menuitem].data : {
            href: '',
            icon: '',
            name: '',
            superHref: '',
            isSuperItem: false
        }

        const optnsMenuItens = (
            responses[menuItensForNewMenuItem] !== undefined ? responses[menuItensForNewMenuItem].data : []
        ).map(d => ({ value: d.href, text: d.name }))

        return (
            <div>
                <Modal.Body>
                    <div className="form-group">
                        <SysSelect id="superHref" label="Item de menu superior" firstOption="Nenhum" options={optnsMenuItens} />
                        <div className="form-inline">
                            <small className="h2 hidden-xs">&nbsp;&#10551;&nbsp;</small>
                            <SysInput defaultValue={m.href} id="href" label="Href" type="text" placeholder="Href do item de menu." textValidation={this.state.hrefValidation} /><small className="hidden-xs">&nbsp;</small>
                            <SysInput defaultValue={m.icon} id="icon" label="Ícone" type="text" placeholder="Ícone do item de menu." textValidation={this.state.iconValidation} /><small className="hidden-xs">&nbsp;</small>
                            <SysInput defaultValue={m.name} id="name" label="Nome" type="text" placeholder="Nome do item de menu." textValidation={this.state.nameValidation} /><small className="hidden-xs">&nbsp;</small>
                            <SysCheck id="isSuperItem" defaultChecked={m.isSuperItem} text="Super" />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="btn-group">
                        <SysButton type="default" action={() => closeModal(this)} text='Cancelar' />
                        <SysButton type="primary" action={() => this.state.actionMenu()} text={this.state.buttonSave} />
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