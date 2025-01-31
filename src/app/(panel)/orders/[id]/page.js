"use client";

import { useEffect, useState, useContext } from "react";
import { redirect, useParams } from "next/navigation";
import DeleteButton from "@/components/DeleteButton";
import { toast } from "react-hot-toast";
import { dbTimeForHuman } from "@/libs/datatime";
import withAuth from "./../../../../libs/withAuth";
import LinkPrimary from "@/components/ui/LinkPrimary";
import { CartContext } from "@/components/AppContext";
import { useSession } from "next-auth/react";
import Image from "next/image";

function OrderPage() {
  const session = useSession();
  const status = session.status;

  const { cartProducts, cartProductPrice } = useContext(CartContext);

  const [order, setOrder] = useState(null);
  const [redirectToOrders, setRedirectToOrders] = useState(false);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch("/api/categories")
      .then((response) => response.json())
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        const order = data.find((i) => i._id === id);
        setOrder(order);
      } catch (error) {
        console.error("Error fetching order:", error);
        toast.error("Failed to fetch order data");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [id]);

  if (redirectToOrders) {
    return redirect("/orders");
  }

  // Delete Order
  const handleItemDelete = async () => {
    const deletionPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/orders", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: id }),
        });

        if (response.ok) {
          resolve();
        } else {
          reject("Error deleting order");
        }
      } catch (error) {
        reject("Error deleting order");
      }
    });

    await toast.promise(deletionPromise, {
      loading: "Deleting Order...",
      success: "Order Deleted Successfully!",
      error: "Error in Deleting Order",
    });

    setRedirectToOrders(true);
  };

  if (status == "unauthenticated") {
    return redirect("/login");
  }

  const getCategoryImage = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);

    if (category?.name === "cat1") {
      return (
        <Image
          src="/plato.png"
          key={category?._id}
          alt={category?.name}
          width={80}
          height={80}
          className="block mx-auto"
        />
      );
    } else if (category?.name === "cat2") {
      return (
        <Image
          src="/food2.png"
          key={category?._id}
          alt={category?.name}
          width={80}
          height={80}
          className="block mx-auto"
        />
      );
    } else {
      return (
        <Image
          src="/food3.png"
          key={category?._id}
          alt={category?.name}
          width={80}
          height={80}
          className="block mx-auto"
        />
      );
    }
  };

  let total = 0;
  for (const p of cartProducts) {
    total += cartProductPrice(p);
  }

  return (
    <section>
      {status == "authenticated" && (
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between mb-8">
            <div className="w-[170px] mb-16">
              <LinkPrimary href={"/orders"} title="Back to All Orders" />
            </div>

            <div>
              <DeleteButton label="Delete" onDelete={handleItemDelete} />
            </div>
          </div>

          <div>
            {order && (
              <div className="">
                <div className="text-gray-500 mb-4 text-xl font-semibold">
                  user: {order.userEmail}
                </div>

                <div className="border-2 border-gray-200 rounded-lg">
                  {/* Table */}
                  <div className="overflow-x-auto">
                    <div className="inline-block min-w-full rounded-lg overflow-hidden">
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr>
                            <th className="px-8 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-SBackground text-left text-md font-semibold text-light-text dark:text-dark-text uppercase tracking-wider"></th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-SBackground text-left text-md font-semibold text-light-text dark:text-dark-text uppercase tracking-wider">
                              Image
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-SBackground text-left text-md font-semibold text-light-text dark:text-dark-text uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-SBackground text-left text-md font-semibold text-light-text dark:text-dark-text uppercase tracking-wider">
                              Quantity
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-SBackground text-left text-md font-semibold text-light-text dark:text-dark-text uppercase tracking-wider">
                              Size
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-SBackground text-left text-md font-semibold text-light-text dark:text-dark-text uppercase tracking-wider">
                              Extras
                            </th>

                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-SBackground text-left text-md font-semibold text-light-text dark:text-dark-text uppercase tracking-wider">
                              Total price
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-SBackground text-left text-md font-semibold text-light-text dark:text-dark-text uppercase tracking-wider">
                              Time
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {order.cartProducts &&
                            order.cartProducts.map((p, index) => {
                              return (
                                <tr
                                  key={`${p._id} + ${index}`}
                                  className="font-semibold text-center text-gray-500 dark:text-dark-text border-dashed border-b-2 border-b-gray-300"
                                >
                                  <td className="">{index + 1}</td>
                                  <td className="py-4">
                                    {getCategoryImage(p.category)}
                                  </td>
                                  <td className="">{p.name}</td>
                                  <td className="">{p.quantity}</td>

                                  <td className="">
                                    {p.size && (
                                      <div>
                                        <span className="whitespace-nowrap text-sm">
                                          {p.size?.name}
                                        </span>
                                        <span className="whitespace-nowrap text-sm">
                                          {" "}
                                          + {p.size?.price}$
                                        </span>
                                      </div>
                                    )}
                                  </td>

                                  <td className="">
                                    {p.extras && p.extras.length > 0 ? (
                                      <div>
                                        {p.extras.map((ex, index) => (
                                          <p key={index}>
                                            {ex.name} + {ex.price}$
                                          </p>
                                        ))}
                                      </div>
                                    ) : (
                                      <div className="">.................</div>
                                    )}
                                  </td>

                                  <td className="">{cartProductPrice(p)}$</td>

                                  <td className="text-sm">
                                    {dbTimeForHuman(order.createdAt)}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="text-right font-semibold p-8 text-2xl text-primary">
                    Total Price(products + delivery): {order.totalPrice + 10}$
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                  <div className="p-8 rounded-lg dark:border dark:border-bg-primary bg-gray-100 dark:bg-dark-background">
                    <p className="text-primary text-xl font-semibold mb-4 text-light-text dark:text-dark-text">
                      Card Information:
                    </p>
                    {order.cardInfo && (
                      <div className="">
                        <div className="text-center mb-4 font-semibold text-lg text-gray-500">
                          <p className="">Card Number</p>
                          <p>{order.cardInfo.cardNumber}</p>
                        </div>

                        <div className="flex px-4 justify-between font-semibold text-lg text-gray-500">
                          <p className="flex gap-2 items-center justify-between font-semibold text-lg text-gray-500">
                            <span className="">Card Expiry Date:</span>
                            <span>{order.cardInfo.expiryDate}</span>
                          </p>
                          <p className="flex gap-2 items-center justify-between font-semibold text-lg text-gray-500">
                            <span className="">Cvv:</span>
                            <span>{order.cardInfo.cvv}</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-8 rounded-lg dark:border dark:border-bg-primary bg-gray-100 dark:bg-dark-background">
                    <p className="text-primary text-xl font-semibold mb-4 text-light-text dark:text-dark-text">
                      Address:
                    </p>

                    {order.user &&
                      order.user.map((u) => (
                        <div key={u._id} className="flex flex-col gap-2">
                          <p className="flex items-center justify-between font-semibold text-lg text-gray-500">
                            <span>Phone:</span>
                            <span>{u.phone}</span>
                          </p>
                          <p className="flex items-center justify-between font-semibold text-lg text-gray-500">
                            <span>Postal Code:</span>
                            <span>{u.postalCode}</span>
                          </p>
                          <p className="flex items-center justify-between font-semibold text-lg text-gray-500">
                            <span>City:</span>
                            <span>{u.city}</span>
                          </p>
                          <p className="flex items-center justify-between font-semibold text-lg text-gray-500">
                            <span>Country:</span>
                            <span>{u.country}</span>
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default withAuth(OrderPage);
