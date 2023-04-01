import React, { useState, } from "react";
import {loadStripe} from "@stripe/stripe-js"
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js' //Engloba a otros componentes para qlos componentes q contenga, tengan acceso a la conexion a Stripe
import axios from "axios";

const stripePromise= loadStripe('pk_test_51Ms5HqGfi9BkoSkaXzqiNGFgbvsyKUutx80wQBkbtCrLlCkNPzfebOL0qPq2EEplchjDpbhtRatHMGGXBluYkmjQ00oXOEErJv')

function CheckoutForm () {

    const [loading, setLoading] =useState(false)


    const stripe =useStripe();
    const elements =useElements();

    const handleSubmit = async (e) =>{
        e.preventDefaukt();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })
        setLoading(true);
        if (!error){
            const {id} =paymentMethod;

            try {
                const {data} = await axios.post('http://localhost/3001/api/checkout', {
                id,
                amount: 1000 //Va en centavos!
             })
                console.log(data)
             elements.getElement(CardElement).clear()
            
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
    }

    return (
        <Elements stripe={stripePromise}>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button disabled={!stripe}>{loading? 'Cargando...' : 'Donar' }</button>
            </form>
        </Elements>


    )
}

export default CheckoutForm;