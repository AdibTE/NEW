import React, { useState, useEffect, useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const { isAuthenticated, error, clearErrors, login } = authContext;
    const { setAlert } = alertContext;

    const [ user, setUser ] = useState({
        email: '',
        password: ''
    });

    useEffect(
        () => {
            if (isAuthenticated) {
                props.history.push('/');
            }
            if (error) {
                setAlert(error, 'danger');
                clearErrors();
            }

            // eslint-disable-next-line
        },[ error, isAuthenticated, props.history ]
    );

    const { email, password } = user;
    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        if(email === '' || password === ''){
            setAlert('Please fill all fields','danger')
        } else {
            login(user)
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

export default Login;
