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
        const url = `https://limitless-depths-18541.herokuapp.com/product/${productId}`;
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
        fetch('https://limitless-depths-18541.herokuapp.com/bookings', {
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
        <div className='mt-20'>

            <div className='grid lg:grid-cols-3 justify-center items-center'>
                <div>
                    <h3 className='text-center text-4xl text-primary font-bold mb-5'>Hello,{user.displayName}!</h3>
                    <img src={product.image} alt="" />
                    <h2 className='text-center text-xl text-primary font-bold'>Product Name: {product.name}</h2>
                    <h2 className='text-center text-xl text-primary font-bold'>Unit Price: ${product.price}</h2>
                    <h2 className='text-center text-xl text-primary font-bold'>Available quantity: {product.quantity}/pcs</h2>
                </div>
                <div className="divider lg:divider-horizontal">OR</div>
                <div>
                    <form onSubmit={handelOrder} className=' w-full text-center'>
                        <div className="form-control flex items-center">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" className="input input-bordered input-primary w-full max-w-xs " value={user.displayName} disabled />
                        </div>
                        <br />
                        <div className="form-control flex items-center">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" className="input input-bordered input-primary w-full max-w-xs " value={user.email} disabled />
                        </div>
                        <br />
                        <div className="form-control flex items-center">
                            <label className="label">
                                <span className="label-text">Material name</span>
                            </label>
                            <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs " value={product.name} disabled />
                        </div>
                        <br />
                        <div className="form-control flex items-center">
                            <label className="label">
                                <span className="label-text">Unit Price </span>
                            </label>
                            <input type="text" name='price' placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs " value={product.price} disabled />
                        </div>
                        <br />
                        <div className="form-control flex items-center">
                            <label className="label">
                                <span className="label-text">Available Quantity</span>
                            </label>
                            <input type="text" name='quantity' placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs " value={product.quantity} disabled />
                        </div>
                        <br />
                        <div className="form-control flex items-center">
                            <label className="label">
                                <span className="label-text">Phone number</span>
                            </label>
                            <input type="text" name='number' placeholder="Phone number" className="input input-bordered input-primary w-full max-w-xs " />
                        </div>
                        <br />
                        <div className="form-control flex items-center">
                            <label className="label">
                                <span className="label-text">Your address</span>
                            </label>
                            <input type="text" name='address' placeholder="Address" className="input input-bordered input-primary w-full max-w-xs " />
                        </div>
                        <br />
                        <div className="form-control flex items-center">
                            <label className="label">
                                <span className="label-text">Order Quantity</span>
                            </label>
                            <input type="number" name='orders' onChange={handleChange} placeholder="Mininum 100 order required" className="input input-bordered input-primary w-full max-w-xs " />
                        </div>
                        <br />

                        <input className='btn btn-primary my-4 fw-bold shadow' type="submit"
                            disabled={disable < 100 || disable >= product.quantity}
                            value="Purchase" />

                    </form>

                </div>
            </div>


        </div>
    );
};
export default Purchase;