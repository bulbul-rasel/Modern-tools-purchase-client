import React from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const AddReview = () => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()


    const handleSubmit = async (event) => {
        event.preventDefault();
        const rating = {
            name: event.target.name.value,
            email: event.target.email.value,
            image: event.target.image.value,
            description: event.target.description.value,
            rating: event.target.rating.value,

        };
        const { data } = await axios.post("http://localhost:5000/ratings", rating);
        console.log(data);

        if (!data.success) {
            return toast.error(data.error)
        }

        toast.success(data.message)
        navigate('/')


        console.log(data);
    }
    return (
        <form onSubmit={handleSubmit}>
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">Name</span>
                </label>
                <input type="text" name='name' value={user.displayName} class="input input-bordered w-full max-w-xs" />
            </div>
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">Name</span>
                </label>
                <input type="text" name='email' value={user.email} class="input input-bordered w-full max-w-xs" />
            </div>
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">Description</span>
                </label>
                <input type="text" name='description' placeholder="Type here Something" class="input input-bordered w-full max-w-xs" />
            </div>
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">Image</span>
                </label>
                <input type="text" name="image" placeholder="Send Image link" class="input input-bordered w-full max-w-xs" />
            </div>
            <div>
                <select name='rating' class="select w-full max-w-xs mt-4">
                    <option>
                        🧡🧡🧡🧡🧡
                    </option>
                    <option>❤🧡🧡🧡🧡</option>
                    <option>❤❤🧡🧡🧡</option>
                    <option>❤❤❤🧡🧡</option>
                    <option>❤❤❤❤🧡</option>
                </select>
            </div>
            <button className='btn btn-primary ' type='submit'>Add Review</button>
            <ToastContainer></ToastContainer>
        </form>
    );
};

export default AddReview;