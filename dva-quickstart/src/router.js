import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Products from './routes/Products';
import Todos from './routes/Todos';
import Users from './routes/Users';

const { ConnectedRouter } = routerRedux
function RouterConfig({history}) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/products" exact component={Products} />
        <Route path="/todos" exact component={Todos} />
        <Route path="/users" exact component={Users} />
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;
