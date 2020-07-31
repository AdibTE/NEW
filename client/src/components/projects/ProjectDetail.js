import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getProjectDetails, clearErrors } from '../../actions/projectActions';
import { setAlert } from '../../actions/alertActions';
import { Fragment } from 'react';
import Spinner from '../layout/Spinner';

const ProjectDetail = ({ projects: { current, error, loading }, getProjectDetails, clearErrors, setAlert }) => {
    let { id } = useParams();
    let history = useHistory();

    useEffect(
        () => {
            if (error) {
                clearErrors();
                setAlert(error, 'danger');
                history.push('/404');
            } else {
                getProjectDetails(id);
            }
        },
        // eslint-disable-next-line
        [ error ]
    );
    if (loading || !current) return <Spinner />;
    else {
        return (
            <Fragment>
                {current.title}
            </Fragment>
        );
    }
};

const mapStateToProps = (state) => ({
    projects: state.projects
});

export default connect(mapStateToProps, { getProjectDetails, clearErrors, setAlert })(ProjectDetail);
