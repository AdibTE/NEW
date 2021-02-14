import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { clearErrors, getCategories , createStar } from '../../actions/projectActions';
import { setAlert } from '../../actions/alertActions';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const NewStar = ({ setAlert, clearErrors, getCategories,createStar, projects: { loading, error, categories } }) => {
	const history = useHistory();
	const initialState = {
		category:'',
		starCount: '',
		point: '',
		price: ''
	};
	const [ formData, setFormData ] = useState(initialState);

	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		if (formData.category === '' || formData.starCount === '' || formData.point === '' || formData.price === '') {
			setAlert('لطفا همه فیلد ها را پر کنید', 'danger');
		} else {
			let submited = await createStar(formData);
			if (submited) {
				setAlert('ستاره با موفقیت ثبت شد', 'success');
				setFormData(initialState);
				history.push('/settings');
			}
		}
	};

	useEffect(
		() => {
			(async function() {
				if (error) {
					setAlert(error, 'danger');
					clearErrors();
				} else {
					getCategories();
				}
			})();
		},
		// eslint-disable-next-line
		[ error ]
	);
	if (loading || !categories) return <Spinner />;
	return (
		<section id="CreateProject" className="container">
			<form onSubmit={submitHandler}>
				<h1>ثبت ستاره جدید</h1>
				<div className="input">
					<label>دسته‌بندی</label>
					<select name="category" value={formData.category} onChange={changeHandler}>
						<option value="" disabled>
							-- انتخاب کنید --
						</option>
						{categories.map((cat) => {
							return (
								<option value={cat.ID} key={cat.ID}>
									{cat.title}
								</option>
							);
						})}
					</select>
				</div>
				<div className="input">
					<label>عدد ستاره</label>
					<input type="text" name="starCount" value={formData.starCount} onChange={changeHandler} />
				</div>
				<div className="input">
					<label>امتیاز لازم</label>
					<input type="text" name="point" value={formData.point} onChange={changeHandler} />
				</div>
				<div className="input">
					<label>قیمت</label>
					<input type="text" name="price" value={formData.price} onChange={changeHandler} />
				</div>
				<button type="submit" value="Submit">
					ثبت ستاره جدید
				</button>
			</form>
		</section>
	);
};

const mapStateToProps = (state) => ({
	projects: state.projects,
	auth: state.auth
});

export default connect(mapStateToProps, { getCategories, setAlert, clearErrors,createStar })(NewStar);
