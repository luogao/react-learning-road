import React from 'react'
import PropTypes from 'prop-types'

const TodoItem = ({ onClick, todo }) => {
  const handleClick = (id) => {
    onClick(todo.id)
  }
  return (
    <li key={todo.id}>
      <span>{todo.title}</span>
      <button onClick={handleClick}>delete</button>
    </li>
  )
}

TodoItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired
}

export default TodoItem