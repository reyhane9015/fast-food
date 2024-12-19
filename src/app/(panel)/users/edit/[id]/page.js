"use client";

import UserTabs from '@/components/ui/UserTabs';
import UserForm from '@/components/UserForm';
import { useState , useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { redirect , useParams } from 'next/navigation';
import DeleteButton from '@/components/DeleteButton';
import Link from 'next/link';

function EditUserPage() {

  const session = useSession();
  const status = session.status;

  // const[isAdmin , setIsAdmin] = useState(false);

  const[user , setUser] = useState(null);
  const[isSaving , setIsSaving] = useState(false);
  const[redirectToItems , setRedirectToItems] = useState(false);
  const[loading , setLoading] =useState(true);

  const{id} = useParams();


  useEffect(() => {
      setLoading(true);
      fetch('/api/users').then(res => {
          res.json().then(data => {
              const user = data.find(i => i._id == id);
              setUser(user);
              setLoading(false);
          })
      })
  } ,[])


  // Edit and Add User
  async function handleFormSubmit(e,data) {

    e.preventDefault();

    setIsSaving(true);

    const savingPromise  = new Promise(async(resolve , reject) => {

        const response = await fetch('/api/users' , {
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
      success: 'User Saved Successfully...',
      error: 'Error In Saving...'
  })

    setRedirectToItems(true);
  }

  if(redirectToItems) {
    return redirect('/users');
  }



  // Delete user
  async function handleUserDelete() {

    const deletionPromise = new Promise(async(resolve, reject) => {
        const response = await fetch('/api/users', {
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
      loading: 'Deleting User...',
      success: 'User Deleted Successfully!',
      error: 'Error in Deleting User',
    });
    
    setRedirectToItems(true);
  }





  return (
    <>
      {status == "authenticated" && 
        <section className="">

            {/* <UserTabs isAdmin={true} /> */}


            {/* {loading && <div 
                    className="text-center font-semibold text-primary bg-light-background dark:bg-dark-background text-2xl h-screen flex justify-center items-center">
                        Loading...
                    </div>
            } */}

            <div className="max-w-6xl m-auto flex justify-between">

              {/* <div className="max-w-[170px] flex justify-center border border-primary text-primary py-4 px-2 rounded-full">
              <Link href="/users">{'<<'} Back to All Users</Link>
            </div> */}

            <div className="w-[170px] mb-16">
                <LinkPrimary href={"/users"} title="Back to All Users" />
            </div>

            <div>
              <DeleteButton label="Delete" onDelete={handleUserDelete} />
            </div>

            </div>


            {user !== null && <UserForm user={user} onSave={handleFormSubmit} />}
        
        </section>
      }
    </>  
  )
}

export default EditUserPage
