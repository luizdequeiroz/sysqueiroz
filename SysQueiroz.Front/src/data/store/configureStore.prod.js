import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
// import createSagaMiddleware from 'redux-saga'
import reducers from '../reducers'
// import rootSaga from '../sagas'

// const sagaMiddleware = createSagaMiddleware()

// Inicialização da Store do Redux, e aplicando a instância do Saga
export default function configureStore(middleware) {
  const store = createStore(
      combineReducers({
        reducers,
        routing: routerReducer
      }),
      // applyMiddleware(sagaMiddleware),
      applyMiddleware(middleware)
    )
  // sagaMiddleware.run(rootSaga)
  return store
}
