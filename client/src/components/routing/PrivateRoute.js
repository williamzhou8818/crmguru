import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import { connect } from 'react-redux';

// auth action

const PrivateRoute = ({auth:{isAuthenticated}, component: Component, ...rest}) => {
    return (
       
            <Route 
                {...rest} 
                render={props => !isAuthenticated  ? (
                <Redirect to='/login' />
                ) : (
                <Component {...props} />
                )}
            />
        
    )
}




const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);