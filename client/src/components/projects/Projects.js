import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProjects, clearErrors, getUserProjects, search } from '../../actions/projectActions';
import { setAlert } from '../../actions/alertActions';

import Spinner from '../layout/Spinner';
import ProjectItem from './ProjectItem';
import '../../assets/styles/projects/projects.css';

const Projects = ({
    projects: { items, error, loading },
    auth: { user },
    getProjects,
    clearErrors,
    getUserProjects,
    search
}) => {
    const [ filter, setFilter ] = useState('all');
    const [ justLoaded, setJustLoaded ] = useState(true);
    const [ userType, setUserType ] = useState(undefined);
    const [ searchString, setSearchString ] = useState('');

    let filterHandler = useCallback(
        (e) => {
            let value = e ? e.target.getAttribute('value') : filter;
            if (justLoaded && user) {
                value = 'mine';
                setJustLoaded(false);
            }
            setFilter(value);
            value === 'mine' ? getUserProjects() : getProjects();
        },
        // eslint-disable-next-line
        [ filter ]
    );
    const searchHandler = (e) => {
        e.preventDefault();
        // console.log(searchString);
        search(searchString);
    };
    const onChange = (e) => {
        setSearchString(e.target.value);
    };
    useEffect(
        () => {
            filterHandler();
            user && user.type === 0 && setUserType(0); // admin
            user && user.type === 1 && setUserType(1); // employer
            user && user.type === 2 && setUserType(2); // applicant
            if (error) {
                setAlert(error, 'danger');
                clearErrors();
            }
        },
        // eslint-disable-next-line
        [ error, user, filterHandler ]
    );
    if (loading) return <Spinner />;
    else {
        return (
            <Fragment>
                <section id='SearchBox' className='container'>
                    <form className='search-box' onSubmit={searchHandler}>
                        <input
                            type='text'
                            value={searchString}
                            onChange={onChange}
                            placeholder='جستجو در میان هزاران پروژه...'
                        />
                        <button>
                            <img src='/assets/images/icons/search-24px.svg' alt='' />
                        </button>
                    </form>
                    <div className='filter-box'>
                        {user && (
                            <Fragment>
                                <span
                                    value='all'
                                    onClick={filterHandler}
                                    {...filter === 'all' && { className: 'active' }}
                                >
                                    <i className={filter === 'all' ? 'fas fa-check-circle' : 'far fa-circle'} />همه
                                    پروژه ها
                                </span>
                                <span
                                    value='mine'
                                    onClick={filterHandler}
                                    {...filter === 'mine' && { className: 'active' }}
                                >
                                    <i className={filter === 'mine' ? 'fas fa-check-circle' : 'far fa-circle'} />
                                    {userType === 2 ? 'پروژه برای من' : 'پروژه های من'}
                                </span>
                            </Fragment>
                        )}
                    </div>
                </section>
                <section id='Categories' className='container'>
                    <div className='categories'>
                        <Link to='' className='category'>
                            کامپیوتر
                            <img src='/assets/images/computer.jpg' alt='' />
                        </Link>
                        <Link to='' className='category'>
                            کامپیوتر
                            <img src='/assets/images/computer.jpg' alt='' />
                        </Link>
                        <Link to='' className='category'>
                            کامپیوتر
                            <img src='/assets/images/computer.jpg' alt='' />
                        </Link>
                        <Link to='' className='category'>
                            کامپیوتر
                            <img src='/assets/images/computer.jpg' alt='' />
                        </Link>
                        <Link to='' className='category'>
                            کامپیوتر
                            <img src='/assets/images/computer.jpg' alt='' />
                        </Link>
                    </div>
                </section>
                <section id='Projects' className='container'>
                    <div className='project-list'>
                        {items.length > 0 &&
                            items.map((item) => {
                                return <ProjectItem key={item.ID} data={item} />;
                            })}
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

export default connect(mapStateToProps, { getProjects, clearErrors, getUserProjects, search })(Projects);
