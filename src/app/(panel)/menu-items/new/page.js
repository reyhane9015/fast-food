"use client";

import UserTabs from '@/components/ui/UserTabs';
import { useState ,useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import MenuItemForm from '@/components/menu/MenuItemForm';
import { useSession } from 'next-auth/react';

import withAuth from './../../../../libs/withAuth';
import LinkPrimary from '@/components/ui/LinkPrimary';



function NewMenuItemPage() {


    const session = useSession();
    const status = session.status;


    const[isSaving , setIsSaving] = useState(false);
    const[redirectToItems , setRedirectToItems] = useState(false);
    const[loading , setLoading] =useState(true);



    // Add New MenuItems
    async function handleFormSubmit(e, data) {
        e.preventDefault();

        setIsSaving(true);
        // setLoading(true);
     
        const savingPromise = new Promise(async(resolve, reject) => {
            const response = await fetch('/api/menu-items' , {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            })

            if(response.ok) {
                resolve();
            } else {
                reject();
            }
            setIsSaving(false);
        })
        await toast.promise(savingPromise , {
            loading: 'Saving...',
            success: 'Item Saved Successfully...',
            error: 'Error In Saving...'
        })

        // setLoading(false);
        setRedirectToItems(true);
    }


    if(redirectToItems) {
        return redirect('/menu-items');
    }

    if(status == "unauthenticated") {
        return redirect ("/login");
      }



  return (
    <section>
      
        {/* <UserTabs isAdmin={true}/> */}
        
        {/* 
        {loading && <div 
            className="text-center font-semibold text-primary bg-light-background dark:bg-dark-background text-2xl h-screen flex justify-center items-center">
                Loading...
            </div>
        } */}

        {status == "authenticated" && 


            <div className="max-w-6xl m-auto pb-8">

                {/* <div className="max-w-[170px] flex justify-center py-4 border border-primary text-primary py-4 px-2 rounded-full">
                    <Link href="/menu-items">{'<<'} Back to All Items</Link>
                </div> */}

                <div className="w-[170px] mb-16">
                    <LinkPrimary href={"/menu-items"} title="Back to All Items" />
                </div>

            
                <MenuItemForm onSubmit={handleFormSubmit} />

            </div>

        }


    </section>
  )
}

export default withAuth(NewMenuItemPage)
