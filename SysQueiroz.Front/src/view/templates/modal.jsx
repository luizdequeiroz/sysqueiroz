import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { closeModal } from '../../data/dispatchers';

class SysModal extends Component {

    render() {
        
        return (
            <Modal bsSize="lg" show={this.props.show} onHide={() => closeModal(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                {this.props.content}
                {/* <Modal.Body>{this.props.body}</Modal.Body>
                <Modal.Footer>{this.props.footer}</Modal.Footer> */}
            </Modal>
        )
    }
}

function select(state) {

    return {
        show: state.reducers.modal.show,
        title: state.reducers.modal.title,
        content: state.reducers.modal.content
    }
}

export default connect(select)(SysModal)