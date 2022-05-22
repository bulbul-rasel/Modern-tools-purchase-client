import React from 'react';

const BusinessInfoCard = ({ img, cardTitle, bgClass, cardDes }) => {
    return (
        <div className={`card lg:card-side bg-base-100 shadow-xl ${bgClass}`}>
            <figure className='pl-5 pt-5'>
                <img src={img} alt="Album" />
            </figure>
            <div className="card-body shadow-lg">
                <h2 className="card-title text-purple-400 font-bold text-5xl">{cardTitle}</h2>
                <p className=' text-2xl text-purple-400 font-bold'>{cardDes}</p>

            </div>
        </div>
    );
};

export default BusinessInfoCard;