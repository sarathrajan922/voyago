import React, { useEffect, useState } from "react";
import { getBookedDetails } from "../../../features/axios/api/user/userGetBookedDetails";
import { PackageDataApiResponse } from "../../../API/type/getPackage";

import { useParams } from "react-router-dom";



// import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

// const PUBLIC_KEY = 'pk_test_51NTMmoSFPChhJoiCyHv0p246ZZcYUdKzG5qhm6h3VoenVooZ4eTi51ZLzj1JnnvwTYpo69aIbPeTxXPtbrUpevtd00sWerjYF7';
// const stripeTestPromise = loadStripe(PUBLIC_KEY);

// const PaymentForm: React.FC = () => {

//    const [success, setSuccess] = useState(false);
//    const stripe = useStripe();
//    const elements = useElements();

//    const CARD_OPTIONS: StripeCardElementOptions = {
//       iconStyle: "solid", // Update the value to "solid"
//       style: {
//         base: {
//           iconColor: "#c4f0ff",
//           color: "#00000",
//           fontWeight: 500,
//           fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
//           fontSize: "16px",
//           fontSmoothing: "antialiased",
//           ":-webkit-autofill": { color: "#fce883" },
//           "::placeholder": { color: "#87bbfd" }
//         },
//         invalid: {
//           iconColor: "#ffc7ee",
//           color: "#ffc7ee"
//         }
//       }
//     };

//    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();

//       if (!stripe || !elements) {
//          return;
//       }

//       const cardElement = elements.getElement(CardElement);

//       if (!cardElement) {
//          return;
//       }

//       const { error, paymentMethod }= await stripe.createPaymentMethod({
//          type: 'card',
//          card: cardElement
//       });

//       if (!error) {
//          try {
//             const { id } = paymentMethod;
//             const response = await axios.post(BASE_URL + 'auth/user/payment', {
//                amount: 1000,
//                id
//             });

//             if (response.data.success) {
//                setSuccess(true);
//             }
//          } catch (error: any) {
//             console.log('Something went wrong');
//          }
//       } else {
//          console.log('Error:', error);
//       }
//    };

//    return (
//       <>
//       {!success ?
//         <form onSubmit={handleSubmit}>
//             <fieldset className="FormGroup">
//                 <div className="FormRow">
//                     <CardElement options={CARD_OPTIONS}/>
//                 </div>
//             </fieldset>
//             <button>Pay</button>
//         </form>
//         :
//        <div>
//            <h2>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
//        </div>
//         }
//       </>
//    );
// }

const PaymentPage: React.FC = () => {
  const { id } = useParams();
  const [tourPackage, setTourPackage] = useState<PackageDataApiResponse | null>(
    null
  );
  const [personalData, setPersonalData] = useState({
    name: "",
    person: "",
  });
  const [total, setTotal] = useState<number>(0);

  const formattedTotal = total.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  useEffect(() => {
    const getUserBookedData = async () => {
      const data = await getBookedDetails(id);
      const packageDetails = data?.result?.packageId;
      setTourPackage(packageDetails);
      setTotal(packageDetails?.price * data?.result?.person);
      setPersonalData({
        name: data?.result?.firstName + " " + data?.result?.lastName,
        person: data?.result?.person,
      });
    };
    getUserBookedData();
  }, [id]);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
        <div className=" flex flex-col justify-evenly p-10 md:p-12 mb-8">
          <h2 className="text-center text-gray-900  dark:text-white text-xl md:text-4xl font-extrabold mb-2">
            <span className="text-blue-800">Payment page</span>
          </h2>

          <div className="grid lg:grid-cols-2 justify-items-center ">
            {/* loop this div */}

            <div className="py-5 px-2  max-h-[40rem]">
              <div className="rounded overflow-hidden hover:shadow-lg">
                <img src={tourPackage?.images} alt="" />
                <div className="py-3 px-3 text-center">
                  {tourPackage?.packageName}
                </div>
              </div>
            </div>

            <div className="py-5 px-2  max-h-[40rem]">
              <div className="rounded overflow-hidden hover:shadow-lg">
                <div className="ms-2 px-1">
                  <h2 className="text-m text-black font-bold mb-1">
                    {tourPackage?.packageName.toUpperCase() ?? "packageName"}
                  </h2>

                  <p className="text-l text-gray-500 dark:text-white mt-1 mb-2">
                    {tourPackage?.description ?? "description "}
                  </p>
                  <span className=" font-semibold text-gray-900 dark:text-white mt-1 ">
                    Category:
                  </span>
                  <span className="text-gray-500">
                    {tourPackage?.category ?? "cateory"}
                  </span>
                  <br />
                  <span className="font-semibold mb-1">Locations:</span>
                  <span className="text-gray-500">
                    {tourPackage?.locations ?? "locations"}
                  </span>
                  <br />
                  <span className="font-semibold">Services:</span>
                  <span className="text-gray-500">
                    {tourPackage?.services ?? "services"}
                  </span>
                  <br />
                  <div className="my-4">
                    <h3 className="my-1 text-m text-black font-bold">
                      PERSONAL DETAILS
                    </h3>
                    <span className="my-1 font-serif">Name:</span>
                    <span className="my-1 text-m ms-2 text-gray-700">
                      {personalData?.name.toUpperCase()}
                    </span>
                    <br />
                    <span className="my-1 font-serif">person:</span>
                    <span className="my-1 text-sm ms-2 text-gray-700">
                      {personalData?.person}
                    </span>
                    <br />
                    <span className="my-1 font-serif">Total: </span>
                    <span className="ms-2 text-green-500">
                      {formattedTotal}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-500 my-5  justify-items-center w-full lg:h-[30rem] min-h-[20rem]">

          
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;

