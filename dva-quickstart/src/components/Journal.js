import React from 'react'
import { connect } from 'dva'
import BraftEditor, { EditorState } from 'braft-editor'
import styles from './Journal.css'
import 'braft-editor/dist/index.css'

class Journal extends React.Component {
  state = {
    loading: false
  }

  createOrUpdate = (editorState) => {
    if (this.props.currentObjectId) {
      console.log('update')
    } else {
      this.submitContent(editorState)
    }
  }

  submitContent = async (editorState) => {
    const { dispatch } = this.props
    dispatch({
      type: 'journal/create',
      payload: editorState
    })
  }

  render() {
    const { editorState, currentDate, currentDay, editorStateHTML, currentObjectId } = this.props
    const defaultValue = EditorState.createFrom(editorStateHTML)
    return (
      <div className={styles['journal-wrapper']}>
        <div className={styles['journal-header']}>
          <div className={styles.title}>{currentDate + ' ' + currentDay + ' 日志' + currentObjectId}</div>
        </div >
        <div className={styles['journal-editor']}>
          <BraftEditor value={defaultValue} onChange={this.handleEditorChange} onSave={this.createOrUpdate} />
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
  const { editorState, currentDate, currentDay, editorStateHTML, currentObjectId } = state.journal
  return {
    loading: state.loading.global,
    editorState, currentDate, currentDay, editorStateHTML, currentObjectId
  }
}

export default connect(mapStateToProps)(Journal)