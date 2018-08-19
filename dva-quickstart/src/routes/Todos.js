import React from 'react'
import { connect } from 'dva'
import TodoList from '../components/TodoList'
import CreateTodo from '../components/CreateTodo'

class Todos extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.addTodo = this.addTodo.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.state = {
      content: ''
    }
  }
  handleDelete(id) {
    const { dispatch } = this.props
    dispatch({
      type: 'todos/delete',
      payload: id
    })
  }
  addTodo() {
    const { content } = this.state
    const { dispatch } = this.props
    if (!content) return
    dispatch({
      type: 'todos/add',
      payload: content
    })
    this.setState({
      content: ''
    })
  }
  onChange(input) {
    this.setState({
      content: input
    })
  }
  render() {
    const { content } = this.state
    const { todos } = this.props
    return (
      <div>
        <h2>List of Todos</h2>
        <CreateTodo add={this.addTodo} content={content} handleInput={this.onChange} />
        <TodoList onDelete={this.handleDelete} todos={todos} />
      </div>
    )
  }

}

export default connect(({ todos }) => ({
  todos,
}))(Todos)