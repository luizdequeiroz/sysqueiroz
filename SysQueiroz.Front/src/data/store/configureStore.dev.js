import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
// import createSagaMiddleware from 'redux-saga'
import { persistState } from 'redux-devtools'
import reducers from '../reducers'
import DevTools from '../../view/containers/DevTools'
// import rootSaga from '../sagas'

// const sagaMiddleware = createSagaMiddleware()

const enhancer = compose(
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
)

// Inicialização da Store do Redux, e aplicando, ou não, a instância do Saga
export default function configureStore(middleware) {
  const store = createStore(
      combineReducers({
        reducers,
        routing: routerReducer
      }),
      enhancer,
      // applyMiddleware(sagaMiddleware),
      applyMiddleware(middleware)
    );

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    )
  }
  // sagaMiddleware.run(rootSaga)
  return store
}
