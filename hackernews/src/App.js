import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  }
]


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list
    }
  }
  onDismiss(id) {
    const updatedList = this.state.list.filter(el => el.objectID !== id)
    this.setState({ list: updatedList })
  }
  render() {
    const user = {
      firstName: 'Roy',
      lastName: 'Luo'
    }
    function formatName(user) {
      let output = user.firstName + ' ' + user.lastName
      if (user) {
        return (
          <h1> HI, {output}!</h1>
        )
      } else {
        return (
          <h1> HI, Stranger. </h1>
        )
      }
    }
    return (
      <div className="App">
        {formatName(user)}
        {this.state.list.map(item =>
          <div key={item.objectID.toString()}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                onClick={() => this.onDismiss(item.objectID)}
                type="button"
              >
                Dismiss
              </button>
            </span>
          </div>
        )}
      </div>
    )
  }
}

export default App;
