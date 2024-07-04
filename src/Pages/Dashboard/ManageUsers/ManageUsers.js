import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const ManageUsers = () => {

    const { loading , setLoading} = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // setLoad(true)
        fetch('https://assignment-12-server-iota-two.vercel.app/users')
            .then(res => res.json())
            .then(data => {
                // console.log("users data", data)

                setUsers(data)
                // setLoad(false)
            })
            .catch(error => console.log(error))
    }, [users])

    const makeAdmin = (id, name) => {
        setLoading(true)
        // console.log('first', id)
        fetch(`https://assignment-12-server-iota-two.vercel.app/makeAdmin?id=${id}`,
            {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
            })
            .then(res => res.json()).then(result => {
                console.log(result)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${name} is now Admin`,
                    showConfirmButton: false,
                    timer: 1500
                })
                setLoading(false)

            }).catch(error => console.log(error))

    }


    const makeInstructor = (id, name) => {

        setLoading(true)
        fetch(`https://assignment-12-server-iota-two.vercel.app/makeInstructor?id=${id}`,
            {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
            })
            .then(res => res.json()).then(result => {
                console.log(result)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${name} is now Instructor`,
                    showConfirmButton: false,
                    timer: 1500
                })
                setLoading(false)

            }).catch(error => console.log(error))
    }

    return (
        <>
            <div className="hero bg-base-200 mt-20 mb-24 py-5">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Manage Users</h1>
                        <div>
                            {loading && <progress className="progress w-56"></progress>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Make Admin</th>
                            <th>Make Insrtuctors</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* row 1 */}
                        {users.map((singleUser, i) => {
                            return <tr key={singleUser._id} className='hover'>
                                <td>{i + 1}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-20 h-16">
                                            <img src={singleUser.image} alt="Avatar" />
                                        </div>
                                    </div>
                                </td>
                                <td>{singleUser.name}</td>
                                <td>{singleUser.email}</td>
                                <td>{singleUser.role}</td>

                                <td>
                                    {singleUser.role === 'instructor' || singleUser.role === 'admin' ? <button disabled className='btn btn-primary' >Make Admin</button> : <button onClick={() => makeAdmin(singleUser._id, singleUser.name)} className='btn btn-primary'>Make Admin</button>}
                                </td>
                                <td>
                                    {singleUser.role === 'instructor' || singleUser.role === 'admin' ? <button disabled className='btn btn-primary' >Make Instructors</button> : <button onClick={() => { makeInstructor(singleUser._id, singleUser.name) }} className='btn btn-primary'>Make Instructors</button>}
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div >


        </>
    );
};

export default ManageUsers;