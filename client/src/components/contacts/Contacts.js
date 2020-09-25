import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { getContacts, addContact } from '../../actions/contactAction';
// import ContactsForm from './../forms/ContactsForm';
// import PropTypes from 'prop-types';
import {Modal, Table,  Space, Button, Row, Col,  Form, Input} from 'antd';
import { UserAddOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

import './contacts.scss';
const Contacts = ({contact: {contacts}, getContacts, addContact}) => {

   
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [ModalText, setModalText] = useState('');

  const[contact, setContact] = useState({
    frist_name:'',
    last_name: '',
    phone: '',
    email:''
});
      
    /**
     * Temp set contact redux static as hard codeing
     */
    useEffect(() => {
         getContacts();
        // eslint-disable-next-line
    }, []);

    //Table Display
    const columns = [
        {
          title: 'Name',
          dataIndex: 'full_name',
          key: 'full_name',
          render: text => <a href="/contactdetails">{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone'

        },
        // {
        //     title: 'Lead Sources',
        //     dataIndex: 'sources',
        //     key: ''
        // },
        // {
        //     title: 'Lead Status',
        //     dataIndex: 'status',
        //     key: ''

        // },
        {
            title: 'Assigned To',
            dataIndex: 'assigned',
            key: ''

        },
        // {
        //     title: 'Notes',
        //     dataIndex: 'assigned',
        //     key: ''

        // },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a href="/contactdetails">Edit {record.name}</a>
              <a href="/contactdetails">Delete</a>
            </Space>
          ),
        },
      ];
      
    // const data = contacts;
    
  //ContactForm
  const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
  };
  const validateMessages = {
      // eslint-disable-next-line no-template-curly-in-string
      required: '${label} is required!',

      types: {

        // eslint-disable-next-line no-template-curly-in-string
        email: '${label} is not validate email!',
        
        // eslint-disable-next-line no-template-curly-in-string
        number: '${label} is not a validate number!',
      },
      number: {
        // eslint-disable-next-line no-template-curly-in-string
        range: '${label} must be between ${min} and ${max}',
      },
  };
  



    //Model
    const handleOk = () => {
     
        // setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
          console.log(contact);
          addContact(contact);
          setVisible(false);
          setConfirmLoading(false);
          

        }, 500);
    };

    const showModel = () => {
        setVisible(true)
    }

    const handleCancel = () => {
      console.log('Clicked cancel button');
      setVisible(false);
    }


    
    return  (
      <>
       <Row justify="end">
          <Col>
            <Button 
              onClick={showModel}
              type="primary" 
              icon={<UserAddOutlined />} 
              size={"large"} > New Contact</Button>
          </Col>
       </Row>
       {contacts && <Table columns={columns} dataSource={contacts} /> }
      
      <Modal
          title="Create New Contact"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
        
          {/* ContactsForm component goes here */}
          <Form  justify="center" {...layout} name="nest-messages"  validateMessages={validateMessages}>
        
            <Row >
              <Col className="gutter-row" span={8}>
                <Input size="large" value={contact.frist_name} 
                       onChange={(e) => setContact({...contact, frist_name: e.target.value}) }
                       placeholder="Frist Name" prefix={<UserOutlined />} />

              </Col>
              <Col className="gutter-row" span={8}>
                <Input size="large" 
                        onChange={(e) => setContact({...contact, last_name: e.target.value}) }
                       value={contact.last_name} placeholder="Last Name" prefix="" />
              </Col>
            
            </Row>
            <Row>
                <Col className="gutter-row" span={16}>
                      <Input size="large" 
                             onChange={(e) => setContact({...contact, email: e.target.value}) }
                             value={contact.email} placeholder="E-Mail" prefix={<MailOutlined />} />
                    </Col>
                  </Row>

                  <Row>
            
            </Row>
            <Row>
                    <Col className="gutter-row" span={16} >
                      <Input size="large" 
                            onChange={(e) => setContact({...contact, phone: e.target.value}) }
                            value={contact.phone} 
                            placeholder="+61 1111 22222" prefix={<PhoneOutlined />}/>
                    </Col>
                  
            </Row>

          </Form>
        </Modal>
      </>

    )
}

// Contacts.propTypes = {
//     contact: PropTypes.object,
//     getContacts: PropTypes.func.isRequired,
//     addContact: PropTypes.func.isRequired,
// }

const mapStateToProps = state => ({
    contact: state.contact
})

export default connect(mapStateToProps, {getContacts, addContact})(Contacts);