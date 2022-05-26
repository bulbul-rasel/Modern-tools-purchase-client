import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyOrder = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch('https://limitless-depths-18541.herokuapp.com/bookings')
            .then(res => res.json())
            .then(data => setBookings(data))
    }, [])

    const handleDelete = (id) => {

        (async () => {
            const { data } = await axios.delete(`https://limitless-depths-18541.herokuapp.com/bookings/${id}`);

            if (!data.success) return toast.error(data.error)

            toast(data.message);

            const remaining = bookings.filter(product => product._id !== id);
            setBookings(remaining)
        })()
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
                                <td>{product.name}</td>
                                <td>{product.email}</td>
                                <td>{product.product}</td>
                                <td>{product.phone}</td>
                                <td>{product.price}</td>
                                <td>{product.address}</td>
                                <td >
                                    {/* {(product.price && product.paid) ? <button className="btn btn-xs btn-error" disabled >Delete</button> : <button className="btn btn-xs btn-error" onClick={() => handleDelete(product._id)}>Delete</button>} */}

                                    {(product.price && !product.paid) && <label for="my-modal-3" class="btn btn-xs btn-error modal-button" >Delete</label>}
                                    <input type="checkbox" id="my-modal-3" class="modal-toggle" />
                                    <div class="modal">
                                        <div class="modal-box relative">

                                            <h3 class="text-lg font-bold">Hey!! <span className='text-primary'> Admin,</span> Are You Sure Want to Delete This Order?</h3>

                                            <label for="my-modal-3" class="btn btn-sm btn-warning absolute left-2 bottom-2">No</label>
                                            <div class="modal-action">
                                                <button onClick={() => handleDelete(product?._id)} class="btn btn-sm btn-error">Yes</button>
                                            </div>
                                        </div>
                                    </div>

                                </td>
                                {/* {<td><button className="btn btn-xs btn-success" >Payment</button></td>} */}
                                <td>
                                    {(product.price && !product.paid) && <button className="btn btn-xs btn-error" >Unpaid</button>}
                                    {(product.price && product.paid) && <div>
                                        <button className="btn btn-xs btn-success" onClick={() => handleDeliver(product._id)}>Pending</button>

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