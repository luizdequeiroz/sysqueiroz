import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { closeModal } from '../../data/dispatchers'

class SysModal extends Component {

    render() {

        const { show, title, content, closeButton, size } = this.props
        const headProps = { closeButton }

        return (
            <Modal bsSize={size} show={show} onHide={() => closeModal(this)} backdrop="static">
                <Modal.Header {...headProps}>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                {content}
            </Modal>
        )
    }
}

function select(state) {

    return {
        show: state.reducers.modal.show,
        title: state.reducers.modal.title,
        content: state.reducers.modal.content,
        closeButton: state.reducers.modal.closeButton,
        size: state.reducers.modal.size
    }
}

export default connect(select)(SysModal)