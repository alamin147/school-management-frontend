import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';


const stripePromise = loadStripe(process.env.REACT_APP_PK);
const Payment = () => {
    const { loading } = useContext(AuthContext)

    const [payItem, setPayItem] = useState([]);
    const [total, setTotal] = useState(0);
    const { id } = useParams()
    useEffect(() => {
        fetch(`https://assignment-12-server-iota-two.vercel.app/carts/${id}`)
        .then(res=>res.json())
        .then(result => {
            setPayItem(result)
            const totalString = result?.selected?.price;
            const total = parseFloat(totalString);
            setTotal(total)
            // console.log(total, typeof(total))
        })
    }, [id])

    return (
        <>
            <div className="hero bg-base-200 mt-20 mb-24 py-5">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold inline">Payment</h1>
                        <div>
                            {loading && <progress className="progress w-56"></progress>}
                        </div>
                    </div>
                </div>
            </div>

            <div className='ms-48 me-48'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm cart={payItem} price={total}></CheckoutForm>
                </Elements>
            </div>

        </>
    );
};

export default Payment;