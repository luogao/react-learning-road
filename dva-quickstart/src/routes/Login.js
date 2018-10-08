import React from 'react'
import { connect } from 'dva'
import LoginComponent from '../components/Login'

function Login() {
  return (
    <LoginComponent />
  )
}
export default connect()(Login)