import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestToReducer, closeModal, requestToState } from '../../../../data/dispatchers'
import { profiles, profilesidfrommenu } from '../../../../data/alias/keys'
import Modal from 'react-bootstrap/lib/Modal'

import BootstrapTable from 'react-bootstrap-table-next'
import { GetProfilesIdByMenu, GetAllProfiles, AssignMenuItem } from '../../../../data/alias/methods'

class AssignMenu extends Component {

    constructor(props) {
        super(props)

        this.state = {
            responses: {}
        }

        this.onSelect = this.onSelect.bind(this)
        this.onSelectAll = this.onSelectAll.bind(this)
        this.assignMenu = this.assignMenu.bind(this)
    }

    componentDidMount() {

        requestToReducer(this, GetAllProfiles, profiles)
        requestToState(this, GetProfilesIdByMenu, profilesidfrommenu, this.props.menuId)
    }

    onSelect(row, isSelect) {

        if (isSelect)
            this.setState({ responses: { profilesidfrommenu: { data: [...this.state.responses[profilesidfrommenu].data, row.id] } } })
        else this.setState({ responses: { profilesidfrommenu: { data: this.state.responses[profilesidfrommenu].data.filter(id => id !== row.id) } } })
    }

    onSelectAll(isSelect, rows) {

        if (isSelect)
            this.setState({ responses: { profilesidfrommenu: { data: rows.map(r => r.id) } } })
        else this.setState({ responses: { profilesidfrommenu: { data: [] } } })
    }

    assignMenu() {

        requestToReducer(this, AssignMenuItem, 'ssgn_menu', { menuId: this.props.menuId, all: this.props.responses[profiles].data.map(u => u.id), selecteds: this.state.responses[profilesidfrommenu].data }, 'POST', true, "Atribuindo menus aos perfis selecionados...")
        closeModal(this);
    }

    render() {

        const cols = [
            {
                dataField: 'name',
                text: 'Nome do Perfil'
            }, {
                dataField: 'description',
                text: 'Descrição'
            }
        ]
        let prfls
        if (this.props.responses[profiles] !== undefined)
            prfls = this.props.responses[profiles].data
        else prfls = []

        let selecteds
        if (this.state.responses[profilesidfrommenu] !== undefined)
            selecteds = this.state.responses[profilesidfrommenu].data
        else selecteds = []

        return (
            <div>
                <Modal.Body>
                    <fieldset>
                        <legend>Lista de Perfis de Usuário <i>(selecione os perfis para atribuir o acesso ao menu)</i></legend>
                        <BootstrapTable
                            keyField='id'
                            data={prfls}
                            columns={cols}
                            noDataIndication="Não há perfis!"
                            selectRow={{
                                mode: 'checkbox',
                                clickToSelect: true,
                                bgColor: '#00BFFF',
                                selected: selecteds,
                                onSelect: this.onSelect,
                                onSelectAll: this.onSelectAll
                            }} />
                    </fieldset>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <button className="btn btn-default" onClick={() => closeModal(this)}>Cancelar</button>
                        <button className="btn btn-primary" onClick={() => this.assignMenu()}>Salvar</button>
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

export default connect(select)(AssignMenu)