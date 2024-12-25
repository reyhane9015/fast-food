"use client";

import { useEffect, useState , useContext } from 'react';
import { redirect, useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { CartContext } from '@/components/AppContext';
import SectionHeader from '@/components/ui/SectionHeader';
import { useSession } from 'next-auth/react';
import Input from '@/components/Input';
import ButtonPrimary from '@/components/layout/ButtonPrimary';


function OrderPaymentPage() {

  const {cartProducts , cartProductsCount , cartProductPrice , clearCart} = useContext(CartContext);


  const[isSaving , setIsSaving] = useState(false);
  const[cardNumber , setCardNumber] = useState('');
  const[expiryDate , setexpiryDate] = useState('');
  const[cvv , setCvv] = useState('');
  const[loading , setLoading] =useState(true);


  const[redirectToPaymentSuccess , setRedirectToPaymentSuccess] = useState(false);


  const session = useSession();
  const status = session.status;

  const [userName , setUserName] = useState('');
  const[user , setUser] = useState(null);


  const[order , setOrder] = useState(null);
  const[profileFetched , setProfileFetched] = useState(false);


  const{id} = useParams();
  // console.log(id);

  

//   useEffect(() => {

//     setUserName(session.data?.user?.name);

//     fetch('/api/profile').then(response => {
//         response.json().then(data => {
//             console.log("data is" , data);
//             setUser(data);
//             setProfileFetched(true); 
//         })
//     })
// } , [status]);



// console.log(cartProducts);


  let total = 0;
  for (const p of cartProducts) {
      total += cartProductPrice(p);
  }



  useEffect(() => {

    const fetchorderData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/orders');
        if(!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        const order = data.find(i => i._id == id);
        setOrder(order);
        // console.log(order);
        // console.log(orders);
        setLoading(false);
      } catch(error) {
        console.error('Error fetching order:', error);
        toast.error('Error fetching order');
        setLoading(false);
      }
    }
  
    fetchorderData();
  } , [id]);

  



  const handleOrderPayment = async (e) => {
    e.preventDefault();

    setIsSaving(true);

    const cardInfo = { cardNumber, expiryDate, cvv };

    try {
      const response = await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: id, cardInfo, paid: true })
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      const result = await response.json();
      // console.log("Payment result:", result);

      setOrder(result);

      if (result.paid) {
        setRedirectToPaymentSuccess(true);
      } else {
        toast.error("Something went wrong with the payment!");
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };


  if(redirectToPaymentSuccess) {
    clearCart();
    return redirect('/payment-success');
  }


  if (status === 'loading') {
    return (
      <div className="relative z-40 text-center font-semibold text-primary text-2xl h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }


  return (
    <section className="bg-light-background dark:bg-dark-background min-h-screen">
      <div className="relative z-40 text-center pt-24">
        <SectionHeader subHeader="Payment" mainHeader="Details" />

        {status == "authenticated" ? 
          <form onSubmit={handleOrderPayment} className="relative z-40 max-w-2xl m-auto border rounded-md p-4 bg-light-SBackground dark:bg-dark-SBackground" >

            <Input 
              type={"text"}
              label={"Card Number"} 
              placeholder={"** ** ** **"} 
              value={cardNumber} 
              onChange={(e) => setCardNumber(e.target.value)}
              isSaving={isSaving}
              disabled={isSaving} 
            />

              <div className="flex gap-4 justify-center">
                <div className="grow">
                    <Input 
                      type={"text"}
                      label={"Expiry Date"} 
                      placeholder={"Expiry Date"} 
                      value={expiryDate} 
                      onChange={(e) => setexpiryDate(e.target.value)}
                      isSaving={isSaving}
                      disabled={isSaving} 
                    />
                </div>

              <div className="grow">

                <Input 
                    type={"text"}
                    label={"CVV"} 
                    placeholder={"CVV"} 
                    value={cvv} 
                    onChange={(e) => setCvv(e.target.value)}
                    isSaving={isSaving}
                    disabled={isSaving} 
                  />
              </div>
            </div>



              {/* <div className="py-4 my-2 border-y-2">
                  <div className="font-semibold text-light-text dark:text-dark-text">
                      <div>
                        SubTotal Price: <span>{total}$</span>
                      </div>
                      <div>
                          Delivery Price: <span>10$</span>
                      </div>
                  </div>
              </div>

              <div className="font-semibold text-2xl py-4 text-light-text dark:text-dark-text">
                  Total Price: <span>{total + 10}$</span>
              </div> */}

            <div className="w-[60%] mx-auto">
              <ButtonPrimary type="submit" disabled={isSaving} onClick={handleOrderPayment} title="Pay" />
            </div>
                
            {/* <button type="submit" disabled={isSaving} onClick={handleOrderPayment}>Pay</button> */}
                  
          </form> 
          :
          <div className="relative z-40 text-center text-lg text-gray-600 font-semibold">Please Login to continue?
            <Link href="/login" className="text-primary underline">Login</Link>
          </div>
        }
            
      </div>
    </section>
  )
}

export default OrderPaymentPage

