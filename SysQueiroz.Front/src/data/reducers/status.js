import { GENERIC_FAILED, GENERIC_SUCCESS, HIDE_MODAL_ALERT, GENERIC_PROCCESS, GENERIC_ALERT } from '../alias/actions'

/**
 * Reducer que gerencia actions relacionadas a modal de status
 */
function status(state = [], action) {
    
    switch (action.type) {
        case GENERIC_SUCCESS:
            return success(state, action)
        case GENERIC_PROCCESS:
            return proccess(state, action)
        case GENERIC_FAILED:
            return failed(state, action)
        case GENERIC_ALERT:
            return alert(state, action)
        case HIDE_MODAL_ALERT:
            return hideModal(state, action)
        default:
            return state
    }
}

function success(state, action) {
    //return hideModal(state, action)

    return {
        icon: 'fa fa-check-circle fa-2x fa-fw',
        className: 'alert-success',
        message: (action.payload && action.payload.message) ?
            action.payload.message : action.msg,
        showModal: true,
        autohide: true
    }
}

function proccess(state, action) {
    // if (action.payload && action.payload.autohide) {
    //     window.setTimeout(hideModal, 3000)
    // }

    return {
        icon: 'fa fa-cog fa-2x fa-spin fa-fw',
        className: 'alert-info',
        message: (action.payload && action.payload.message) ?
            action.payload.message : action.msg,
        showModal: true,
        autohide: false
    }
}

function failed(state, action) {
    try {
        const jsonError = JSON.parse(action.payload.message)
        return {
            icon: 'fa fa-close fa-2x',
            className: 'alert-danger',
            message: (jsonError && jsonError.message) ?
                jsonError.message : action.msg,
            showModal: true,
            autohide: true
        };
    } catch (error) {
        let mensagem;
        if (action.payload && action.payload.message) {
            mensagem = (action.payload.message === 'Failed to fetch') ?
                'Falha na conexão' : action.payload.message;
        } else {
            mensagem = action.msg
        }

        return {
            icon: 'fa fa-close fa-2x',
            className: 'alert-danger',
            message: mensagem,
            showModal: true,
            autohide: true
        }
    }
}

function alert(state, action) {

    return {
        icon: 'fa fa-exclamation-triangle fa-2x',
        className: `alert-${action.data.type}`,
        message: action.data.msg,
        showModal: true,
        autohide: true
    }
}

function hideModal() {
    return {
        icon: '',
        className: '',
        message: '',
        showModal: false,
        autohide: true
    }
}

export default status
