import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const { current } = contactContext;

    const [ contact, setContact ] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
    });
    const { name, email, phone, type } = contact;

    useEffect(() => {
            if (current) {
                setContact(current);
            } else {
                setContact({
                    name: '',
                    email: '',
                    phone: '',
                    type: 'personal'
                });
            }
        },[ contactContext ]);

    const onChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        });
    };
    const onCancel = () => {
        contactContext.clearCurrent()
    };
    const onsubmit = (e) => {
        e.preventDefault();
        if (!current) {
            contactContext.addContact(contact);
        } else {
            contactContext.updateContact(contact);
        }
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        });
        // contactContext.clearCurrent()
    };
    return (
        <form onSubmit={onsubmit}>
            {!current ? <h2>Add Contact</h2> : <h2>Edit Contact</h2>}
            <input
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={onChange}
                className='form-control form-group'
            />
            <input
                type='text'
                placeholder='Email'
                name='email'
                value={email}
                onChange={onChange}
                className='form-control form-group'
            />
            <input
                type='text'
                placeholder='Phone'
                name='phone'
                value={phone}
                onChange={onChange}
                className='form-control form-group'
            />
            <h5>Contact Type</h5>
            <label htmlFor='type'>
                <input type='radio' name='type' value='personal' checked={type === 'personal'} onChange={onChange} />
                Personal
            </label>
            <label htmlFor='type'>
                <input
                    type='radio'
                    name='type'
                    value='professional'
                    checked={type === 'professional'}
                    onChange={onChange}
                />
                Professional
            </label>
            <div className='p-t-20'>
                {!current ? (
                    <input type='submit' value='Add Contact' className='btn btn-primary btn-block' />
                ) : (
                    <input type='submit' value='Edit Contact' className='btn btn-primary btn-block' />
                )}
            </div>
            {current && (
                <div className='p-t-10'>
                    <input type='button' value='Cancel' onClick={onCancel} className='btn text-primary btn-block' />
                </div>
            )}
        </form>
    );
};

export default ContactForm;
