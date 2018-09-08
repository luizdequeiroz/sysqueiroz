import React, { Component } from 'react'

export default class If extends Component {

    render() {

        const { children, condition } = this.props

        const lastIndex = children.length - 1
        const ifElse = children[lastIndex].type.name === 'Else'
        const contentIf = ifElse ? children.filter(c => c.type.name !== 'Else') : children
        const contentElse = ifElse ? children[lastIndex].props.children : false

        if (condition) {
            return <div>{contentIf}</div>
        } else {
            return <div>{contentElse}</div>
        }
    }
}

export class Else extends Component {    
    render = () => <div>{this.props.children}</div>
}

// export default props => {
//     if (props.condition) {
//         return <div>{props.children}</div>
//     } else {
//         return false
//     }
// }