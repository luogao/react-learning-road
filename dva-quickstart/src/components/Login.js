import React from 'react'
import { connect } from 'dva'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import styles from './Login.css'
import AV from 'leancloud-storage'

const { User } = AV
const FormItem = Form.Item

const loginSuccessMsg = () => {
  message.success('登录成功!')
}

const loginErrorMsg = (msg) => {
  message.error(msg)
}

class NormalLoginForm extends React.Component {

  state = {
    loading: false
  }

  handleSubmit = (e) => {
    this.setState({
      loading: true
    })
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        User.logIn(values.userName, values.password).then(loginedUser => {
          loginSuccessMsg()
          this.setState({
            loading: false
          })
          console.log(User.current().toJSON())
        }, (error => {
          loginErrorMsg(error.rawMessage)
          this.setState({
            loading: false
          })
        }))
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        {/* <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your Email!' }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" />
          )}
        </FormItem> */}
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className={styles["login-form-forgot"]} href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className={styles["login-form-button"]} loading={this.state.loading}>
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}
const WrappedNormalLoginForm = Form.create()(NormalLoginForm)

export default connect()(WrappedNormalLoginForm)