"use client";

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import UserTabs from '@/components/ui/UserTabs';
// import { usePathname } from 'next/navigation';
import UserForm from '@/components/UserForm';


function ProfilePage() {

    // const path = usePathname();
    const session = useSession();
    const status = session.status;

    // console.log(status);

    const [userName , setUserName] = useState('');
    const[user , setUser] = useState(null);
    // const[isAdmin , setIsAdmin] = useState(false);
   

    const[isSaving , setIsSaving] = useState(false);
    const[profileFetched , setProfileFetched] = useState(false);


    useEffect(() => {

        setUserName(session.data?.user?.name);

        fetch('/api/profile').then(response => {
            response.json().then(data => {

                console.log(data);

                setUser(data);

                setProfileFetched(true);

                // setIsAdmin(data.isAdmin);
            })
        })
    } , [ status])


    async function handleProfileInfoUpdate(e , data) {
        e.preventDefault();

        setIsSaving(true);
     
      const savingPromise = new Promise(async(resolve, reject) => {
            const response = await fetch('/api/profile' , {
                method:'PUT',
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
            success: 'Profile Saved Successfully...',
            error: 'Error In Saving...'
        })
    }


    

    if(status == "loading" || !profileFetched) {
        return <div 
                className="text-center font-semibold text-primary bg-light-background dark:bg-dark-background text-2xl h-screen flex justify-center items-center">
                    Loading...
                </div>
    }

    

    if(status == "unauthenticated") {
        return redirect ("/login");
    }


  return (
        <section>
            {status == "authenticated" && 
                <div className="">

                    {/* <UserTabs isAdmin={true} /> */}


                    {user !== null && <UserForm user={user} onSave={handleProfileInfoUpdate} /> }
                    
              
                
                </div>
            }
        </section>
    )
}

export default ProfilePage