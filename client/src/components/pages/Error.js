import React from 'react';

function Error({ content }) {
    return (
        <div className='container error-page'>
            <h1>{content}</h1>
        </div>
    );
}

Error.defaultProps = {
    content: '404 | صفحه مورد نظر پیدا نشد 😵'
};

export default Error;
