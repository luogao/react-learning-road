import React from 'react'
import { routerRedux, Route, Switch } from 'dva/router'
import IndexPage from './routes/IndexPage'
import Products from './routes/Products'
import Todos from './routes/Todos'
import Users from './routes/Users'
import MainLayout from './components/MainLayout'

const { ConnectedRouter } = routerRedux

function RouterConfig({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <MainLayout>
          <Route path="/" exact component={IndexPage} />
          <Route path="/products" exact component={Products} />
          <Route path="/todos" exact component={Todos} />
          <Route path="/users" exact component={Users} />
        </MainLayout>
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig
