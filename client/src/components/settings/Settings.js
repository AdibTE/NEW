import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/settings/settings.css';

const Settings = () => {
	return (
		<section className="settings-container container">
			<h3>تنظیمات</h3>
			<div className="wrapper">
				<div className="setting">
					<Link to="settings/categories">دسته بندی ها</Link>
				</div>
				<div className="setting">
					<Link to="settings/stars">مدیریت ستاره ها</Link>
				</div>
			</div>
		</section>
	);
};

export default Settings;
