import React, { Component } from 'react'

//#region SysInput
export class SysInput extends Component {

    render() {

        const { defaultValue, className, id, label, type, placeholder } = this.props
        const inputProps = { defaultValue, id, type, placeholder }

        return (
            <div className={`input-group ${className}`}>
                <label className="input-group-addon" htmlFor={id}>{label}</label>
                <input className="form-control" { ...inputProps } />
            </div>
        )
    }
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

    render() {

        const { className, id, label, options } = this.props

        return (
            <div className={`input-group ${className}`}>
                <label className="input-group-addon" htmlFor={id}>{label}</label>
                <select className="form-control" id={id} >
                    <option>Selecione</option>
                    {options.map(o => (
                        <option key={o.value} value={o.value}>{o.text}</option>
                    ))}
                </select>
            </div>
        )
    }
}
SysSelect.defaultProps = {
    options: []
}
//#endregion