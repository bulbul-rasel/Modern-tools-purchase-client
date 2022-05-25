import React from 'react';
import banner from '../assets/banner.png'

const Banner = () => {
    return (
        <div data-aos="fade-up" className="hero min-h-screen ">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={banner} className="w-full max-w-xs rounded-lg shadow-2xl" alt='' />
                <div>
                    <h1 className="text-5xl font-bold text-primary">Your Daily Life Easier Here</h1>
                    <p className="py-6">For daily life, handy tools are necessary for all ages. Any types of works it made it easier...</p>
                    <button className='btn btn-primary'>Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;