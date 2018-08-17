import React from 'react'
import { connect } from 'dva'

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: ''
    }
  }
  render() {
    return (
      <div style={{padding:"15px"}}>
       123
      </div>
    )
  }

}

export default connect(({ user }) => ({
  user,
}))(User)