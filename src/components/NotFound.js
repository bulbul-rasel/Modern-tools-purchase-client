import React from 'react';
import notFound from '../assets/notFound.jpg'

const NotFound = () => {
    return (
        <div className='w-full flex justify-center items-center'>
            <img src={notFound} alt="" />
        </div>
    );
};

export default NotFound;