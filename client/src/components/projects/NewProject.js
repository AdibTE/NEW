import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearErrors, getCategories, createProject, getAllStars } from '../../actions/projectActions';
import { setAlert } from '../../actions/alertActions';
import Spinner from '../layout/Spinner';
import Error from '../pages/Error';

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
        title: '',
        description: '',
        category: '',
        starsNeed: '0',
        // price: '',
        attachments: '',
        forceTime: ''
    };
    const [ formData, setFormData ] = useState(initialState);
    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        let submited = await createProject(formData);
        if (submited) {
            setAlert('پروژه شما با موفقیت ثبت شد', 'success');
            setFormData(initialState);
            history.push('/projects');
        }
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
    else if (user.type === 2) return <Error content='Restricted!' />;
    else {
        return (
            <div style={{ width: '50%', margin: 'auto' }}>
                <h1 className='text-center'>
                    Create <span className='text-primary'>Project</span>
                </h1>
                <form onSubmit={submitHandler}>
                    <div className='form-group'>
                        <label htmlFor='title'>title</label>
                        <input type='text' name='title' value={formData.title} onChange={changeHandler} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>description</label>
                        <textarea
                            type='text'
                            name='description'
                            value={formData.description}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='category'>category</label>
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
                    <div className='form-group'>
                        <label htmlFor='starsNeed'>Project Quality</label>
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
                    {/* <div className='form-group'>
                        <label htmlFor='starsNeed'>starsNeed</label>
                        <input type='number' name='starsNeed' value={formData.starsNeed} onChange={changeHandler} />
                    </div> */}
                    {/* <div className='form-group'>
                        <label htmlFor='price'>price</label>
                        <input type='number' name='price' value={formData.price} onChange={changeHandler} />
                    </div> */}
                    <div className='form-group'>
                        <label htmlFor='forceTime'>forceTime</label>
                        <input type='date' name='forceTime' value={formData.forceTime} onChange={changeHandler} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='attachments'>attachments</label>
                        <input type='file' name='attachments' value={formData.attachments} onChange={changeHandler} />
                    </div>
                    <div className='form-group'>
                        <input type='submit' value='Submit' className='btn btn-primary btn-block' />
                    </div>
                </form>
            </div>
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
