"use client";

import SectionHeader from './ui/SectionHeader';
import Image  from 'next/image';
import { feauters } from './../utils/content';

import { motion } from "framer-motion";
import { feautersVariants, descVariants , btnVariants } from "../utils/animation";


function WhyUs() {

    return (
        <section>
            <SectionHeader subHeader={'Why'} mainHeader={'Choose Us'} />

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center py-8">


                {feauters.map((f , i) => (
                    <motion.div 
                        initial="offscreen"
                        whileInView="onscreen"
                        variants={feautersVariants((i + 1) * 0.2)}
                        key={i}
                        className="shadow-lg flex flex-col gap-4 items-center justify-center px-4 py-12 dark:bg-dark-SBackground rounded-lg">
                        <div className="border-double border-4 border-primary p-2 rounded-full">
                            <Image src={f.icon} alt={f.alt} width={'45'} height={'120'} />
                        </div>
                        <motion.h3 
                            initial="offscreen"
                            whileInView="onscreen"
                            variants={descVariants}
                            className="text-xl font-semibold leading-none tracking-tight text-neutral-600">
                            {f.title}
                        </motion.h3>
                        <motion.p 
                            initial="offscreen"
                            whileInView="onscreen"
                            variants={btnVariants}
                            className="text-sm text-neutral-400 text-center">
                            {f.par}
                        </motion.p>
                    </motion.div>
                ))}
               

               
            </div>
        </section>
    )
}

export default WhyUs