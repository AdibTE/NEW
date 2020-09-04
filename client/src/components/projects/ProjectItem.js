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
    let isOwner = user && data.employer._id === user._id;
    let deleteItem = async (e) => {
        e.preventDefault();
        let response = await deleteProject(data.ID);
        setAlert(response.msg, response.type);
        clearErrors();
    };
    let payItem = async (e) => {
        e.preventDefault();
        let response = await payProject(data.ID);
        setAlert(response.msg, response.type);
        clearErrors();
    };
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
                <span>
                    <i class='fas fa-list' />
                    {data.category}
                </span>
                <span>
                    <i class='fas fa-list' />
                    {data.employer.email}
                </span>
                <span>
                    <i class='fas fa-list' />
                    {data.status}
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
