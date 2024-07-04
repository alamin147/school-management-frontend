import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';

const UserDashboard = () => {

    const {user} = useContext(AuthContext)
    return (
        <div className="hero bg-base-200 mt-20 mb-24 py-5">
        <div className="hero-content text-center">
            <div className="max-w-md">
                <h1 className="text-5xl font-bold">Hi, {user?.displayName}</h1>

            </div>
        </div>
    </div>
    );
};

export default UserDashboard;