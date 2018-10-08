import React from 'react'
import { connect } from 'dva'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import styles from './Login.css'
import AV from 'leancloud-storage'
import { stringify } from 'query-string'
import { routerRedux } from 'dva/router'
import { PAGE_SIZE } from '../constants'
import UserModal from './UserModal'

const { User } = AV
const FormItem = Form.Item

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const user = new User()
        user.setUsername(values.userName)
        user.setPassword(values.password)
        user.setEmail(values.email)
        user.signUp().then(function (loginedUser) {
          // 注册成功，跳转到商品 list 页面
          console.log(loginedUser)
        }, (function (error) {
          alert(JSON.stringify(error));
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
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your Email!' }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" />
          )}
        </FormItem>
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
          <Button type="primary" htmlType="submit" className={styles["login-form-button"]}>
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}
const WrappedNormalLoginForm = Form.create()(NormalLoginForm)

export default connect()(WrappedNormalLoginForm)