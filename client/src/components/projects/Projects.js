import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProjects, clearErrors } from '../../actions/projectActions';
import { setAlert } from '../../actions/alertActions';
import { Fragment } from 'react';

import Spinner from '../layout/Spinner';
import ProjectItem from './ProjectItem';

const Projects = ({ projects: { items, error, loading }, getProjects, clearErrors }) => {
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
            <Fragment>
                {items.length > 0 &&
                    items.map((item) => {
                        return <ProjectItem key={item.ID} data={item} />;
                    })}
            </Fragment>
        );
    }
};

const mapStateToProps = (state) => ({
    projects: state.projects
});

export default connect(mapStateToProps, { getProjects, clearErrors })(Projects);
