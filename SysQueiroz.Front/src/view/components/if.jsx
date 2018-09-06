import React, { Component } from 'react'

// export default class If extends Component {

//     render() {
// debugger
//         const { children, condition } = this.props

//         const lastIndex = children.length - 1
//         const ifElse = children[lastIndex]._self.constructor.name === 'Else'
//         const contentIf = ifElse ? children.splice(lastIndex, 1) : children
//         const contentElse = ifElse ? children[lastIndex] : false

//         if (condition) {
//             return <div>{contentIf}</div>
//         } else {
//             return <div>{contentElse.children}</div>
//         }
//     }
// }

// export class Else extends Component {    
//     render = () => <div>{this.props.children}</div>
// }

export default props => {
    if (props.condition) {
        return <div>{props.children}</div>
    } else {
        return false
    }
}