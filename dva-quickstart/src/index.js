import dva from 'dva';
import { createBrowserHistory } from 'history';
import createLoading from 'dva-loading'
import './index.css';

const AV  = require('leancloud-storage')
AV.init('CeKinhLxkffgooe1eDMaD6v8-gzGzoHsz', 'dR9U7hgNR7QsTXF2XuONi3VC')

// 1. Initialize
const app = dva({
  history: createBrowserHistory(),
  initialState: {
    products: [{
      name: 'dva', id: 1
    }, {
      name: 'antd', id: 2
    }],
    todos: [{
      title: 'test1',
      id: 1
    }, {
      title: 'test2',
      id: 2
    }, {
      title: 'test3',
      id: 3
    }, {
      title: 'test4',
      id: 4
    }]
  }
});

// 2. Plugins
app.use(createLoading())

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/products').default)
app.model(require('./models/todos').default)
app.model(require('./models/users').default)
app.model(require('./models/login').default)
app.model(require('./models/journal').default)

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
