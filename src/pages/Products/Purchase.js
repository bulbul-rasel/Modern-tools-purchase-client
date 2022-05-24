import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const Purchase = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate()
    const [disable, setDisable] = useState(false);
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        const url = `http://localhost:5000/product/${productId}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, []);



    const handleChange = event => {
        const disable = event.target.value;

        setDisable(disable);
    }

    const handelOrder = event => {
        event.preventDefault();
        const orders = event.target.orders.value;
        const address = event.target.address.value;
        const phone = event.target.number.value;
        console.log(orders, address, phone);
        const orderData = {
            orderId: product._id,
            product: product.name,
            orders,
            email: user.email,
            name: user.displayName,
            price: product.price * orders,
            phone,
            address
        }
        //console.log(orderData);
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast(`Your order for ${product.name} is placed`)
            })

        navigate('/dashboard/order')

    }

    return (
        <div>
            <div className='mt-5 shadow-lg '>
                <h3 className='text-center'> Product Detail of {product.name}</h3>
            </div>
            <form onSubmit={handelOrder} className='w-50   text-center'>
                <div class="form-control flex items-center">
                    <label class="label">
                        <span class="label-text">Your Name</span>
                    </label>
                    <input type="text" class="input input-bordered input-primary w-full max-w-xs " value={user.displayName} disabled />
                </div>
                <br />
                <div class="form-control flex items-center">
                    <label class="label">
                        <span class="label-text">Your Email</span>
                    </label>
                    <input type="text" class="input input-bordered input-primary w-full max-w-xs " value={user.email} disabled />
                </div>
                <br />
                <div class="form-control flex items-center">
                    <label class="label">
                        <span class="label-text">Material name</span>
                    </label>
                    <input type="text" placeholder="Type here" class="input input-bordered input-primary w-full max-w-xs " value={product.name} disabled />
                </div>
                <br />
                <div class="form-control flex items-center">
                    <label class="label">
                        <span class="label-text">Price per Material</span>
                    </label>
                    <input type="text" name='price' placeholder="Type here" class="input input-bordered input-primary w-full max-w-xs " value={product.price} disabled />
                </div>
                <br />
                <div class="form-control flex items-center">
                    <label class="label">
                        <span class="label-text">Quantities Left</span>
                    </label>
                    <input type="text" name='quantity' placeholder="Type here" class="input input-bordered input-primary w-full max-w-xs " value={product.quantity} disabled />
                </div>
                <br />
                <div class="form-control flex items-center">
                    <label class="label">
                        <span class="label-text">Phone number</span>
                    </label>
                    <input type="text" name='number' placeholder="Phone number" class="input input-bordered input-primary w-full max-w-xs " />
                </div>
                <br />
                <div class="form-control flex items-center">
                    <label class="label">
                        <span class="label-text">Your address</span>
                    </label>
                    <input type="text" name='address' placeholder="Address" class="input input-bordered input-primary w-full max-w-xs " />
                </div>
                <br />
                <div class="form-control flex items-center">
                    <label class="label">
                        <span class="label-text">Your Order</span>
                    </label>
                    <input type="number" name='orders' onChange={handleChange} placeholder="Mininum 100 order required" class="input input-bordered input-primary w-full max-w-xs " />
                </div>
                <br />

                <input className='btn btn-info my-4 fw-bold shadow' type="submit"
                    disabled={disable < 100 || disable >= product.total_quantity}
                    value="Purchase" />

            </form>


        </div>
    );
};
export default Purchase;