import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'
import { closeModal, requestToState, requestToReducer } from '../../../../data/dispatchers'
import { GetAllMenusForListMenu, GetMenuItem, GetAllMenuItensForNewMenuItem, SetNewMenuItem } from '../../../../data/alias/methods'
import { menus, menuitem, menuItensForNewMenuItem } from '../../../../data/alias/keys'
import { SysInput, SysSelect } from '../../../components/syscomponents'
import { entrar } from '../../users/components/headerlogin'
import If, { Else } from '../../../components/if'

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
            superHrefValidation: '',
            newSuperMenu: false
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

            requestToState(this, GetAllMenuItensForNewMenuItem, menuItensForNewMenuItem)
            this.setState({ actionMenu: this.saveMenu })
        }

        window.onkeypress = undefined
    }

    saveMenu() {

        if (this.props.newSuperMenu) {

        } else {

            let hrefValidation, nameValidation
            const href = document.getElementById('href').value
            const icon = document.getElementById('icon').value
            const name = document.getElementById('name').value
            const superHref = document.getElementById('superHref').value

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
                requestToState(this, SetNewMenuItem, 'rgstr_menu_item', { href, icon, name, superHref }, 'POST', true)
            } else {
                this.setState({ hrefValidation, nameValidation })
            }
        }
    }

    alterMenu() {
        alert("Alterar item de menu!")
    }

    componentWillUpdate() {

        const { responses } = this.state
        const { status } = responses['rgstr_menu_item'] !== undefined ? responses['rgstr_menu_item'] : { status: 0 }
        if (status > 0) {
            requestToReducer(this, GetAllMenusForListMenu, menus)
            closeModal(this)
        }
    }

    render() {

        const { responses } = this.state
        const m = responses[menuitem] !== undefined ? responses[menuitem].data : {
            href: '',
            icon: '',
            name: '',
            superHref: ''
        }

        const optnsMenuItens = (
            responses[menuItensForNewMenuItem] !== undefined ? responses[menuItensForNewMenuItem].data : []
        ).map(d => ({ value: d.href, text: d.name }))

        return (
            <div>
                <Modal.Body>
                    <div className="form-group">
                        <If condition={this.state.newSuperMenu}>
                            <div className="form-inline">
                                <h4>É o gera!</h4>
                            </div>
                            <Else childrenCountIsOne>
                                <SysSelect id="superHref" label="Item de menu superior" firstOption="Nenhum" options={optnsMenuItens} />
                            </Else>
                        </If>
                    </div>
                    <div className="form-group">
                        <div className="form-inline">
                            <small className="h2 hidden-xs">&nbsp;&nbsp;&#10551;&nbsp;&nbsp;</small>
                            <SysInput defaultValue={m.href} id="href" label="Href" type="text" placeholder="Href do item de menu." textValidation={this.state.hrefValidation} /><small className="hidden-xs">&nbsp;</small>
                            <SysInput defaultValue={m.icon} id="icon" label="Ícone" type="text" placeholder="Ícone do item de menu." textValidation={this.state.iconValidation} /><small className="hidden-xs">&nbsp;</small>
                            <SysInput defaultValue={m.name} id="name" label="Nome" type="text" placeholder="Nome do item de menu." textValidation={this.state.nameValidation} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="btn-group">
                        <button className="btn btn-default" onClick={() => closeModal(this)}>Cancelar</button>
                        <button className="btn btn-primary" onClick={() => this.state.actionMenu()}>{this.state.buttonSave}</button>
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