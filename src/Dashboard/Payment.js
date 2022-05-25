import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from '../components/Loading';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';


// pk_test_51L0VsCAnVo6RJfwk5KtCelL2mUyRvlEgiSHb15XBJEJc9daigxyVPKn8rCfrYzqVZEtDuXAcVJYs9fPVeo3QhZlF00wVnglIRW
const stripePromise = loadStripe('pk_test_51L0VsCAnVo6RJfwk5KtCelL2mUyRvlEgiSHb15XBJEJc9daigxyVPKn8rCfrYzqVZEtDuXAcVJYs9fPVeo3QhZlF00wVnglIRW');

const Payment = () => {
    const { id } = useParams()
    const url = `http://localhost:5000/booking/${id}`

    const { data: product, isLoading } = useQuery(['booking', id], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className="card w-50 max-w-md bg-base-100 shadow-xl my-12">
                <div className="card-body">
                    <p className="text-success font-bold">Hello, {product.name}</p>
                    <h2 className="card-title">Please Pay for: <span className='text-primary'>{product.product}</span> </h2>

                    <p>Please pay: ${product.price}</p>
                </div>
            </div>
            <div className="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
                <div className="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm product={product} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;