import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Deny = () => {
    const { id } = useParams();
    console.log(id)
    const { loading, setLoading } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const handleDeny = (data) => {
        setLoading(true)
        // const feedback = data;
        fetch(`https://assignment-12-server-iota-two.vercel.app/deny?id=${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        )
            .then(res => res.json())
            .then(result => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Class Denied and feedback sent successfully`,
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(error => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `Failed try again later`,
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        reset()
        navigate('/dashboard/manageClasses')
        setLoading(false);

    }

    return (
        <>
            <div className="hero bg-base-200 mt-20 mb-24 py-5">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold inline">Send feedback to the denied class</h1>
                        <div>
                            {loading && <progress className="progress w-56"></progress>}
                        </div>
                    </div>
                </div>
            </div>


            <form className='mt-6 text-center pb-6' onSubmit={handleSubmit(handleDeny)} >
                <input className='input input-bordered w-full max-w-xs mt-6 h-28' placeholder='Feedback'  {...register("feedback")} type='text' required />
                {errors.feedback && <p className='text-red-600'>{errors.feedback?.message}</p>}
                <br />
                <input className='btn w-full max-w-xs mt-12 btn-primary' value='Send Feedback' type="submit" />
            </form>
        </>
    );
};

export default Deny;