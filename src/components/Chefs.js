"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import Image from "next/image";
import { motion } from "framer-motion";
import { cardVariants } from "../utils/animation";

function Chefs() {
  return (
    <section>
      <SectionHeader subHeader={"Our"} mainHeader={"Special Chefs"} />

      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        className="max-w-4xl mx-auto z-40 grid grid-cols-1 md:grid-cols-3 gap-8 w-full md:my-6 md:mt-12"
      >
        <motion.div
          variants={cardVariants}
          className="group border shadow-lg rounded-md border-none flex flex-col items-center justify-end h-[300px] md:h-[350px] bg-secondery cursor-pointer overflow-hidden"
        >
          <Image
            src="/chef1.png"
            width={200}
            height={100}
            alt="chef1"
            className="opacity-90 transition-opacity duration-300 ease-out group-hover:opacity-100 group-hover:transition-opacity group-hover:duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-transparent to-90% text-white transition-all duration-300 group-hover:bg-gradient-to-t group-hover:from-black/60 group-hover:transition-all group-hover:duration-500">
            <h2 className="absolute bottom-8 left-8 m-0 font-extrabold uppercase bg-secondery/30 p-2 rounded-md transition-all delay-300 duration-100 ease-out group-hover:bottom-1/2 group-hover:delay-0 group-hover:duration-300">
              Chef John Doe
            </h2>
            <p className="absolute left-8 top-1/2 line-clamp-3 max-w-[80%] pt-4 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-hover:delay-500 group-hover:duration-300">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor
              nostrum nesciunt reiciendis labore vel velit blanditiis vero, amet
              corporis porro
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="group border shadow-lg rounded-md border-none flex flex-col items-center justify-end h-[300px] md:h-[350px] bg-secondery cursor-pointer overflow-hidden md:mt-12"
        >
          <Image
            src="/chef2.png"
            width={200}
            height={100}
            alt="chef2"
            className="opacity-90 transition-opacity duration-300 ease-out group-hover:opacity-100 group-hover:transition-opacity group-hover:duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-transparent to-90% text-white transition-all duration-300 group-hover:bg-gradient-to-t group-hover:from-black/60 group-hover:transition-all group-hover:duration-500">
            <h2 className="absolute bottom-8 left-8 m-0 font-extrabold uppercase bg-secondery/30 p-2 rounded-md transition-all delay-300 duration-100 ease-out group-hover:bottom-1/2 group-hover:delay-0 group-hover:duration-300">
              Chef John Doe
            </h2>
            <p className="absolute left-8 top-1/2 line-clamp-3 max-w-[80%] pt-4 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-hover:delay-500 group-hover:duration-300">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor
              nostrum nesciunt reiciendis labore vel velit blanditiis vero, amet
              corporis porro
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="group border shadow-lg rounded-md border-none flex flex-col items-center justify-end h-[300px] md:h-[350px] bg-secondery cursor-pointer overflow-hidden"
        >
          <Image
            src="/chef3.png"
            width={200}
            height={100}
            alt="chef3"
            className="opacity-90 transition-opacity duration-300 ease-out group-hover:opacity-100 group-hover:transition-opacity group-hover:duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-transparent to-90% text-white transition-all duration-300 group-hover:bg-gradient-to-t group-hover:from-black/60 group-hover:transition-all group-hover:duration-500">
            <h2 className="absolute bottom-8 left-8 m-0 font-extrabold uppercase bg-secondery/30 p-2 rounded-md transition-all delay-300 duration-100 ease-out group-hover:bottom-1/2 group-hover:delay-0 group-hover:duration-300">
              Chef John Doe
            </h2>
            <p className="absolute left-8 top-1/2 line-clamp-3 max-w-[80%] pt-4 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-hover:delay-500 group-hover:duration-300">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor
              nostrum nesciunt reiciendis labore vel velit blanditiis vero, amet
              corporis porro
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Chefs;
