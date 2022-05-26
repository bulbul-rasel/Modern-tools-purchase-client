import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import linkdin from "../assets/linkedIn.png"
import { Link } from 'react-router-dom';
import auth from '../firebase.init';

const ProfileInfo = ({ isRealod }) => {
    const [myInfo, setMyinfo] = useState([])
    console.log(isRealod)
    const [user] = useAuthState(auth)
    useEffect(() => {
        const email = user?.email
        console.log(email)

        fetch(`https://limitless-depths-18541.herokuapp.com/profileInfo?email=${email}`)
            .then(res => res.json())
            .then(data => {

                setMyinfo(data)
            })

    }, [user, isRealod])
    return (
        <div>
            <h6><span className='text-xl text-primary'>{myInfo?.info?.education}</span></h6>
            <h6><span className='text-xl text-primary'>{myInfo?.info?.location}</span></h6>
            <h6><span className='text-xl text-primary'>{myInfo?.info?.number}</span></h6>
            <span className='ps-10 justify-items-center '><a href={`${myInfo?.info?.linkdin}`}><img style={{ width: '80px' }} src={linkdin} alt="" /></a></span>
        </div>
    );
};;

export default ProfileInfo;