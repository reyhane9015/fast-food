"use client";

import Reviews from "./ui/Reviews";
import { motion } from "framer-motion";
import { headerVariants, descVariants } from "./../utils/animation";
import LinkPrimary from "./ui/LinkPrimary";
import LinkSecondery from "./ui/LinkSecondery";
import HomeSwiper from "./ui/HomeSwiper";

function Hero() {
  return (
    <section>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 md:my-18 text-left pt-24 md:pt-36">
        <div className="flex flex-col gap-12 p-4 md:p-12 z-40">
          <motion.h1
            initial="offscreen"
            whileInView="onscreen"
            variants={headerVariants}
            className="text-4xl md:text-5xl tracking-wider text-center font-semibold text-light-text dark:text-dark-text md:text-left"
          >
            JUST COME TO FOOD & <span className="text-primary">ORDER</span>
          </motion.h1>
          <motion.p
            initial="offscreen"
            whileInView="onscreen"
            variants={descVariants}
            className="text-gray-500 text-xl md:text-2xl text-left"
          >
            Pizza is the missing piece that makes every day complete, a simple
            yet delicious joy in life every day complete, a simple yet delicious
            joy in life
          </motion.p>

          <div className="flex items-center justify-center md:justify-start gap-2">
            <LinkPrimary className="flex-1" href="/menu" title="Order Now" />

            <LinkSecondery
              className="flex-1"
              href="/about-us"
              title="Learn More"
            />
          </div>

          <Reviews />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            ease: [0, 0.71, 0.2, 1.01],
            scale: {
              type: "spring",
              damping: 5,
              stiffness: 100,
              restDelta: 0.001,
            },
          }}
          className="z-40 hidden md:flex justify-center items-center"
        >
          <HomeSwiper />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
