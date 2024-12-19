"use client";

import UserTabs from '@/components/ui/UserTabs';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import withAuth from './../../../libs/withAuth';
import LinkPrimary from '@/components/ui/LinkPrimary';



function MenuItemsPage() {

    const [menuItems , setMenuItems] = useState([]);
    const[isAdmin , setIsAdmin] = useState(false);
    const[dataFetched , setDataFetched] = useState(false);


    useEffect(() => {
      
        fetch('/api/menu-items').then(res => 
            res.json().then(data => {
              setMenuItems(data);
              setDataFetched(true);
            })
        )
    } , []);





  return (
    <section>
      
        {/* <UserTabs isAdmin={false} /> */}

        {/* {!dataFetched && <div 
                            className="text-center font-semibold text-primary bg-light-background dark:bg-dark-background text-2xl h-screen flex justify-center items-center">
                                Loading...
                            </div>
        } */}


        <div className="max-w-6xl m-auto">

            {/* <div className="max-w-[170px] flex justify-center mb-16 bg-primary text-white py-4 px-2 rounded-full">
                <Link href="/menu-items/new">Create New Item +</Link>
            </div> */}

            <div className="w-[170px] mb-16">
                <LinkPrimary href={"/menu-items/new"} title="Create New Item +" />
            </div>

            <div>
                <h2 className="text-xl font-semibold leading-tight text-light-text dark:text-dark-text mb-4">All Items</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
                {menuItems?.length > 0  ? 
                    menuItems.map(item => (
                        <Link href={`/menu-items/edit/${item._id}`}
                            key={item._id}
                            className="text-light-text dark:text-dark-text dark:bg-dark-SBackground relative flex flex-col gap-6 items-center border-2 border-primary p-4 rounded-xl mb-2"
                        >
                            <Image src="/pizza.png" alt="pizza" width={80} height={80} className="block mx-auto" />
                            <p className="font-semibold">{item.name}</p>
                            <p className="line-clamp-2">{item.description}</p>
                            <div>
                                {item?.sizes && item.sizes.map((size) => 
                                    <div key={size.name} className="flex justify-between gap-4">
                                        <div>
                                            <b>Size:</b>{size.name}
                                        </div>
                                        <div>
                                            <b>Price:</b>{size.price}$
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                {item?.extraItems && item.extraItems.map((ex) => 
                                    <div key={ex.name} className="flex justify-between gap-4">
                                        <div>
                                            <b>Name:</b>{ex.name}
                                        </div>
                                        <div>
                                            <b>Price:</b>{ex.price}$
                                        </div>
                                    </div>
                                )}
                            </div>

                           <div className="mt-8">
                                <p className="absolute bottom-2 left-10 right-10 bg-primary text-center text-white p-4 rounded-md">
                                    <b>{item.basePrice}$</b>
                                </p>
                           </div>
                        
                        </Link>
                    )) : <div className="text-center font-semibold text-primary text-lg">There are No Items yet</div>
                }
            </div>
        </div>
   

    </section>
  )
}

export default withAuth(MenuItemsPage)
