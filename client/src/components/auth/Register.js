import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearErrors, register } from '../../actions/authActions';
import { setAlert } from '../../actions/alertActions';

const Register = ({ auth: { isAuthenticated, error }, clearErrors, register, setAlert }) => {
    const [ user, setUser ] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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

    const { type = 1, name, email, password, confirmPassword } = user;

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setAlert('Please fill all fields', 'danger');
        } else if (password.length < 6) {
            setAlert('Password should contains at least 6 characters', 'danger');
        } else if (password !== confirmPassword) {
            setAlert('Password does not match', 'danger');
        } else {
            register({
                type,
                name,
                email,
                password,
                confirmPassword
            });
        }
    };
    return (
        <div style={{ width: '50%', margin: 'auto' }}>
            <h1 className='text-center'>
                Account <span className='text-primary'>Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Type</label>
                    <select name='type' value={type} onChange={onChange}>
                        <option value='2'>کارجو</option>
                        <option value='1'>کارفرما</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' className='form-control' value={name} onChange={onChange} />
                </div>
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
                <div className='form-group'>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input
                        type='password'
                        name='confirmPassword'
                        className='form-control'
                        value={confirmPassword}
                        onChange={onChange}
                    />
                </div>
                <input type='submit' value='Register' className='btn btn-primary btn-block' />
            </form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    alerts: state.alerts
});
export default connect(mapStateToProps, { register, clearErrors, setAlert })(Register);
