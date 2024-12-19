"use client";

import Link from 'next/link';
import Edit from './icons/Edit';
import { dbTimeForHuman } from '@/libs/datatime';


function TableProps({props , setProps , label}) {
  return (

    <div className="mt-8">

        {props?.length > 0 ? (
            <div className="mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div>
                        <h2 className="text-2xl font-semibold leading-tight text-light-text dark:text-dark-text">{label}</h2>
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

                                {props.map((prop) => (
                                    <tr key={prop._id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-dark-SBackground">
                                            <div className="flex">
                                            <div className="flex-shrink-0 w-10 h-10">
                                                <img
                                                className="w-full h-full rounded-full"
                                                src="/profile.jpg"
                                                alt="profile"
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-light-text dark:text-dark-text whitespace-no-wrap font-semibold text-lg">
                                                    {prop.name}
                                                </p>
                                                <p className="text-gray-400 whitespace-no-wrap">female</p>
                                            </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-dark-SBackground">
                                            <p className="text-gray-500 whitespace-no-wrap">{prop.email}</p>
                                            {/* <p className="text-gray-600 whitespace-no-wrap">USD</p> */}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-dark-SBackground">
                                            <p className="text-light-text dark:text-dark-text whitespace-no-wrap">{dbTimeForHuman(prop.createdAt)}</p>
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
                                               <Link href={"/users/edit/"+prop._id}>
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
            </div> ) :
             <div className="text-center font-semibold text-primary text-lg">There are No {label} yet</div>
        }
                
    </div>
  )
}

export default TableProps
