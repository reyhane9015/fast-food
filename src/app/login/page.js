"use client";


import { useState } from "react"
import Link  from 'next/link';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
// import BackLogin from '../../../components/layout/BackLogin';
import Input from './../../components/Input';


function LoginPage() {

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const [loginInProgress , setLoginInProgress] = useState(false);
    // const [userCreated , setUserCreated] = useState(false);

    const[error , setError] = useState(false);



    // Validation
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    const validatePassword = (password) => {
    const numberRegex = /\d/g;
    const numberCount = (password.match(numberRegex) || []).length;

    return numberCount >= 3;
    };


    async function handleFormSubmit(e) {
        e.preventDefault();



        if (email === null || email === "") {
            toast.error("Please enter an Email");
            return;
        }
        if (!validateEmail(email)) {
            toast.error("Invalid email address");
            return;
        }

        if (password === null || password === "") {
            toast.error("Please enter a Password");
            return;
        }
        if (!validatePassword(password)) {
            toast.error("Password must have at least 3 digits");
            return;
        }



        setLoginInProgress(true);
        setError(false);

        const loginPromise = new Promise(async(resolve, reject) => {
            try {
                await signIn('credentials', { email, password, callbackUrl: '/profile' });
                resolve();
            } catch (error) {
                reject(error);
                setError(true);
            } finally {
                setLoginInProgress(false);
            }
        });

        await toast.promise(loginPromise, {
            loading: 'Logging in...',
            success: 'Logged in successfully!',
            error: 'Error logging in.',
        });
    }

  return (
    <section className="bg-light-background dark:bg-dark-background flex flex-col items-center justify-center h-screen">
        <h1 className="relative text-center text-primary text-4xl mb-8 z-40">Login</h1>

        {error && 
            <div className="block max-w-md mx-auto my-3 bg-red-300 text-red-700 p-3 rounded-md font-bold">
                An Error has occured. Please try again later!
            </div>
        }


        <form className="relative block max-w-md mx-auto z-40" onSubmit={handleFormSubmit}>
            {/* <Input 
                type={"email"}
                placeholder={"Email"} 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                disabled={loginInProgress}
                
            /> */}

            <input type="email"
                placeholder="Email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                disabled={loginInProgress}
                // error={!validateEmail(email)}
                className="dark:bg-dark-SBackground text-light-text dark:text-dark-text"
            />

            <input type="password"
                placeholder="Password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                disabled={loginInProgress}
                // error={!validatePassword(password)}
                className="dark:bg-dark-SBackground text-light-text dark:text-dark-text"
            />

            <button type="submit" disabled={loginInProgress}>Login</button>

            <div className="text-center my-4 text-gray-500">Dont have an account? {' '} 
                <Link href="/register" className="underline">Register</Link>
            </div>
        </form>


    </section>
  )
}

export default LoginPage
