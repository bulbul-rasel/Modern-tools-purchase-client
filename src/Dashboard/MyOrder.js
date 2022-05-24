import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyOrder = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/bookings')
            .then(res => res.json())
            .then(data => setBookings(data))
    }, [])

    const handleDelete = (id) => {
        const proceed = window.confirm('Are you sure for delete?');
        if (proceed) {
            (async () => {
                const { data } = await axios.delete(`http://localhost:5000/bookings/${id}`);

                if (!data.success) return toast.error(data.error)

                toast(data.message);

                const remaining = bookings.filter(product => product._id !== id);
                setBookings(remaining)
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
                        <th scope="col">Email</th>
                        <th scope="col">Product</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Price</th>
                        <th scope="col">Address</th>
                        <th scope="col">Action</th>
                        <th scope="col">Pay</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings.map(product => {
                            return <tr>
                                <th>{product.name}</th>
                                <td>{product.email}</td>
                                <td>{product.product}</td>
                                <td>{product.phone}</td>
                                <td>{product.price}</td>
                                <td>{product.address}</td>
                                <td style={{ width: "100px" }}>
                                    <td><button class="btn btn-xs btn-error" onClick={() => handleDelete(product._id)}>Delete</button></td>
                                </td>
                                <td><button class="btn btn-xs btn-success" >Payment</button></td>
                            </tr>
                        })
                    }

                </tbody>
            </table>

        </div>
    );
};

export default MyOrder;