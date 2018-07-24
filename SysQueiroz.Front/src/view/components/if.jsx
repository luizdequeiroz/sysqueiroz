export default props => {
    if (props.condition) {
        return <div>{props.children}</div>
    } else {
        return false
    }
}