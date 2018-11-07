import * as journalService from '../services/journal';
import queryString from 'query-string'
import AV from 'leancloud-storage'

export default {
  namespace: 'journalList',
  state: {
    journalList: []
  },
  reducers: {
    update(state, { payload: journalList }) {
      return { ...state, journalList }
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const res = yield call(journalService.fetchAll, { user: AV.User.current() })
      const data = res.map(el => el.toJSON())
      yield put({ type: 'update', payload: data })

    },
    // *remove({ payload: id }, { call, put }) {
    //   yield call(usersService.remove, id)
    //   yield put({ type: 'reload' })
    // },
    // *patch({ payload: { id, values } }, { call, put }) {
    //   yield call(usersService.patch, id, values)
    //   yield put({ type: 'reload' })
    // },
    // *create({ payload: values }, { call, put }) {
    //   yield call(usersService.create, values)
    //   yield put({ type: 'reload' })
    // },
    // *reload(action, { put, select }) {
    //   const page = yield select(state => state.users.page)
    //   yield put({ type: 'fetch', payload: { page } })
    // }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/journal-list') {
          dispatch({ type: 'fetch' })
        }
      })
    }
  }
}