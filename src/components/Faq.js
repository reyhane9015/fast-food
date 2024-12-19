"use client";

import Accordion from './ui/Accordion';
import { faqData } from "../utils/content";
import SectionHeader from './ui/SectionHeader';
import { motion } from "framer-motion";

function Faq() {


  return (

    <section>

        <SectionHeader subHeader={'Our'} mainHeader={'FAQ'} />

        <div className="max-w-2xl mx-auto space-y-4 lg:space-y-6">
            {faqData.map((item, index) => (
                <motion.div
                    initial={{
                        opacity: 0,
                        x: index % 2 === 0 ? 50 : -50
                        }}
                        whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 1
                        }
                    }}
                    viewport={{ once: true }}
                    key={index}
                >
                    <Accordion
                        title={item.title} 
                        content={item.content}
                        index={index}
                    />
                </motion.div>
            ))}
        </div>
    </section>
  );
};

export default Faq;
