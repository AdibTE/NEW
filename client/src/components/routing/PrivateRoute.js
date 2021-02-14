import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { loadUser } from '../../actions/authActions';
import Spinner from '../layout/Spinner';
import Error from '../pages/Error';

const PrivateRoute = ({
    auth: { isAuthenticated, loading, user },
    loadUser,
    path,
    component: Component,
    authorize,
    ...rest
}) => {
    useEffect(() => {
        (async function() {
            await loadUser();
        })();
        console.log('authorize ', authorize);
        console.log('isAuthenticated ', isAuthenticated);
        // eslint-disable-next-line
    }, []);
    return loading ? ( <
        Spinner / >
    ) : ( <
        Route {...rest }
        render = {
            (props) =>
            authorize != null && isAuthenticated && user.type !== authorize ? ( <
                Error type={401} / >
            ) : !isAuthenticated ? ( <
                Redirect to = { '/login?returnURL=' + path }
                />
            ) : ( <
                Component {...props }
                />
            )
        }
        />
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps, { loadUser })(PrivateRoute);