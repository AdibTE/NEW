import React from 'react';
import { connect } from 'react-redux';

const Alerts = ({ alerts }) => {
    let i = 0;
    return (
        <div>
            {alerts.length > 0 &&
                alerts.map((alert) => {
                    if (typeof alert.msg.errors == 'object') {
                        return alert.msg.errors.map((alrt) => <div key={i++}>{alrt.msg}</div>);
                    } else {
                        return <div key={alert.id}>{alert.msg}</div>;
                    }
                })}
        </div>
    );
};

const mapStateToProps = (state) => ({
    alerts: state.alerts
});

export default connect(mapStateToProps, null)(Alerts);
