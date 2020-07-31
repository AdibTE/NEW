import React from 'react';
import persianDate from 'persian-date';
import { Link } from 'react-router-dom';

// import { connect } from 'react-redux';

const ProjectItem = ({ data }) => {
    // new persianDate([year,month,day]).toLocale('fa').format();

    return (
        <div className="item">
            <p>عنوان: {data.title}</p>
            <p>ستاره: {data.starsNeed}</p>
            <p>قیمت: {data.price}</p>
            <p>تا {new persianDate(data.forceTime).format('D MMMM ماه YYYY')}</p>
            <p>
                <Link to={'/projects/details/' + data.ID}>لینک</Link>
            </p>
        </div>
    );
};

// const mapStateToProps = (state) => ({
//     alerts: state.alerts
// });

// export default connect(mapStateToProps, null)(ProjectItem);
export default ProjectItem;
