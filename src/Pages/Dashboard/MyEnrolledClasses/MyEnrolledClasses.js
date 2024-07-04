import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';

const MyEnrolledClasses = () => {
    const { user, loading } = useContext(AuthContext)

    const [enrolled, setenrolled] = useState([]);
    useEffect(() => {
        fetch(`https://assignment-12-server-iota-two.vercel.app/enrolledClasses?email=${user?.email}`)
            .then(res => res.json())
            .then(result => {
                console.log(result)
                setenrolled(result);
            })
            .catch(error => console.log(error))

    }, [user])

    return (
        <>
            <div className="hero bg-base-200 mt-20 mb-24 py-5">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold inline">My Enrolled Classes</h1>
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
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {enrolled.map((singleEnrolled, i) => {
                            return <tr key={i}>
                                <td >{i + 1}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-20 h-16">
                                            <img src={singleEnrolled?.cart?.img} alt="Avatar" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {singleEnrolled?.cart?.className}
                                </td>
                                <td>
                                    {singleEnrolled?.cart?.name}
                                </td>

                                <td>
                                    {singleEnrolled?.cart?.price}
                                </td>
                                <td>
                                    {singleEnrolled?.date}
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );

};

export default MyEnrolledClasses;