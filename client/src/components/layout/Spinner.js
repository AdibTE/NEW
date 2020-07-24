import React from 'react';
import gif from './spinner.gif';

const Spinner = () => {
    return (
        <div style={spinner}>
            <img src={gif} alt='' />
        </div>
    );
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

export default Spinner;
