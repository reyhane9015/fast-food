"use client";

import { useEffect, useState , useContext } from 'react';
import UserTabs  from '@/components/ui/UserTabs';
import Link from 'next/link';
import { dbTimeForHuman } from '@/libs/datatime';


// import withAuth from './../../../libs/withAuth';




function OrdersPage() {


    const[orders , setOrders] = useState([]);
    const[isAdmin , setIsAdmin] = useState(true);

    const [selectedTab, setSelectedTab] = useState('all');
    const[profileFetched , setProfileFetched] = useState(false);

    useEffect(() => {
       
        fetch('/api/orders').then(response => {
            response.json().then(orders => {
                setOrders(orders.reverse());

                setProfileFetched(true);
                console.log(orders);
            })
        })
        
    },[]);

 




    const filterOrderByPay = (orders , selectedTab) => {
        if(selectedTab === "paid") {
            return orders.filter(order => order.paid);
        } else if(selectedTab === "failed") {
            return orders.filter(order => !order.paid);
        } else {
            return orders;
        }
    }

    const filteredOrders = filterOrderByPay(orders , selectedTab);



    // console.log(filteredOrders);
    
    const allCount = orders.length;
    const paidCount = orders.filter(order => order.paid).length;
    const failedCount = orders.filter(order => !order.paid).length;



  return (
    <section>
      
        {/* <UserTabs isAdmin={isAdmin} /> */}
{/* 
        {!profileFetched && <div 
                            className="text-center font-semibold text-primary bg-light-background dark:bg-dark-background text-2xl h-screen flex justify-center items-center">
                                Loading...
                            </div>
        } */}
    

        <div className="max-w-6xl mx-auto border rounded-md p-4">

            <div className="max-w-2xl mx-auto flex flex-wrap md:flex-nowrap gap-2 tabs mb-16">
                <button 
                    onClick={() => setSelectedTab("all")} 
                    className={`dark:bg-dark-SBackground text-light-text dark:text-dark-text ${selectedTab === 'all' ? 'active' : ''}`}
                >
                    all orders
                    <span>({allCount})</span>
                </button>
                <button 
                    onClick={() => setSelectedTab("paid")} 
                    className={`dark:bg-dark-SBackground text-light-text dark:text-dark-text ${selectedTab === 'paid' ? 'active' : ''}`}
                >
                    Paid
                    <span>({paidCount})</span>
                </button>
                <button 
                    onClick={() => setSelectedTab("failed")} 
                    className={`dark:bg-dark-SBackground text-light-text dark:text-dark-text ${selectedTab === 'failed' ? 'active' : ''}`}
                >
                    Failed
                    <span>({failedCount})</span>
                </button>
            </div>

            <div className="overflow-x-auto">
                {filteredOrders && filteredOrders.map((order) => 
                    <div className="bg-transparent text-light-text dark:text-dark-text p-4 my-2 flex gap-4 justify-between items-center min-w-full" key={order._id}>
                        <p>{order.userEmail}</p>


                        <div className="font-semibold text-gray-500 flex gap-4 items-center whitespace-no-wrap">
                            <div>
                                    {order?.cartProducts.map((p) => 
                                        <p className="whitespace-nowrap">
                                            {p.name}
                                        </p>
                                    )}
                            </div>
                        </div>

                            <div className="font-semibold text-primary text-lg">{order.totalPrice + 10}$</div>

                            <div className="hidden md:block">
                                <p>{dbTimeForHuman(order.createdAt)}</p>
                            </div>

                        <div className={order.paid ? "p-2 rounded font-semibold text-white bg-green-400" :
                                "p-2 rounded font-semibold text-white bg-red-400"}
                            >
                                {order.paid ? <p>Paid</p> : <p>Failed</p>}
                        </div>


                            <Link href={`orders/${order._id}`} >
                                <div className="p-2 whitespace-nowrap text-gray-500 border border-gray-500 rounded-md">
                                        show details 
                                </div>
                            </Link>
                       

                    </div>
                )}
            </div>


            {filteredOrders.length === 0 && 
               <div className="text-center font-semibold text-primary text-lg">There are No orders yet</div>
            }

        </div>

    </section>
  )
}

export default OrdersPage