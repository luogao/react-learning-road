import React from 'react'
import { connect } from 'dva'
import { Form, Icon, Input, Button, Checkbox, message, Row, Col } from 'antd'
import BraftEditor from 'braft-editor'
import styles from './Journal.css'
import 'braft-editor/dist/index.css'


const loginSuccessMsg = () => {
  message.success('登录成功!')
}

const loginErrorMsg = (msg) => {
  message.error(msg)
}

class Journal extends React.Component {
  state = {
    loading: false
  }

  submitContent = async (editorState) => {
    const { dispatch } = this.props
    dispatch({
      type: 'journal/create',
      payload: editorState
    })
  }

  render() {
    const { editorState, currentDate, currentDay } = this.props

    return (
      <div className={styles['journal-wrapper']}>
        <div className={styles['journal-header']}>
          <div className={styles.title}>{currentDate + ' ' + currentDay + ' 日志'}</div>
        </div >
        <div className={styles['journal-editor']}>
          <BraftEditor value={editorState} onChange={this.handleEditorChange} onSave={this.submitContent} />
        </div>
      </div >

      // <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
      //   <FormItem>
      //     <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
      //   </FormItem>
      //   <FormItem>
      //     <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
      //   </FormItem>
      //   <FormItem>
      //     <Button type="primary" htmlType="submit" className={styles["login-form-button"]} loading={this.state.loading}>
      //       Log in
      //     </Button>
      //   </FormItem>
      // </Form>
    );
  }
}

function mapStateToProps(state) {
  const { editorState, currentDate, currentDay } = state.journal
  return {
    loading: state.loading.global,
    editorState, currentDate, currentDay
  }
}

export default connect(mapStateToProps)(Journal)