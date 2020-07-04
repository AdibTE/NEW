import React from 'react';
import gif from './spinner.gif';

const Spinner = () => (
    <div style={spinner}>
        <img src={gif} alt='' />
    </div>
);

const spinner = {
    width: '100%',
};

export default Spinner;
