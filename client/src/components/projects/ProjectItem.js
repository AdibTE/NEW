import React from 'react';
import persianDate from "persian-date";

// import { connect } from 'react-redux';


const ProjectItem = ({ data }) => {
    // new persianDate([year,month,day]).toLocale('fa').format();

    return <div>
        <p>عنوان: {data.title}</p>
        <p>ستاره: {data.starsNeed}</p>
        <p>قیمت: {data.price}</p>
        <p>تا  {new persianDate(data.forceTime).format('D MMMM ماه YYYY') }</p>
    </div>;
};

// const mapStateToProps = (state) => ({
//     alerts: state.alerts
// });

// export default connect(mapStateToProps, null)(ProjectItem);
export default ProjectItem;
