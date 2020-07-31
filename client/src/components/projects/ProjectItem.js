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
        <Link to={'/projects/details/' + data.ID} className='item'>
            <p>عنوان: {data.title}</p>
            <p>ستاره: {data.starsNeed}</p>
            <p>قیمت: {data.price}</p>
            <p>کارفرما: {data.employer.email}</p>
            <p>تا {new persianDate(Date.parse(data.forceTime)).format('D MMMM ماه YYYY')}</p>
            {isOwner && <button onClick={deleteItem} className='fa fa-times' />}
            {isOwner && <button onClick={payItem} className='fa fa-credit-card' />}
        </Link>
    );
};

const mapStateToProps = (state) => ({
    projects: state.projects,
    auth: state.auth
});

export default connect(mapStateToProps, { deleteProject, clearErrors, setAlert, payProject })(ProjectItem);
