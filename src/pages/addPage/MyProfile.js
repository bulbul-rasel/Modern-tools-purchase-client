import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';

const MyProfile = () => {
    const [profile, setProfile] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate()
    const { id } = useParams()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const profile = {
            email: event.target.email.value,
            education: event.target.education.value,
            location: event.target.location.value,
            phone: event.target.phone.value,
            linkedin: event.target.linkedin.value,

        };
        navigate('/dashboard')
        const { data } = await axios.post("http://localhost:5000/profile", profile);
        console.log(data);

        if (!data.success) {
            return toast.error(data.error)
        }

        toast.success(data.message)

        event.target.reset();
        console.log(data);

    }

    useEffect(() => {
        const myProfile = async () => {
            const email = user?.email;
            const url = `http://localhost:5000/myProfile?email=${email}`
            try {
                const { data } = await axios.get(url, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setProfile(data);
            } catch (error) {
                toast(error.message);
                if (error.response.status === 401 || error.response.status === 403) {
                    signOut(auth);
                    navigate('/login')
                }
            }
        }
        myProfile();

    }, [user]);


    // useEffect(() => {
    //     fetch('http://localhost:5000/profile')
    //         .then(res => res.json())
    //         .then(data => setProfile(data))
    // }, [])

    return (
        <div className='mx-2'>
            <div class="avatar">
                <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src="https://i.ibb.co/T2fNDQK/217878g.jpg" />
                </div>
            </div>
            <h2 className='text-3xl text-primary text-bold uppercase'> {user.displayName}</h2>
            <h2 className='text-xl text-secondary text-bold '> {user.email}</h2>

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

            <div className='grid grid-cols-1'>
                <form onSubmit={handleSubmit}>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input type="text" name='email' value={user.email} class="input input-bordered w-full max-w-xs" />

                    </div>
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
                        <input type="text" name='location' placeholder="Type here" class="input input-bordered w-full max-w-xs" />

                    </div>

                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Phone Number</span>
                        </label>
                        <input type="text" name='phone' placeholder="Type here" class="input input-bordered w-full max-w-xs" />

                    </div>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">LinkedIn Profile </span>
                        </label>
                        <input type="text" name='linkedin' placeholder="Type here" class="input input-bordered w-full max-w-xs" />

                    </div>

                    <button className='btn btn-primary mt-5' type='submit'>Update</button>
                </form>
            </div>


        </div>
    );
};

export default MyProfile;