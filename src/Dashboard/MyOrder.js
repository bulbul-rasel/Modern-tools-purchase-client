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

    const handleDeliver = (id) => {
        toast.success("Shipped")

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
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings.map((product, index) => {
                            return <tr key={product._id}>
                                <th>{product.name}</th>
                                <td>{product.email}</td>
                                <td>{product.product}</td>
                                <td>{product.phone}</td>
                                <td>{product.price}</td>
                                <td>{product.address}</td>
                                <td style={{ width: "100px" }}>
                                    <td>{(product.price && product.paid) ? <button class="btn btn-xs btn-error" disabled >Delete</button> : <button class="btn btn-xs btn-error" onClick={() => handleDelete(product._id)}>Delete</button>}</td>
                                </td>
                                {/* {<td><button class="btn btn-xs btn-success" >Payment</button></td>} */}
                                <td>
                                    {(product.price && !product.paid) && <button class="btn btn-xs btn-error" >Unpaid</button>}
                                    {(product.price && product.paid) && <div>
                                        <button class="btn btn-xs btn-success" onClick={() => handleDeliver(product._id)}>Pending</button>

                                    </div>}
                                </td>
                            </tr>
                        })
                    }

                </tbody>
            </table>

        </div>
    );
};

export default MyOrder;