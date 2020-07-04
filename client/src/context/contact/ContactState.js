import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';
import {
    GET_CONTACTS,
    CLEAR_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER,
    SET_CURRENT,
    CLEAR_CURRENT,
    CONTACT_ERROR
} from '../Types';

// import PropTypes from 'prop-types'

const ContactState = (props) => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null,
        loading: true
    };

    const [ state, dispatch ] = useReducer(contactReducer, initialState);

    // GET Contacts
    const getContacts = async () => {
        try {
            const res = await axios.get('api/contacts');
            dispatch({ type: GET_CONTACTS, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
            console.log('error in get contacts')
        }
    };
    // Clear Contacts
    const clearContacts = async () => {
        dispatch({ type: CLEAR_CONTACTS });
    };

    // Add Contact
    const addContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post('api/contacts', contact, config);
            dispatch({ type: ADD_CONTACT, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
            console.log('error in add contacts')
        }
    };

    // Delete Contact
    const deleteContact = async (id) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.delete('api/contacts/' + id, config);
            dispatch({ type: DELETE_CONTACT, payload: id });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
            console.log('error in delete contacts')
        }
    };

    // Update Contact
    const updateContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.put('api/contacts/' + contact._id, contact,config);
            dispatch({ type: UPDATE_CONTACT, payload: res.data });
        } catch (err) {
            console.log(err.response.msg)
            dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg });
        }
    };

    // Set Current Contact
    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // Filter Contacts
    const filterContact = (text) => {
        dispatch({ type: FILTER_CONTACT, payload: text });
    };

    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContact,
                clearFilter,
                getContacts,
                clearContacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

// ContactState.propTypes = {

// }

export default ContactState;
