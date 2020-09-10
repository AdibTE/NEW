import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const Alerts = ({ alerts }) => {
    let i = 0;
    let history = useHistory();
    return (
        <div className='alerts-wrapper'>
            {alerts.length > 0 &&
                alerts.map((alert) => {
                    if(alert.status === 404){
                        history.push('/404')
                    }
                    if (typeof alert.msg.errors == 'object') {
                        let type = alert.type === 'success' ? 'check' : 'times';
                        return alert.msg.errors.map((alrt) => (
                            <div className={'alert'} key={i++}>
                                <i className={'fas fa-' + type} />
                                {alrt.msg}
                                <button type='button'>
                                    <i className='fas fa-times' />
                                </button>
                            </div>
                        ));
                    } else {
                        let type = alert.type === 'success' ? 'check' : 'times';
                        return (
                            <div className='alert' key={alert.id}>
                                <i className={'fas fa-' + type} />
                                {typeof alert.msg == 'string' ? alert.msg : alert.msg.msg}
                                <button type='button'>
                                    <i className='fas fa-times' />
                                </button>
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
