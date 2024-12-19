"use client";

import Image from "next/image";
import { useState ,useEffect,  useContext } from 'react';
import { redirect } from 'next/navigation';
// import Check from './../../../components/icons/Check';
import { CartContext } from '@/components/AppContext';
import ButtonPrimary from '@/components/layout/ButtonPrimary';



export default function PaymentSuccessPage() {

  const {cartProducts , cartProductPrice , clearCart} = useContext(CartContext);

  const[redirectToOrders , setRedirectToOrders] = useState(false);
  const[loading , setLoading] =useState(true);
  // const[total , setTotal] = useState(0);


  const handleOk = () => {
    // setLoading(true);
    setRedirectToOrders(true);
    // clearCart();
    // setLoading(false);
  }



  if(redirectToOrders) {
    return redirect('/orders');
  }

  let total = 0;
  for (const p of cartProducts) {
    total += cartProductPrice(p);
  }


  return (
    <section className="bg-light-background dark:bg-dark-background min-h-screen text-center">
{/*       
      {loading && <div 
        className="text-center font-semibold text-primary bg-light-background dark:bg-dark-background text-2xl h-screen flex justify-center items-center">
            Loading...
        </div>
      } */}



      <div className="relative z-40 flex gap-2 items-center justify-center pt-36 text-light-text dark:text-dark-text">
          {/* <Check /> */}
          <Image src="/successful-animation.gif" width={100} height={100} alt="successful-animation" />
          <p className="font-semibold text-4xl">Payment Successful!</p>
      </div>
      <div className="relative z-40 text-2xl my-4 text-light-text dark:text-dark-text">
        Thank you!Your payment 
        {/* <b className="text-xl px-2">
          {total + 10}$
        </b> */}
           has been received.
      </div>

      <div>
        {/* <p className="my-4 text-light-text dark:text-dark-text">Payment Details</p>
        <div className="max-w-md mx-auto border border-gray-200 p-4 mb-8">
        
            {cartProducts?.length > 0 && cartProducts.map((product , index) => (
                <div key={index} className="flex gap-4 items-center mb-2 justify-between">

                  <p className="font-semibold text-light-text dark:text-dark-text">{product.name}:</p>

                  <div className="font-semibold text-primary">{cartProductPrice(product)}$</div>

                </div>
            ))}

            <div className="flex gap-4 items-center justify-between text-light-text dark:text-dark-text">
                Delivery: <span>10$</span>
            </div>

        </div>
        */}

       {/* <button type="button" onClick={handleOk} className="relative z-40 max-w-[100px] mx-auto bg-primary mt-8 py-4 text-white rounded-md">
         OK
       </button> */}

       <div className="relative z-40 max-w-[200px] mx-auto">
          <ButtonPrimary onClick={handleOk} title="Go To Order details" />
       </div>


      </div>
      </section>
  )
}


