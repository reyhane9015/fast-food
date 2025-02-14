"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import LinkPrimary from "@/components/ui/LinkPrimary";
import { btnVariants } from "./../utils/animation";

function WeekOffer() {
  return (
    <section>
      <div className="max-w-6xl mx-auto text-gray-800 my-8 overflow-hidden">
        <div className="flex items-center justify-between gap-4 w-full lg:text-center my-4 bg-gradient-to-b from-third rounded-lg p-8 lg:p-12 shadow-md">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: {
                type: "easeIn",
                duration: 1,
                delay: 0.3,
              },
            }}
            className="hidden lg:block"
          >
            <Image
              src="/assets/WeekOffer.webp"
              alt="offer"
              width={370}
              height={370}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: {
                type: "easeIn",
                duration: 1,
                delay: 0.2,
              },
            }}
            className="relative w-full lg:w-[75%] text-left"
          >
            <h1 className="text-2xl md:text-3xl tracking-wider font-semibold mb-4">
              Our <span className="text-primary">SPECIAL OFFER</span>
              <br /> GOING ON TODAY
            </h1>

            <p className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              laudantium sunt Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Ducimus laudantium sunt
            </p>

            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              variants={btnVariants}
              className="md:w-[35%] text-md md:px-8 mt-8"
            >
              <LinkPrimary href="/menu" title="Learn More" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default WeekOffer;
