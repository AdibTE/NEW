import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { getProjects, clearErrors, getUserProjects } from '../../actions/projectActions';
import { setAlert } from '../../actions/alertActions';

import Spinner from '../layout/Spinner';
import ProjectItem from './ProjectItem';
import '../../assets/styles/projects/projects.css';

const Projects = ({
    projects: { items, error, loading },
    auth: { user },
    getProjects,
    clearErrors,
    getUserProjects
}) => {
    const [ filter, setFilter ] = useState('all');

    let filterHandler = function(e) {
        setFilter(e.target.value);
        e.target.value === 'mine' ? getUserProjects() : getProjects();
    };
    useEffect(
        () => {
            user && setFilter('mine');
            filter === 'mine' ? getUserProjects() : getProjects();
            if (error) {
                setAlert(error, 'danger');
                clearErrors();
            }
        },
        // eslint-disable-next-line
        [ error , filter ]
    );
    if (loading) return <Spinner />;
    else {
        return (
            <Fragment>
                <section id='SearchBox' className='container'>
                    <form className='search-box'>
                        <select id='projects' onChange={filterHandler} value={filter}>
                            <option value='all'>همه پروژه ها</option>
                            <option value='mine'>پروژه های من</option>
                        </select>
                        <i className='fas fa-angle-down' />
                        <input type='text' placeholder='جستجو در میان هزاران پروژه...' />
                        <button>
                            <img src='/assets/images/icons/search-24px.svg' />
                        </button>
                    </form>
                </section>
                <section id='Categories' className='container'>
                    <div className='categories'>
                        <a href='' className='category'>
                            کامپیوتر
                            <img src='/assets/images/computer.jpg' alt='' />
                        </a>
                        <a href='' className='category'>
                            کامپیوتر
                            <img src='/assets/images/computer.jpg' alt='' />
                        </a>
                        <a href='' className='category'>
                            کامپیوتر
                            <img src='/assets/images/computer.jpg' alt='' />
                        </a>
                        <a href='' className='category'>
                            کامپیوتر
                            <img src='/assets/images/computer.jpg' alt='' />
                        </a>
                        <a href='' className='category'>
                            کامپیوتر
                            <img src='/assets/images/computer.jpg' alt='' />
                        </a>
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

export default connect(mapStateToProps, { getProjects, clearErrors, getUserProjects })(Projects);
