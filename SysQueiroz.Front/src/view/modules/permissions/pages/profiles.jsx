import React, { Component } from 'react'
import { connect } from 'react-redux'

import BootstrapTable from 'react-bootstrap-table-next'

import { requestToOther } from '../../../../data/dispatchers'
import { GetAllProfiles } from '../../../../data/alias/methods'
import { profiles } from '../../../../data/alias/keys'

class Profiles extends Component {

    componentWillMount() {

        requestToOther(this, GetAllProfiles, profiles)
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

        return (
            <fieldset>
                <legend>Lista de Perfis de Usuário</legend>
                <div className="pull-right">
                    <button className="btn btn-primary">NOVO</button>
                </div>
                <BootstrapTable keyField='id' data={prfls} columns={cols} noDataIndication="Não há perfis!" />
            </fieldset>
        )
    }
}

function select(state) {

    return {
        responses: state.reducers.responses
    }
}

export default connect(select)(Profiles)