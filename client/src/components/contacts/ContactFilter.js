import React , {useContext , useRef } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const {filterContact , clearFilter} = contactContext;
    const text = useRef('');
    const onChange = (e)=>{
        if(text.current.value !== '') {
            filterContact(e.target.value)
        } else {
            clearFilter();
        }
    }
    return (
        <form>
            <input ref={text} type='text' onChange={onChange} placeholder='Search' className='form-control m-b-10' />
        </form>
    )
}

export default ContactFilter
