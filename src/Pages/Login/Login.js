import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

const Login = () => {

    const { signIn, googleLogin, setLoading, loading,logLocation,setLogLocation } = useContext(AuthContext);
    const [showPass, setShowPass] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';


    const { handleSubmit, register, formState: { errors } } = useForm();

    const handleLogin = (data) => {
       
        const email = data.email;
        const password = data.password;
        // console.log("data edited",data, email, password)
        setLoading(true)
        signIn(email, password)
            .then(result => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login sucessfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                setLoading(false);
                if(logLocation){
                    setLogLocation(false)
                    navigate('/classes');
                }
              else{
                navigate(from, { replace: true });
              }
            })
            .catch(error => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Login failed',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
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
                    if(logLocation){
                        setLogLocation(false)
                        navigate('/classes');
                    }
                  else{
                    navigate(from, { replace: true });
                  }
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
        <div className=' h-[800px] flex justify-center items-center'>
            <div className='card w-96 bg-base-100 shadow-xl'>
                <h1 className='text-center text-4xl font-bold'>Login</h1>
                <form className='mt-6 text-center' onSubmit={handleSubmit(handleLogin)}>

                    <input className='input input-bordered  w-full max-w-xs mt-6' {...register("email", { required: "email is required" })}  type='Email' placeholder="Your Email"/>
                    {errors.email && <p className='text-red-600'>{errors.email?.message}</p>} 
                    <br />
                    
                    <input className='input input-bordered w-full max-w-xs mt-6' type={showPass ? "text" : "password"} placeholder="Your Password" {...register("password", { required: "Password is required" })}/>
                    {errors.password && <p className='text-red-600'>{errors.password?.message}</p>} 

                    <div>
                        {loading && <progress className="mt-8 progress w-56"></progress>}
                    </div>
                    <input className='btn w-full max-w-xs mt-6' value='Login' type="submit" />
                </form>
                <div className='flex mx-auto mt-8 items-center justify-around'>
                    <button onClick={() => setShowPass(!showPass)}>{showPass ? <div className='flex items-center'><p className='me-3'>Hide Password</p><FaRegEyeSlash /></div> : <div className='flex items-center'><p className='me-3'>Show Password</p><FaRegEye /></div>}</button>
                </div>
                <h1 className='w-full text-center mt-3'> New here? <Link to='/register' className='text-primary'>Create a account</Link></h1>
                <div className="divider">OR</div>
                <button onClick={handleGoogleSignin} className='btn mb-3 mt-5 ml-24 w-1/2' variant="outline-primary"> <img className='g-logo w-10 h-10' src='https://seeklogo.com/images/G/google-2015-logo-65BBD07B01-seeklogo.com.png' alt='' /> </button>
            </div>
        </div>
    );
};

export default Login;  