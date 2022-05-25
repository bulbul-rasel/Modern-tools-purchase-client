import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ulogo from '../assets/ulogo.png'
import flogo from '../assets/facebook.png'
import ilogo from '../assets/ilogo.png'

const Extra = () => {
    const [agree, setAgree] = useState(false);
    const handleCheckout = (event) => {
        event.preventDefault();
        toast.success('Thanks for giving feedback');
    }

    return (
        <div id='subscribe' className='w-full my-5 mt-10'>
            <h2 className='text-primary text-3xl text-center mb-3'>Give Your Feedback</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mx-10'>
                <div className='grid grid-cols-1'>
                    <form onSubmit={handleCheckout}>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full " required />
                        <input type="text" placeholder="Type here" className="input input-bordered w-full my-2" required />
                        <input type="text" placeholder="Type here" className="input input-bordered w-full " required />
                        <input
                            className='w-full btn btn-primary my-2'
                            type="submit"
                            value="Submit Feedback" required />
                    </form>


                </div>
                <div className='grid grid-cols-1'>
                    <h2 className='text-primary text-2xl text-center'>Please Subscribe On</h2>

                    <button
                        className='btn btn-primary w-100 rounded-pill my-3'>
                        <img style={{ width: "40px" }} src={ulogo} className='rounded-pill ' alt="" />
                        YouTube
                    </button>

                    <button
                        className='btn btn-primary w-100 rounded-pill my-2'>
                        <img style={{ width: "30px" }} src={flogo} alt="" />
                        FaceBook
                    </button>

                    <button
                        className='btn btn-primary w-100 rounded-pill my-3'>
                        <img style={{ width: "30px" }} src={ilogo} alt="" />
                        Instagram
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Extra;