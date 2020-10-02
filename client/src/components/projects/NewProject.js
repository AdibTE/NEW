import React, { useEffect, useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearErrors, getCategories, createProject, getAllStars } from '../../actions/projectActions';
import { setAlert } from '../../actions/alertActions';
import Spinner from '../layout/Spinner';
import TagInput from './TagInput';
import Error from '../pages/Error';
import '../../assets/styles/create/create.css';

const NewProject = ({
    projects: { error, loading, categories, allStars },
    auth: { user },
    clearErrors,
    setAlert,
    getCategories,
    getAllStars,
    createProject
}) => {
    let history = useHistory();
    const initialState = {
        title: 'تست برچسب دار',
        description: 'توضیحات تست برچسب دار',
        category: '0',
        starsNeed: '0',
        tags: null,
        // price: '',
        attachments: null,
        forceTime: '2020-10-15'
    };
    const [ formData, setFormData ] = useState(initialState);
    const [ fileInputLabel, setfileInputLabel ] = useState('انتخاب فایل');

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const submitHandler = async (e) => {
        e.preventDefault();

        if (
            formData.title === '' ||
            formData.description === '' ||
            formData.category === '' ||
            formData.forceTime === ''
        ) {
            setAlert('لطفا همه فیلد ها را پر کنید', 'danger');
        } else if (new Date(formData.forceTime) < new Date()) {
            setAlert('نمی‌توانید تاریخ گذشته را انتخاب کنید', 'danger');
        } else {
            let submited = await createProject(formData);
            if (submited) {
                setAlert('پروژه شما با موفقیت ثبت شد', 'success');
                setFormData(initialState);
                history.push('/projects');
            }
        }
    };
    const fileHandler = async (e) => {
        if (e.target.files[0]) {
            setFormData({ ...formData, [e.target.name]: e.target.files });
            if (e.target.files.length > 1) setfileInputLabel(`${e.target.files.length} فایل انتخاب شده`);
            else setfileInputLabel(e.target.files[0].name);
        }
        // e.target.files[0].name
    };
    useEffect(
        () => {
            if (error) {
                setAlert(error, 'danger');
                clearErrors();
            } else {
                getCategories();
                getAllStars();
            }
        },
        // eslint-disable-next-line
        [ error ]
    );
    if (loading || !categories || !allStars) return <Spinner />;
    else if (user.type === 2) return <Error content='شما به این صفحه دسترسی ندارید!' />;
    else {
        return (
            <Fragment>
                <section id='CreateProject' className='container'>
                    <form onSubmit={submitHandler}>
                        <h1>ثبت پروژه جدید</h1>
                        <div className='input'>
                            <label>عنوان</label>
                            <input type='title' name='title' value={formData.title} onChange={changeHandler} />
                        </div>
                        <div className='input'>
                            <label>توضیحات</label>
                            <textarea
                                name='description'
                                value={formData.description}
                                onChange={changeHandler}
                                rows='5'
                            />
                        </div>
                        <div className='input'>
                            <label>پیوست</label>
                            <input
                                type='file'
                                name='attachments'
                                onChange={fileHandler}
                                dir='ltr'
                                id='attach'
                                multiple
                            />
                            <label className='file-label' htmlFor='attach'>
                                <i className='fas fa-upload' />
                                {fileInputLabel}
                            </label>
                        </div>
                        <div className='input'>
                            <label>دسته‌بندی</label>
                            <select name='category' value={formData.category} onChange={changeHandler}>
                                <option value='' disabled>
                                    -- انتخاب کنید --
                                </option>
                                {categories.map((cat) => {
                                    return (
                                        <option value={cat.ID} key={cat.ID}>
                                            {cat.title}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className='input'>
                            <label>برچسب ها</label>
                            <TagInput formData={formData} setFormData={setFormData} />
                        </div>
                        <div className='input'>
                            <label>کیفیت پروژه</label>
                            <select name='starsNeed' value={formData.starsNeed} onChange={changeHandler}>
                                <option value='' disabled>
                                    -- انتخاب کنید --
                                </option>
                                {allStars.map((star) => {
                                    return (
                                        <option value={star.starCount} key={star.starCount}>
                                            {star.starCount} ستاره - {star.price} تومان
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className='input'>
                            <label>زمان تحویل</label>
                            <input type='date' name='forceTime' value={formData.forceTime} onChange={changeHandler} />
                        </div>
                        <button type='submit' value='Submit'>
                            ثبت پروژه و پرداخت
                        </button>
                    </form>
                    <div className='steps-container'>
                        <div className='step'>
                            <span />
                            <p>توضیحات و مشخصات پروژه</p>
                        </div>
                        <div className='step'>
                            <span />
                            <p>پرداخت و ثبت نهایی پروژه</p>
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
};

const mapStateToProps = (state) => ({
    projects: state.projects,
    auth: state.auth
});

export default connect(mapStateToProps, { clearErrors, setAlert, getCategories, getAllStars, createProject })(
    NewProject
);
