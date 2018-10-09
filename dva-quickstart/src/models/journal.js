import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import * as journalService from '../services/journal'
import AV from 'leancloud-storage'
import queryString from 'query-string'


export default {
  namespace: 'journal',
  state: {
    editorState: null,
    editorStateHTML: '',
    currentDate: dayjs().format('YYYY.MM.DD'),
    currentDay: dayjs().locale('zh-cn').format('dddd')
  },
  reducers: {
    setEditorState(state, { payload }) {
      console.log(payload)
      return { ...state, editorStateHTML: payload }
    },
    save(state, { payload }) {
      console.log(payload.toHTML())
      return { ...state, editorState: payload, editorStateHTML: payload.toHTML() }
    }
  },
  effects: {
    *create({ payload }, { call, put }) {
      const data = {
        date: dayjs().format('YYYY.MM.DD'),
        content: payload.toHTML(),
        owner: AV.User.current(),
        mood: 2 // 0 1 2
      }
      const res = yield call(journalService.save, data)
      console.log(res)
      yield put({ type: 'save', payload })
    },
    *fetch({ payload }, { call, put }) {
      const res = yield call(journalService.fetch, { user: AV.User.current(), date: dayjs().format('YYYY.MM.DD') })
      console.log(res[0].toJSON())
      const content = res[0].toJSON().content
      yield put({ type: 'setEditorState', payload: content })
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/journal') {
          dispatch({ type: 'fetch' })
        }
      })
    }
  }
}