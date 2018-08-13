import React from 'react'
import { connect } from 'dva'
import TodoList from '../components/TodoList'

const Todos = ({ dispatch, todos }) => {
  function handleDelete(id) {
    dispatch({
      type: 'todos/deleteAfterOneSecond',
      payload: id
    })
  }
  return (
    <div>
      <h2>List of Todos</h2>
      <TodoList onDelete={handleDelete} todos={todos} />
    </div>
  )
}

export default connect(({ todos }) => ({
  todos,
}))(Todos)