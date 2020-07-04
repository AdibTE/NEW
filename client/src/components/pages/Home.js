import React  from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';

function Home(props) {
    return (
        <div className='container row'>
            <div className='col-md-6'>
                <ContactForm />
            </div>
            <div className='col-md-6'>
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    );
}

export default Home;
