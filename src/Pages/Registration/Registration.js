import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';


const Registration = () => {
    const navigate = useNavigate();
    const [errrors, setErrors] = useState("");

    const { googleLogin, loading, setLoading, setLogLocation } =
        useContext(AuthContext);

    const { handleSubmit, register, formState: { errors } } = useForm();

    const { userNamePhoto, createUser } = useContext(AuthContext);

    const formSubmit = (data) => {
        setLoading(true)
        console.log(data, data.name)
        if (data.password === data.password1) {
            createUser(data.email, data.password)
                .then(result => {
                    // console.log("result", result.user.email, result,)

                    const name = data.name;
                    const email = data.email;
                    const image = data.image;

                    const users = {
                        name: name,
                        email: email,
                        image: image,
                        role: 'student'
                    }

                    userNamePhoto(data.name, data.image)
                        .then(result => {
                            // console.log(result)
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Registered sucessfully',
                                showConfirmButton: false,
                                timer: 1500
                            })

                            addUsers(users)
                            setLoading(false);
                        })
                        .catch(error => {
                            console.log(error)
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: 'Registered failed',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            setLoading(false)
                        })
                })
                .catch(error => {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Registered failed',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setLoading(false)
                    console.log(error)
                });
        }
        else {
            setErrors("Password must be same");
            return;
        }
        navigate('/');
        setLogLocation(false);
    }

    const addUsers = (users) => {

        fetch("https://assignment-12-server-iota-two.vercel.app/addUsers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(users),
        })
            .then((res) => res.json())
            .then((result) => {
                // console.log(result)
                setLoading(false)

            })
            .catch(err => { console.log(err) });
    }




    const handleGoogleSignin = () => {
        setLoading(true)
        googleLogin().then(result => {
            const recentUser = result.user;
            const usersBySocialLogin = {
                name: recentUser.displayName,
                email: recentUser.email,
                image: recentUser.photoURL,
                role: 'student'
            }

            fetch("https://assignment-12-server-iota-two.vercel.app/addUsers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usersBySocialLogin),
            })
                .then((res) => res.json())
                .then((result) => {
                    // console.log(result)
                    setLoading(false)
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Login sucessfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate('/');
                    setLogLocation(false);

                })
                .catch(err => { console.log(err) });
        })
            .catch(error => {
                Swal.fire({
                    position: 'center',
                    icon: 'erroe',
                    title: 'Login failed',
                    showConfirmButton: false,
                    timer: 1500
                })
                setLoading(false)
            })
    }

    return (
        <>
            <div className=' h-[800px] flex justify-center items-center'>
                <div className='card w-96 bg-base-100 shadow-xl'>
                    <h1 className='text-center text-4xl font-bold'>Sign Up</h1>
                    <form className='mt-6 text-center' onSubmit={handleSubmit(formSubmit)}>
                        <input className='input input-bordered w-full max-w-xs mt-6' {...register("name", { required: "Name is required" })} type='text' placeholder="Your Name" />
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>} <br />

                        <input className='input input-bordered w-full max-w-xs mt-6' {...register("image", { required: "image is required" })} type='text' placeholder="Your Image URL" />

                        <input className='input input-bordered w-full max-w-xs mt-6' {...register("email", { required: "Email Address is required" })} type='text' placeholder="Your Email" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>} <br />
                        <input className='input input-bordered w-full max-w-xs mt-6' {...register("password", {
                            required: "Password is required", minLength: { value: 6, message: "password must be 6 characters" }, pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: "password must be strong" }
                        })} type='password' placeholder="Your Password" />
                        {errrors ? <p className='text-red-600'></p> : <></>}
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        <input className='input input-bordered w-full max-w-xs mt-6' {...register("password1", {
                            required: "Password is required", minLength: { value: 6, message: "Password did not match" }, pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: "password must be strong" }
                        })} type='password' placeholder="Confirm Password" />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}



                        <input className='btn w-full max-w-xs mt-6' value='signup' type="submit" />
                    </form>
                    <div className='text-center'>
                        {loading && <progress className="mt-8 progress w-56"></progress>}
                    </div>
                    <h1 className='w-full text-center mt-3'> Already have a account? <Link to='/login' className='text-primary'>Login</Link></h1>
                    <div className="divider">OR</div>
                    <button onClick={handleGoogleSignin} className='btn mb-3 mt-5 ml-24 w-1/2' variant="outline-primary"> <img className='g-logo w-10 h-10' src='https://seeklogo.com/images/G/google-2015-logo-65BBD07B01-seeklogo.com.png' alt='' /> </button>
                </div>

            </div>
        </>
    );
};

export default Registration;