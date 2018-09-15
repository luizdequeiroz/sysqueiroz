import React, { Component } from 'react'
import If from './if';

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
export class SysButton extends Component {

    constructor(props) {
        super(props)

        this.state = {
            originalText: props.text,
            text: props.text,
            textHover: props.textHover || props.text
        }
    }

    render() {

        const { type, size, className, action } = this.props
        const { originalText, text, textHover } = this.state

        return <button
            className={`btn btn-${type} btn-${size} ${className}`}
            onMouseOver={() => {
                this.setState({ text: textHover })
            }}
            onMouseLeave={() => {
                this.setState({ text: originalText })
            }}
            onClick={action}
        >{text}</button>
    }
}

SysButton.defaultProps = {
    type: 'default',
    text: 'click here',
    textHover: undefined,
    action: undefined,
    size: 'md'
}
//#endregion

//#region SysSelect
export class SysSelect extends Component {

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
        const { className, id, label, options, textValidation, firstOption } = this.props
        const validationError = textValidation !== ''

        const divInputProps = {
            className: `input-group ${className}`
        }

        divInputProps.style = validationError ? inputStyleError : undefined

        return (
            <div className="form-group">
                <If condition={textValidation !== ''}>
                    <div className="h6 text-danger" style={{ marginTop: '-13px', marginBottom: '0px' }}>{textValidation}</div>
                </If>
                <div {...divInputProps}>
                    <label className="input-group-addon" htmlFor={id}>{label}</label>
                    <select className="form-control" id={id} onChange={this.validate}>
                        <option>{firstOption}</option>
                        {options.map(o => (
                            <option key={o.value} value={o.value}>{o.text}</option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }
}
SysSelect.defaultProps = {
    options: [],
    textValidation: '',
    firstOption: 'Selecione'
}
//#endregion

//#region SysCheck
export class SysCheck extends Component {

    render() {

        const { id, defaultChecked, text } = this.props
        const inputProps = { id, defaultChecked }

        return (
            <div className="form-group">
                <label className="sys-checkbox">
                    <input type="checkbox" { ...inputProps } />
                    <small className="checkmark h5 form-control">{text}</small>
                </label>
            </div>
        )
    }
}
//#endregion

