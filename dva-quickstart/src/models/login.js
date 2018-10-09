export default {
  namespace: 'login',
  state: {
    userInfo: {}
  },
  reducers: {
    setUser(state, { payload }) {
      console.log(payload)
    }
  },
  effects: {
  },
}