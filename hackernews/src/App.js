import React, { Component } from 'react';
import './App.css';
import Search from './Search'
import Table from './Table'
import Button from './Button'
import Loading from './Loading'
import fetch from 'isomorphic-fetch'

import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP,
} from './constants';

// HOC
const withLoading = (Component) => ({ isLoading, ...rest }) =>
  isLoading
    ? <Loading />
    : <Component {...rest} />

const ButtonWithLoading = withLoading(Button)

const updateSearchTopStoriesState = (hits, page) => (prevState) => {
  const {
    searchKey,
    results
  } = prevState
  const oldHits = results && results[searchKey]
    ? results[searchKey].hits
    : []
  const updateHits = [
    ...oldHits,
    ...hits
  ]
  return {
    results: {
      ...results,
      [searchKey]: {
        hits: updateHits,
        page
      }
    },
    isLoading: false,
    error: null
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false
    }
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this)
    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.onSearchchange = this.onSearchchange.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm]
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault()
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  setSearchTopStories(result) {
    const { hits, page } = result
    this.setState(updateSearchTopStoriesState(hits, page))
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    this.setState({ isLoading: true });
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(res => res.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => this.setState({
        error: e,
        isLoading: false
      }))
  }

  onDismiss(id) {
    const { searchKey, results } = this.state
    const { hits, page } = results[searchKey]
    const isNotId = item => item.objectID !== id
    const updatedHits = hits.filter(isNotId)

    this.setState({
      results: { ...results, [searchKey]: { hits: updatedHits, page } }
    })
  }

  onSearchchange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  render() {
    const {
      searchTerm,
      results,
      searchKey,
      error,
      isLoading
    } = this.state
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];
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
          {
            error ?
              <div className="interactions">
                <p>Something went wrong.</p>
              </div>
              :
              <Table
                list={list}
                onDismiss={this.onDismiss}
              >
              </Table>
          }
          <div className="interactions">
            <ButtonWithLoading
              isLoading={isLoading}
              onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
            >More</ButtonWithLoading>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
