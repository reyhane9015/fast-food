"use client";

import Image from 'next/image';
// import Link from "next/link";
import { motion } from "framer-motion";
import LinkPrimary from '@/components/ui/LinkPrimary';
import { btnVariants } from './../utils/animation';


function SpecialOffer() {

return (
    <section>

        <div className="max-w-6xl mx-auto rounded-lg text-white my-8 overflow-hidden">

            <div className="relative w-full lg:w-[80%] lg:text-center my-4 bg-gradient-to-b from-primary rounded-lg p-8 lg:p-12 shadow-md">

                <motion.div
                    initial={{opacity: 0 , x: -100}}
                    whileInView={{
                        opacity: 1,
                        x:0,
                        transition: {
                            type:"easeIn",
                            duration:1,
                            delay:.2
                        }
                    }}
                    className="relative w-full lg:w-[75%] text-left">
                    <h1 className="text-2xl md:text-3xl tracking-wider font-semibold mb-4">
                    GOOD FOOD, DRINK & <br/><span className="text-third">ENJOY YOUR MEAL</span>
                    </h1>
                    
                    <p className="text-xl">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt
                    </p>

                    <motion.div
                        initial="offscreen"
                        whileInView="onscreen"
                        variants={btnVariants}
                        className="w-[60%] flex justify-between items-center gap-4 text-md md:px-8 mt-8">
                            <LinkPrimary href={"/menu"} title="Order Now" />
                            <p className="font-semibold text-2xl">34.99$</p>
                    </motion.div>

                </motion.div>


                <Image src="/Arrow-animation3.gif" className="hidden lg:block absolute right-[100px] bottom-[20px]" width={150} height={250} alt="successful-animation" />

        
                <motion.div
                    initial={{opacity: 0 , x: 100}}
                    whileInView={{
                        opacity: 1,
                        x:0,
                        transition: {
                            type:"easeIn",
                            duration:1,
                            delay:.3
                        }
                    }}
                    className="hidden lg:block absolute -right-[240px] -top-[12px]"
                >
                    <Image src="/plato.png" alt="offer" width={370} height={370} />
                </motion.div>
            </div>

        </div>

    </section>
)


}

export default SpecialOffer;