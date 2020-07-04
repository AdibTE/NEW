import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
    const contactContext = useContext(ContactContext);
    const { _id, name, email, phone, type } = contact;
    const onDelete = () => {
        contactContext.deleteContact(_id);
        contactContext.clearCurrent(_id);
    };
    const onEdit = () => {
        contactContext.setCurrent(contact);
    };
    return (
        <div className='card card-body text-12 card-primary'>
            <h3 className='text-primary'>
                {name} {' '}
                <span className={'pull-right badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className='List'>
                {email && (
                    <li>
                        {' '}
                        <i className='fas fa-envelope-open' />
                        {email}
                    </li>
                )}
                {phone && (
                    <li>
                        {' '}
                        <i className='fas fa-phone' />
                        {phone}
                    </li>
                )}
            </ul>
            <p>
                <button className='btn btn-secondary' style={{ marginRight: '5px' }} onClick={onEdit}>
                    Edit
                </button>
                <button className='btn btn-danger' onClick={onDelete}>
                    Delete
                </button>
            </p>
        </div>
    );
};

ContactItem.prototype = {
    contact: PropTypes.object.isRequired
};

export default ContactItem;
