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
		(async () => {
			await loadUser();
		})();
		// eslint-disable-next-line
	}, []);
	return loading ? (
		<Spinner />
	) : (
		<Route
			{...rest}
			render={(props) =>
				authorize != null && isAuthenticated && user.type !== authorize ? (
					<Error  content="Restricted!"/>
				) : !isAuthenticated ? (
					<Redirect to={'/login?returnURL=' + path} />
				) : (
					<Component {...props} />
				)}
		/>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});
export default connect(mapStateToProps, { loadUser })(PrivateRoute);
