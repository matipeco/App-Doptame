const checkoutRouter = require("express").Router();
const { trusted } = require("mongoose");
const Stripe = require ('stripe');

const stripe = new Stripe('sk_test_51Ms5HqGfi9BkoSkaRxF6Uyu8j7AgzClbAwE98PyXXivPAeTHKjNOVkbEOEJzFe8HsQtHYxzsuymMGjsldX7wh4AS00VSYb0i3I')


checkoutRouter.post('/', async (req, res)=>{
    try {
        // console.log(req.body)
        // res.status(200).json('Datos de Pago Recibidos por el Back')
        const {id, amount} = req.body
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'USD',
            description: 'Donacion de 10 USD',
            payment_method: id,
            confirm: trusted
        })
        console.log(payment)
        res.status(200).json('Pago registrado!')
        
    } catch (error) {
        res.status(400).json({message: error.raw.message});
        
    }
})




module.exports = checkoutRouter;