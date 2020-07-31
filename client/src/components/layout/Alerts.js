import React from 'react';
import { connect } from 'react-redux';

const Alerts = ({ alerts }) => {
    let i = 0;
    return (
        <div className='alerts-container'>
            {alerts.length > 0 &&
                alerts.map((alert) => {
                    if (typeof alert.msg.errors == 'object') {
                        return alert.msg.errors.map((alrt) => (
                            <div className={'alert alert-' + alert.type} key={i++}>
                                {alrt.msg}
                            </div>
                        ));
                    } else {
                        return (
                            <div className={'alert alert-' + alert.type} key={alert.id}>
                                {typeof alert.msg == 'string' ? alert.msg : alert.msg.msg}
                            </div>
                        );
                    }
                })}
        </div>
    );
};

const mapStateToProps = (state) => ({
    alerts: state.alerts
});

export default connect(mapStateToProps, null)(Alerts);
