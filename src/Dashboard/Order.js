import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { signOut } from 'firebase/auth';

const Order = () => {
    const [bookings, setBookings] = useState([]);

    const [user] = useAuthState(auth);
    const [myItem, setMyItem] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const myItem = async () => {
            const email = user?.email;
            const url = `http://localhost:5000/myitem?email=${email}`
            try {
                const { data } = await axios.get(url, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setMyItem(data);
            } catch (error) {
                toast(error.message);
                if (error.response.status === 401 || error.response.status === 403) {
                    signOut(auth);
                    navigate('/login')
                }
            }
        }
        myItem();

    }, [user]);

    const handleDelete = (id) => {
        const proceed = window.confirm('Are you sure for delete?');
        if (proceed) {
            (async () => {
                const { data } = await axios.delete(`http://localhost:5000/bookings/${id}`);

                if (!data.success) return toast.error(data.error)

                toast(data.message);

                const remaining = myItem.filter(item => item._id !== id);
                setMyItem(remaining)
            })()
        }
    }
    return (
        <div>
            <h2 className="text-3xl text-primary text-center">M Order</h2>
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
                    </tr>
                </thead>
                <tbody>
                    {
                        myItem.map(product => {
                            return <tr>
                                <th>{product.name}</th>
                                <td>{product.email}</td>
                                <td>{product.product}</td>
                                <td>{product.phone}</td>
                                <td>{product.price}</td>
                                <td>{product.address}</td>
                                <td style={{ width: "100px" }}>
                                    <Link
                                        to={'/dashboard/order'}
                                        onClick={() => handleDelete(product._id)}

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

export default Order;