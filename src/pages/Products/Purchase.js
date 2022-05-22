import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const Purchase = () => {
    const [user] = useAuthState(auth);

    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [newQuantity, setNewQuantity] = useState(0)
    console.log(newQuantity);

    useEffect(() => {
        const url = `http://localhost:5000/product/${productId}`;
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProduct(data)
                setNewQuantity(data.quantity)
                // console.log(data.quantity);
            })
    }, [productId]);

    const handleDelivered = () => {
        const updatedQuantity = +newQuantity - 1;
        console.log(updatedQuantity);
        setNewQuantity(updatedQuantity)

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
                toast('Delivered successfully!!!');
            })
    }

    const handleUpdate = (event) => {
        event.preventDefault();
        const quantity = event.target.name.value;
        console.log(quantity);
        const updatedQuantity = newQuantity - parseInt(quantity);
        setNewQuantity(updatedQuantity);

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

            <div class="card w-96 bg-base-100 shadow-xl">
                <figure class="px-10 pt-10">
                    <img src={product.image} alt="Shoes" class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                    <p>User: {user.email}</p>
                    <h2 class="card-title">{product.name}</h2>
                    <p>{product.description}</p>
                    <p> Available Quantity: {newQuantity}</p>
                    <p>Minimum Order: {product.minimum}</p>
                    <p>Price:{product.price}</p>
                    <form onSubmit={handleUpdate} class="card-actions">
                        <input type="text" name='name' placeholder="Enter Product Quantity" class="input w-full max-w-xs" />

                        <button class="btn btn-primary w-full" type='submit'>Booked</button>
                    </form>

                    <button class="btn btn-primary w-full" type='submit'>Buy Now</button>
                </div>
            </div>

        </div>
    );
};

export default Purchase;