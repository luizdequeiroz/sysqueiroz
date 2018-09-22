import React, { Component } from 'react'
import { routerMiddleware } from 'react-router-redux'
import { Route, IndexRoute, Router, hashHistory } from 'react-router'
import { Provider } from 'react-redux'

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
import profiles from '../view/modules/permissions/pages/profiles'
import menus from '../view/modules/permissions/pages/menus'
import listofemployees from '../view/modules/employees/pages/listofemployees'

// SUBMENUS
import { systempermissions, systemcompany } from '../view/modules/supermenus'

//
import If from '../view/components/if'
import DevTools from '../view/containers/DevTools'

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
              <Route path="/profiles" component={profiles} />
              <Route path="/menus" component={menus} />
              <Route path="/listofemployees" component={listofemployees} />

              {/* supermenus */}
              <Route path="/systempermissions" component={systempermissions} />
              <Route path="/systemcompany" component={systemcompany} />
            </Route>
          </Router>
          <If condition={process.env.NODE_ENV !== 'production'}>
            <DevTools />
          </If>
        </div>
      </Provider>
    )
  }
}

export default App