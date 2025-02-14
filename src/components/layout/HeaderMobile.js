"use client";

import { signOut, useSession } from "next-auth/react";
import LinkHeader from "./../ui/LinkHeader";
import LinkPrimary from "../ui/LinkPrimary";

function HeaderMobile() {
  const session = useSession();
  const status = session.status;

  return (
    <div className="fixed bottom-0 left-0 w-full md:hidden py-4 bg-white dark:bg-dark-SBackground shadow-lg z-50">
      <div className="max-w-6xl mx-auto text-sm flex items-center justify-between px-6">
        <LinkHeader href="/" title="Home" />
        <LinkHeader href="/menu" title="Menu" />
        <LinkHeader href="/about-us" title="About Us" />
        <LinkHeader href="/contact-us" title="Contact Us" />

        {status === "authenticated" ? (
          <div
            className={"text-gray-600 hover:text-primary py-4"}
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </div>
        ) : (
          <LinkHeader href="/login" title="Login" />
        )}
      </div>
    </div>
  );
}

export default HeaderMobile;
