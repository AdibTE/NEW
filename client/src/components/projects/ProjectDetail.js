import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import persianDate from 'persian-date';
import { getProjectDetails, clearErrors, addProject, deleteProject, payProject } from '../../actions/projectActions';
import { setAlert } from '../../actions/alertActions';
import Spinner from '../layout/Spinner';
import '../../assets/styles/detail/detail.css';

const ProjectDetail = ({
    projects: { current, error, loading },
    auth: { user },
    getProjectDetails,
    clearErrors,
    setAlert,
    addProject,
    payProject,
    deleteProject
}) => {
    let { id } = useParams();
    let history = useHistory();
    let [ isProjectOwner, setIsProjectOwner ] = useState(false);

    const takeProjectHandler = async (e) => {
        e.preventDefault();
        let response = await addProject(id);
        setAlert(response.msg, response.type);
        clearErrors();
    };
    const payHandler = async (e) => {
        e.preventDefault();
        let response = await payProject(id);
        setAlert(response.msg, response.type);
        clearErrors();
    };
    const deleteHandler = async (e) => {
        e.preventDefault();
        let response = await deleteProject(id);
        setAlert(response.msg, response.type);
        clearErrors();
        history.push('/projects');
    };
    useEffect(
        () => {
            if (error) {
                // clearErrors();
                setAlert(error, 'danger');
            } else {
                current && user && current.employer._id === user._id && setIsProjectOwner(true);
                getProjectDetails(id);
            }
        },
        // eslint-disable-next-line
        [ error, user ]
    );

    if (loading || !current) return <Spinner />;
    else {
        return (
            <Fragment>
                <section id='Project_Details' className='container'>
                    <main>
                        <h1>{current.title}</h1>
                        <ul className='categories'>
                            <li>
                                <Link className='main' to='#'>
                                    کامپیوتر
                                </Link>
                            </li>
                            <li>
                                <Link to='#'>ری‌اکت</Link>
                            </li>
                            <li>
                                <Link to='#'>فرانت‌اند</Link>
                            </li>
                            <li>
                                <Link to='#'>جاواسکریپت</Link>
                            </li>
                        </ul>
                        <p>{current.description}</p>
                        <div className='attachments'>
                            {current.attachments.map((file) => (
                                <a href={'/uploads/' + current.employer._id + '/' + file} key={file} target="_blank" rel="noopener noreferrer">
                                    <i className='fas fa-paperclip' />
                                    پیوست
                                </a>
                            ))}
                        </div>
                    </main>
                    <aside>
                        <div className='details'>
                            {!isProjectOwner && (
                                <Fragment>
                                    <div className='price'>{current.price} تومان</div>
                                    <button onClick={takeProjectHandler}>
                                        ثبت پروژه <span>(تحویل در ۲۰ روز)</span>
                                    </button>
                                </Fragment>
                            )}
                            {isProjectOwner && (
                                <button onClick={payHandler}>
                                    پرداخت <span>({current.price} تومان)</span>
                                </button>
                            )}
                            {!isProjectOwner && (
                                <div className='forceTime'>
                                    <i className='fas fa-clock' />
                                    <span>
                                        تحویل تا {new persianDate(Date.parse(current.forceTime)).format('D MMMM YYYY')}
                                    </span>
                                </div>
                            )}
                        </div>
                        {!isProjectOwner ? (
                            <div className='related'>
                                <span>پروژه‌های مشابه:</span>
                                <Link to='#' className='project'>
                                    <h2>این یک عنوان پیشفرض است است است است است است است</h2>
                                    <span className='price'>۱۲۰,۰۰۰ تومان</span>
                                </Link>
                                <Link to='#' className='project'>
                                    <h2>این یک عنوان پیشفرض است</h2>
                                    <span className='price'>۱۲۰,۰۰۰ تومان</span>
                                </Link>
                                <Link to='#' className='project'>
                                    <h2>این یک عنوان پیشفرض است</h2>
                                    <span className='price'>۱۲۰,۰۰۰ تومان</span>
                                </Link>
                            </div>
                        ) : (
                            <div className='employer-box'>
                                <div className='options'>
                                    <div className='item'>
                                        <span className='label'>نام کارجو</span>
                                        <span className='value'>
                                            {current.applicant ? current.applicant.name : '-'}
                                        </span>
                                    </div>
                                    <div className='item'>
                                        <span className='label'>وضعیت پروژه</span>
                                        <span className='value'>{current.status}</span>
                                    </div>
                                    <div className='item'>
                                        <span className='label'>تاریخ تحویل</span>
                                        <span className='value'>
                                            {new persianDate(Date.parse(current.forceTime)).format('D MMMM YYYY')}
                                        </span>
                                    </div>
                                    <div className='item'>
                                        <span className='label'>فایل پیش‌نمایش</span>
                                        <Link to='#' target='_blank' className='file'>
                                            نمایش
                                        </Link>
                                    </div>
                                </div>
                                <div className='actions'>
                                    <div className='edit'>
                                        <i className='fas fa-edit' /> ویرایش پروژه
                                    </div>
                                    <div className='delete' onClick={deleteHandler}>
                                        <i className='fas fa-trash' /> حذف پروژه
                                    </div>
                                </div>
                            </div>
                        )}
                    </aside>
                </section>
                <section id='SearchBox' className='container'>
                    <form className='search-box'>
                        <select id='projects'>
                            <option value='all'>همه پروژه ها</option>
                            <option value='mine'>پروژه های من</option>
                        </select>
                        <i className='fas fa-angle-down' />
                        <input type='text' placeholder='جستجو در میان هزاران پروژه...' />
                        <button>
                            <img src='/assets/images/icons/search-24px.svg' alt='جستجو' />
                        </button>
                    </form>
                </section>
            </Fragment>
        );
    }
};

const mapStateToProps = (state) => ({
    projects: state.projects,
    auth: state.auth
});

export default connect(mapStateToProps, {
    getProjectDetails,
    clearErrors,
    setAlert,
    addProject,
    deleteProject,
    payProject
})(ProjectDetail);
