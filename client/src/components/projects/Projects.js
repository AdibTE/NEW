import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getProjects, clearErrors, getUserProjects } from '../../actions/projectActions';
import { setAlert } from '../../actions/alertActions';
import { Fragment } from 'react';

import Spinner from '../layout/Spinner';
import ProjectItem from './ProjectItem';

const Projects = ({ projects: { items, error, loading }, auth:{user}, getProjects, clearErrors, getUserProjects }) => {
    let filterHandler = function(e) {
        e.target.value === 'all' ? getProjects() : getUserProjects();
        setFilter(e.target.value);
    };
    const [ filter, setFilter ] = useState('all');
    useEffect(
        () => {
            getProjects();
            if (error) {
                setAlert(error, 'danger');
                clearErrors();
            }
        },
        // eslint-disable-next-line
        [ error ]
    );
    if (loading) return <Spinner />;
    else {
        return (
            <div id="projects">
                {user && (
                    <select onChange={filterHandler} value={filter}>
                        <option value='all'>همه پروژه ها</option>
                        <option value='mine'>پروژه های من</option>
                    </select>
                )}
                {items.length > 0 &&
                    items.map((item) => {
                        return <ProjectItem key={item.ID} data={item} />;
                    })}
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    projects: state.projects,
    auth: state.auth,
});

export default connect(mapStateToProps, { getProjects, clearErrors, getUserProjects })(Projects);
