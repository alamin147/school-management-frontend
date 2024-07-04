import React, { useEffect, useState } from 'react';
import SingleClass from './SingleClass';
import { Fade } from 'react-awesome-reveal';

const Classes = () => {

    const [classes, setClasses] = useState([]);
    useEffect(() => {
        fetch('https://assignment-12-server-iota-two.vercel.app/classesApproved')
            .then(res => res.json())
            .then(data => {
                console.log("classes data", data)
                setClasses(data)
            })
            .catch(error => console.log(error))
    }, [])


    return (
        <div>
            <div className="hero bg-base-200 mt-20 mb-24 py-5">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Classes</h1>
                        <p className="py-6">Join the releavent classes today</p>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12'>
                <Fade cascade damping={.1}>

                    {
                        classes.map((singleClass) => {
                            return <SingleClass classs={singleClass} key={singleClass._id}></SingleClass>
                        })
                    }
                </Fade>
            </div>
        </div>
    );
};

export default Classes;