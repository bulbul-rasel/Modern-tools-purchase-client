import React from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../firebase.init';

const AddReview = () => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()


    const handleSubmit = async (event) => {
        event.preventDefault();
        navigate('/')
        const rating = {
            name: event.target.name.value,
            email: event.target.email.value,
            image: event.target.image.value,
            description: event.target.description.value,
            rating: event.target.rating.value,

        };
        const { data } = await axios.post("https://limitless-depths-18541.herokuapp.com/ratings", rating);
        console.log(data);

        if (!data.success) {
            return toast.error(data.error)
        }

        toast.success(data.message)


        console.log(data);
    }
    return (
        <div>
            <h2 className="text-3xl text-primary text-center">Add Review</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name='name' value={user.displayName} className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name='email' value={user.email} className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input type="text" name='description' placeholder="Type here Something" className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Image</span>
                    </label>
                    <input type="text" name="image" placeholder="Send Image link" className="input input-bordered w-full max-w-xs" />
                </div>
                <div>
                    <select name='rating' className="select w-full max-w-xs mt-4">
                        <option>
                            🧡🧡🧡🧡🧡
                        </option>
                        <option>🧡🧡🧡🧡❤</option>
                        <option>🧡🧡🧡❤❤</option>
                        <option>🧡🧡❤❤❤</option>
                        <option>🧡❤❤❤❤</option>
                    </select>
                </div>
                <button className='btn btn-primary ' type='submit'>Add Review</button>

            </form>
        </div>
    );
};

export default AddReview;