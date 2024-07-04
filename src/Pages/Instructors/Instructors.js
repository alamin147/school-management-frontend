import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';

const Instructors = () => {
    const [instructors, setInstructors] = useState([]);
    useEffect(() => {
        fetch('https://assignment-12-server-iota-two.vercel.app/instructors')
            .then(res => res.json())
            .then(result => {
                // console.log(result)
                setInstructors(result)
            })
    }, [])

    return (
        <>
            {/* <p>users{users.length}</p> */}
            <div className="hero bg-base-200 mt-20 mb-24 py-5">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Instructors</h1>
                        <p className="py-6">Our talented and respected Instrucotrs</p>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12'>
        <Fade cascade damping={.2}>

                {instructors.map(instructor => {
                    return <div className="mx-auto card w-96 bg-base-100 shadow-xl">
                        <figure><img src={instructor.image} alt="" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                {instructor.name}
                            </h2>
                            <p>Email: {instructor.email}</p>
                            <div className="card-actions justify-end">
                                <div><button className="btn btn-primary">See Classes</button></div>
                            </div>
                        </div>
                    </div>
                })}
                </Fade>
            </div>
        </>
    );
};

export default Instructors;