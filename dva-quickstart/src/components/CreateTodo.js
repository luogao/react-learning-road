import React from 'react'
import PropTypes from 'prop-types'
import { Input, Button, Row, Col } from 'antd'

const CreateItem = ({ add, handleInput, content }) => {

  return (
    <Row type="flex" gutter={8}>
      <Col>
        <Input placeholder="add new todo" size="large" type="text" onPressEnter={add} onChange={(e) => { handleInput(e.target.value) }} value={content} />
      </Col>
      <Col>
        <Button size="large" onClick={add} type="primary">add</Button>
      </Col>
    </Row>
  )
}

CreateItem.propTypes = {
  add: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired
}

export default CreateItem