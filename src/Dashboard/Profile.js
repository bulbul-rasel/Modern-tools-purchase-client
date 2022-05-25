import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import avatar from "../assets/world.png"
import { toast } from 'react-toastify';
import ProfileInfo from './ProfileInfo';
import auth from '../firebase.init';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const [user] = useAuthState(auth)
    const [isRealod, setIsreload] = useState(false)
    const navigate = useNavigate()

    const addInfo = (e) => {
        e.preventDefault()
        const education = e.target.education.value
        const location = e.target.location.value
        const number = e.target.number.value
        const linkdin = e.target.linkdin.value
        const email = user?.email
        const info = { education, location, number, linkdin, email }
        console.log(info);
        navigate('/dashboard/profile')
        fetch(`http://localhost:5000/profile/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({
                info
            })


        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setIsreload(true)
                toast.success(`Hey! ${user.displayName} Your profile Information Added`)

            })
    }

    return (
        <div className='m-10 gap-20 grid grid-cols-1 lg:grid-cols-2 p-10'>

            <div className="card w-96 bg-base-100 shadow-xl">
                <h1 className='text-2xl text-primary'>Welcome {user?.displayName}!!</h1>
                <div className="avatar">
                    <div className="w-24 mx-4 my-5 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src="https://i.ibb.co/T2fNDQK/217878g.jpg" />
                    </div>
                </div>
                <h2 className='text-3xl text-primary text-bold uppercase'> {user.displayName}</h2>
                <h2 className='text-xl text-secondary text-bold '> {user.email}</h2>
                <div className="card-body items-center text-center">
                    {/* <h2 className="card-title">Name:{user?.displayName}</h2>
                    <p>Email:{user?.email}</p> */}
                    <ProfileInfo isRealod={isRealod}></ProfileInfo>
                </div>
            </div>
            <div className="ms-10 shadow-xl p-10">
                <form onSubmit={addInfo}>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">email</span>
                        </label>
                        <input type="text" value={user?.email} placeholder="Education Qualification here" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Education</span>
                        </label>
                        <input type="text" name="education" placeholder="Education Qualification here" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <input type="text" name='location' placeholder="Your City here" className="input input-bordered w-full max-w-xs" />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone No</span>
                        </label>
                        <input type="number" name='number' placeholder="Your Contact No  here" className="input input-bordered w-full max-w-xs" />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">LinkedIn Profile</span>
                        </label>
                        <input type="text" name='linkdin' placeholder="Your Linkdin here" className="input input-bordered w-full max-w-xs" />

                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Save</button>
                    </div>





                </form>
            </div>
        </div>
    );
};

export default Profile;