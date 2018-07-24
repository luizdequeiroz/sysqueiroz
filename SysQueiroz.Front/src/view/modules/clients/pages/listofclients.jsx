import React, { Component } from 'react'
import { connect } from 'react-redux'

import BootstrapTable from 'react-bootstrap-table-next'
import { clients } from '../../../../data/alias/keys';
import { requestToOther } from '../../../../data/dispatchers';
import { GetAllClients } from '../../../../data/alias/methods';

class ListOfClients extends Component {

    componentWillMount() {

        requestToOther(this, GetAllClients, clients)
    }

    render() {

        const cols = [
            {
                dataField: 'name',
                text: 'Nome'
            }, {
                dataField: 'cpf',
                text: 'CPF'
            }, {
                dataField: 'phone',
                text: 'Telefone'
            }, {
                dataField: 'bank',
                text: 'Banco'
            }
        ]

        let clnts
        if (this.props.responses[clients] !== undefined)
            clnts = this.props.responses[clients].data
        else clnts = []

        return (
            <fieldset>
                <legend>Lista de Clientes</legend>
                <div className="pull-right">
                    <div className="btn-group">
                        <button className="btn btn-primary">NOVO</button>
                    </div>
                </div>
                <BootstrapTable keyField='cpf' data={clnts} columns={cols} noDataIndication="Não há clientes!" />
            </fieldset>
        )
    }
}

function select(state) {

    return {
        responses: state.reducers.responses
    }
}

export default connect(select)(ListOfClients)