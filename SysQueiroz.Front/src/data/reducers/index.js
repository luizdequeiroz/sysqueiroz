import { combineReducers } from 'redux'

import status from './status'
import responses from './responses'

/**
 * Importa os reducers
 */
const storeApp = combineReducers({
    status,
    responses
})

export default storeApp