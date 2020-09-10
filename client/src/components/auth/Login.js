import React, { useState, useEffect, Fragment } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearErrors, login } from '../../actions/authActions';
import { setAlert } from '../../actions/alertActions';
import "../../assets/styles/login-register/login-register.css";

const Login = ({ auth: { isAuthenticated, error }, clearErrors, login, setAlert, params }) => {
    const [ user, setUser ] = useState({
        email: '',
        password: ''
    });

    let query = (function useQuery() {
        return new URLSearchParams(useLocation().search);
    })();
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
            setAlert('لطفا همه فیلد ها را پر کنید', 'danger');
        } else {
            login(user);
        }
    };
    return (
        <Fragment>
            <section id='Login'>
                <form onSubmit={onSubmit}>
                    <h1>ورود به نیو</h1>
                    <div className='input'>
                        <label>آدرس ایمیل</label>
                        <input type='email' name='email' value={email} onChange={onChange} />
                    </div>
                    <div className='input'>
                        <label>کلمه عبور</label>
                        <input
                            type='password'
                            name='password'
                            autoComplete='new-password'
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <button type='submit' value='Login'>ورود</button>
                    <div className='links'>
                    <Link to='/register'>حساب ندارید؟</Link>
                        <Link to='/forgot'>رمز عبور خود را فراموش کرده‌اید؟</Link>
                    </div>
                </form>
            </section>
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    alerts: state.alerts
});

export default connect(mapStateToProps, { login, clearErrors, setAlert })(Login);
