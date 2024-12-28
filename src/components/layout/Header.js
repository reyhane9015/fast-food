"use client";

import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import { useState , useEffect, useContext } from "react";
import { CartContext } from './../AppContext';
import ShoppingCart from "../icons/ShoppingCart";
import ThemeToggleButton from "../ui/ThemeToggleButton";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from "framer-motion";

function Header() {

  const {cartProducts , isItemAdded , cartProductsCount} = useContext(CartContext);

  const[scrolled , setScrolled] = useState(false);



  const session = useSession();
  const status = session.status;

  const path = usePathname();
 

  let userData = session.data?.user;
  let userName = userData?.name || userData?.email;

  if(userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }

  if(userName && userName.includes('@')) {
    userName = userName.split('@')[0];
  }


  const handleScroll = () => {
    const isScrolled = window.scrollY > 0;
    setScrolled(isScrolled);
  }


  // change header position when scrolled
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll" , handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  },[]);



  return (
    <header className={scrolled ? "fixed top-0 left-0 w-full py-4 bg-white dark:bg-dark-SBackground shadow-lg z-50" : "absolute top-0 left-0 w-full py-4 bg-transparent z-50"}>  
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-12">
        <div className="flex gap-2 items-center">
          <div className="w-[45px] h-[30px]">
            <Link className="text-primary font-semibold text-2xl" href="/">
              <Image src="/fast-food-icons.png" width={'45'} height={'30'} alt="logo" 
              />
            </Link>
          </div>

          <ThemeToggleButton />
          
        </div>


        <nav className="flex items-center gap-8 font-semibold text-md z-50 md:text-lg">
          <div className="md:flex md:space-x-4 items-center hidden lg:space-x-8">
            <Link href="/" 
              className={`hover:text-primary  ${path === "/" ? "text-primary border-b-2 border-primary" : "text-gray-600"}`}
            >
              Home
            </Link>
            <Link href="/menu" 
              className={`hover:text-primary ${path.includes("/menu") ? "text-primary border-b-2 border-primary" : "text-gray-600" }`}
            >
              Menu
            </Link>
            <Link href="/about-us" 
              className={`hover:text-primary ${path === "/about-us" ? "text-primary border-b-2 border-primary" : "text-gray-600" }`}
            >
              About Us
            </Link>
            <Link href="/contact-us" 
              className={`hover:text-primary ${path === "/contact-us" ? "text-primary border-b-2 border-primary" : "text-gray-600" }`}
            >
              Contact Us
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {status == "authenticated" && (
              <>
                <Link href="/profile" className="whitespace-nowrap flex items-center justify-center gap-2 text-primary hover:text-primary/80 px-4 py-2 text-gray-600 font-semibold">
                    <div className="w-12 h-12">
                        <Image className="rounded-full border-2 border-primary shadow-sm" src="/profile.png" width={120} height={120} alt="profile" />
                    </div>
                                  
                    <div>
                      Hi,{userName}
                    </div>
                </Link>

                <motion.div 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <button onClick={() => signOut({ callbackUrl: '/' })} className="bg-primary rounded-full text-white px-8 py-2 hidden lg:block">
                    Logout
                  </button>
                </motion.div>

              </>
            )}

            {status === "unauthenticated" && (
              <>
               <motion.div 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link className="text-primary px-4 py-2 border-2 border-primary rounded-full" href="/login">Login</Link>
                </motion.div>

                <motion.div 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link className="bg-primary rounded-full text-white px-4 py-2 hidden sm:block" href="/register">Register</Link>
                </motion.div>
              </>
            )}

            <Link href="/cart" className="relative flex gap-2 items-center px-2 md:px-4 text-gray-500">
              <ShoppingCart />
              {cartProducts.length > 0 && <span className={`absolute right-2 -top-2 w-[20px] h-[20px] flex items-center justify-center bg-primary text-xs text-white rounded-full p-2 ${isItemAdded ? "animate-scale-bold" : ""}`}>
                {cartProductsCount()}
                </span>}
            </Link>



              {/* Mobile Menu */}
              <div className="fixed bottom-0 left-0 w-full md:hidden pt-4 bg-white dark:bg-dark-SBackground shadow-lg z-50">
                <div className="max-w-6xl mx-auto text-sm flex items-center justify-between px-4 sm:px-6 lg:px-12">
                  <Link href="/" 
                      className={`hover:text-primary  ${path === "/" ? "text-primary border-b-2 border-primary" : "text-gray-600"}`}
                    >
                      Home
                    </Link>
                    <Link href="/menu" 
                      className={`hover:text-primary py-4 ${path.includes("/menu") ? "text-primary border-b-2 border-primary" : "text-gray-600" }`}
                    >
                      Menu
                    </Link>
                    <Link href="/about-us" 
                      className={`hover:text-primary py-4 ${path === "/about-us" ? "text-primary border-b-2 border-primary" : "text-gray-600" }`}
                    >
                      About Us
                    </Link>
                    <Link href="/contact-us" 
                      className={`hover:text-primary py-4 ${path === "/contact-us" ? "text-primary border-b-2 border-primary" : "text-gray-600" }`}
                    >
                      Contact Us
                    </Link>

                    {status === "authenticated" && (
                      <div 
                        className={"text-gray-600 hover:text-primary py-4"}
                        onClick={() => signOut({ callbackUrl: '/' })}
                      >
                    
                        Logout
                      
                      </div>
                    )}
                    

                
                </div>
              </div>


          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
