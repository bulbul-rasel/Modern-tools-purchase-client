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
        // const proceed = window.confirm('Are you sure for delete?');
        // if (proceed) {

        // }
        (async () => {
            const { data } = await axios.delete(`http://localhost:5000/bookings/${id}`);

            if (!data.success) return toast.error(data.error)

            toast(data.message);

            const remaining = myItem.filter(item => item._id !== id);
            setMyItem(remaining)
        })()
    }
    return (
        <div>
            <h2 className="text-3xl text-primary text-center">My Order</h2>
            <table className="table table-success table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        {/* <th scope="col">Email</th> */}
                        <th scope="col">Product</th>
                        {/* <th scope="col">Phone</th> */}
                        <th scope="col">Price</th>
                        <th scope="col">Address</th>
                        <th scope="col">Action</th>
                        <th scope="col"></th>
                        <th scope="col">Pay</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myItem.map((product, index) => {
                            return <tr key={index._id}>
                                <td>{product.name}</td>
                                {/* <td>{product.email}</td> */}
                                <td>{product.product}</td>
                                {/* <td>{product.phone}</td> */}
                                <td>{product.price}</td>
                                <td>{product.address}</td>
                                {/* <td>{(product.price && product.paid) ? <button className="btn btn-xs btn-error" disabled >Delete</button> : <button className="btn btn-xs btn-error" onClick={() => handleDelete(product._id)}>Delete</button>}</td> */}

                                <td>
                                    {(product.price && !product.paid) && <label for="my-modal-3" class="btn btn-xs btn-error modal-button" >Delete</label>}
                                </td>



                                <input type="checkbox" id="my-modal-3" class="modal-toggle" />
                                <div class="modal">
                                    <div class="modal-box relative">

                                        <h3 class="text-lg font-bold">Hey!! <span className='text-primary'> {product?.name}</span> Are You Sure Want to Delete This Order?</h3>

                                        <label for="my-modal-3" class="btn btn-sm btn-warning absolute left-2 bottom-2">No</label>
                                        <div class="modal-action">
                                            <button onClick={() => handleDelete(product?._id)} class="btn btn-sm btn-error">Yes</button>
                                        </div>
                                    </div>
                                </div>
                                <td>
                                    {(product.price && !product.paid) && <Link to={`/dashboard/payment/${product._id}`}><button className="btn btn-xs btn-success" >Payment</button></Link>}
                                    {(product.price && product.paid) && <div>
                                        <span className="text-success" >Processing...</span>
                                        <p><span className='text-success'> {product.transictionId}</span></p>
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

export default Order;