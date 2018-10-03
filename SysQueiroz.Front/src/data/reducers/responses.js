import { GENERIC_RETURN } from "../alias/actions"

export default function responses(state = [], action) {

    switch (action.type) {
        case GENERIC_RETURN:
            return action.data
        default:
            return state
    }
}