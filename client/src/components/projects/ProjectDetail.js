import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import persianDate from 'persian-date';
import {
    getProjectDetails,
    clearErrors,
    addProject,
    deleteProject,
    payProject,
    getCategories
} from '../../actions/projectActions';
import { setAlert } from '../../actions/alertActions';
import { statusEnum } from '../../utils/enums';
import '../../assets/styles/detail/detail.css';

const ProjectDetail = ({
    projects: { current, categories, error, loading },
    auth: { user },
    getProjectDetails,
    getCategories,
    clearErrors,
    setAlert,
    addProject,
    payProject,
    deleteProject
}) => {
    let { id } = useParams();
    let history = useHistory();
    let [ isProjectOwner, setIsProjectOwner ] = useState(false);
    let [ isJustLoaded, setIsJustLoaded ] = useState(true);
    let [ statusTitle, setStatusTitle ] = useState('-');
    let [ catName, setCatName ] = useState(null);

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
    const getStatusEnumName = function(number) {
        statusEnum.forEach((status) => {
            if (status.level === number) {
                setStatusTitle(status.title);
            }
        });
    };
    useEffect(
        () => {
            getCategories();
            if (error) {
                // clearErrors();
                setAlert(error, 'danger');
            } else {
                isJustLoaded && getProjectDetails(id) && setIsJustLoaded(false);
                current && user && current.employer._id === user._id && setIsProjectOwner(true);
                current && getStatusEnumName(current.status);
            }
            categories &&
                categories.forEach((cat) => {
                    if (cat.ID === current.category) {
                        setCatName(cat.title);
                    }
                });
        },
        // eslint-disable-next-line
        [ error, user, current ]
    );
    return (
        <Fragment>
            <section id='Project_Details' className='container'>
                <main>
                    <h1>{current ? current.title : <Skeleton />}</h1>
                    {current ? (
                        <ul className='categories'>
                            {catName ? (
                                <li>
                                    <Link className='main' to='#'>
                                        {catName}
                                    </Link>
                                </li>
                            ) : (
                                <Skeleton width={50} />
                            )}
                            {current.tags &&
                                current.tags.map((tag, i) => (
                                    <li key={i}>
                                        <Link to='#'>{tag.title}</Link>
                                    </li>
                                ))}
                        </ul>
                    ) : (
                        <Skeleton />
                    )}
                    <p>{current ? current.description : <Skeleton />}</p>
                    <div className='attachments'>
                        {current ? (
                            current.attachments.map((file) => (
                                <a
                                    href={'/uploads/' + current.employer._id + '/' + file}
                                    key={file}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    <i className='fas fa-paperclip' />
                                    پیوست
                                </a>
                            ))
                        ) : (
                            <Skeleton count={5} />
                        )}
                    </div>
                </main>
                <aside>
                    <div className='details'>
                        {!isProjectOwner && (
                            <Fragment>
                                <div className='price'>{current ? current.price : <Skeleton />} تومان</div>
                                <button onClick={takeProjectHandler}>
                                    ثبت پروژه <span>(تحویل در ۲۰ روز)</span>
                                </button>
                            </Fragment>
                        )}
                        {isProjectOwner && (
                            <button onClick={payHandler}>
                                پرداخت <span>({current ? current.price : <Skeleton />} تومان)</span>
                            </button>
                        )}
                        {!isProjectOwner && (
                            <div className='forceTime'>
                                <i className='fas fa-clock' />
                                <span>
                                    تحویل تا{' '}
                                    {current ? (
                                        new persianDate(Date.parse(current.forceTime)).format('D MMMM YYYY')
                                    ) : (
                                        <Skeleton />
                                    )}
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
                                    <span className='value'>{current.applicant ? current.applicant.name : '-'}</span>
                                </div>
                                <div className='item'>
                                    <span className='label'>وضعیت پروژه</span>
                                    <span className='value'>{current ? statusTitle : <Skeleton />}</span>
                                </div>
                                <div className='item'>
                                    <span className='label'>تاریخ تحویل</span>
                                    <span className='value'>
                                        {current ? (
                                            new persianDate(Date.parse(current.forceTime)).format('D MMMM YYYY')
                                        ) : (
                                            <Skeleton />
                                        )}
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
                    <input type='text' placeholder='جستجو در میان هزاران پروژه...' />
                    <button>
                        <img src='/assets/images/icons/search-24px.svg' alt='جستجو' />
                    </button>
                </form>
            </section>
        </Fragment>
    );
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
    payProject,
    getCategories
})(ProjectDetail);
