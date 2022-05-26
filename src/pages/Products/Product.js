import React from 'react';
import { useNavigate } from 'react-router-dom';

const Product = ({ product }) => {
    const { _id, name, image, description, price, quantity, minimum } = product;

    const navigate = useNavigate();
    const navigateToProductDetail = (id) => {
        navigate(`/product/${id}`)
    }
    return (
        <div className='product shadow-lg p-3'>
            <img className='w-full' src={image} alt="" />
            <h4 className='text-xl text-primary font-bold'> Name: {name}</h4>
            <p className='text-xl text-primary font-semibold'>Description: {description}</p>
            <p className='text-xl text-primary font-semibold'>Price: ${price}</p>
            <p className='text-xl text-primary font-semibold'>Quantity: {quantity}/pcs</p>
            <p className='text-xl text-primary font-semibold'>Minimum Order Quantity: {minimum}</p>
            <button onClick={() => navigateToProductDetail(_id)} className='btn btn-primary my-3' variant="" type="submit">Book now</button>

        </div>
    );
};

export default Product;