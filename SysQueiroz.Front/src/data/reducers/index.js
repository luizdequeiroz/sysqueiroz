import { combineReducers } from 'redux'

import status from './status'
import responses from './responses'
import modal from './modal'
import messagepanel from './messagepanel'

/**
 * Importa os reducers
 */
const storeApp = combineReducers({
    status,
    responses,
    modal,
    messagepanel
})

export default storeApp