import React, {Component}from 'react';
// import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';


import setAuthToken from './utils/setAuthToken';
import {connect} from 'react-redux';

//PrivateRoute
import PrivateRoute from './components/routing/PrivateRoute';


/** Golb Style */
import './App.css';
import { Layout,  Breadcrumb} from 'antd';

// component and routes
import Login from './components/login/Login';
import Register from './components/register/Register';
import Dashboard from './components/dashboard/Dashboard';
import Contacts from './components/contacts/Contacts';

//Layout - header - sideNavbar
import SiteHeader from './layout/header';
import SideNavbar from './layout/sideNavbar';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const { Content} = Layout;

class  App extends Component  {
  //{auth: {isAuthenticated}}
  constructor(props) {
    super(props);
    this.props = props;
    console.log(this.props)
}
  render() {
  return (

  
    <div className="App">
     
     <Layout>

        <SiteHeader />

          <Layout>
            {this.props.isAuthenticated &&  <SideNavbar/> }
         

        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
             
             <Switch>
                <PrivateRoute exact path='/' component={Dashboard} />
                <Route exact path='/contacts' component={Contacts} />
                <Route  exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
              </Switch>

            </Content>
        </Layout>

   </Layout>
           
</Layout>
      <>

</>

     </div>
  );
       }
}

// App.propTypes = {
//   auth: PropTypes.object,
// }
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(App);
