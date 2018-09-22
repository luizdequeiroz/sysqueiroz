import React, { Component } from 'react'

export default class If extends Component {

    render() {

        const { children, condition, childrenCountIsOne } = this.props

        let lastIndex, child
        if (children.length !== undefined)
            lastIndex = children.length - 1
        else child = children
        const ifElse = child !== undefined ? false : children[lastIndex].props.elementName === 'Else'
        const contentIf = ifElse ? children.filter(c => c.props.elementName !== 'Else') : children
        const contentElse = ifElse ? children[lastIndex].props.children : false

        if (condition) {
            return childrenCountIsOne ? contentIf : <div>{contentIf}</div>
        } else {
            return contentElse
        }
    }
}

If.defaultProps = {
    children: <i>Sem elementos na condição!</i>,
    childrenCountIsOne: false
}

export class Else extends Component {    
    render = () => this.props.childrenCountIsOne ? this.props.children : <div>{this.props.children}</div>
}

Else.defaultProps = {
    children: <i>Sem elementos na condição!</i>,
    childrenCountIsOne: false,
    elementName: 'Else'
}

// export default props => {
//     if (props.condition) {
//         return <div>{props.children}</div>
//     } else {
//         return false
//     }
// }