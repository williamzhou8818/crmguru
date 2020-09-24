import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import setAuthToken from './utils/setAuthToken';



/** Golb Style */
import './App.css';
import { Layout, Breadcrumb} from 'antd';

// component and routes
import Login from './components/login/Login';
import Register from './components/register/Register';
import Dashboard from './components/dashboard/Dashboard';
import Contacts from './components/contacts/Contacts';

//Layout - header - sideNavbar
import Header from './layout/header';
import SideNavbar from './layout/sideNavbar';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const { Content} = Layout;

  return (
    <Provider store={store}>
    <Router>
    <div className="App">
      <Layout>
        <Header/>
          <Layout>
          <SideNavbar/>
       
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
                        <Route exact path='/' component={Dashboard}/>
                        <Route exact path='/register' component={Register}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/contacts' component={Contacts}/>

                      </Switch>

                    </Content>
                </Layout>

           </Layout>
       </Layout>
      
     </div>
    </Router>
    </Provider>
  );
}

export default App;
