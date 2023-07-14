import  Stripe  from 'stripe'
import configKeys from '../../config'

const stripe = new Stripe(configKeys.STRIPE_SECRET_KEY || '', {
    apiVersion: '2022-11-15'
});


export const paymentService = () =>{
    const createPaymentIntent = async (amount: number)=>{
        const paymentIntent =   await stripe.paymentIntents.create({

            currency: 'INR',
          amount: amount*100,
          automatic_payment_methods: { enabled: true }
        })

        return paymentIntent
    }

    const getConfig = () => configKeys.STRIPE_PUBLISHABLE_KEY;

    return {
        createPaymentIntent,
        getConfig
    }
}

export type PaymentServieImpl = typeof paymentService;

    
