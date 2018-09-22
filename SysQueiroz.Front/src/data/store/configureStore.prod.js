import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import reducers from '../reducers'

// Inicialização da Store do Redux
export default function configureStore(middleware) {
  const store = createStore(
      combineReducers({
        reducers,
        routing: routerReducer
      }),
      applyMiddleware(middleware)
    )
  return store
}
