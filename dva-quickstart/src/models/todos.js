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
    }
  },
  effects: {
    *deleteAfterOneSecond(action, { call, put }) {
      yield call(delay, 1000)
      yield put({ type: 'delete', payload: action.payload })
    }
  }
}