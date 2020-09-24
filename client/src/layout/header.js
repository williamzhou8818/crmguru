import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { loadUser, logoutUser } from './../actions/authAction';

import { Layout, Menu} from 'antd';
import { SettingOutlined} from '@ant-design/icons';
import SideNavbar from './sideNavbar';


/** Main */
const SiteHeader = ({auth:{isAuthenticated, user},loadUser, logoutUser}) => {
    const { SubMenu } = Menu;
    const { Header} = Layout;


    /**Init */
    useEffect(() => {
        loadUser();
    },[loadUser]);

    const onLogout = () => {
        logoutUser();
    }

    const authLinks = (
        <Menu.ItemGroup title="">
                <Menu.Item key="2"><Link to="/profile">Profile</Link></Menu.Item>

                 <Menu.Item key="2"><Link  onClick={onLogout}>Logout</Link></Menu.Item>

         </Menu.ItemGroup>

    );
    const guessLinks = (
        <Menu.ItemGroup title="">
                <Menu.Item key="2"><Link to="/login">Login</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/register">Register</Link></Menu.Item>   
         </Menu.ItemGroup>
    );


    return (
        <Header className="header">
          <Link to="/" className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1"><Link to="/contacts">Contacts</Link></Menu.Item>

                <SubMenu style={{float: 'right'}} key="SubMenu" icon={<SettingOutlined />} title={user? user.username : ' '}>
                
                            {isAuthenticated ? authLinks : guessLinks }
                </SubMenu>

       
         
          </Menu>
        </Header>
    )
}

SideNavbar.propTypes = {
    auth: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
  }

const mapStateToProps = state => ({
    auth: state.auth
  })
  

export default connect(mapStateToProps, {loadUser, logoutUser})(SiteHeader);
