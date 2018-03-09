import React, { Component } from 'react';
import './App.css';
import Search from './Search'
import Table from './Table'

const DEFAULT_QUERY = 'redux'

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`

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
  }
  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  setSearchTopStories(result) {
    this.setState({ result })
  }
  fetchSearchTopStories(searchTerm) {
    fetch(url)
      .then(res => res.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => e)
  }
  //delete item
  onDismiss(id) {
    const updatedList = this.state.result.hits.filter(el => el.objectID !== id)
    this.setState({ list: updatedList })
  }
  onSearchchange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  render() {
    const {
      searchTerm,
      result
    } = this.state
    if (!result) { return null; }
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchchange}
          >
            Search:
          </Search>

          <Table list={result.hits} pattern={searchTerm} onDismiss={this.onDismiss} />
        </div>
      </div>
    )
  }
}

export default App;
