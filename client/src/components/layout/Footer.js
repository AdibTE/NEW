import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <Link to='/'>
                <img src='/assets/images/logo-2.png' alt='نیو' />
            </Link>
            <p>طراحی و توسعه توسط ادیب روحانی</p>
        </footer>
    );
};

export default Footer;
