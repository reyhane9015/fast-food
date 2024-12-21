
"use client";

import { useEffect, useState } from 'react';
import UserTabs  from '@/components/ui/UserTabs';
import TableProps from '@/components/TableProps';
import Input from '@/components/Input';
import { useSession } from 'next-auth/react';
import { dbTimeForHuman } from '@/libs/datatime';
import Link from 'next/link';
import Edit from '@/components/icons/Edit';
import Image from 'next/image';

import withAuth from './../../../libs/withAuth';

function UsersPage() {

    const session = useSession();
    const status = session.status;


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
    },[]);


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    if(status == "unauthenticated") {
        return redirect ("/login");
    }




  return (
    <section>

        {status == "authenticated" && 


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

                {filteredUsers ? (
                            // <TableProps label="Users" props={filteredUsers} setProps={setUsers} />


                        <div className="mx-auto px-4 sm:px-8">
                            <div className="py-8">
                                <div>
                                    <h2 className="text-2xl font-semibold leading-tight text-light-text dark:text-dark-text">Users</h2>
                                </div>
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
                                                        Name
                                                    </th>
                                                    <th
                                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                    >
                                                        Email
                                                    </th>
                                                    <th
                                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                    >
                                                        Created at
                                                    </th>
                                                    <th
                                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                    >
                                                        Status
                                                    </th>
                                                    <th
                                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                                    ></th>
                                                </tr>
                                            </thead>
                                            <tbody>
            
                                            {filteredUsers.map((user) => (
                                                <tr key={user._id}>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-dark-SBackground">
                                                        <div className="flex">
                                                        <div className="flex-shrink-0 w-10 h-10">
                                                            {/* <img
                                                            className="w-full h-full rounded-full"
                                                            src="/profile.png"
                                                            alt="profile"
                                                            /> */}
                                                            <Image
                                                            className="w-full h-full rounded-full"
                                                            src="/profile.png"
                                                            alt="profile"
                                                            width={500}
                                                            height={500}
                                                            />
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-light-text dark:text-dark-text whitespace-no-wrap font-semibold text-lg">
                                                                {user.name}
                                                            </p>
                                                            <p className="text-gray-400 whitespace-no-wrap">female</p>
                                                        </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-dark-SBackground">
                                                        <p className="text-gray-500 whitespace-no-wrap">{user.email}</p>
                                                        {/* <p className="text-gray-600 whitespace-no-wrap">USD</p> */}
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-dark-SBackground">
                                                        <p className="text-light-text dark:text-dark-text whitespace-no-wrap">{dbTimeForHuman(user.createdAt)}</p>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-dark-SBackground">
                                                        <span
                                                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                        >
                                                        <span
                                                            aria-hidden
                                                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                        ></span>
                                                        <span className="relative">online</span>
                                                        </span>
                                                    </td>
                                                    <td
                                                        className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right dark:bg-dark-SBackground"
                                                    >
                                                        <button
                                                        type="button"
                                                        className="inline-block text-gray-500 hover:text-gray-700"
                                                        >
                                                           <Link href={"/users/edit/"+user._id}>
                                                               <Edit />
                                                            </Link>
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
                        <div className="text-center font-semibold text-primary text-lg">There are No users yet</div>
                    )
                }


            </div>
        }

    </section>
  )
}

export default withAuth(UsersPage)
