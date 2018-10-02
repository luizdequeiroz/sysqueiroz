import { GENERIC_RETURN, METHODS } from "../alias/actions"

export default function responses(state = [], action) {

    switch (action.type) {
        case GENERIC_RETURN:
            return action.data
        default:
            return state
    }
}

export function methods(state = [], action) {

    switch (action.type) {
        case METHODS:
            return action.data
        default:
            return state
    }
}