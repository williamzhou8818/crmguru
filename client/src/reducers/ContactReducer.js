import {GET_CONTACTS, ADD_CONTACTS, SET_LOADING, CONTACT_ERRORS} from '../actions/types';

const initialState = {
    contacts: [ {
        "id": 1,
        "key": 1,
        "frist_name": "William zhou",
        "last_name": "Zhou",
        "full_name":"william zhou",
        "phone": "61414372528",
        "email": "william.znou8818@gmail.com",
        "uuid": "a02cf7dd-c947-4655-af03-ebfc28d0f55d",
        "createdAt": "2020-09-22T06:11:59.000Z",
        "updatedAt": "2020-09-22T06:11:59.000Z",
        "user_id": null
    },
    {
        "id": 2,
        "key": 2,
        "frist_name": "yanicha",
        "last_name": "Nahor",
        "full_name":"yanicha Nahor",
        "phone": "61414372528",
        "email": "william.znou8818@gmail.com",
        "uuid": "a02cf7dd-c947-4655-af03-ebfc28d0f55d",
        "createdAt": "2020-09-22T06:13:57.000Z",
        "updatedAt": "2020-09-22T06:13:57.000Z",
        "user_id": null
    }],
    current: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_CONTACTS:
            // console.log(action.payload)
            return {
                ...state,
                
               // contacts: action.payload,
                loading: false
            };
            case ADD_CONTACTS:
                return {
                    ...state,
                    contacts: [...state.contacts, action.payload],
                    loading: false
                }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case CONTACT_ERRORS:
            console.error(action.payload);
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}