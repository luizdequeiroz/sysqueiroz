import React, { Component } from 'react'
import { connect } from 'react-redux'

import BootstrapTable from 'react-bootstrap-table-next'
import { clients } from '../../../../data/alias/keys'
import { requestToReducer } from '../../../../data/dispatchers'
import { GetAllClients } from '../../../../data/alias/methods'

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'

import { SysButton } from '../../../components/syscomponents'

class ListOfClients extends Component {

    componentDidMount() {

        requestToReducer(this, GetAllClients, clients)
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

        const { SearchBar } = Search
        return (
            <fieldset>
                <legend>Lista de Clientes</legend>
                <ToolkitProvider keyField='cpf' data={clnts} columns={cols} search>
                    {
                        props => (
                            <div>
                                <div class="input-group">
                                    <SearchBar {...props.searchProps} placeholder="Buscar cliente..." />
                                    <span class="input-group-btn">                                    
                                        <SysButton type="primary" text={<i className="fa fa-plus-circle" />} textHover="NOVO" action={() => alert("Novo cliente!")} />
                                    </span>
                                </div>
                                <hr />
                                <BootstrapTable {...props.baseProps} noDataIndication="Não há clientes!" />
                            </div>
                        )
                    }
                </ToolkitProvider>
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