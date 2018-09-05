import { GENERIC_SUCCESS, HIDE_PANEL_ALERT, GENERIC_PANEL } from "../alias/actions";

function messagepanel(state = [], action) {

    switch(action.type){
        case GENERIC_SUCCESS:
            return success(state, action)
        case GENERIC_PANEL:
            return panel(state, action)
        case HIDE_PANEL_ALERT:
            return hidePanel(state, action)
        default:
            return state
    }
}

function success(state, action) {

    return {
        icon: 'fa fa-check-circle fa-2x fa-fw',
        className: 'alert-success',
        message: (action.payload && action.payload.message) ?
            action.payload.message : action.msg,
        showPanel: true,
        autohide: true
    }
}

function panel(state, action) {

    const icon = action.data.type === 'success' ? 'check-circle' :
                 action.data.type === 'info' ? 'info-circle' :
                 action.data.type === 'warning' ? 'exclamation-circle' :
                 action.data.type === 'danger' ? 'times-circle' : 'info-circle'

    return {
        icon: `fa fa-${icon} fa-2x fa-fw`,
        className: `alert-${action.data.type}`,
        message: action.data.msg,
        showPanel: true,
        autohide: action.data.autohide
    }
}

function hidePanel(state, action) {

    return {
        icon: '',
        className: '',
        message: '',
        showPanel: false,
        autohide: true
    }
}

export default messagepanel