import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Spinner from '../../components/layout/Spinner';
import { loadUser } from '../../actions/authActions';

const CustomRoute = ({ auth, loadUser, component: Component, ...rest }) => {
    useEffect(
        () => {
            loadUser();
        },
        // eslint-disable-next-line
        []
    );
    if (auth.loading) {
        return <Spinner />;
    } else {
        return <Route {...rest} render={(props) => <Component {...props} />} />;
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps, { loadUser })(CustomRoute);
