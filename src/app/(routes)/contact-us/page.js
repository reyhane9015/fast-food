"use client";


import Image from 'next/image';
import Link  from 'next/link';
import Location from '@/components/icons/Location';
import Phone from '@/components/icons/Phone';
import SectionHeader from '@/components/ui/SectionHeader';
import ContactForm from '@/components/ContactForm';


import { motion } from "framer-motion";
import { descVariants } from '../../../utils/animation';




export default function ContactUsPage() {
    
    return (
        <section className="bg-light-background dark:bg-dark-background min-h-screen">
            
            <div className="relative z-40 text-center pt-24">
                <SectionHeader subHeader={'Contact'} mainHeader={'Us'} />
            </div>

            <motion.div
                initial="offscreen"
                whileInView="onscreen"
                variants={descVariants}
                className="max-w-4xl mx-auto p-12 border-2 border-gray-200 rounded-md relative z-40 grid grid-cols-1 lg:grid-cols-[0.4fr_0.6fr] gap-12 py-4 text-gray-500">

                
                <div className="flex flex-col gap-12 mt-8">
                    <div className="flex gap-2 items-center">
                        <Phone />
                        <a href="tel:+65656565" className="underline text-gray-500">tel:+65 65 65 65 </a>
                    </div>


                    <div className="flex gap-2 items-center">
                        <Location />
                        <p className="underline">Tehran,Valiasr,No 134</p>
                    </div>

                    <div className="flex gap-6 items-center justify-start">

                        <Link href="/">
                            <Image src="/instagram.svg" width={30} height={30} alt="socails" />
                        </Link>

                        <Link href="/">
                            <Image src="/twitter.svg" width={30} height={30} alt="socails"/>
                        </Link>

                        <Link href="/">
                            <Image src="/facebook.svg" width={30} height={30} alt="socails"/>
                        </Link>

                    </div>
                </div>


                <ContactForm />


            </motion.div>
      
    </section>
    )
}