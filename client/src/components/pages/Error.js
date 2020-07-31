import React from 'react';

function Error({ content }) {
    return (
        <div className='container'>
            <h1>{content}</h1>
        </div>
    );
}

Error.defaultProps = {
    content: '404'
};

export default Error;
