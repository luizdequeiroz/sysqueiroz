import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'
import { closeModal, requestToState, requestToReducer } from '../../../../data/dispatchers'
import { GetEmployeesWithDepartments, GetEmployee, SetNewEmployee, GetAllDepartments } from '../../../../data/alias/methods'
import { departments, employeesdepartmant, employee } from '../../../../data/alias/keys'
import { SysInput, SysSelect, SysButton } from '../../../components/syscomponents'
import { entrar } from '../../users/components/headerlogin'
import If, { Else } from '../../../components/if'

class EmployeeForm extends Component {

    constructor(props) {
        super(props)

        this.saveEmployee = this.saveEmployee.bind(this)
        this.alterEmployee = this.alterEmployee.bind(this)

        this.state = {
            responses: {},
            buttonSave: 'Cadastrar',
            actionEmployee: undefined,
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

            this.setState({ buttonSave: 'Alterar', actionEmployee: this.alterEmployee })
            requestToState(this, GetEmployee, employee, employeeId)
        } else {

            requestToState(this, GetAllDepartments, departments)
            this.setState({ actionEmployee: this.saveEmployee })
        }

        window.onkeypress = undefined
    }

    saveEmployee() {

        let departmentId = '', departmentName
        let nameValidation = '', departmentValidation = ''
        const name = document.getElementById('name').value

        let valid = true

        if (this.state.newDepartment) {
            departmentName = document.getElementById('departmentName').value
        } else {
            departmentId = document.getElementById('department').value
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
                name,
                departmentId: departmentId || 0,
                department: departmentId === '' ? { name: departmentName } : null
            }

            requestToState(this, SetNewEmployee, 'rgstr_employee', employee, 'POST', true)
        } else {
            this.setState({ nameValidation, departmentValidation })
        }
    }

    alterEmployee() {
        alert("Alterar funcionário!")
    }

    componentWillUpdate() {

        const { responses } = this.state
        const { status } = responses['rgstr_employee'] !== undefined ? responses['rgstr_employee'] : { status: 0 }
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
                                <SysInput id="departmentName" label="Setor" type="text" placeholder="Nome do setor." textValidation={this.state.departmentValidation} />
                                <div className="input-group-btn">
                                    <SysButton type="primary" text={<i className="fa fa-minus-circle" />} textHover="Existente" action={() => this.setState({ newDepartment: false })} size="sm" />
                                </div>&nbsp;
                            </div>
                            <SysInput defaultValue={e.name} id="name" label="Nome" type="text" placeholder="Nome do funcionário." textValidation={this.state.nameValidation} />
                            <Else childrenCountIsOne>
                                <div className="input-group">
                                    <SysSelect id="department" label="Setor" options={optnsDepa} textValidation={this.state.departmentValidation} />
                                    <div className="input-group-btn">
                                        <SysButton type="primary" text={<i className="fa fa-plus-circle" />} textHover="NOVO" action={() => this.setState({ newDepartment: true })} size="sm" />
                                    </div>
                                </div>
                                <SysInput defaultValue={e.name} id="name" label="Nome" type="text" placeholder="Nome do funcionário." textValidation={this.state.nameValidation} />
                            </Else>
                        </If>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="btn-group">
                        <button className="btn btn-default" onClick={() => closeModal(this)}>Cancelar</button>
                        <button className="btn btn-primary" onClick={() => this.state.actionEmployee()}>{this.state.buttonSave}</button>
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