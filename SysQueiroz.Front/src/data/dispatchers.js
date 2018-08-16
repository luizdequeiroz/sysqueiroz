import { GENERIC_PROCCESS, HIDE_MODAL_ALERT, GENERIC_FAILED, GENERIC_ALERT, GENERIC_RETURN } from './alias/actions'
import { API } from '../Util'
import { session } from './alias/keys'

/**
 * Função que armazena um valor em um reducer cuja key foi especificada.
 * @param {any} context contexto do componente (necessário para processamentos que interagem com o DOM).
 * @param {string} returnReduceKey key de reduce na qual deve ser aplicado o valor.
 * @param {any} value valor a ser aplicado na key especificada.
 */
export function setReducer(context, returnReduceKey, value) {
    const { props: { dispatch, responses } } = context
    
    responses[returnReduceKey] = value
    dispatch({ type: GENERIC_RETURN, data: { ...responses } })
}

/**
 * Função que limpa o reducer.
 * @param {any} context contexto do componente (necessário para processamentos que interagem com o DOM).
 */
export function clearReducer(context) {
    const { props: { dispatch } } = context

    dispatch({ type: GENERIC_RETURN, data: {} })
}

/**
 * Função que aciona um modal alert.
 * @param {any} context contexto do componente (necessário para processamentos que interagem com o DOM).
 * @param {string} msg mensagem que deve ser apresentada no alerta.
 * @param {string} type tipo do alerta.
 */
export function showAlert(context, msg, type) {

    const { props: { dispatch } } = context

    dispatch({ type: GENERIC_ALERT, data: { msg, type } })
}

/**
 * Função de consumo de API que trás retorno para o state do componente.
 * @param {any} context contexto do componente (necessário para processamentos que interagem com o DOM).
 * @param {string} method assinatura do método da API que será concatenado com a url da API definida (sugestão: use alias).
 * @param {string} returnStateKey key de state na qual deve ser aplicado o retorno da solicitação da API.
 * @param {any} param parâmetros da requisição.
 * @param {string} methodType tipo de método de requisição (GET ou POST).
 * @param {string} withProgress indica se a solicitação acionará um modal de carregamento enquanto a mesma é processada. 
 * @param {string} msgError mensagem a ser exibida em caso de erro na solicitação à API.
 * @param {string} msgProcessing mensagem a ser exibida enquanto a solicitação à API é processada.
 */
