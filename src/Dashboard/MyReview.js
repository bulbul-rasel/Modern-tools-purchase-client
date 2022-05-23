import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';

const MyReview = () => {
    const [reviews, setReviews] = useState([]);

    const [user] = useAuthState(auth);
    const [myItem, setMyItem] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const myReview = async () => {
            const email = user?.email;
            const url = `http://localhost:5000/myReview?email=${email}`
            try {
                const { data } = await axios.get(url, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setReviews(data);
            } catch (error) {
                toast(error.message);
                if (error.response.status === 401 || error.response.status === 403) {
                    signOut(auth);
                    navigate('/login')
                }
            }
        }
        myReview();

    }, [user]);
    return (
        <div>
            <h2 className="text-3xl text-primary text-center">All Items</h2>
            <table className="table table-success table-striped">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Description</th>
                        <th scope="col">Ratings</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        reviews.map(r => {
                            return <tr>
                                <td><img style={{ width: "100px" }} src={r.image} alt="" /></td>
                                <th>{r.name}</th>
                                <td>{r.email}</td>
                                <td>{r.description}</td>
                                <td>{r.rating}</td>


                            </tr>
                        })
                    }

                </tbody>
            </table>

        </div>
    );
};

export default MyReview;