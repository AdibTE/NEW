import React, { useEffect } from 'react';
import { clearErrors, getCategories } from '../../actions/projectActions';
import { setAlert } from '../../actions/alertActions';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Div = styled.div`
	width: clamp(300px, 75%, 1024px);
	min-height: 74vh;
	margin:2rem auto;
	padding: 1rem;
	display: grid;
	place-items: center;
	h3 {
		margin-bottom:1rem;
		font-size: 30px;
		color: var(--black);
	}
`;
const Categories = ({ setAlert, clearErrors, getCategories, auth: { user }, projects: { error, categories } }) => {
	useEffect(
		() => {
			if (error) {
				setAlert(error, 'danger');
				clearErrors();
			}
			getCategories();
		},
		// eslint-disable-next-line
		[ error, categories ]
	);

	return categories ? (
		<Div>
			<h3>دسته‌بندی ها</h3>
			<table>
				<thead>
					<tr>
						<th>آیدی</th>
						<th>عنوان</th>
						<th>تصویر</th>
						<th>اقدامات</th>
					</tr>
				</thead>
				<tbody>
					{categories.map((cat) => (
						<tr key={cat.ID}>
							<td>{cat.ID}</td>
							<td>{cat.title}</td>
							<td>
								<img className="thumb" src={'/uploads/categories/' + cat.picture} alt={cat.title} />
							</td>
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

export default connect(mapStateToProps, { getCategories, setAlert, clearErrors })(Categories);
