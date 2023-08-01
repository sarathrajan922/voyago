import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import PaymentSuccessModal from "./PaymentSuccessModal";
import { userPaymentSuccess } from "../../../features/axios/api/user/userPaymentSuccess";

const PaymentFrom: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/`,
      },
      redirect: "if_required",
    });

    if (error) {
      console.log(error.message);
      setMessage(error.message ?? "Something went wrong");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment status:" + paymentIntent.status);
      const tourId = localStorage.getItem("tourId");
      const res = await userPaymentSuccess(tourId);
      if (res) {
        window.localStorage.removeItem("tourId");
        console.log("success");
        setOpen(true);
      }
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsProcessing(false);
  };

  return (
    <div>
      <PaymentSuccessModal open={open} setOpen={setOpen} />
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="border-solid border-gray-300 rounded-lg p-4 my-4 shadow-md"
      >
        <PaymentElement id="payment-element" />

        <button
          disabled={isProcessing || !stripe || !elements}
          id="submit"
          className=" bg-red-300 border-radius-radius rounded-md text-white border-0 py-3 px-4 mt-4 font-semibold cursor-pointer transition-all duration-200"
        >
          <span id="button-text">
            {isProcessing ? "Processing ..." : "Pay now"}
          </span>
        </button>

        {/* Show any error or success messages */}
        {message && (
          <div
            id="payment-message"
            className="hidden bg-blue-900 text-green-500 p-4 m-4 rounded-lg text-sm"
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default PaymentFrom;
