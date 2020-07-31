import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { clearErrors, getCategories, createProject } from '../../actions/projectActions';
import { setAlert } from '../../actions/alertActions';
import Spinner from '../layout/Spinner';

const NewProject = ({
    projects: { error, loading, categories },
    clearErrors,
    setAlert,
    getCategories,
    createProject
}) => {
    const [ formData, setFormData ] = useState({
        title: '',
        description: '',
        category: '',
        starsNeed: '0',
        price: '',
        attachments: '',
        forceTime: ''
    });
    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        createProject(formData);
    };
    useEffect(
        () => {
            if (error) {
                setAlert(error, 'danger');
                clearErrors();
            } else {
                getCategories();
            }
        },
        // eslint-disable-next-line
        [ error ]
    );
    if (loading || !categories) return <Spinner />;
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
                        <label htmlFor='starsNeed'>starsNeed</label>
                        <input type='number' name='starsNeed' value={formData.starsNeed} onChange={changeHandler} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='price'>price</label>
                        <input type='number' name='price' value={formData.price} onChange={changeHandler} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='forceTime'>forceTime</label>
                        <input type='date' name='forceTime' value={formData.forceTime} onChange={changeHandler} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='attachments'>attachments</label>
                        <input type='file' name='attachments' value={formData.attachments} onChange={changeHandler} />
                    </div>
                    <div className='form-group'>
                        <input type='submit' value='Login' className='btn btn-primary btn-block' />
                    </div>
                </form>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    projects: state.projects
});

export default connect(mapStateToProps, { clearErrors, setAlert, getCategories, createProject })(NewProject);
