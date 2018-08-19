import { combineReducers } from 'redux'

import status from './status'
import responses from './responses'
import modal from './modal'

/**
 * Importa os reducers
 */
const storeApp = combineReducers({
    status,
    responses,
    modal
})

export default storeApp