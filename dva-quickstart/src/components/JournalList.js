import React, { Component } from 'react'
import { connect } from 'dva'

function createMarkup(html) {
  return {__html: html};
}


class JournalList extends Component {
  constructor() {
    super()
  }

  render() {
    const { journalList, loading } = this.props
    console.log(journalList)
    return (
      <div>
        {
          journalList.map(
            journal => (
              <div key={journal.objectId}>
                <h3>{journal.date}</h3>
                <div dangerouslySetInnerHTML={createMarkup(journal.content)}></div>
                <hr/>
              </div>
            )
          )
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { journalList } = state.journalList
  return {
    loading: state.loading.global,
    journalList
  }
}

export default connect(mapStateToProps)(JournalList)