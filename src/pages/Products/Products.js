import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import Product from './Product';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://limitless-depths-18541.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <div>
            <div>
                <h2 className='text-primary font-bold text-3xl text-center mt-5 mb-3 '>Products </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5">
                    {products ?
                        products.slice(0, 6).map(product => <Product
                            key={product._id}
                            product={product}
                        ></Product>) : <Loading></Loading>
                    }
                </div>
            </div>
        </div>
    );
};

export default Products;