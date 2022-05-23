import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const profile = {
            education: event.target.education.value,
            location: event.target.location.value,
            phone: event.target.phone.value,
            linkedin: event.target.linkedin.value,

        };
        const { data } = await axios.post("http://localhost:5000/profile", profile);
        console.log(data);

        if (!data.success) {
            return toast.error(data.error)
        }

        toast.success(data.message)
        navigate('/dashboard/myProfile')


        console.log(data);
    }

    const [profile, setProfile] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/profile')
            .then(res => res.json())
            .then(data => setProfile(data))
    }, [])

    return (
        <div className='mx-2'>
            <div class="avatar">
                <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src="https://i.ibb.co/T2fNDQK/217878g.jpg" />
                </div>
            </div>
            <h2 className='text-3xl text-primary text-bold uppercase'> {user.displayName}</h2>
            <h2 className='text-xl text-secondary text-bold '> {user.email}</h2>


            <div class="bg-base-200">
                <div class="hero-content flex-col lg:flex-row-reverse">
                    <form onSubmit={handleSubmit}>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Education</span>
                            </label>
                            <input type="text" name='education' placeholder='Give your education Detail' class="input input-bordered w-full max-w-xs" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Location</span>
                            </label>
                            <input type="text" name='location' placeholder='Give your location ' class="input input-bordered w-full max-w-xs" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Phone Number</span>
                            </label>
                            <input type="text" name='phone' placeholder="Type here Something" class="input input-bordered w-full max-w-xs" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">LinkedIn Profile </span>
                            </label>
                            <input type="text" name="linkedin" placeholder="Send Image link" class="input input-bordered w-full max-w-xs" />
                        </div>
                        <button className='btn btn-primary ' type='submit'>Update </button>
                    </form>


                    <div >
                        {
                            profile.slice(0, 1).map(p => {
                                return <div>
                                    <p className='font-bold text-primary text-xl'>{p.education}</p>
                                    <p className='font-bold text-primary text-xl'>{p.location}</p>
                                    <p className='font-bold text-primary text-xl'>{p.phone}</p>
                                    <p className='font-bold text-primary text-xl'>{p.linkedin}</p>
                                </div>
                            })
                        }

                    </div>
                </div>
            </div>




        </div>
    );
};

export default MyProfile;