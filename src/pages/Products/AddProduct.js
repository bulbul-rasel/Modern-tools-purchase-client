import React from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const product = {
            name: event.target.name.value,
            email: event.target.email.value,
            image: event.target.image.value,
            description: event.target.description.value,
            price: parseFloat(event.target.price.value),
            quantity: parseFloat(event.target.quantity.value),
            minimum: parseFloat(event.target.minimum.value),

        };
        const { data } = await axios.post("http://localhost:5000/products", product);
        if (!data.success) {
            return toast.error(data.error)
        }

        toast.success(data.message)
        navigate('/')


        console.log(data);
    }

    return (
        <div className='grid grid-cols-1'>
            <h2 className="text-3xl text-primary text-center">Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input type="text" name='email' value={user.email} class="input input-bordered w-full max-w-xs" />

                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Product name</span>
                    </label>
                    <input type="text" name='name' placeholder="Type here" class="input input-bordered w-full max-w-xs" />

                </div>

                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Image</span>
                    </label>
                    <input type="text" name='image' placeholder="Type here" class="input input-bordered w-full max-w-xs" />

                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Description</span>
                    </label>
                    <input type="text" name='description' placeholder="Type here" class="input input-bordered w-full max-w-xs" />

                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Price</span>
                    </label>
                    <input type="text" name='price' placeholder="Type here" class="input input-bordered w-full max-w-xs" />

                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Quantity</span>
                    </label>
                    <input type="text" name='quantity' placeholder="Type here" class="input input-bordered w-full max-w-xs" />

                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Minimum Quantity</span>
                    </label>
                    <input type="text" name='minimum' value={100} class="input input-bordered w-full max-w-xs" />

                </div>
                <button className='btn btn-primary ' type='submit'>Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;