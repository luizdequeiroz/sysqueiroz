export const API = 'http://localhost:5000/api' //'http://localhost:58140/api'

/**
 * Função para transformar um objeto em parâmetros de url (var1=valor1)
 * 
 * @export
 * @param {any} obj
 * @returns
 */
export function serializeObjToUrl(obj) {
    return `?${Object.keys(obj).reduce(
        (a, k) => { 
            a.push(`${k}=encodeURIComponent(${obj[k]})`)
            return a;
         }, []).join('&')}`
}

/**
 * Função para transformar apenas a primeira letra de cada palavra em caixa alta
 * 
 * @export
 * @param {any} str
 * @returns
 */
export function toTitleCase(str) {
    return str.replace(/\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    )
}

/**
 * Retorna uma lista de WorkItems ordenados pela prioridade e pela ordem
 */
export function sortWorkItemsByPriority(workItems, ordemCrescente = true) {
    const workItemsSorted = workItems.sort((a, b) => {
        if (ordemCrescente) {
            return (b.fields.Priority < a.fields.Priority) ? 1 : -1
        }
        return (a.fields.Priority < b.fields.Priority) ? 1 : -1
    })

    return workItemsSorted
}

/**
 * Formatar a data
 */
export function formatDate(dateTime) {
    if (dateTime) {
        const date = new Date(dateTime)
        let day = date.getDate()
        let month = date.getMonth() + 1
        month = month < 10 ? `0${month}` : month
        day = day < 10 ? `0${day}` : day
        return `${day}`.concat('/', month, '/', date.getFullYear())
    }
    return '-'
}

/**
 * Verifica se o valor passado é numérico.
 * @param {any} value
 * @returns {boolean}
 */
export function isNumber(value) {
    return !isNaN(parseInt(value, 0)) && isFinite(value)
}