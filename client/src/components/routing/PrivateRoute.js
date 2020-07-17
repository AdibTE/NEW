import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { loadUser } from '../../actions/authActions';

const PrivateRoute = ({ auth: { isAuthenticated, loading }, loadUser, component: Component, ...rest }) => {
    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);
    return (
        <Route
            {...rest}
            render={(props) => (!loading && !isAuthenticated ? <Redirect to='/login' /> : <Component {...props} />)}
        />
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps, { loadUser })(PrivateRoute);
