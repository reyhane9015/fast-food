"use client";

import { useEffect, useState , useContext } from 'react';
import { redirect } from 'next/navigation';
import UserTabs  from '@/components/ui/UserTabs';
import Link from 'next/link';
import { dbTimeForHuman } from '@/libs/datatime';
import { useSession } from 'next-auth/react';

import ChevronLeft from '@/components/icons/ChevronLeft';
import ChevronRight from '@/components/icons/ChevronRight';

import { CartContext } from './../../../components/AppContext';

// import withAuth from './../../../libs/withAuth';



function OrdersPage() {


    const { cartProducts } = useContext(CartContext);


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

              console.log("orders are" , orders);

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



    // console.log(currentItems[0]);




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
                        <div className="mx-auto px-4 sm:px-8">
                        <div className="py-8">
                       
                            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                                <div
                                    className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
        
                                >
                                    <table className="min-w-full leading-normal">
                                        <thead>
                                            <tr>
                                                <th
                                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                >
                                                    
                                                </th>
                                                <th
                                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                >
                                                    user name
                                                </th>
                                                <th
                                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                >
                                                    Email
                                                </th>
                                                <th
                                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                >
                                                    Items
                                                </th>
                                                <th
                                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                >
                                                    Order Time
                                                </th>
                                                <th
                                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                >
                                                    Price
                                                </th>

                                                {/* 
                                                <th
                                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                >
                                                    User Address
                                                </th> */}

                                                <th
                                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                >
                                                    Order Status
                                                </th>

                                                <th
                                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                                ></th>
                                            </tr>
                                        </thead>
                                        <tbody>
        
                                        {currentItems.map((order , index) => (
                                            <tr key={order._id}>

                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-dark-SBackground">
                                                 <span className="bg-primary text-white p-2 rounded">{index + 1}</span>
                                                </td>

                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-dark-SBackground">
                                                    <div className="flex">
                                            
                                                        <div className="ml-3">
                                                            <p className="text-light-text dark:text-dark-text whitespace-no-wrap font-semibold text-lg">
                                                                {order.userEmail.split("@")[0]}
                                                            </p>
                                                            <p className="text-gray-400 whitespace-no-wrap">female</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-dark-SBackground">
                                                    <p className="text-gray-500 whitespace-no-wrap">{order.userEmail}</p>
                                                </td>

                                               
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-dark-SBackground">
                                                        {order?.cartProducts.map((p) => 
                                                            <p key ={p._id} className="whitespace-nowrap">
                                                                {p.name}
                                                            </p>
                                                            // {p.category === categories._id && <p>{category.name}</p>}
                                                        )}
                                                </td>

                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-dark-SBackground">
                                                    <p className="text-gray-500 whitespace-no-wrap">{dbTimeForHuman(order.createdAt)}</p>
                                                </td>

                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-dark-SBackground">
                                                    <p className="text-light-text dark:text-dark-text whitespace-no-wrap text-lg font-bold text-primary">{order.totalPrice}$</p>
                                                </td>

                                          
                                                {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-dark-SBackground">
                                                    <p className="text-gray-500 whitespace-no-wrap">
                                                        {order.user[0].country} , {order.user[0].city}
                                                    </p>
                                                </td> */}

                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-dark-SBackground">
                                                    <span
                                                    className="relative inline-block px-3 py-1 font-semibold leading-tight"
                                                    >
                                                    <span
                                                        aria-hidden
                                                        className={order.paid ? "absolute inset-0 opacity-50 rounded-full bg-green-200" : "absolute inset-0 opacity-50 rounded-full bg-red-200"}
                                                    ></span>
                                                    <span className={order.paid ? "relative text-green-800" : "relative text-red-800"}>{order.paid ? "Success" : "Faild"}</span>
                                                    </span>
                                                </td>
                                               

                                                <td
                                                    className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right dark:bg-dark-SBackground"
                                                >
                                                    <button
                                                    type="button"
                                                    className="inline-block text-gray-500 hover:text-gray-700"
                                                    >
                                                     
                                                    {isAdmin &&
                                                        <Link href={`orders/${order._id}`} >
                                                            <div className="p-2 whitespace-nowrap text-gray-500 border border-gray-500 rounded-md">
                                                                    order details 
                                                            </div>
                                                        </Link>
                                                    }
                                                    </button>
                                                </td>

                                                
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                        ) : (
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
