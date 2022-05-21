import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import auth from '../firebase.init';
import { signOut } from 'firebase/auth';

const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    // const [admin, adminLoading] = useAdmin(user);
    console.log('Inside Require Auth', auth);
    let location = useLocation();

    if (loading) {
        return <Loading />
    }
    if (!user) {
        signOut(auth);
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;