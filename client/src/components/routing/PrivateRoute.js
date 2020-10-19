import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { loadUser } from '../../actions/authActions';

const PrivateRoute = ({
	auth: { isAuthenticated, loading, user },
	loadUser,
	path,
	component: Component,
	authorize,
	...rest
}) => {
	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);
	return (
		<Route
			{...rest}
			render={(props) =>
				!loading && !isAuthenticated ? (
					<Redirect to={'/login?returnURL=' + path} />
				) : authorize && user.type !== authorize ? (
					<Redirect to={'/restricted'} content="Restricted!" />
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
