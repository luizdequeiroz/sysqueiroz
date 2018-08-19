import { SHOW_MODAL, CLOSE_MODAL } from "../alias/actions";

export default function modal(state = [], action) {

    switch (action.type) {
        case SHOW_MODAL:
            return {
                show: true,
                ...action.config
            }
        case CLOSE_MODAL:
            return {
                show: false
            }
        default:
            return state
    }
}