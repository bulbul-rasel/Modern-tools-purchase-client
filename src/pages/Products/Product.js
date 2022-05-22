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
            <h4 className=''> Name: {name}</h4>
            <p>Description: {description}</p>
            <p>Price: {price}</p>
            <p>Quantity: {quantity}</p>
            <p>Supplier Name: {minimum}</p>
            <button onClick={() => navigateToProductDetail(_id)} className='btn btn-primary' variant="" type="submit">Book now</button>

        </div>
    );
};

export default Product;