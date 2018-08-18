import React from 'react'
import { connect } from 'dva'
import UsersComponent from '../components/Users'

function Users() {
  return (
    <UsersComponent />
  )
}
export default connect()(Users)