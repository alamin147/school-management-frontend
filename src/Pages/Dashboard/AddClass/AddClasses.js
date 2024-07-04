import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const imageHostToken = process.env.REACT_APP_IMG_TOKEN;

const AddClasses = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const { user, loading, setLoading } = useContext(AuthContext);

    const handleAddClass = (data) => {
        setLoading(true);
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?key=${imageHostToken}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    const classes = {
                        name: data.name,
                        className: data.className,
                        email: data.email,
                        price: data.price,
                        seats: data.seats,
                        img: imageData.data.display_url,
                        status: "pending",
                        feedback: '',
                        totalEnroll: 0
                    }
                    fetch('https://assignment-12-server-iota-two.vercel.app/addClasses',
                        {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(classes)
                        }
                    )
                        .then(res => res.json())
                        .then(result => {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: `Class '${data.className}' is added successfully`,
                                showConfirmButton: false,
                                timer: 1500
                            })
                            setLoading(false);
                        })
                        .catch(error => {
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: 'Failed, try again later',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        })

                }
                else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Failed, try again later',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setLoading(false);
                }
            })
        reset()
    }
    return (
        <>
            <div className="hero bg-base-200 mt-20 mb-24 py-5">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Add A Class</h1>

                    </div>
                </div>
            </div>
            <form className='mt-6 text-center pb-6' onSubmit={handleSubmit(handleAddClass)} >

                <input className='input input-bordered w-full max-w-xs mt-6' value={user?.displayName}   {...register("name")} type='text' />
                <br />

                <input className='input input-bordered w-full max-w-xs mt-6' value={user?.email}   {...register("email")} type='text' />
                <br />

                <input className='input input-bordered w-full max-w-xs mt-6' placeholder='Class Name'   {...register("className", { required: "Class name is required" })} type='text' />
                {errors.className && <p className='text-red-600'>{errors.className?.message}</p>}
                <br />

                <input className='input input-bordered w-full max-w-xs mt-6' placeholder='Price'  {...register("price", { required: "Price is required" })} type='text' />
                {errors.price && <p className='text-red-600'>{errors.price?.message}</p>}
                <br />

                <input className='input input-bordered w-full max-w-xs mt-6' placeholder='Number of seats'  {...register("seats", { required: "Seats number is required" })} type='text' />
                {errors.seats && <p className='text-red-600'>{errors.seats?.message}</p>}
                <br />

                <input className='input input-bordered w-full max-w-xs mt-6'  {...register("img", { required: "image is required" })} type='file' alt='img' placeholder="picture url" />
                {errors.img && <p className='text-red-600'>{errors.img?.message}</p>}
                <div>
                    {loading && <progress className="mt-32 progress w-56"></progress>}
                </div>
                
                <input className='btn w-full max-w-xs mt-6 btn-primary' value='Add Class' type="submit" />

            </form>
        </>
    );
};

export default AddClasses;