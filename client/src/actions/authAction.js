import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';



export const loadUser = () => async dispatch =>{
    //@todo - load token into global header 
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    
    try {
      
         axios.get('/api/v1/auth').then(res => {
            console.log(res.data);
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        });
        // const res = await axios.get('/api/v1/auth');

    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            
        })
    }
};

export const registerUser = (registerFromData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
  
    try {
        const res = await axios.post('/api/v1/users', registerFromData, config);
        //console.log('Register Form data' + res.data.token);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        loadUser();

    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.msg
        })
    }


}


/** User  Login  Action */
export const loginUser = (loginFormData) => async dispatch  =>{

    //Set Header Config
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('/api/v1/auth', loginFormData, config);
       
        dispatch({
            type: LOGIN_SUCCESS,
            payload:  res.data
        });

        loadUser();

    } catch (err) {

        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.msg
        });

    }

}


export const logoutUser = () => dispatch => {
    dispatch({
        type: LOGOUT,
    });
}
