import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { clearErrors, createCategory } from '../../actions/projectActions';
import { setAlert } from '../../actions/alertActions';
import { connect } from 'react-redux';

const NewCategory = ({ setAlert, clearErrors, createCategory, projects: { error, categories } }) => {
	const history = useHistory();
	const initialState = {
		title: '',
		picture: ''
	};
	const [ formData, setFormData ] = useState(initialState);
	const [ fileInputLabel, setfileInputLabel ] = useState('انتخاب فایل');

	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const fileHandler = async (e) => {
		if (e.target.files[0]) {
			setFormData({ ...formData, [e.target.name]: e.target.files });
			if (e.target.files.length > 1) setfileInputLabel(`${e.target.files.length} فایل انتخاب شده`);
			else setfileInputLabel(e.target.files[0].name);
		}
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		if (formData.title === '' || !formData.picture) {
			setAlert('لطفا همه فیلد ها را پر کنید', 'danger');
		} else {
			let submited = await createCategory(formData);
			if (submited) {
				setAlert('دسته‌بندی با موفقیت ثبت شد', 'success');
				setFormData(initialState);
				history.push('/settings/categories');
			}
		}
	};

	useEffect(
		() => {
			if (error) {
				setAlert(error, 'danger');
				clearErrors();
			}
		},
		// eslint-disable-next-line
		[ error ]
	);
	return (
		<section id="CreateProject" className="container">
			<form onSubmit={submitHandler}>
				<h1>ثبت دسته‌بندی جدید</h1>
				<div className="input">
					<label>عنوان</label>
					<input type="title" name="title" value={formData.title} onChange={changeHandler} />
				</div>
				<div className="input">
					<label>عکس</label>
					<input type="file" name="picture" onChange={fileHandler} dir="ltr" id="picture" accept="image/*" />
					<label className="file-label" htmlFor="picture">
						<i className="fas fa-upload" />
						{fileInputLabel}
					</label>
				</div>
				<button type="submit" value="Submit">
					ثبت دسته‌بندی جدید
				</button>
			</form>
		</section>
	);
};

const mapStateToProps = (state) => ({
	projects: state.projects,
	auth: state.auth
});

export default connect(mapStateToProps, { createCategory, setAlert, clearErrors })(NewCategory);
