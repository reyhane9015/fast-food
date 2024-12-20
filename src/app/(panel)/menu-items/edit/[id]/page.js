"use client";

import UserTabs from '@/components/ui/UserTabs';
import { useState ,useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { redirect, useParams } from 'next/navigation';
import MenuItemForm from '@/components/menu/MenuItemForm';
import DeleteButton from '@/components/DeleteButton';
import { useSession } from 'next-auth/react';

import withAuth from './../../../../../libs/withAuth';
import LinkPrimary from '@/components/ui/LinkPrimary';


function EditMenuItemPage() {

  const session = useSession();
  const status = session.status;

   
  const[menuItem , setMenuItem] = useState(null);

  const[isSaving , setIsSaving] = useState(false);

  const[redirectToItems , setRedirectToItems] = useState(false);
  const[loading , setLoading] =useState(true);

  const{id} = useParams();


  useEffect(() => {
    setLoading(true);
      fetch('/api/menu-items').then(res => {
          res.json().then(data => {
              const item = data.find(i => i._id == id);
              // setName(item.name);
              // setDescription(item.description);
              // setBasePrice(item.basePrice);
              setMenuItem(item);
              setLoading(false);
          })
      })
  } ,[])

    



  // Edit and Add MenuItems
  async function handleFormSubmit(e,data) {
      e.preventDefault();

      setIsSaving(true);
    
      const savingPromise = new Promise(async(resolve, reject) => {
            const response = await fetch('/api/menu-items' , {
                method:'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...data, _id: id}),
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

      setRedirectToItems(true);
    }


    if(redirectToItems) {
      return redirect('/menu-items');
    }


    // Delete item
  async function handleItemDelete() {

    const deletionPromise = new Promise(async(resolve, reject) => {
       const response = await fetch('/api/menu-items', {
         method: 'DELETE',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({_id: id})
       })

       if (response.ok) {
        resolve();
      } else {
        reject();
      }
    })

    await toast.promise(deletionPromise, {
      loading: 'Deleting Item...',
      success: 'Item Deleted Successfully!',
      error: 'Error in Deleting Item',
    });
    
    setRedirectToItems(true);
  }


  if(status == "unauthenticated") {
    return redirect ("/login");
  }



  return (
    <section>

      {status == "authenticated" && 

          <div className="max-w-6xl m-auto pb-8">
            <div className="flex justify-between">

              {/* <div className="max-w-[170px] flex justify-center border border-primary text-primary py-4 px-2 rounded-full">
                <Link href="/menu-items">{'<<'} Back to All Items</Link>
              </div> */}

              <div className="w-[170px] mb-16">
                  <LinkPrimary href={"/menu-items/new"} title="Back to All Items" />
              </div>

              <div>
                <DeleteButton label="Delete" onDelete={handleItemDelete} />
              </div>
              
            </div>


        
            {menuItem !== null && <MenuItemForm onSubmit={handleFormSubmit} menuItem={menuItem} /> }

          </div>
        }

    </section>
  )
}

export default withAuth(EditMenuItemPage)
