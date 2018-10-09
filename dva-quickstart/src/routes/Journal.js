import React from 'react'
import { connect } from 'dva'
import JournalComponent from '../components/Journal'

function Journal() {
  return (
    <JournalComponent />
  )
}
export default connect()(Journal)