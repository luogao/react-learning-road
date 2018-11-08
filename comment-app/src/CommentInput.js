import React, { Component } from 'react'

class CommentInput extends Component {

  constructor() {
    super()
    this.state = {
      username: '',
      content: ''
    }
  }

  componentDidMount() {
    if (this.state.username) {
      this.textarea.focus()
    } else {
      this.input.focus()
    }
  }

  componentWillMount() {
    this._loadUsername()
  }

  handleUsernameChange(e) {
    const _value = e.target.value
    this.setState({
      username: _value
    })
  }

  handleContentChange(e) {
    const _value = e.target.value
    this.setState({
      content: _value
    })
  }

  handleSubmit() {
    if (this.props.onSubmit) {
      const { username, content } = this.state
      this.props.onSubmit({ username, content, createdTime: +new Date() })
    }
    this.setState({ content: '' })
  }

  _loadUsername() {
    const username = localStorage.getItem('username')
    if (username) {
      this.setState({ username })
    }
  }

  _saveUsername(username) {
    localStorage.setItem('username', username)
  }

  handleUsernameBlur(e) {
    if (e.target.value) {
      this._saveUsername(e.target.value)
    }
  }

  render() {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input
              ref={input => this.input = input}
              onBlur={this.handleUsernameBlur.bind(this)}
              value={this.state.username}
              onChange={this.handleUsernameChange.bind(this)}
            />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea
              ref={textarea => this.textarea = textarea}
              value={this.state.content}
              onChange={this.handleContentChange.bind(this)}
            />
          </div>
        </div>
        <div className='comment-field-button'>
          <button onClick={this.handleSubmit.bind(this)}>
            发布
          </button>
        </div>
      </div>
    )
  }
}

export default CommentInput