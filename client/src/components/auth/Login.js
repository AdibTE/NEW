import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearErrors, login } from '../../actions/authActions';
import { setAlert } from '../../actions/alertActions';

const Login = ({ auth: { isAuthenticated, error }, clearErrors, login, setAlert, params }) => {
    const [ user, setUser ] = useState({
        email: '',
        password: ''
    });

    let query = (function useQuery() {
        return new URLSearchParams(useLocation().search);
    })()
    let history = useHistory();

    useEffect(
        () => {
            if (isAuthenticated) {
                query.get('returnURL') ? history.push(query.get('returnURL')) : history.push('/');
            } else if (error) {
                setAlert(error, 'danger');
                clearErrors();
            }
        },
        // eslint-disable-next-line
        [ error, isAuthenticated ]
    );

    const { email, password } = user;
    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setAlert('Please fill all fields', 'danger');
        } else {
            login(user);
        }
    };
    return (
        <div style={{ width: '50%', margin: 'auto' }}>
            <h1 className='text-center'>
                Account <span className='text-primary'>Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' className='form-control' value={email} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        className='form-control'
                        value={password}
                        onChange={onChange}
                    />
                </div>
                <input type='submit' value='Login' className='btn btn-primary btn-block' />
            </form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    alerts: state.alerts
});

export default connect(mapStateToProps, { login, clearErrors, setAlert })(Login);
