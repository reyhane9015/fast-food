"use client";

import { useEffect, useState , useContext } from 'react';
import { redirect, useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { CartContext } from '@/components/AppContext';
import SectionHeader from '@/components/ui/SectionHeader';
import { useSession } from 'next-auth/react';
import Input from '@/components/Input';
import ButtonPrimary from '@/components/layout/ButtonPrimary';



function OrderPaymentPage() {

  const {cartProducts , cartProductsCount} = useContext(CartContext);

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
  console.log(id);


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


  let total = 0;
  for (const p of cartProducts) {
      total += cartProductPrice(p);
  }



  useEffect(() => {
    setLoading(true);
    fetch('/api/orders').then(res => {
      res.json().then(data => {
        const order = data.find(i => i._id == id);
        // const orders = data;
        setOrder(order);
        console.log(order);
        // console.log(orders);
        setLoading(false);
      })
    })
  } , []);

  



  async function handleOrderPayment(e) {

    e.preventDefault();

    setIsSaving(true);

    const cardInfo = { cardNumber: cardNumber, expiryDate: expiryDate, cvv: cvv };

    const response = await fetch('/api/orders' , {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ _id: id , cardInfo , paid: true})
    })
    // console.log("response is:" , response);

    const result = await response.json();
    console.log("result is:" , result);

    setOrder(result);
   

    if(result.paid) {
      setRedirectToPaymentSuccess(true);
    } else {
      toast.error("something went wrong!");
    }
    setIsSaving(false);
    
  }


  if(redirectToPaymentSuccess) {
    return redirect('/payment-success');
  }


  return (
    <section className="bg-light-background dark:bg-dark-background min-h-screen">
      <div className="relative z-40 text-center pt-24">
        <SectionHeader subHeader="Payment" mainHeader="Details" />

        {/* {loading && <div 
          className="text-center font-semibold text-primary bg-light-background dark:bg-dark-background text-2xl h-screen flex justify-center items-center">
              Loading...
          </div>
        } */}

        {/* {JSON.stringify(cartProducts)} */}


        <form className="relative z-40 max-w-2xl m-auto border rounded-md p-4 bg-light-SBackground dark:bg-dark-SBackground" >

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
     
            
      </div>
    </section>
  )
}

export default OrderPaymentPage

