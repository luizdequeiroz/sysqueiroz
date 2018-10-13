import React, { Component } from 'react'
import If from './if'
import { connect } from 'react-redux'
import { requestToReducer } from '../../data/dispatchers'
import { session, accesstocomponent } from '../../data/alias/keys'
import { UserHasAccessToComponent } from '../../data/alias/methods'

function select(state) {

    return {
        responses: state.reducers.responses
    }
}

//#region SysComponent
class SysComponent extends Component {

    accessible = false

    componentWillMount() {

        const { Parent, Name, responses } = this.props
        const sessionId = responses[session] !== undefined ? JSON.parse(responses[session]).data : 0

        requestToReducer(this, UserHasAccessToComponent, accesstocomponent, { sessionId, Parent, Name }, 'POST', false)
    }

    componentDidMount() {

        const { responses } = this.props

        this.accessible = responses[accesstocomponent] !== undefined ? responses[accesstocomponent].data : true
    }
}
//#endregion

//#region SysInput
export class SysInput extends Component {

    constructor(props) {
        super(props)

        this.state = {
            inputStyleError: {
                border: 'solid 1px red',
                borderRadius: '4px'
            }
        }

        this.validate = this.validate.bind(this)
    }

    validate({ target }) {

        if (target.value !== '') this.setState({ inputStyleError: undefined })
        else this.setState({
            inputStyleError: {
                border: 'solid 1px red',
                borderRadius: '4px'
            }
        })
    }

    render() {

        const { inputStyleError } = this.state
        const { defaultValue, className, id, label, type, placeholder, textValidation } = this.props
        const inputProps = { defaultValue, id, type, placeholder }
        const validationError = textValidation !== ''

        const divInputProps = {
            className: `input-group ${className}`
        }

        divInputProps.style = validationError ? inputStyleError : undefined

        return (
            <div className="form-group">
                <If condition={validationError}>
                    <div className="h6 text-danger" style={{ marginTop: '-13px', marginBottom: '0px' }}>{textValidation}</div>
                </If>
                <div {...divInputProps}>
                    <label className="input-group-addon" htmlFor={id}>{label}</label>
                    <input className="form-control" {...inputProps} onKeyUp={this.validate} />
                </div>
            </div>
        )
    }
}
SysInput.defaultProps = {
    textValidation: ''
}
//#endregion

//#region SysButton
class sysbutton extends SysComponent {

    constructor(props) {
        super(props)

        this.state = {
            originalText: props.text,
            text: props.text,
            textHover: props.textHover || props.text
        }
    }

    render() {

        const { submit, type, size, className, action, href } = this.props
        const { originalText, text, textHover } = this.state

        const props = { href }
        if (submit) props.type = "submit"

        if (this.accessible) {

            return <button
                className={`btn btn-${type} btn-${size} ${className}`}
                onMouseOver={() => {
                    this.setState({ text: textHover })
                }}
                onMouseLeave={() => {
                    this.setState({ text: originalText })
                }}
                onClick={action}
                {...props}
            >{text}</button>
        } else {
            return <button
                className={`btn btn-${type} btn-${size} ${className}`}
                disabled
            >{text}</button>
        }
    }
}

sysbutton.defaultProps = {
    submit: false,
    type: 'default',
    size: 'md',
    className: '',
    text: 'click here',
    textHover: undefined,
    action: undefined,
    href: undefined
}

export const SysButton = connect(select)(sysbutton)
//#endregion

//#region SysSelect
class sysselect extends SysComponent {

    constructor(props) {
        super(props)

        this.state = {
            inputStyleError: {
                border: 'solid 1px red',
                borderRadius: '4px'
            }
        }

        this.validate = this.validate.bind(this)
    }

    validate({ target }) {

        if (target.value !== this.props.firstOption) this.setState({ inputStyleError: undefined })
        else this.setState({
            inputStyleError: {
                border: 'solid 1px red',
                borderRadius: '4px'
            }
        })
    }

    render() {

        const { inputStyleError } = this.state
        const { className, id, label, options, textValidation, firstOption, children, defaultValue } = this.props
        const validationError = textValidation !== ''

        const divInputProps = {
            className: `input-group ${className}`
        }

        divInputProps.style = validationError ? inputStyleError : undefined

        if (this.accessible) {

            return (
                <div className="form-group">
                    <If condition={textValidation !== ''}>
                        <div className="h6 text-danger" style={{ marginTop: '-13px', marginBottom: '0px' }}>{textValidation}</div>
                    </If>
                    <div {...divInputProps}>
                        <label className="input-group-addon" htmlFor={id}>{label}</label>
                        <select className="form-control" id={id} onChange={this.validate}>
                            <option>{firstOption}</option>
                            {children === undefined ? options.map(o => (
                                <option key={o.value} value={o.value} selected={defaultValue === o.value}>{o.text}</option>
                            )) : children}
                        </select>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="form-group">
                    <div {...divInputProps}>
                        <label className="input-group-addon">{label}</label>
                        <select className="form-control" disabled>
                            <option>{firstOption}</option>
                        </select>
                    </div>
                </div>
            )
        }
    }
}

sysselect.defaultProps = {
    options: [],
    textValidation: '',
    firstOption: 'Selecione'
}

export const SysSelect = connect(select)(sysselect)
//#endregion

//#region SysCheck
export class syscheck extends SysComponent {

    render() {

        const { id, defaultChecked, text } = this.props
        const inputProps = { id, defaultChecked }

        if (this.accessible) {

            return (
                <div className="form-group">
                    <label className="sys-checkbox">
                        <input type="checkbox" {...inputProps} />
                        <small className="checkmark h5 form-control">{text}</small>
                    </label>
                </div>
            )
        } else {

            inputProps.id = undefined
            return (
                <div className="form-group">
                    <label className="sys-checkbox">
                        <input type="checkbox" {...inputProps} disabled/>
                        <small className="checkmark h5 form-control">{text}</small>
                    </label>
                </div>
            )
        }
    }
}

export const SysCheck = connect(select)(syscheck)
//#endregion

