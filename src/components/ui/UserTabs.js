"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Order from "../icons/Order";
import User from "../icons/User";
import Item from "../icons/Item";
import Category from "../icons/Category";
import Profile from "../icons/Profile";
import Dashboard from "../icons/Dashboard";
import { useSession } from "next-auth/react";

function UserTabs() {
  const path = usePathname();

  const session = useSession();
  const status = session.status;

  const [user, setUser] = useState(null);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        setUser(data);

        setIsAdmin(data.admin);
      });
    });
  }, [status]);

  return (
    <div className="max-w-6xl mx-auto flex flex-wrap gap-2 tabs pt-32 pb-12">
      <Link
        className={`flex gap-2 items-center dark:bg-dark-SBackground ${
          path == "/profile" ? "active" : ""
        }`}
        href="/profile"
      >
        <Profile />
        Profile
      </Link>

      {status === "authenticated" && isAdmin && (
        <>
          <Link
            className={`flex gap-2 items-center dark:bg-dark-SBackground ${
              path == "/dashboard" ? "active" : ""
            }`}
            href="/dashboard"
          >
            <Dashboard />
            Dashboard
          </Link>
          <Link
            href="/categories"
            className={`flex gap-2 items-center dark:bg-dark-SBackground ${
              path.includes("/categories") ? "active" : ""
            }`}
          >
            <Category />
            Categories
          </Link>
          <Link
            href="/menu-items"
            className={`flex gap-2 items-center dark:bg-dark-SBackground ${
              path.includes("/menu-items") ? "active" : ""
            }`}
          >
            <Item />
            Menu Items
          </Link>
          <Link
            href="/users"
            className={`flex gap-2 items-center dark:bg-dark-SBackground ${
              path.includes("/users") ? "active" : ""
            }`}
          >
            <User />
            Users
          </Link>
        </>
      )}

      <Link
        href="/orders"
        className={`flex gap-2 items-center dark:bg-dark-SBackground ${
          path.includes("/orders") ? "active" : ""
        }`}
      >
        <Order />
        Orders
      </Link>
    </div>
  );
}

export default UserTabs;
