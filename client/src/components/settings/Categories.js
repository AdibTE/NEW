import React, { useEffect } from 'react';
import { clearErrors, getCategories } from '../../actions/projectActions';
import { setAlert } from '../../actions/alertActions';
import { connect } from 'react-redux';

const Categories = ({
	setAlert,
	clearErrors,
	getCategories,
	auth: { user },
	projects: { loading, error, categories }
}) => {
	useEffect(
		() => {
			if (error) {
				setAlert(error, 'danger');
				clearErrors();
			} else {
				getCategories();
			}
		},
		// eslint-disable-next-line
		[ error ]
	);
	return loading && categories ? (
		<div>
			<table class="table">
				<thead>
					<tr>
						<th>آیدی</th>
						<th>عنوان</th>
						<th>تصویر</th>
					</tr>
				</thead>
				<tbody>
					{categories.map((cat) => (
						<tr>
							<td>{cat.ID}</td>
							<td>{cat.title}</td>
							<td>{cat.picture}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	) : <div className="blank"></div>;
};

const mapStateToProps = (state) => ({
	projects: state.projects,
	auth: state.auth
});

export default connect(mapStateToProps, { getCategories, setAlert, clearErrors })(Categories);
