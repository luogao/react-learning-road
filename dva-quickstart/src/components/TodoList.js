import React from 'react'
import PropTypes from 'prop-types'
import { List, Button } from 'antd';
// import TodoItem from './TodoItem'
const Item = List.Item
const TodoList = ({ onDelete, todos }) => {
  // const todoList = todos.map(todo => <TodoItem key={todo.id + todo.title} todo={todo} onClick={onDelete} />)
  return (
    <List
      dataSource={todos}
      renderItem={item => (
        <Item actions={[<Button onClick={() => onDelete(item.id)}> delete</Button >]}>
          <Item.Meta
            title={'Todo' + item.id}
            description={item.title}
          ></Item.Meta>
        </Item >
      )}
/>
  )
}

TodoList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired
}

export default TodoList