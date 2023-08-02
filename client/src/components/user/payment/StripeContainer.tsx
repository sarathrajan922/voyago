import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import {ToastContainer, toast } from "react-toastify";

import { createStripePayment, getConfig } from "../../../features/axios/api/user/userGetStripe";
interface Obj{
  person:string;
  packageId: string
}

const  StripeContainer=({ obj }: { obj: Obj })=>{
 
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string>("");
  

  const fetchConfig = async () => {
    try {
      const response = await getConfig();
      const publishableKey = response.data;
      console.log(publishableKey)
      setStripePromise(() => loadStripe(publishableKey));
    } catch (error) {
      toast.error("Something went wrong",{position:toast.POSITION.BOTTOM_RIGHT})
    }
  };
  const paymentIntentHandler = async () => {
    try {
      const response = await createStripePayment(obj);
      const { clientSecret } = response.data;
      console.log(clientSecret)
      setClientSecret(clientSecret);
    } catch (error) {
      toast.error("Something went wrong",{position:toast.POSITION.BOTTOM_RIGHT})
    }
  };
  useEffect(() => {
    fetchConfig();
  }, []);


  useEffect(() => {
    paymentIntentHandler();
  }, []);


  return (
    
    <div className='flex items-center min-w-[35rem] justify-center '>
     
      <div className="lg:w-1/2 w-full">
        {clientSecret && stripePromise && (

          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm />
          </Elements>
        )}
      </div>
      <ToastContainer/>
    </div>
  );
}

export default StripeContainer;
