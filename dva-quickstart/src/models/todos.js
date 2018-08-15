const delay = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

export default {
  namespace: 'todos',
  state: [],
  reducers: {
    delete(state, { payload: id }) {
      return state.filter(item => item.id !== id)
    },
    add(state, { payload: centent }) {
      const newTodo = { title: centent, id: state.length + 1 }
      return [...state, newTodo]
    }
  },
  effects: {
    *deleteAfterOneSecond(action, { call, put }) {
      yield call(delay, 1000)
      yield put({ type: 'delete', payload: action.payload })
    }
  }
}