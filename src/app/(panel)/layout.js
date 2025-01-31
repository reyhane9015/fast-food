"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import UserTabs from "@/components/ui/UserTabs";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const path = usePathname();

  return (
    <>
      <Header />

      <section className="bg-light-background dark:bg-dark-background min-h-screen p-4 md:p-12">
        {!path.includes("checkout") && <UserTabs isAdmin={isAdmin} />}

        <div>{children}</div>
      </section>

      <Footer />
    </>
  );
}
