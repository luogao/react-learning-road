import React from 'react'
import PropTypes from 'prop-types'

const TodoItem = ({ onClick, todo }) => {
  const {id, title} = todo
  return (
    <li>
      <span>{title}</span>
      <button onClick={() => onClick(id)}>delete</button>
    </li>
  )
}

TodoItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired
}

export default TodoItem