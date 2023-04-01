import React, { useEffect, useState } from 'react';
import {loadStripe, Stripe} from '@stripe/stripe-js'
import {CardElement, Elements, useStripe, useElements} from '@stripe/react-stripe-js'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Reducer } from '../../redux/store/store';
import { getDetailPets } from '../../redux/actions/actions';
import { AnyAction } from 'redux';

const stripePromise: Promise<Stripe | null> = loadStripe("pk_test_51Ms60fDepZWv3l5INkzkVIdajrEumIaxlTdMp7tlnRl5qawy33qKVjYyH90HwrFBxj5ew4tUXYxVPGatdhpD4Wib00MRtIg4p8");

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [loading, setLoading] =useState(false)
    const cardElement = elements ? elements.getElement(CardElement) : null;
  const [input, setInput] = useState(0)
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
                const {data} = await axios.post('http://localhost:3001/api/checkout', {
                id,
                amount: input*100 //Va en centavos!
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
        <input type="number" value={input} onChange={(e) => setInput(parseInt(e.target.value))} placeholder="Ingrese el monto a donar"/>          
        <button type="submit" className="btn btn-primary" disabled={!stripe || input <= 0}> {loading ? 'Cargando...' : 'Donar' } </button>

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

  const dispatch = useDispatch();
  const {id} = useParams();
  const pet = useSelector((state:Reducer)=> state.detail)
  useEffect(() => {

    dispatch(getDetailPets(id!) as unknown as AnyAction);
  }, [id, dispatch]);

  return (

    <div>
    <h1>Donacion</h1>
    <p>Estas por donar a {pet.apa?.name} que cuidan a {pet.name} </p>  
    
    <Elements stripe={stripePromise}>
      <div className='containerPay p-4'>
        <div className='rowp'>
            <div className='col-md-4 offset-md-4'>
            <CheckoutForm  /> 
            </div>
        </div>
      </div>
    </Elements>
    </div>
  );
};