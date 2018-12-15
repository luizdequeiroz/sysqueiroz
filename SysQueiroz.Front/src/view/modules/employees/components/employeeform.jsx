import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'
import { closeModal, requestToState, requestToReducer } from '../../../../data/dispatchers'
import { departments, employeesdepartmant, employee } from '../../../../data/alias/keys'
import { SysInput, SysSelect, SysButton } from '../../../components/syscomponents'
import { entrar } from '../../users/components/headerlogin'
import If, { Else } from '../../../components/if'
import { GetEmployee, GetAllDepartments, UpdateEmployee, SetNewEmployee, GetEmployeesWithDepartments } from '../../../../data/alias/methods'

class EmployeeForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            responses: {},
            nameValidation: '',
            departmentValidation: '',
            newDepartment: false
        }
    }

    componentWillUnmount = () => window.onkeypress = (e) => {
        if (e.keyCode === 13) {
            entrar()
        }
    }

    componentDidMount() {

        const { edit, employeeId } = this.props
        if (edit) {

            requestToState(this, GetEmployee, employee, employeeId)
        }

        requestToState(this, GetAllDepartments, departments)

        window.onkeypress = undefined
    }

    saveEmployee() {

        const { edit, employeeId } = this.props

        let departmentId = '', departmentName
        let nameValidation = '', departmentValidation = ''
        const name = this.refs.name.refs.input.value

        let valid = true

        if (this.state.newDepartment) {
            departmentName = this.refs.departmentName.refs.input.value
        } else {
            departmentId = this.refs.department.refs.input.value
        }

        if ((departmentId.trim() === '' && departmentName.trim() === '') || departmentId.trim() === 'Selecione') {
            valid = false
            departmentValidation = 'Setor obrigatório!'
        }

        if (name.trim() === '') {
            valid = false
            nameValidation = 'Nome do funcionário obrigatório!'
        }

        if (valid) {

            const employee = {
                id: employeeId || 0,
                name,
                departmentId: departmentId || 0,
                department: departmentId === '' ? { name: departmentName } : null
            }

            if (edit) {
                requestToState(this, UpdateEmployee, 'pdt_employee', employee, 'POST', true)
            } else {
                requestToState(this, SetNewEmployee, 'rgstr_employee', employee, 'POST', true)
            }
        } else {
            this.setState({ nameValidation, departmentValidation })
        }
    }

    componentWillUpdate() {

        const { responses } = this.state
        const { status } = responses['rgstr_employee'] !== undefined ? responses['rgstr_employee'] : responses['pdt_employee'] !== undefined ? responses['pdt_employee'] : { status: 0 }
        if (status > 0) {
            requestToReducer(this, GetEmployeesWithDepartments, employeesdepartmant)
            closeModal(this)
        }
    }

    render() {

        const { responses } = this.state
        const e = responses[employee] !== undefined ? responses[employee].data : {
            name: ''
        }

        const optnsDepa = (
            responses[departments] !== undefined ? responses[departments].data : []
        ).map(d => ({ value: d.id, text: d.name }))

        return (
            <div>
                <Modal.Body>
                    <div className="form-inline">
                        <If condition={this.state.newDepartment}>
                            <div className="input-group">
                                <SysInput ref="departmentName" label="Setor" type="text" placeholder="Nome do setor." textValidation={this.state.departmentValidation} />
                                <div className="input-group-btn">
                                    <SysButton type="primary" text={<i className="fa fa-minus-circle" />} textHover="Existente" action={() => this.setState({ newDepartment: false })} size="sm" />
                                </div>&nbsp;
                            </div>
                            <SysInput defaultValue={e.name} ref="name" label="Nome" type="text" placeholder="Nome do funcionário." textValidation={this.state.nameValidation} />
                            <Else childrenCountIsOne>
                                <div className="input-group">
                                    <SysSelect defaultValue={e.departmentId} ref="department" label="Setor" options={optnsDepa} textValidation={this.state.departmentValidation} />
                                    <div className="input-group-btn">
                                        <SysButton type="primary" text={<i className="fa fa-plus-circle" />} textHover="NOVO" action={() => this.setState({ newDepartment: true })} size="sm" />
                                    </div>
                                </div>
                                <SysInput defaultValue={e.name} ref="name" label="Nome" type="text" placeholder="Nome do funcionário." textValidation={this.state.nameValidation} />
                            </Else>
                        </If>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="btn-group">
                        <SysButton type="default" text="Cancelar" action={() => closeModal(this)} />
                        <SysButton type="primary" text={this.props.edit ? 'Alterar' : 'Cadastrar'} action={this.saveEmployee.bind(this)} />
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

export default connect(select)(EmployeeForm)