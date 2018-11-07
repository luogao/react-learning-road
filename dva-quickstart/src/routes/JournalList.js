import React from 'react'
import { connect } from 'dva'
import JournalListComponent from '../components/JournalList'

function JournalList() {
  return (
    <JournalListComponent />
  )
}
export default connect()(JournalList)