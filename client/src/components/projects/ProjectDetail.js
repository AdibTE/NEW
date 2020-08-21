import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProjectDetails, clearErrors, addProject } from '../../actions/projectActions';
import { setAlert } from '../../actions/alertActions';
import Spinner from '../layout/Spinner';

const ProjectDetail = ({
    projects: { current, error, loading },
    getProjectDetails,
    clearErrors,
    setAlert,
    addProject
}) => {
    let { id } = useParams();
    // let history = useHistory();

    const submitHandler = async (e) => {
        e.preventDefault();
        let response = await addProject(id);
        setAlert(response.msg, response.type);
        clearErrors();
    };
    useEffect(
        () => {
            if (error) {
                // clearErrors();
                // setAlert(error, 'danger');
                // history.push('/404');
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
            <form onSubmit={submitHandler} style={{ width: 75 + '%', margin: 'auto' }}>
                <div className='form-group'>
                    <label htmlFor=''>Title:</label>
                    <input type='text' value={current.title} />
                </div>
                <button>ثبت پروژه</button>
            </form>
        );
    }
};

const mapStateToProps = (state) => ({
    projects: state.projects
});

export default connect(mapStateToProps, { getProjectDetails, clearErrors, setAlert, addProject })(ProjectDetail);
