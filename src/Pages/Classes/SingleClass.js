import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const SingleClass = ({ classs }) => {

    const navigate = useNavigate();
    const { className, img, name, price, seats } = classs;
    const { user, setLogLocation } = useContext(AuthContext);
    let IntSeats;
    // eslint-disable-next-line use-isnan
    if (seats !== NaN) {
        IntSeats = parseInt(seats);
        // console.log("seat type", typeof (IntSeats))
    }

    const [role, setRole] = useState('');

    useEffect(() => {
        fetch(`https://assignment-12-server-iota-two.vercel.app/checkUser?email=${user?.email}`)
        .then(res => res.json())
        .then(result => {
            // console.log(result)
            setRole(result)
            // console.log(result?.role)
        })
        .catch(error => console.log(error))
       
    }, [user])

    const addToCart = (email, classs, className) => {
        if (!user) {
            setLogLocation(true)
            navigate('/login');
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `Please login first`,
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        const carts = {
            userEmail: email,
            selected: classs,
        }

        fetch('https://assignment-12-server-iota-two.vercel.app/addToClass', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(carts)
        })
            .then(res => res.json())
            .then(result => {

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Class ${className} is successfully bookmarked`,
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(error => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Failed to select the class ${className}, try again later`,
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }


    return (
        <div className={`mx-auto card w-96  shadow-xl ${IntSeats === 0 ? "bg-red-400 text-white" : "bg-base-100"}`}>
            <figure><img className='' src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title"><span className='font-medium'>Class Name:</span> {className}</h2>
                <p><span className='font-medium'>Instructor name: </span>{name}</p>
                <p><span className='font-medium'>Available seats: </span>{seats}</p>
                <p><span className='font-medium'>Price: </span>{price}</p>
                <div className="card-actions justify-end">
                    {IntSeats === 0 || role[0]?.role === 'admin'||role[0]?.role === 'instructor' ?
                        <button disabled className="btn text-white btn-primary">Select Class</button>
                        :
                        <button className="btn btn-primary" onClick={() => addToCart(user?.email, classs, className)}>Select Class</button>}
                </div>
            </div>
        </div>
    );
};

export default SingleClass;