import {
    GET_CONTACTS,
    SET_LOADING,
    CONTACT_ERRORS,
    ADD_CONTACTS
} from './types';


export const getContacts = () => async dispatch => { 

    try {
        setLoading();
        //Fectch data from api
        const res = await fetch('https://swapi.dev/api/people');
        const data = await res.json();
        // const res = await fetch('https://swapi.dev/api/people');
       
        dispatch({
            type: GET_CONTACTS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: CONTACT_ERRORS,
            payload: err.response.data
        })
    }
   
}

// ADD NEW CONTACT
export const addContact = (contact) => async dispatch => {
    try {
        setLoading();
        // const res = await fetch('/contacts', {
        //     method: 'POST',
        //     body: JSON.stringify(contact),
        //     header: {
        //         'Content-Type': 'application/json'
        //     }
        // });
        //const data = await res.json();
        dispatch({
            type: ADD_CONTACTS,
            payload: contact
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