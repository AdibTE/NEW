import React, { Fragment, useContext , useEffect} from 'react';
import Spinner from '../layout/Spinner';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Contacts = (props) => {
    const contactContext = useContext(ContactContext);
    let { contacts, filtered , getContacts  , loading} = contactContext;
    useEffect(()=>{
        getContacts();
        // eslint-disable-next-line
    },[])
    if (contacts && contacts.length === 0 && !loading) {
        return <h4>Add contacts to start!</h4>;
    }
    return (
        <Fragment>
            {contacts && !loading ? (<TransitionGroup>
                {filtered ? (
                    filtered.map((contact) => (
                        <CSSTransition key={contact._id} timeout={500} classNames="item">
                            <ContactItem contact={contact} />
                        </CSSTransition>
                    ))
                ) : (
                    contacts.map((contact) => (
                        <CSSTransition key={contact._id} timeout={500} classNames="item">
                            <ContactItem contact={contact} />
                        </CSSTransition>
                    ))
                )}
            </TransitionGroup>) : <Spinner />}
            
        </Fragment>
    );
};

export default Contacts;
