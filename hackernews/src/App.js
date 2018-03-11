import React, { Component } from 'react';
import './App.css';
import Search from './Search'
import Table from './Table'
import Button from './Button'

const DEFAULT_QUERY = 'redux'
const DEFAULT_HPP = '1'

const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='
const PARAM_PAGE = 'page='
const PARAM_HPP = 'hitsPerPage='

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    }
    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.onSearchchange = this.onSearchchange.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
  }
  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault()
  }
  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  setSearchTopStories(result) {
    const {hits, page} = result
    const oldHits = page !== 0 ? this.state.result.hits : []
    const updatedHits = [...oldHits, ...hits]
    this.setState({ result: {hits: updatedHits, page} })
  }
  fetchSearchTopStories(searchTerm, page=0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(res => res.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => e)
  }
  //delete item
  onDismiss(id) {
    const isNotId = item => item.objectID !== id
    const updatedHits = this.state.result.hits.filter(isNotId)
    // this.setState({
    //   result: Object.assign({}, this.state.result, {hits: updatedHits})
    // })
    this.setState({
      result: {...this.state.result, hits: updatedHits}
    })
  }
  onSearchchange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  render() {
    const {
      searchTerm,
      result
    } = this.state
    const page = (result && result.page) || 0;
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchchange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
          {/* {result? <Table list={result.hits} onDismiss={this.onDismiss} /> : null} */}
          {result && <Table list={result.hits} onDismiss={this.onDismiss} />}
          <div className="interactions">
            <Button onClick={()=> this.fetchSearchTopStories(searchTerm, page + 1)}> More </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
