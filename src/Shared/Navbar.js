/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt, FaSun, FaMoon } from 'react-icons/fa';
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)
    const signOut = () => {
        logOut();
    }

    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark');


    useEffect(() => {
        localStorage.setItem('theme',theme);
        const local = localStorage.getItem('theme');
        document.querySelector('html').setAttribute('data-theme',local);
    }, [theme])

    return (
        <div className="navbar bg-indigo-500  flex justify-between justify-items-center pt-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden me-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52 z-50 ">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/instructors">Instuctors</Link></li>
                        <li><Link to="/classes">Classes</Link></li>
                        {user ? <li><Link to="/dashboard">DashBoard</Link></li> : <></>}
                        {user ? <></> : <li><Link to="/register">Register</Link></li>}
                        {user ? <li><button onClick={signOut}>Log Out</button></li> : <></>}
                        {user ? <></> : <li><Link to="/login">Login</Link></li>}
                        <li className="dropdown dropdown-end">
                            <label tabIndex={1} className="ms-2 btn btn-ghost btn-circle avatar">
                                <div className="w-8 rounded-full">
                                    {user ? <img src={user?.photoURL} alt="" /> : <FaUserAlt></FaUserAlt>}
                                </div>
                            </label>
                        </li>
                      
                        {theme === 'light' ? <button onClick={() => setTheme('dark')} className="ms-5 mt-2"><FaMoon></FaMoon></button> :
                        <button onClick={() => setTheme('light')} className="ms-5 mt-2"><FaSun></FaSun></button>}
                    </ul>
                </div>
                <Link to="/" className="normal-case text-2xl font-medium">String Symphony</Link>
            </div>
            <div className="navbar-center hidden lg:flex justify-center justify-items-center">
                <ul className="menu menu-horizontal p-0 flex items-center">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/instructors">Instuctors</Link></li>
                    <li><Link to="/classes">Classes</Link></li>
                    {user ? <></> : <li><Link to="/register">Register</Link></li>}
                    {user ? <li><Link to="/dashboard">DashBoard</Link></li> : <></>}
                    {user ? <li><button onClick={signOut}>Log Out</button></li> : <></>}
                    {user ? <></> : <li><Link to="/login">Login</Link></li>}
                    <li className="">
                        <label className="btn btn-ghost btn-circle avatar">
                            <div className="w-8 rounded-full">
                                {user ? <img src={user?.photoURL} alt="" /> : <FaUserAlt className="mt-3 pe-0"></FaUserAlt>}
                            </div>
                        </label>
                    </li>
                    {theme === 'light' ? <button onClick={() => setTheme('dark')} className="ms-3"><FaMoon></FaMoon></button> :
                        <button onClick={() => setTheme('light')} className="ms-3"><FaSun></FaSun></button>}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
