"use client";

import { useEffect, useState , useContext } from 'react';
import { redirect } from 'next/navigation';
import UserTabs  from '@/components/ui/UserTabs';
import Link from 'next/link';
import { dbTimeForHuman } from '@/libs/datatime';
import { useSession } from 'next-auth/react';

import ChevronLeft from '@/components/icons/ChevronLeft';
import ChevronRight from '@/components/icons/ChevronRight';

// import withAuth from './../../../libs/withAuth';



function OrdersPage() {


    const { data: session, status } = useSession();


    const[orders , setOrders] = useState([]);
    const[isAdmin , setIsAdmin] = useState(false);

    const [selectedTab, setSelectedTab] = useState('all');
    const[profileFetched , setProfileFetched] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    // useEffect(() => {
       
    //     fetch('/api/orders').then(response => {
    //         response.json().then(orders => {
    //             setOrders(orders.reverse());

    //             setProfileFetched(true);
    //             console.log(orders);
    //         })
    //     })
        
    // },[]);

    useEffect(() => {
        if (status === 'authenticated') {
          fetch('/api/profile')
            .then((response) => response.json())
            .then((data) => {
              setIsAdmin(data.admin);
            })
            .catch((error) => {
              console.error('Error fetching user profile:', error);
            });
        }
    }, [status]);



    useEffect(() => {
        if (status === 'authenticated') {
          fetch('/api/orders')
            .then((response) => response.json())
            .then((orders) => {
              setOrders(orders.reverse());
              setProfileFetched(true);
            })
            .catch((error) => {
              console.error('Error fetching orders:', error);
            });
        }
    }, [status]);
      

 

    const filterOrderByPay = (orders , selectedTab) => {
        if(selectedTab === "paid") {
            return orders.filter(order => order.paid);
        } else if(selectedTab === "failed") {
            return orders.filter(order => !order.paid);
        }
        return orders;
    }


    const filteredOrders = filterOrderByPay(orders , selectedTab);



    // console.log(filteredOrders);
    
    const allCount = orders.length;
    const paidCount = orders.filter(order => order.paid).length;
    const failedCount = orders.filter(order => !order.paid).length;



    if(status == "unauthenticated") {
        return redirect ("/login");
    }


    // pagination code start
    const itemsPerPage =5;
    const totalItems = filteredOrders.length;
    
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    const goToPage = (pageNumber) => {
        if (pageNumber < 1) {
        setCurrentPage(1);
        } else if (pageNumber > totalPages) {
        setCurrentPage(totalPages);
        } else {
        setCurrentPage(pageNumber);
        }
    };
    
    const currentItems = filteredOrders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    // pagination code end



  return (
    <section>

      {status == "authenticated" && 
      
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
                    {currentItems ? (
                        currentItems.map((order, index) => 
                        <div key={order._id} className="bg-transparent text-light-text dark:text-dark-text p-4 my-2 flex gap-4 justify-between items-center min-w-full">
                            <p className="border border-gray-200 px-2 rounded">{index + 1}</p>
                            <p>{order.userEmail}</p>

                            <div className="font-semibold text-gray-500 flex gap-4 items-center whitespace-no-wrap">
                                <div>
                                        {order?.cartProducts.map((p) => 
                                            <p key ={p._id} className="whitespace-nowrap">
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

                            {isAdmin &&
                                        <Link href={`orders/${order._id}`} >
                                            <div className="p-2 whitespace-nowrap text-gray-500 border border-gray-500 rounded-md">
                                                    show details 
                                            </div>
                                        </Link>
                            }
                            
                        </div>
                        )) : (
                            <div className="text-center font-semibold text-primary text-lg">There are No orders yet</div>
                        )
                    }
                </div>

                {/* pagination */}
                <div className="bg-transparent text-light-text dark:text-dark-text flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
                    <div className="flex flex-1 justify-between sm:hidden">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </button>
                    </div>

                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm">
                                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to
                                <span className="font-medium"> {Math.min(currentPage * itemsPerPage, totalItems)}</span> of
                                <span className="font-medium"> {totalItems}</span> results
                            </p>
                        </div>

                        <div>
                            <span className="text-sm font-medium">Current Page: {currentPage}</span>
                        </div>

                        <div>
                            <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                <button
                                    onClick={() => goToPage(currentPage - 1)}
                                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                >
                                    <span className="sr-only">Previous</span>
                                    <ChevronLeft />
                                </button>

                                <a
                                    href="#"
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === 1 ? 'bg-primary text-white' : 'text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'} focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-primary`}
                                    onClick={(e) => {
                                    e.preventDefault();
                                    goToPage(1);
                                    }}
                                >
                                    1
                                </a>

                                <a
                                    href="#"
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === 2 ? 'bg-primary text-white' : 'text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'}`}
                                    onClick={(e) => {
                                    e.preventDefault();
                                    goToPage(2);
                                    }}
                                >
                                    2
                                </a>
                            
                                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                                >
                                ...
                                </span>

                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        goToPage(9);
                                    }}
                                >
                                9
                                </a>
                                <a
                                href="#"
                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        goToPage(10);
                                    }}
                                >
                                10
                                </a>

                                <button
                                    onClick={() => goToPage(currentPage + 1)}
                                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                >
                                    <span className="sr-only">Next</span>
                                    <ChevronRight />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>

            </div>





        }
    </section>
  )
}

export default OrdersPage
