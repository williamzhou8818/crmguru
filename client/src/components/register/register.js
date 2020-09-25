import React from 'react';
// import PropTypes from 'prop-types';
import {Form,Input,Tooltip,Select,Checkbox,Button, message} from 'antd';
import { withRouter } from "react-router-dom";

import { QuestionCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { registerUser, loadUser } from '../../actions/authAction';

import './register.scss';


const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = ({auth:{error, isAuthenticated},history, registerUser, loadUser}) => {



  // const [user, setUser] = useState({
  //     username: '',
  //     email:'',
  //     password:'',
  //     confirm:'',
  //     phone: '',
  //     prefix:'',
  //     agreement: true
  // })

  // const {username, email, password, password2, phone, agreement} = user;

  const [form] = Form.useForm();

 

  const onFinish = (values) => {
    // console.log('Received values of form: ', Object.values(values)  ) ;
  
      registerUser({
        email: Object.values(values)[0],
        password: Object.values(values)[1],
        username:Object.values(values)[3],
        phone: Object.values(values)[5],
        agreement: Object.values(values)[6]
      });

   
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="61">+61</Option>
        <Option value="86">+86</Option>
      </Select>
    </Form.Item>
  );

  
  return (
    <div className="register-wrap">
      {isAuthenticated  && 
         history.push('/')

        //  need to fix issu user not loading
      
     }
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      {
         error && message.error(error, 5)
      }
      <h3 className="register__h3">CRM Guru Registration </h3>
      <Form.Item
        name="email"
        label="E-mail"
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
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="nickname"
        label={
          <span>
            Nickname&nbsp;
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please input your nickname!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

   

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject('Should accept agreement'),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="/agreement">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};



// RegistrationForm.propTypes = {
//   auth: PropTypes.object.isRequired,
//   registerUser: PropTypes.func.isRequired,
//   loadUser: PropTypes.func.isRequired
// }

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {registerUser, loadUser})(withRouter(RegistrationForm));
 
