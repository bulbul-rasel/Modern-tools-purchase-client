import React from 'react';
import PrimaryButton from '../components/PrimaryButton';
import banner from '../assets/banner.png'

const Banner = () => {
    return (
        <div className="hero min-h-screen ">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={banner} className="max-w-sm rounded-lg shadow-2xl" alt='' />
                <div>
                    <h1 className="text-5xl font-bold text-primary">Your Daily Life Easier Here</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button className='btn btn-primary'>Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;