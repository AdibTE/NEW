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
                <Link to='/'>{title}</Link>
            </h1>
            <ul>
                {isAuthenticated && user ? (
                    <Fragment>
                        <li>
                            <Link to='/profile'>
                                Hello {user.name} - Points: {user.points}
                            </Link>
                        </li>
                        <li>
                            <Link to='/projects'>Projects</Link>
                        </li>
                        {user.type !== 2 && (
                            <li>
                                <Link to='/projects/create'>Create Project</Link>
                            </li>
                        )}
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
    title: 'NEW',
    icon: 'fas fa-id-card-alt'
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
