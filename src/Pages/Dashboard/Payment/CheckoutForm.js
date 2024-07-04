import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ cart, price }) => {

  // console.log(cart)
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const { user } = useContext(AuthContext);
  const [load, setLoad] = useState(false);
  const [transactionId, setTransactionId] = useState('');


  useEffect(() => {
    if (price > 0) {
      fetch('https://assignment-12-server-iota-two.vercel.app/create-payment', {

        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ price })

      })
        .then(res => res.json())
        .then(result => {
          setClientSecret(result?.clientSecret)
          // console.log(result?.clientSecret)
        })
    }
  }, [price])


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return
    }

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })


    if (error) {
      setCardError(error.message)
    }
    else {
      setCardError('')
    }

    setLoad(true);

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'unknown',
            name: user?.displayName || 'anonymous'
          },
        },
      },
    );

    if (confirmError) {

    }
    // console.log(paymentIntent)

    setLoad(false)
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id)
      const payment = {
        email: user?.email,
        name: user?.displayName,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
        cart: cart?.selected
      }

      fetch(`https://assignment-12-server-iota-two.vercel.app/payments?id=${cart._id}`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payment),

      })
        .then(res => res.json())
        .then(result => {
          Swal.fire({
            title: 'Payment Successful',
            text: `Your transaction id is: ${paymentIntent.id}`,
            icon: 'success',
            confirmButtonText: 'OK!'
          })
          navigate('/dashboard/myAddedClasses')
        })
        .catch(error => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `Payment failed, try again later`,
            showConfirmButton: false,
            timer: 1500
          })
        })
    }


  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#FFFFFF',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#FF0000',
              },
            },
          }}
        />
        <button className='mt-16 btn btn-primary' type="submit" disabled={!stripe || !clientSecret || load}>
          Pay
        </button>
      </form>
      {cardError && <p className='text-red-700 mt-8'>{cardError}</p>}
    </>
  );
};

export default CheckoutForm;
