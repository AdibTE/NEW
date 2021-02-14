import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clearErrors, getAllStars } from '../../actions/projectActions';
import { setAlert } from '../../actions/alertActions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Error from '../pages/Error';

const Div = styled.div`
	direction: rtl;
	width: clamp(300px, 75%, 1024px);
	min-height: 74vh;
	margin: 2rem auto;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	.panel-heading {
		margin-bottom: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		h3 {
			font-size: 26px;
			color: var(--black);
		}
		a {
			padding: 0.5rem 1rem;
			border: 1px solid var(--grey);
			border-radius: var(--radius);
		}
	}
`;
const Stars = ({ setAlert, clearErrors,getAllStars , auth: { user }, projects: { error, allStars } }) => {
	useEffect(
		() => {
			if (error) {
				setAlert(error, 'danger');
				clearErrors();
			}
			getAllStars();
		},
		// eslint-disable-next-line
		[ error, allStars ]
	);

	return user.type !== 0 ? (
		<Error type={401} />
	) : allStars ? (
		<Div>
			<div className="panel-heading">
				<h3>مدیریت ستاره‌ها</h3>
				<Link to="stars/create">ایجاد ستاره</Link>
			</div>
			<table>
				<thead>
					<tr>
						<th>دسته‌بندی</th>
						<th>عدد</th>
						<th>امتیاز لازم</th>
						<th>قیمت</th>
						<th>اقدامات</th>
					</tr>
				</thead>
				<tbody>
					{allStars.map((star) => (
						<tr key={star._id}>
							<td>{star.category.title}</td>
							<td>{star.starCount}</td>
							<td>{star.point}</td>
							<td>{star.price}</td>
							<td>
								<a href="#?">
									<i className="fas fa-edit" />
								</a>
								<a href="#?">
									<i className="fas fa-trash" />
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Div>
	) : (
		<div className="blank" />
	);
};

const mapStateToProps = (state) => ({
	projects: state.projects,
	auth: state.auth
});

export default connect(mapStateToProps, { getAllStars, setAlert, clearErrors })(Stars);
