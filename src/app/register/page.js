"use client";

import { useState } from "react"
import Link  from 'next/link';
import toast from 'react-hot-toast';
import Input from './../../components/Input';


function RegisterPage() {

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const [creatingUser , setCreatingUser] = useState(false);
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
        
        // setUserCreated(false);



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

        setCreatingUser(true);



    const registeringPromise = new Promise(async(resolve,reject) => {
            const response = await fetch('/api/register' , {
                method: 'POST',
                body: JSON.stringify({email , password}),
                headers: {'Content-Type' : 'application/json'},
            });

            if(response.ok) {
                resolve();
            } else {
                reject();
                setError(error);
            }
            setCreatingUser(false);
        })
        await toast.promise(registeringPromise , {
            loading: 'Registering...',
            success: 'Registerd Successfully...',
            error: 'Already have an account, please Login!'
        }) 

        if (!error) {
            window.location.href = '/login';
        }
    }


  return (
    <section className="bg-light-background dark:bg-dark-background flex flex-col items-center justify-center h-screen">
        <h1 className="relative text-center text-primary text-4xl mb-8 z-40">Register</h1>

        <form className="relative block max-w-xs mx-auto z-40" onSubmit={handleFormSubmit}>
            <Input
                type={"email"}
                placeholder={"Email"} 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                disabled={creatingUser}
                error={!validateEmail(email)}
            />

            <input type="password"
                placeholder="Password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                disabled={creatingUser}
                error={!validatePassword(password)}
                className="dark:bg-dark-SBackground text-light-text dark:text-dark-text"
            />


            <button type="submit" disabled={creatingUser}>Register</button>
            
            <div className="text-center my-4 text-gray-500">Already have an account?
                <Link href="/login" className="underline">Login</Link>
            </div>
        </form>
    </section>
  )
}

export default RegisterPage