export function requestToState(context, method, returnStateKey, param = '', methodType = 'GET', withProgress = true/*, msgError = 'Erro na solicitação.'*/, msgProcessing = 'Processando, aguarde.') {
    const { props: { dispatch }, state: { responses } } = context

    var xhr = new XMLHttpRequest()
    xhr.open(methodType, `${API}/${method}/${methodType === 'GET' ? param : ''}`, true)
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.getItem(session) !== null ? JSON.parse(sessionStorage.getItem(session)).token : ''}`)
    if (withProgress) {
        xhr.onloadstart = () => {
            dispatch({ type: GENERIC_PROCCESS, msg: msgProcessing })
        }
    }
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText)
            if (response.status < 0) {
                dispatch({ type: GENERIC_FAILED, msg: response.data })

                responses[returnStateKey] = undefined
                context.setState({ responses })
            } else {
                responses[returnStateKey] = response.token === null ? response : JSON.stringify(response)
                context.setState({ responses })

                dispatch({ type: HIDE_MODAL_ALERT })
            }
        } else if (xhr.status === 401) {
            
            if(window.location.hash === '#/'){
                sessionStorage.clear()
                clearReducer(context)
            }
            window.location.hash = '#'
            dispatch({ type: GENERIC_FAILED, msg: 'Usuário não está em uma sessão válida ou não tem permissão para a solicitação!' })
        }
    }
    xhr.onerror = () => {
        //dispatch({ type: GENERIC_FAILED, msg: msgError })

        responses[returnStateKey] = undefined
        context.setState({ responses })
    }
    xhr.onloadend = () => {
        window.setTimeout(() => dispatch({ type: HIDE_MODAL_ALERT }), 3000)
    }

    if (methodType === 'POST') xhr.send(JSON.stringify(param))
    else xhr.send()
}

/**
 * Função de consumo de API que trás retorno para o reducer.
 * @param {any} context contexto do componente (necessário para processamentos que interagem com o DOM).
 * @param {string} method assinatura do método da API que será concatenado com a url da API definida (sugestão: use alias).
 * @param {string} returnReduceKey key de reduce na qual deve ser aplicado o retorno da solicitação da API.
 * @param {any} param parâmetros da requisição.
 * @param {string} methodType tipo de método de requisição (GET ou POST).
 * @param {string} withProgress indica se a solicitação acionará um modal de carregamento enquanto a mesma é processada. 
 * @param {string} msgError mensagem a ser exibida em caso de erro na solicitação à API.
 * @param {string} msgProcessing mensagem a ser exibida enquanto a solicitação à API é processada.
 */
export function requestToReducer(context, method, returnReduceKey, param = '', methodType = 'GET', withProgress = true/*, msgError = 'Erro na solicitação.'*/, msgProcessing = 'Processando, aguarde.') {
    const { props: { dispatch, responses } } = context

    var xhr = new XMLHttpRequest()
    xhr.open(methodType, `${API}/${method}/${methodType === 'GET' ? param : ''}`, true)
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.getItem(session) !== null ? JSON.parse(sessionStorage.getItem(session)).token : ''}`)
    if (withProgress) {
        xhr.onloadstart = () => {
            dispatch({ type: GENERIC_PROCCESS, msg: msgProcessing })
        }
    }
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText)
            if (response.status < 0) {
                
                dispatch({ type: GENERIC_FAILED, msg: response.data })

                responses[returnReduceKey] = undefined
                dispatch({ type: GENERIC_RETURN, data: { ...responses } })
            } else {
                
                responses[returnReduceKey] = response.token === null ? response : JSON.stringify(response)
                dispatch({ type: GENERIC_RETURN, data: { ...responses } })

                dispatch({ type: HIDE_MODAL_ALERT })
            }
        } else if (xhr.status === 401) {
            
            if(window.location.hash === '#/'){
                sessionStorage.clear()
                clearReducer(context)
            }
            window.location.hash = '#'
            dispatch({ type: GENERIC_FAILED, msg: 'Sessão inválida ou usuário não tem permissão!' })
        }
    }
    xhr.onerror = () => {
        //dispatch({ type: GENERIC_FAILED, msg: msgError })

        responses[returnReduceKey] = undefined
        dispatch({ type: GENERIC_RETURN, data: { ...responses } })
    }
    xhr.onloadend = () => {
        window.setTimeout(() => dispatch({ type: HIDE_MODAL_ALERT }), 3000)
    }

    if (methodType === 'POST') xhr.send(JSON.stringify(param))
    else xhr.send()
}

/**
 * Função síncrona de consumo de API (trás resposta da solicitação no retorno do método).
 * @param {string} method assinatura do método da API que será concatenado com a url da API definida (sugestão: use alias).
 * @param {any} param parâmetros da requisição.
 * @param {string} methodType tipo de método de requisição (GET ou POST).
 * @param {string} msgError mensagem a ser exibida em caso de erro na solicitação à API.
 * @param {string} msgProcessing mensagem a ser exibida enquanto a solicitação à API é processada.
 */
export function requestSync(method, param = '', methodType = 'GET', msgError = 'Erro na solicitação.') {

    try {

        var xhr = new XMLHttpRequest()
        xhr.open(methodType, `${API}/${method}/${methodType === 'GET' ? param : ''}`, false)
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.getItem(session) !== null ? JSON.parse(sessionStorage.getItem(session)).token : ''}`)
        if (methodType === 'POST') xhr.send(JSON.stringify(param))
        else xhr.send()

        if (xhr.status < 200 || xhr.status >= 300) {
            throw new Error(JSON.stringify(xhr))
        } else if (xhr.readyState === 4) {
            const response = JSON.parse(xhr.responseText)
            if (response.status < 0) {
                return {
                    code: response.status,
                    message: response.data,
                    stack: response.stackTrace,
                    type: 'warning'
                }
            } else {
                return {
                    code: 0,
                    data: response.token === null ? response : JSON.stringify(response),
                    type: 'success'
                }
            }
        }
    } catch (error) {
        return {
            code: error.code,
            message: msgError,
            stack: error.message,
            type: 'danger'
        }
    }
}