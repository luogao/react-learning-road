import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'

const TodoList = ({ onDelete, todos }) => {
  const todoList = todos.map(todo => <TodoItem key={todo.id} todo={todo} onClick={onDelete} /> )
  return todoList
}

TodoList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired
}

export default TodoList