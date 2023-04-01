import React from 'react';
import {loadStripe, Stripe} from '@stripe/stripe-js'
import {CardElement, Elements, useStripe, useElements} from '@stripe/react-stripe-js'
import "bootswatch/dist/lux/bootstrap.min.css"

const stripePromise: Promise<Stripe | null> = loadStripe("pk_test_51Ms60fDepZWv3l5INkzkVIdajrEumIaxlTdMp7tlnRl5qawy33qKVjYyH90HwrFBxj5ew4tUXYxVPGatdhpD4Wib00MRtIg4p8");

const CheckoutForm = (): JSX.Element => {
    const stripe = useStripe();
    const elements = useElements();
    const cardElement = elements ? elements.getElement(CardElement) : null;
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      if (!cardElement) {
        // manejar el caso en que cardElement sea null o undefined
        return;
      }

      const { error, paymentMethod } = await stripe!.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if(!error){
        console.log(paymentMethod);
      }

    };

    return (<form onSubmit={handleSubmit} className='cardPay card-body'>
        <img 
        src='https://cleanpawer.com/wp-content/uploads/2021/05/adopt-a-pet-1200x700.jpeg'
        alt='donar'
        className='img-fluid'
        />
        <div className='form-group'>
        <CardElement className='form-control'/>
        </div>
        <button className='btn btn-success'>Donar</button>
    </form>)
}


export const Payment = (): JSX.Element => {
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