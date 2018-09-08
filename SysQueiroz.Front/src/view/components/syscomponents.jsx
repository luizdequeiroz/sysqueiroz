import React, { Component } from 'react'

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

        const { type, action } = this.props
        const { originalText, text, textHover } = this.state

        return <button
            className={`btn btn-${type}`}
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
    action: undefined
}