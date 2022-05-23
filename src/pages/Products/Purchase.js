import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const Purchase = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [newQuantity, setNewQuantity] = useState(0)
    const [newPrice, setNewPrice] = useState(0)
    console.log(newQuantity);
    console.log(newPrice);

    useEffect(() => {
        const url = `http://localhost:5000/product/${productId}`;
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProduct(data)
                setNewQuantity(data.quantity);
                setNewPrice(data.price);
                // console.log(data.quantity);
            })
    }, [productId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const bookings = {
            name: event.target.name.value,
            email: event.target.email.value,
            product: event.target.product.value,
            phone: event.target.phone.value,
            price: event.target.price.value,
            address: event.target.address.value,


        };
        const { data } = await axios.post("http://localhost:5000/bookings", bookings);
        if (!data.success) {
            return toast.error(data.error)
        }

        toast.success(data.message)
        navigate('/dashboard/order')


        console.log(data);
    }

    const handleUpdate = (event) => {
        event.preventDefault();
        const quantity = event.target.name.value;
        console.log(quantity);
        const updatedQuantity = newQuantity - parseInt(quantity);
        const price = parseInt(quantity) * newPrice;
        setNewQuantity(updatedQuantity);
        setNewPrice(price)

        const url = `http://localhost:5000/product/${productId}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ updatedQuantity })
        })
            .then(res => res.json())
            .then(data => {
                console.log('success', data);
                toast('Quantity update successfully!!!');
                event.target.reset();
            })
    }



    return (
        <div className='mt-20 flex justify-center items-center'>

            <div class="hero min-h-screen bg-base-200">
                <div class="hero-content flex-col lg:flex-row-reverse">
                    <div class="text-center lg:text-left">
                        <div class="card w-96 bg-base-100 shadow-xl">
                            <figure class="px-10 pt-10">
                                <img src={product.image} alt="Shoes" class="rounded-xl" />
                            </figure>
                            <div class="card-body items-center text-center">
                                <h2 class="card-title">{product.name}</h2>
                                <p>{product.description}</p>
                                <p> Available Quantity: {newQuantity}</p>
                                <p>Minimum Order: {product.minimum}</p>
                                <p>Price:{product.price}</p>
                                <form onSubmit={handleUpdate} class="card-actions">
                                    <input type="text" name='name' placeholder="Enter Product Quantity" class="input w-full max-w-xs" />

                                    <button class="btn btn-primary w-full" type='submit'>Booked</button>
                                </form>

                            </div>
                        </div>
                    </div>
                    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100  flex justify-center items-center p-10">
                        <form onSubmit={handleSubmit}>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Email</span>
                                </label>
                                <input type="text" name='email' value={user.email} class="input input-bordered w-full max-w-xs" />

                            </div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Name</span>
                                </label>
                                <input type="text" name='name' value={user.displayName} class="input input-bordered w-full max-w-xs" />

                            </div>

                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Product Name.</span>
                                </label>
                                <input type="text" name='product' value={product.name} class="input input-bordered w-full max-w-xs" />

                            </div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Phone No.</span>
                                </label>
                                <input type="text" name='phone' placeholder="Type here" class="input input-bordered w-full max-w-xs" />

                            </div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Address</span>
                                </label>
                                <input type="text" name='address' placeholder="Type here" class="input input-bordered w-full max-w-xs" />

                            </div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Price</span>
                                </label>
                                <input type="text" name='price' value={product.price} placeholder="Type here" class="input input-bordered w-full max-w-xs" />

                            </div>

                            <button className='btn btn-primary w-full mt-5' type='submit'>Confirm Purchase</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>





    );
};

export default Purchase;