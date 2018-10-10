import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import * as journalService from '../services/journal'
import AV from 'leancloud-storage'
import queryString from 'query-string'
import { message } from 'antd'
import { routerRedux } from 'dva/router'

const checkLogin = () => {
  const isLogin = Object.prototype.toString.call(AV.User.current()) !== '[object Null]'
  return isLogin
}

export default {
  namespace: 'journal',
  state: {
    editorState: null,
    editorStateHTML: '',
    currentDate: dayjs().format('YYYY.MM.DD'),
    currentDay: dayjs().locale('zh-cn').format('dddd'),
    currentObjectId: ''
  },
  reducers: {
    setEditorState(state, { payload }) {
      console.log(payload)
      return { ...state, editorStateHTML: payload.content, currentObjectId: payload.objectId }
    },
    save(state, { payload }) {
      const item = payload.toJSON()
      return { ...state, editorStateHTML: item.content, currentObjectId: item.objectId }
    }
  },
  effects: {
    *create({ payload }, { call, put }) {
      console.log(payload)
      const data = {
        date: dayjs().format('YYYY.MM.DD'),
        content: payload.toHTML(),
        owner: AV.User.current(),
        mood: 2 // 0 1 2
      }
      const res = yield call(journalService.save, data)
      console.log(res)
      yield put({ type: 'save', payload: res })
    },
    *fetch({ payload }, { call, put }) {
      const res = yield call(journalService.fetch, { user: AV.User.current(), date: dayjs().format('YYYY.MM.DD') })
      if (res[0]) {
        console.log(res[0].toJSON())
        const item = res[0].toJSON()
        yield put({ type: 'setEditorState', payload: item })
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/journal') {
          if (checkLogin()) {
            dispatch({ type: 'fetch' })
          } else {
            message.warning('请先登录').then(() => {
              dispatch(routerRedux.push('/login'))
            })
          }
        }
      })
    }
  }
}