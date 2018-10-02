import { combineReducers } from 'redux'

import status from './status'
import responses, { methods } from './responses'
import modal from './modal'
import messagepanel from './messagepanel'

/**
 * Importa os reducers
 */
const storeApp = combineReducers({
    status,
    responses,
    modal,
    messagepanel,
    methods
})

export default storeApp