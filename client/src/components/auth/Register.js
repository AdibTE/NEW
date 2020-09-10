import React, { useState, useEffect, Fragment } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearErrors, register } from '../../actions/authActions';
import { setAlert } from '../../actions/alertActions';
import "../../assets/styles/login-register/login-register.css";

const Register = ({ auth: { isAuthenticated, error }, clearErrors, register, setAlert }) => {
    const [ user, setUser ] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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

    const { type = 2, name, email, phone, password, confirmPassword } = user;

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setAlert('لطفا همه فیلد ها را پر کنید', 'danger');
        } else if (password.length < 6) {
            setAlert('کلمه عبور باید حداقل 6 کاراکتر باشد', 'danger');
        } else if (password !== confirmPassword) {
            setAlert('کلمه عبور همخوانی ندارد', 'danger');
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
        <Fragment>
            <section id='Login'>
                <form onSubmit={onSubmit}>
                    <h1>ثبت نام در نیو</h1>
                    <div className='toggle-radio'>
                        <div className='radio'>
                            <input
                                type='radio'
                                name='type'
                                id='applicant'
                                value='2'
                                onChange={onChange}
                                {...(type === 2 ? {checked: 'checked'} : {})}
                            />
                            <label htmlFor='applicant'>کارجو هستم</label>
                        </div>
                        <div className='radio'>
                            <input
                                type='radio'
                                name='type'
                                id='employer'
                                value='1'
                                {...(type === 1 ? {checked: 'checked'} : {})}
                                onChange={onChange}
                            />
                            <label htmlFor='employer'>کارفرما هستم</label>
                        </div>
                    </div>
                    <div className='input'>
                        <label>نام کامل</label>
                        <input type='text' name='name' value={name} onChange={onChange} />
                    </div>
                    <div className='input'>
                        <label>شماره تلفن</label>
                        <input type='isnumber' name='phone' value={phone} onChange={onChange} />
                    </div>
                    <div className='input'>
                        <label>آدرس ایمیل</label>
                        <input type='email' name='email' value={email} onChange={onChange} />
                    </div>
                    <div className='input'>
                        <label>کلمه عبور</label>
                        <input
                            type='password'
                            name='password'
                            autocomplete='new-password'
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className='input'>
                        <label>تکرار کلمه عبور</label>
                        <input
                            type='password'
                            name='confirmPassword'
                            autocomplete='new-password'
                            value={confirmPassword}
                            onChange={onChange}
                        />
                    </div>
                    <button type='submit' value='Register'>
                        ثبت‌نام
                    </button>
                    <div className='links'>
                        <Link to='/login'>حساب دارید؟</Link>
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
export default connect(mapStateToProps, { register, clearErrors, setAlert })(Register);
