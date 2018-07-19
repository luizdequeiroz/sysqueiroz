import { all } from 'redux-saga/effects'
import { watchGeneric } from './generic'

/**
 * Importa os observadores de actions
 */
export default function* rootSaga() {
    yield all([
        watchGeneric()
    ])
}
