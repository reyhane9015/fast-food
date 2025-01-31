"use client";

import Image from "next/image";
import { useState, useContext } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CartContext } from "@/components/AppContext";
import { useSession } from "next-auth/react";
import ButtonPrimary from "@/components/layout/ButtonPrimary";

export default function PaymentSuccessPage() {
  const { cartProducts, cartProductPrice, clearCart } = useContext(CartContext);

  const [redirectToOrders, setRedirectToOrders] = useState(false);
  const [loading, setLoading] = useState(true);

  const session = useSession();
  const status = session.status;

  const handleOk = () => {
    setRedirectToOrders(true);
  };

  if (redirectToOrders) {
    return redirect("/orders");
  }

  let total = 0;
  for (const p of cartProducts) {
    total += cartProductPrice(p);
  }

  if (status === "loading") {
    return (
      <div className="relative z-40 text-center font-semibold text-primary text-2xl h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <section className="bg-light-background dark:bg-dark-background min-h-screen text-center">
      {status == "authenticated" ? (
        <div className="relative z-40">
          <div className="flex gap-2 items-center justify-center pt-36 text-light-text dark:text-dark-text">
            <Image
              src="/successful-animation.gif"
              width={100}
              height={100}
              alt="successful-animation"
            />
            <p className="font-semibold text-4xl">Payment Successful!</p>
          </div>
          <div className="text-2xl my-4 text-light-text dark:text-dark-text">
            Thank you!Your payment
          </div>

          <div>
            <div className="max-w-[200px] mx-auto">
              <ButtonPrimary onClick={handleOk} title="Go To Orders" />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-40 text-center text-lg text-gray-600 font-semibold pt-36">
          Please Login to continue?
          <Link href="/login" className="text-primary underline">
            Login
          </Link>
        </div>
      )}
    </section>
  );
}
