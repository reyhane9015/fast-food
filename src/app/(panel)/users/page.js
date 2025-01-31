"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import { useSession } from "next-auth/react";
import { dbTimeForHuman } from "@/libs/datatime";
import Link from "next/link";
import Edit from "@/components/icons/Edit";
import Image from "next/image";
import ChevronLeft from "@/components/icons/ChevronLeft";
import ChevronRight from "@/components/icons/ChevronRight";
import withAuth from "./../../../libs/withAuth";

function UsersPage() {
  const session = useSession();
  const status = session.status;
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((users) => {
        setUsers(users);
        setDataFetched(true);
      });
    });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status == "unauthenticated") {
    return redirect("/login");
  }

  // pagination code start
  const itemsPerPage = 1;
  const totalItems = filteredUsers.length;

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

  const currentItems = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // pagination code end

  return (
    <section>
      {status == "authenticated" && (
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

          {currentItems ? (
            <div className="mx-auto px-4 sm:px-8">
              <div className="py-8">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Created at
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map((user) => (
                          <tr key={user._id}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-dark-SBackground">
                              <div className="flex">
                                <div className="flex-shrink-0 w-10 h-10">
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
                                  <p className="text-gray-400 whitespace-no-wrap">
                                    female
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-dark-SBackground">
                              <p className="text-gray-500 whitespace-no-wrap">
                                {user.email}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-dark-SBackground">
                              <p className="text-light-text dark:text-dark-text whitespace-no-wrap">
                                {dbTimeForHuman(user.createdAt)}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-dark-SBackground">
                              <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                <span
                                  aria-hidden
                                  className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                ></span>
                                <span className="relative">online</span>
                              </span>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right dark:bg-dark-SBackground">
                              <button
                                type="button"
                                className="inline-block text-gray-500 hover:text-gray-700"
                              >
                                <Link href={"/users/edit/" + user._id}>
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
            <div className="text-center font-semibold text-primary text-lg">
              There are No users yet
            </div>
          )}

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
                  Showing{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  to
                  <span className="font-medium">
                    {" "}
                    {Math.min(currentPage * itemsPerPage, totalItems)}
                  </span>{" "}
                  of
                  <span className="font-medium"> {totalItems}</span> results
                </p>
              </div>

              <div>
                <span className="text-sm font-medium">
                  Current Page: {currentPage}
                </span>
              </div>

              <div>
                <nav
                  aria-label="Pagination"
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                >
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft />
                  </button>

                  <a
                    href="#"
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      currentPage === 1
                        ? "bg-primary text-white"
                        : "text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    } focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-primary`}
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(1);
                    }}
                  >
                    1
                  </a>

                  <a
                    href="#"
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      currentPage === 2
                        ? "bg-primary text-white"
                        : "text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(2);
                    }}
                  >
                    2
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
      )}
    </section>
  );
}

export default withAuth(UsersPage);
