import { takeEvery, put } from 'redux-saga/effects'
import { GENERIC_ACTION, HIDE_MODAL_ALERT, GENERIC_PROCCESS, GENERIC_FAILED } from '../actions'
import { API } from '../../Util'

export function* generic({ request, responseConfig }) {

    if (request.methodType === 'VAR') {
        yield put({ type: GENERIC_RETURN, data: request.param, config: responseConfig })
    } else if (request.methodType === 'ALERT') {
        yield put({ type: GENERIC_ALERT, msg: request.param, config: responseConfig })
    } else {
        try {
            yield put({ type: GENERIC_PROCCESS, msg: request.msgProcessing })
            let header = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: request.methodType
            }
            if (request.methodType === 'POST') {
                header = {
                    ...header,
                    body: JSON.stringify(request.param)
                }
            }
            
            const data = yield fetch(`${API}/${request.method}/${request.methodType === 'GET' ? request.param : ''}`, header)
            const jsonData = yield data.json()

            if (data.status < 200 || data.status >= 300) {
                throw new Error(JSON.stringify(jsonData))
            }

            yield put({
                type: request.returnAction,
                data: jsonData,
                config: responseConfig
            })
        } catch (error) {
            yield put({
                type: GENERIC_FAILED,
                msg: request.msgError,
                data: error
            })
        }
    }
}

export function* watchGeneric() {
    yield takeEvery(GENERIC_ACTION, generic)
}