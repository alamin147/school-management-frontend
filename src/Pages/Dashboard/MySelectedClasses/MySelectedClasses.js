import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MySelectedClasses = () => {

    const { user, loading, setLoading } = useContext(AuthContext);
    const [selectedClass, setSelectedClass] = useState([]);

    useEffect(() => {
        fetch(`https://assignment-12-server-iota-two.vercel.app/getBookmarkedClasses?email=${user?.email}`)
            .then(res => res.json())
            .then(result => setSelectedClass(result))
            .catch(error => console.log(error))
    }, [user])


    // console.log("newly added", cartClasses[0].selected)

    const handleDeleteClass = (id, className) => {
        setLoading(true)
        // console.log(id)
        fetch(`https://assignment-12-server-iota-two.vercel.app/selectedClassDelete/${id}`, {

            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(result => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Class '${className}' is deleted successfully`,
                    showConfirmButton: false,
                    timer: 1500
                })
                setLoading(false)
            })
            .catch(error => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `Could not delete, try again later`,
                    showConfirmButton: false,
                    timer: 1500
                })
                setLoading(false)

            })
    }

    return (
        <>
            <div className="hero bg-base-200 mt-20 mb-24 py-5">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold inline">My Selected Classes</h1>

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
                            <th>Instructor Name</th>
                            <th>Price</th>
                            <th>Pay Now</th>
                            <th>Delete Now</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {selectedClass.map((singleClass, i) => {
                            return <tr key={i}>
                                <td >{i + 1}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-20 h-16">
                                            <img src={singleClass?.selected?.img} alt="Avatar" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {singleClass?.selected?.className}
                                </td>
                                <td>
                                    {singleClass?.selected?.name}
                                </td>
                                <td>
                                    {singleClass?.selected?.price}
                                </td>
                                <td>
                                    <Link to={`/dashboard/payment/${singleClass._id}`}> <button className='btn btn-primary'>Pay Now</button></Link>
                                </td>
                                <td> <button onClick={() => handleDeleteClass(singleClass._id, singleClass.selected.className)} className='btn btn-primary'>Delete Now</button> </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>

        </>
    );
};

export default MySelectedClasses;