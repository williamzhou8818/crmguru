import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Checkbox, message  } from 'antd';
import { connect } from  'react-redux';
import { loginUser } from '../../actions/authAction'; 
import './login.scss';

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };



  //{auth:{isAuthenticated, error}, history, loginUser}
  
class Login extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    console.log(this.props)
  }
onFinish = (values) => {
  loginUser({
      email:Object.values(values)[0],
      password: Object.values(values)[1]
  })
// console.log('Success:', values);
// console.log('Success:', Object.values(values)[0]);
// console.log('Success:', Object.values(values)[1]);

};

onFinishFailed = (errorInfo) => {
console.log('Failed:', errorInfo);
};
  render() {


    return (
       <div className="login-wrap" >
        {this.props.isAuthenticated && this.props.history.push('/') }
       <Form
          className="login-wrap__form"
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
        >
          <div className="login_logo">
             {/* <img src="" alt="logo"/> */}
             {
                this.props.error && message.error(this.props.error, 5)
              }
             <h3>CRM Guru Login</h3>
          </div>
        <Form.Item
            label="E-mail"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
        >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
        </Form.Item>
        </Form>
      </div>
    )
  }
};



// Login.propTypes = {
//   auth: PropTypes.object.isRequired,
//   loginUser: PropTypes.func.isRequired
// }

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, {loginUser})(withRouter(Login));