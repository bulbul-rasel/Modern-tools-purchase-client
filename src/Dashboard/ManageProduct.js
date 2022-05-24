import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DeleteModal from './DeleteModal';

const ManageProduct = ({ product }) => {
    // const { name, image, description, price, quantity, minimum } = product;
    const [products, setProducts] = useState([]);
    const [deleteModal, setDeleteModal] = useState(null)

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    const handleDelete = (id) => {
        const proceed = window.confirm('Are you sure for delete?');
        if (proceed) {
            (async () => {
                const { data } = await axios.delete(`http://localhost:5000/products/${id}`);

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
                        <th scope="col">Description</th>
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
                                <th>{product.name}</th>
                                <td style={{ width: "100px" }} ><img className='w-100' src={product.image} alt="" /></td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.minimum}</td>

                                <td>
                                    <label for="my-modal-6" onClick={() => handleDelete(product._id)} class="btn btn-xs btn-error modal-button">Delete</label>
                                </td>
                            </tr>
                        })
                    }

                </tbody>
            </table>
            {
                deleteModal && <DeleteModal setDeleteModal={setDeleteModal}></DeleteModal>
            }
        </div>
    );
};

export default ManageProduct;