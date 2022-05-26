import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const UserRow = ({ user, index, refetch }) => {
    const { email, role } = user;
    const [dUser, setdUser] = useState([])

    const makeAdmin = () => {
        fetch(`https://limitless-depths-18541.herokuapp.com/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error("Failed to make an Admin")
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {

                    refetch()
                    toast.success(`Successfully Made an Admin`);
                }
            })
    }

    const handleDelete = (id) => {
        const proceed = window.confirm('Are you sure for delete?');
        if (proceed) {
            (async () => {
                const { data } = await axios.delete(`https://limitless-depths-18541.herokuapp.com/users/${id}`);

                if (!data.success) return toast.error(data.error)

                toast(data.message);

                const remaining = user.filter(u => u._id !== id);
                setdUser(remaining)
                refetch()
            })()
        }
    }
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{email}</td>
            <td>{role !== 'admin' && <button onClick={makeAdmin} className="btn btn-xs btn-success">Make Admin</button>}</td>
            <td><button className="btn btn-xs btn-error" onClick={() => handleDelete(user._id)}>Remove User</button></td>
        </tr>
    );
};

export default UserRow;