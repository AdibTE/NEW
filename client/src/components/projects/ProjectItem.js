import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import persianDate from 'persian-date';
import { Link } from 'react-router-dom';

import { deleteProject, clearErrors, payProject } from '../../actions/projectActions';
import { setAlert } from '../../actions/alertActions';

const ProjectItem = ({
    data,
    deleteProject,
    clearErrors,
    setAlert,
    payProject,
    projects: { error },
    auth: { user }
}) => {
    useEffect(() => {}, [ error ]);
    return (
        <Link to={'/projects/details/' + data.ID} className='project-item'>
            <h3> {data.title}</h3>
            <p>
                <span>
                    <i class='fas fa-star' />
                    {data.starsNeed} ستاره
                </span>
                <span>
                    <i class='far fa-money-bill-alt' />
                    {data.price} تومان
                </span>
                <span>
                    <i class='fas fa-calendar-alt' />
                    تا {new persianDate(Date.parse(data.forceTime)).format('D MMMM YYYY')}
                </span>
            </p>
        </Link>
    );
};

const mapStateToProps = (state) => ({
    projects: state.projects,
    auth: state.auth
});

export default connect(mapStateToProps, { deleteProject, clearErrors, setAlert, payProject })(ProjectItem);
