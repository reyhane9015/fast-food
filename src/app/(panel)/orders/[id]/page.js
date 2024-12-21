"use client";

import { useEffect, useState , useContext } from 'react';
import { redirect , useParams } from 'next/navigation';
import Link from 'next/link';
import UserTabs from '@/components/ui/UserTabs';
import DeleteButton from '@/components/DeleteButton';
import { toast } from 'react-hot-toast';


import withAuth from './../../../../libs/withAuth';
import LinkPrimary  from '@/components/ui/LinkPrimary';
import { CartContext } from '@/components/AppContext';
import { useSession } from 'next-auth/react';


function OrderPage() {

  const session = useSession();
  const status = session.status;

  const {cartProducts , cartProductPrice} = useContext(CartContext);

  const[order , setOrder] = useState(null);
  const[redirectToOrders ,setRedirectToOrders] = useState(false);
  const[loading , setLoading] =useState(true);


  const{id} = useParams();

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        const order = data.find(i => i._id === id);
        setOrder(order);
      } catch (error) {
        console.error('Error fetching order:', error);
        toast.error('Failed to fetch order data');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [id]);
  
  if(redirectToOrders) {
    return redirect('/orders');
  }



  // console.log("cartProducts: " , cartProducts);

  // let total = 0;
  // for (const p of cartProducts) {
  //     total += cartProductPrice(p);
  // }

  


    // Delete Order
    const handleItemDelete = async () => {

      const deletionPromise = new Promise(async(resolve, reject) => {
        try {
          const response = await fetch('/api/orders', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({_id: id})
          })
   
          if (response.ok) {
           resolve();
         } else {
            reject('Error deleting order');
          }
        } catch(error) {
          reject('Error deleting order');
        }
      })
  
      await toast.promise(deletionPromise, {
        loading: 'Deleting Order...',
        success: 'Order Deleted Successfully!',
        error: 'Error in Deleting Order',
      });
      
      setRedirectToOrders(true);
    }


    if(status == "unauthenticated") {
      return redirect ("/login");
    }


  
  return (
    <section>
      
      {/* <UserTabs isAdmin={true}/> */}

      {/* {loading && <div 
                    className="text-center font-semibold text-primary bg-light-background dark:bg-dark-background text-2xl h-screen flex justify-center items-center">
                    Loading...
                  </div>
      } */}
      
       {status == "authenticated" && 



          <div className="max-w-6xl mx-auto">
              <div className="flex justify-between mb-8">

                {/* <div className="max-w-[200px] flex justify-center border border-primary text-primary py-4 px-2 rounded-full">
                  <Link href="/orders">{'<<'} Back to All Orders</Link>
                </div> */}
                
                <div className="w-[170px] mb-16">
                    <LinkPrimary href={"/orders"} title="Back to All Orders" />
                </div>

                <div>
                  <DeleteButton label="Delete" onDelete={handleItemDelete} />
                </div>

              </div>

              <div>
                  {order &&  
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

                        <div className="border border-primary p-8 rounded-lg">
                          <p className="font-semibold mb-4 text-light-text dark:text-dark-text">
                            <b className="text-primary">
                              {order.userEmail}
                            </b>
                            Order Products:
                          </p>

                          <div className="border-b-2">
                            {order.cartProducts && order.cartProducts.map(p =>
                              
                                <div key={p._id} className="flex items-center justify-between mb-4 font-semibold text-xl text-gray-500">
                                    <p>{p.name}</p>
                                    <p className="text-sm">
                                      {p.extras && p.extras.map((ex,index)=> <span key={index}>{ex.name} + {ex.price}, </span>)}
                                    </p>
                                    {/* <div className="font-semibold text-primary">quantity: {p.quantity}</div> */}
                                </div>
                            
                              )}
                          </div>

                            <div className="text-right font-semibold py-8 text-2xl text-light-text dark:text-dark-text">Total Price: {order.totalPrice + 10}$ </div>
                        </div>

                      <div>
                        <div className="bg-primary text-white p-8 rounded-lg mb-4">
                          <p className="font-semibold mb-4">
                              <b className="text-black">
                                {order.userEmail}
                              </b>
                              Card Information:
                          </p>
                          {order.cardInfo && 
                            <div className="">
                              <p className="text-center mb-4">
                                <div className="font-semibold">Card Number</div>
                                <div>{order.cardInfo.cardNumber}</div>
                              </p>

                              <div className="flex px-4 justify-between">
                                <p className="flex gap-2 items-center justify-between">
                                  <span className="font-semibold">Card Expiry Date:</span>
                                  <span>{order.cardInfo.expiryDate}</span>
                                </p>
                                <p className="flex gap-2 items-center justify-between">
                                  <span className="font-semibold">Cvv:</span>
                                  <span>{order.cardInfo.cvv}</span>
                                </p>
                              </div>

                            </div>
                          }
                        </div>

                        <div className="bg-gray-100 p-8 rounded-lg">

                          <p className="font-semibold mb-4">
                            <b className="text-primary">
                              {order.userEmail}
                            </b>
                            Address:
                          </p>

                          {order.user && order.user.map(u => 
                            <div key={u._id} className="flex flex-col gap-2">
                              <p className="flex items-center justify-between">
                                <span>Phone:</span>
                                <span>{u.phone}</span>
                              </p>
                              <p className="flex items-center justify-between">
                                <span>Postal Code:</span>
                                <span>{u.postalCode}</span>
                              </p>
                              <p className="flex items-center justify-between">
                                <span>City:</span>
                                <span>{u.city}</span>
                              </p>
                              <p className="flex items-center justify-between">
                                <span>Country:</span>
                                <span>{u.country}</span>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  }
                </div>

          </div>
        }

    </section>
  )
}

export default withAuth(OrderPage)