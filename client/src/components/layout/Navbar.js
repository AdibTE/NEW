import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../actions/authActions';

const Navbar = ({ title, icon, logout, auth: { isAuthenticated, user, projects } }) => {
	const logOut = () => {
		logout();
		window.location.reload();
	};
	let location = useLocation();
	const returnUrl = location.pathname + location.search;
	if (user) {
		var activeProjects = user.projects.filter((p) => {
			return p.status === 150;
		}).length;
		var inProgressProjects = user.projects.filter((p) => {
			return p.status <= 350;
		}).length;
	}

	useEffect(() => {}, [ user, projects ]);

	return (
		<header>
			<nav className="container">
				<ul>
					{isAuthenticated && user ? (
						<Fragment>
							{/* <li>
                                <Link to=''>
                                    <i className='fas fa-bars' />
                                </Link>
                            </li> */}
							<li>
								<Link to="" className="profile">
									<img src={'/assets/images/index.jpg'} alt="" />
									<div className="user-info">
										<h6>{user.name}</h6>
										{user.type === 2 ? (
											<span className="stars">
												<img src={'/assets/images/icons/star_rate-24px.svg'} alt="" />
												<img src={'/assets/images/icons/star_rate-24px.svg'} alt="" />
												<img src={'/assets/images/icons/star_rate-24px.svg'} alt="" />
												<img src={'/assets/images/icons/star_rate-24px.svg'} alt="" />
												<img src={'/assets/images/icons/star_rate-24px.svg'} alt="" />
												<p>({user.points} امتیاز)</p>
											</span>
										) : (
											<span className="projects">
												<p>
													{activeProjects || 0} پروژه فعال - {inProgressProjects} پروژه درحال
													انجام
												</p>
											</span>
										)}
									</div>
								</Link>
							</li>
							<li>
								<Link to="" onClick={logOut}>
									خروج
								</Link>
							</li>
							{user.type !== 2 && (
								<li>
									<Link to="/projects/create">ایجاد پروژه</Link>
								</li>
							)}
							{user.type === 0 && (
								<li>
									<Link to="/settings">تنظیمات</Link>
								</li>
							)}
						</Fragment>
					) : (
						<li className="login-register">
							<Link to={'/login?returnURL=' + returnUrl}>ورود</Link>
							<Link to="/register">ثبت‌نام</Link>
						</li>
					)}
					<li>
						<Link to="/projects">پروژه‌ها</Link>
					</li>
					<li>
						<Link to="/">نیو چیه؟</Link>
					</li>
				</ul>
				<div className="nav-logo">
					<Link to="/">
						<h1>نیو</h1>
					</Link>
				</div>
			</nav>
		</header>
	);
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string
};

Navbar.defaultProps = {
	title: 'NEW',
	icon: 'fas fa-id-card-alt'
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
