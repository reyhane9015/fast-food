
"use client";

import { useEffect, useState } from 'react';
import UserTabs  from '@/components/ui/UserTabs';
import TableProps from '@/components/TableProps';
import Input from '@/components/Input';

import withAuth from './../../../libs/withAuth';

function UsersPage() {


    const[users , setUsers] = useState([]);
    const[isAdmin , setIsAdmin] = useState(false);
    
    const[searchTerm , setSearchTerm] = useState('');
    const[dataFetched , setDataFetched] = useState(false);
    
    useEffect(()=> {
     
        fetch('/api/users').then(response => {
            response.json().then(users => {
                setUsers(users);
                setDataFetched(true);
            })
        })
    },[])


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );





  return (
    <section className="">
      
        {/* <UserTabs isAdmin={false} /> */}

        
        {/* {!dataFetched && <div 
                            className="text-center font-semibold text-primary bg-light-background dark:bg-dark-background text-2xl h-screen flex justify-center items-center">
                                Loading...
                            </div>
        } */}


        <div className="max-w-4xl m-auto border rounded-md p-4">
            <form className="grow max-w-2xl m-auto">
                <div className="flex gap-2 mt-4">
                    <div className="grow"> 
                        <Input 
                            type={"text"}
                            placeholder={"Search user by name..."} 
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
            </form>

            <TableProps label="Users" props={filteredUsers} setProps={setUsers} />

        </div>

    </section>
  )
}

export default withAuth(UsersPage)
