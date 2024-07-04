import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaBook, FaBookMedical, FaUserCog, FaBookOpen,FaMoneyCheckAlt } from 'react-icons/fa';
import { FaBookBookmark } from 'react-icons/fa6'
import { BiSolidContact } from "react-icons/bi";
import { AuthContext } from '../../Provider/AuthProvider';
const Dashboard = () => {

    const [role, setRole] = useState('');

    const { user } = useContext(AuthContext)
    useEffect(() => {
        fetch(`https://assignment-12-server-iota-two.vercel.app/checkUser?email=${user?.email}`)
        .then(res => res.json())
        .then(result => {
            // console.log(result)
            setRole(result)
            // console.log(result?.role)
        })
        .catch(error => console.log(error))
       
    }, [user?.email])
// console.log(role?.role)
    return (
        <>
        
            <div className="drawer lg:drawer-open flex flex-row-reverse">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className='container'>
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open menu</label>
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side bg-indigo-400 text-center">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                    <ul className="text-center text-xl menu p-4 w-80 h-full text-black ">
                        {/* Sidebar content here */}
                        <li className='mt-12 mb-6 normal-case text-3xl font-medium'><NavLink to='/'>String Symphony</NavLink></li>

                        <li><NavLink to="/dashboard/userDashboard"><FaHome></FaHome>Dashboard</NavLink></li>

                        {role[0]?.role === 'instructor' ? <li><NavLink to="/dashboard/addClasses"><FaBookMedical></FaBookMedical>Add Classes</NavLink></li> : <></>
                        }

                        {role[0]?.role === 'instructor' ? <li><NavLink to="/dashboard/myClasses"><FaBook></FaBook>My Classes</NavLink></li> : <></>}

                        {role[0]?.role === 'admin' ? <li><NavLink to="/dashboard/manageClasses"><FaBookOpen></FaBookOpen>Manage Classes</NavLink></li> : <></>}

                        {role[0]?.role === 'admin' ? <li><NavLink to="/dashboard/manageUsers"><FaUserCog></FaUserCog>Manage Users</NavLink></li> : <></>}

                        {role[0]?.role === 'student'  ? <li><NavLink to="/dashboard/myAddedClasses"><FaBookBookmark></FaBookBookmark>My Selected Classes</NavLink></li> : <></>}

                        {role[0]?.role === 'student' ? <li><NavLink to="/dashboard/myEnrolledClasses"><BiSolidContact></BiSolidContact>My Enrolled Classes</NavLink></li> : <></>
                        }
                        
                        {role[0]?.role === 'student' ? <li><NavLink to="/dashboard/paymentHistory"><FaMoneyCheckAlt></FaMoneyCheckAlt>Payment History</NavLink></li> : <></>
                        }

                    </ul>

                </div>
            </div>
        </>
    );
};

export default Dashboard;