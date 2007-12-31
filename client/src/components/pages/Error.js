import React from 'react';

function Error({ content, type }) {
    if(type === 401){
        content = '401 | شما به این صفحه دسترسی ندارید 🚫'
    }
    return (
        <div className='container error-page'>
            <h1>{content}</h1>
        </div>
    );
}

Error.defaultProps = {
    content: '404 | صفحه مورد نظر پیدا نشد 😵',
    type: 404
};

export default Error;
