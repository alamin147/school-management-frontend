import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyClass = () => {

    const [myClasses, setMyclasses] = useState([]);
    const {user, loading } = useContext(AuthContext);
    

    useEffect(() => {
        fetch(`https://assignment-12-server-iota-two.vercel.app/myClasses?email=${user?.email}`)
        .then(res => res.json())
        .then(result => {
            // console.log(result)
            setMyclasses(result)})
        .catch(error => console.log(error))
    },[user])

    const handleModal = (feedback) => {
        // console.log(feedback)
        Swal.fire(feedback)
    }

    return (
        <>
            <div className="hero bg-base-200 mt-20 mb-24 py-5">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">My Classes</h1>
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
                            <th>Class Name</th>
                            <th>Status</th>
                            <th>Total Enrolled Students</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {myClasses.map((myClass, i) => {
                            return <tr key={myClass._id} className='hover'>
                                <td>{i + 1}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-20 h-16">
                                            <img src={myClass.img} alt="Avatar" />
                                        </div>
                                    </div>
                                </td>
                                <td>{myClass.className}</td>
                                <td>{myClass.status}</td>
                                <td>{myClass.totalEnroll}</td>
                                <td>{myClass.price}</td>
                                <td><Link to={`/dashboard/updateClass/${myClass._id}`} ><button className='btn btn-primary'>Update</button></Link></td>
                                <td>{myClass.feedback ? <button className='btn btn-primary' onClick={() => handleModal(myClass.feedback)}>Feedback</button> : <></>}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>

        </>
    );
};

export default MyClass;