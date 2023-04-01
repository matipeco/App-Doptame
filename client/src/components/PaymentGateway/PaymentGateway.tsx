import React, { useState } from 'react';
import {loadStripe, Stripe} from '@stripe/stripe-js'
import {CardElement, Elements, useStripe, useElements} from '@stripe/react-stripe-js'
import "bootswatch/dist/lux/bootstrap.min.css"
import axios from 'axios';

const stripePromise: Promise<Stripe | null> = loadStripe("pk_test_51Ms60fDepZWv3l5INkzkVIdajrEumIaxlTdMp7tlnRl5qawy33qKVjYyH90HwrFBxj5ew4tUXYxVPGatdhpD4Wib00MRtIg4p8");

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [loading, setLoading] =useState(false)
    const cardElement = elements ? elements.getElement(CardElement) : null;
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      if(!stripe || !elements){
        return;
      }
      if (!cardElement) {
        setPaymentError("Error al cargar la información de la tarjeta");
        return;
      }
      const { error, paymentMethod } = await stripe!.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
      setLoading(true);

      if (error) {
      setPaymentError(error.message ?? 'Error desconocido');
    } else {
      setPaymentError(null);
      console.log(paymentMethod);
      const {id} =paymentMethod;

            try {
                const {data} = await axios.post('http://localhost/3001/api/checkout', {
                id,
                amount: 1000 //Va en centavos!
             })
                console.log(data)
                cardElement.clear()
            
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }

    }

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="card-element">Tarjeta de crédito</label>
          <CardElement id="card-element" className="form-control"/>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={!stripe} > {loading ? 'Cargando...' : 'Donar' } </button>
        </div>
        {paymentError && (
          <div className="alert alert-danger" role="alert">
            {paymentError}
          </div>
        )}
      </form>
    );
  };



export const PaymentGateway = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className='containerPay p-4'>
        <div className='rowp'>
            <div className='col-md-4 offset-md-4'>
            <CheckoutForm  /> 
            </div>
        </div>
      </div>
    </Elements>
  );
};