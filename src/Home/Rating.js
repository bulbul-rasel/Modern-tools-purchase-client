import React, { useEffect, useState } from 'react';
import quote from '../assets/quote.svg'
import Review from './Review';

const Rating = () => {
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/ratings')
            .then(res => res.json())
            .then(data => setRatings(data))
    }, [])
    return (
        <div>
            <section className='my-28'>
                <div>
                    <h3 className='text-3xl text-primary font-bold text-center'>What our Customer say</h3>
                    <h2 className='text-xl text-primary font-bold text-center'>Rating</h2>
                </div>
                <div className='flex justify-between'>
                    <div>
                        <img className='w-24 lg:w-48' src={quote} alt="" />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {ratings.slice(0, 6).map(review => <Review
                        key={review._id}
                        review={review}
                    ></Review>)}
                </div>
            </section>
        </div>
    );
};

export default Rating;