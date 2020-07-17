import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authActions';

const Navbar = ({ title, icon, logout, auth: { isAuthenticated, user } }) => {
    const logOut = () => {
        logout();
    };

    return (
        <div className='navbar'>
            <h1>
                <Link to='/about'>
                    <i className={icon} />
                    {title}
                </Link>
            </h1>
            <ul>
                {isAuthenticated ? (
                    <Fragment>
                        <li>Hello {user && user.name}</li>
                        <li>
                            <a href='#!' onClick={logOut}>
                                Logout<i className='fas fa-sign-out-alt fa-sm' />
                            </a>
                        </li>
                    </Fragment>
                ) : (
                    <Fragment>
                        <li>
                            <Link to='/register'>Register</Link>
                        </li>

                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                    </Fragment>
                )}
            </ul>
        </div>
    );
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
};

Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt'
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
