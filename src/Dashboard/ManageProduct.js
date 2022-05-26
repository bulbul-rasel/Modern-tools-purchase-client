import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageProduct = ({ product }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://limitless-depths-18541.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    const handleDelete = (id) => {
        const proceed = window.confirm('Are you sure for delete?');
        if (proceed) {
            (async () => {
                const { data } = await axios.delete(`https://limitless-depths-18541.herokuapp.com/products/${id}`);

                if (!data.success) return toast.error(data.error)

                toast(data.message);

                const remaining = products.filter(product => product._id !== id);
                setProducts(remaining)
            })()
        }
    }

    return (
        <div>
            <h2 className="text-3xl text-primary text-center">All Items</h2>
            <table className="table table-success table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        {/* <th scope="col">Description</th> */}
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Minimum Quantity</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product => {
                            return <tr>
                                <td>{product.name}</td>
                                <td style={{ width: "100px" }} ><img className='w-100' src={product.image} alt="" /></td>
                                {/* <td>{product.description}</td> */}
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.minimum}</td>

                                <td>
                                    <label htmlFor="my-modal-6" onClick={() => handleDelete(product._id)} className="btn btn-xs btn-error modal-button">Delete</label>
                                </td>
                            </tr>
                        })
                    }

                </tbody>
            </table>

        </div>
    );
};

export default ManageProduct;