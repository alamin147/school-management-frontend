import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ManageClasses = () => {

    const { loading, setLoading } = useContext(AuthContext);

    const [classes, setClasses] = useState([]);
    useEffect(() => {
        
        fetch('https://assignment-12-server-iota-two.vercel.app/classes')
            .then(res => res.json())
            .then(data => {
                setClasses(data)
            })
            .catch(error => console.log(error))
    }, [classes])

    const handleApprove = (id) => {
        setLoading(true)

        fetch(`https://assignment-12-server-iota-two.vercel.app/approve?id=${id}`,
            {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
            }
        )
            .then(res => res.json()).then(result => {
                console.log(result)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Class approved successfully`,
                    showConfirmButton: false,
                    timer: 1500
                })
                setLoading(false);
            }).catch(error => console.log(error))
    }



    return (
        <>
            <div className="hero bg-base-200 mt-20 mb-24 py-5">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Manage Classes</h1>
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
                            <th>Class Image</th>
                            <th>Class name</th>
                            <th>Instructors name</th>
                            <th>Instructors email</th>
                            <th>Available seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Approve</th>
                            <th>Deny</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* row 1 */}
                        {classes.map((ManageClass, i) => {
                            return <tr key={ManageClass._id} className='hover'>
                                <td>{i + 1}</td>
                                <td><td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-20 h-16">
                                            <img src={ManageClass.img} alt="Avatar" />
                                        </div>
                                    </div>
                                </td></td>
                                <td>{ManageClass.className}</td>
                                <td>{ManageClass.name}</td>
                                <td>{ManageClass.email}</td>
                                <td>{ManageClass.seats}</td>
                                <td>{ManageClass.price}</td>
                                <td>{ManageClass.status}</td>
                                <td>
                                    <button onClick={() => handleApprove(`${ManageClass._id}`)} className='btn btn-primary'>Approve</button>
                                </td>
                                <td>
                                    <Link to={`/dashboard/deny/${ManageClass._id}`}> <button className='btn btn-primary'>Deny</button></Link>
                                </td>
                                <td>
                                    <Link to={`/dashboard/feedback/${ManageClass._id}`}> <button className='btn btn-primary'>Feedback</button></Link>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div >
        </>
    );
};

export default ManageClasses;