import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { isLoaded, isLoading } from '../../actions/loadingActions';
import gif from './spinner.gif';

const Spinner = ({ auth, loading, isLoaded, isLoading }) => {
    useEffect(() => {
        isLoaded();
    });
    if (loading || auth.loading) {
        return (
            <div style={spinner}>
                <img src={gif} alt='' />
            </div>
        );
    } else {
        return null;
    }
};

const spinner = {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: '0',
    left: '0',
    display: 'grid',
    backgroundColor: 'white',
    placeItems: 'center',
    zIndex: '999999999999'
};

const mapStateToProps = (state) => ({
    loading: state.loading,
    auth: state.auth
});

export default connect(mapStateToProps, { isLoaded, isLoading })(Spinner);
