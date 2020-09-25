import {
    GET_CONTACTS,
    SET_LOADING,
    CONTACT_ERRORS,
    ADD_CONTACTS
} from './types';

import axios from 'axios';

export const getContacts = () => async dispatch => { 

    try {
        setLoading();
        //Fectch data from api
        const res = await axios.get('/api/v1/contacts');
       
        dispatch({
            type: GET_CONTACTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: CONTACT_ERRORS,
            payload: err.response.data
        })
    }
   
}

// ADD NEW CONTACT
export const addContact = (contactData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
  
    try {
        setLoading();
        const res = await axios.post('/api/v1/contacts/', contactData, config);
        dispatch({
            type: ADD_CONTACTS,
            payload: res.data
        });

    } catch(err) {
        dispatch({
            type: CONTACT_ERRORS,
            payload: err.response.data
        });
    }
}


// Set loading to true
export const setLoading = () => {

    return {
        type: SET_LOADING
    }
}