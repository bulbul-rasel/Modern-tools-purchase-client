import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../firebase.init';
import useAdmin from '../hookes/UseAdmin';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    return (
        <div className="drawer drawer-mobile mt-20">
            <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col ">
                <h2 className=' flex justify-center items-center text-3xl font-bold text-primary'>Welcome to your Dashboard</h2>
                <Outlet></Outlet>

            </div>
            <div className="drawer-side">
                <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    <li><Link to='/dashboard/profile'>My Portfolio</Link></li>
                    <li><Link to='/dashboard/myReview'>My Review</Link></li>
                    <li><Link to='/dashboard/addReview'>Add Review</Link></li>
                    <li><Link to='/dashboard/order'>My Order</Link></li>

                    {admin && <>
                        <li><Link to='/dashboard/myOrder'>Manage Order</Link></li>
                        <li><Link to='/dashboard/users'>All User</Link></li>
                        <li><Link to='/dashboard/addProduct'>Add Product</Link></li>
                        <li><Link to='/dashboard/manageProduct'>Manage Product</Link></li>

                    </>}
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;