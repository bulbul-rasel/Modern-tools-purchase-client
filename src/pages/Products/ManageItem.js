import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ManageItem = ({ product }) => {
    const { name, image, description, price, quantity, minimum } = product;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    return (
        <div>
            <h2 className="title-lr text-center">All Items</h2>
            <table className="table table-success table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Supplier Name</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product => {
                            return <tr>
                                <th>{product.name}</th>
                                <td style={{ width: "100px" }} ><img className='w-100' src={image} alt="" /></td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.minimum}</td>
                                <td style={{ width: "100px" }}>
                                    <Link
                                        to={'/manageItem'}
                                    // onClick={() => handleDelete(product._id)}

                                    >
                                        DELETE 🗑
                                    </Link>
                                </td>
                            </tr>
                        })
                    }

                </tbody>
            </table>

        </div>
    );
};

export default ManageItem;