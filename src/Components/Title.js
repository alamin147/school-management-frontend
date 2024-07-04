import React from 'react';

const Title = ({ heading }) => {
    return (
        <div className='text-center'>
            <h3 className='text-4xl font-medium mb-3'>{heading}</h3>
        </div>
    );
};

export default Title;