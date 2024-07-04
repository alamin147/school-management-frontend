import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const UpdateClass = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const { loading, setLoading } = useContext(AuthContext);

    const myClass = useLoaderData();
    // console.log("class", myClass)
    const navigate = useNavigate();
    const handleUpdateClass = (data) => {
        setLoading(true);

        const updatedClass = {
            className: data.className,
            price: data.price,
            seats: data.seats,

        }
        fetch(`https://assignment-12-server-iota-two.vercel.app/updateMyclass?id=${myClass._id}`,
            {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updatedClass)
            }
        )
            .then(res => res.json())
            .then(result => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Class '${data.className}' is updated successfully`,
                    showConfirmButton: false,
                    timer: 1500
                })
                setLoading(false);
                navigate('/dashboard/myClasses');
            })
            .catch(error => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Failed, try again later',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/dashboard/myClasses');
                setLoading(false);
            })

        reset()
    }

    return (
        <>
            <div className="hero bg-base-200 mt-20 mb-24 py-5">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Update Class</h1>
                    </div>
                </div>
            </div>

            <form className='mt-6 text-center pb-6' onSubmit={handleSubmit(handleUpdateClass)} >



                <label htmlFor="classame" className='me-8'>Class Name:</label>
                <input className='input input-bordered w-full max-w-xs mt-6' placeholder='Class Name'   {...register("className", { required: "Class name is required" })} defaultValue={myClass.className} type='text' />
                {errors.className && <p className='text-red-600'>{errors.className?.message}</p>}
                <br />

                <label htmlFor="price" className='me-20'>Price:</label>
                <input className='input input-bordered w-full max-w-xs mt-6' placeholder='Price'  {...register("price", { required: "Price is required" })} defaultValue={myClass.price} type='text' />
                {errors.price && <p className='text-red-600'>{errors.price?.message}</p>}
                <br />
                <label htmlFor="seats" className='me-20'>Seats:</label>
                <input className='input input-bordered w-full max-w-xs mt-6' placeholder='Number of seats'  {...register("seats", { required: "Seats number is required" })} defaultValue={myClass.seats} type='text' />
                {errors.seats && <p className='text-red-600'>{errors.seats?.message}</p>}
                <br />

                <div>
                    {loading && <progress className="mt-8 progress w-56"></progress>}
                </div>
                <input className='btn w-full max-w-xs mt-6 btn-primary' value='Update Class' type="submit" />

            </form>

        </>
    );
};

export default UpdateClass;