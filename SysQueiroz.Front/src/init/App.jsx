import React, { Component } from 'react'
import { routerMiddleware } from 'react-router-redux'
import { Route, IndexRoute, Router, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import DevTools from '../view/containers/DevTools'

// CONTAINERS
import Index from '../view/templates/index'

// STORE
import configureStore from '../data/store/configureStore'

// STYLE
import './App.css'

// PAGES
import menu from '../view/modules/menu'
import listofusers from '../view/modules/users/pages/listofusers'
import listofclients from '../view/modules/clients/pages/listofclients'
import systempermissions from '../view/modules/permissions/pages/systempermissions'
import profiles from '../view/modules/permissions/pages/profiles'
import menus from '../view/modules/permissions/pages/menus';

const store = configureStore(routerMiddleware(hashHistory))

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div>
          <Router history={hashHistory}>
            <Route path="/" component={Index}>
              <IndexRoute component={menu} />
              <Route path="/menu" component={menu} />
              <Route path="/listofusers" component={listofusers} />
              <Route path="/listofclients" component={listofclients} />
              <Route path="/systempermissions" component={systempermissions} />
              <Route path="/profiles" component={profiles} />
              <Route path="/menus" component={menus} />
            </Route>
          </Router>
          <DevTools />
        </div>
      </Provider>
    )
  }
}

export default App