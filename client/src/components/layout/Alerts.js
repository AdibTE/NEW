import React from 'react';
import { connect } from 'react-redux';

const Alerts = ({ alerts }) => {
    return (
        <div>
            {alerts &&
                alerts.length > 0 &&
                alerts.map((alert) => <div key={alert.id}>{alert.msg}</div>)}
        </div>
    );
};

const mapStateToProps = (state) => ({
    alerts: state.alerts
});

export default connect(mapStateToProps, null)(Alerts);
