import { GENERIC_PROCCESS, HIDE_MODAL_ALERT, GENERIC_FAILED, GENERIC_ALERT, GENERIC_RETURN, SHOW_MODAL, CLOSE_MODAL, GENERIC_SUCCESS, GENERIC_PANEL } from './alias/actions'
import { API } from '../Util'
import { session } from './alias/keys'

import { getRequestKey, fetchDedupe } from 'fetch-dedupe'

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
 * Função que aciona um painel de mensagem.
 * @param {any} context contexto do componente (necessário para processamentos que interagem com o DOM).
 * @param {string} msg mensagem que deve ser apresentada no painel.
 * @param {string} type tipo do painel.
 * @param {bool} autohide indicador se o painel será ocultado automaticamente ou não.
 */
export function showMsgPanel(context, msg, type, autohide = false) {

    const { props: { dispatch } } = context

    dispatch({ type: GENERIC_PANEL, data: { msg, type, autohide } })
}

/**
 * Função que configura e aciona o modal do sistema (modal único do sistema, se desejar criar outros modais em simultânio com este, implementar manualmente).
 * @param {any} context contexto do componente (necessário para processamentos que interagem com o DOM).
 * @param {any} title conteúdo que configurará o título do modal.
 * @param {any} content conteúdo que configurará o corpo e o rodapé (se houver) do modal.
 * @param {any} closeButton indicador se o modal terá botão de fechamento.
 * @param {any} size valor que configurará o tamanho do modal (lg, md, sm).
 */
export function showModal(context, title, content, closeButton = true, size = 'lg') {

    const { props: { dispatch } } = context

    dispatch({ type: SHOW_MODAL, config: { title, content, closeButton, size } })
}

/**
 * Função que fecha o modal do sistema.
 * @param {any} context contexto do componente (necessário para processamentos que interagem com o DOM)
 */
export function closeModal(context) {

    const { props: { dispatch } } = context

    dispatch({ type: CLOSE_MODAL })
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

    if (withProgress) dispatch({ type: GENERIC_PROCCESS, msg: msgProcessing })
    //#region preparando requisição genérica
    var init = {
        method: methodType,
        headers: new Headers({
            'Content-type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem(session) !== null ? JSON.parse(sessionStorage.getItem(session)).token : ''}`
        })
    }

    if (methodType === 'POST')
        init = { ...init, body: JSON.stringify(param) }

    const request = new Request(`${API}/${method}/${methodType === 'GET' ? param : ''}`, init)
    //#endregion

    fetch(request).then(response => {
        if (response.ok) {
            if (response.status === 200)
                return response.json()
        } else {
            if (response.status === 401) {

                if (window.location.hash === '#/') {
                    sessionStorage.clear()
                    clearReducer(context)
                }
                window.location.hash = '#'
                dispatch({ type: GENERIC_FAILED, msg: 'Sessão inválida ou usuário não tem permissão!' })
            }

            throw new Error(JSON.stringify(response))
        }
    }).then(json => {
        if (json.status < 0) {

            dispatch({ type: GENERIC_FAILED, msg: json.data })

            responses[returnStateKey] = undefined
            context.setState({ responses })
        } else {
            responses[returnStateKey] = json.token === null ? json : JSON.stringify(json)
            context.setState({ responses })

            if (json.status > 0) dispatch({ type: GENERIC_SUCCESS, msg: json.message !== null ? json.message : json.data })
            dispatch({ type: HIDE_MODAL_ALERT })
        }

        //window.setTimeout(() => dispatch({ type: HIDE_MODAL_ALERT }), 1000)
    }).catch(() => {
        responses[returnStateKey] = undefined
        context.setState({ responses })

        window.setTimeout(() => dispatch({ type: HIDE_MODAL_ALERT }), 3000)
    })
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

    if (withProgress) dispatch({ type: GENERIC_PROCCESS, msg: msgProcessing })
    //#region preparando requisição genérica
    var init = {
        method: methodType,
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem(session) !== null ? JSON.parse(sessionStorage.getItem(session)).token : ''}`
        }
    }

    if (methodType === 'POST')
        init = { ...init, body: JSON.stringify(param) }

    const url = `${API}/${method}/${methodType === 'GET' ? param : ''}`
    // const request = new Request(url, init)
    //#endregion

    const requestKey = getRequestKey({ url, method: methodType, body: methodType === 'POST' ? JSON.stringify(param) : undefined });
    const dedupeOptions = { requestKey }

    fetchDedupe(url, init, dedupeOptions).then(response => {
        if (response.ok) {
            if (response.status === 200)
                //console.log(response.data)
            return response.data
        } else {
            if (response.status === 401) {

                if (window.location.hash === '#/') {
                    sessionStorage.clear()
                    clearReducer(context)
                }
                window.location.hash = '#'
                dispatch({ type: GENERIC_FAILED, msg: 'Sessão inválida ou usuário não tem permissão!' })
            }

            throw new Error(JSON.stringify(response))
        }
    }).then(json => {
        if (json.status < 0) {

            dispatch({ type: GENERIC_FAILED, msg: json.data })

            responses[returnReduceKey] = undefined
            dispatch({ type: GENERIC_RETURN, data: { ...responses } })
        } else {

            responses[returnReduceKey] = json.token === null ? json : JSON.stringify(json)
            dispatch({ type: GENERIC_RETURN, data: { ...responses } })

            if (json.status > 0) dispatch({ type: GENERIC_SUCCESS, msg: json.message !== null ? json.message : json.data })
            dispatch({ type: HIDE_MODAL_ALERT })
        }

        //window.setTimeout(() => dispatch({ type: HIDE_MODAL_ALERT }), 3000)
    }).catch((error) => {
        responses[returnReduceKey] = undefined
        dispatch({ type: GENERIC_RETURN, data: { ...responses } })

        window.setTimeout(() => dispatch({ type: HIDE_MODAL_ALERT }), 3000)
    })
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