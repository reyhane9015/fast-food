"use client";

import { motion } from "framer-motion";
import { headerVariants } from "../../utils/animation";

function SectionHeader({ subHeader, mainHeader }) {
  return (
    <>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        variants={headerVariants}
        className="text-center py-8"
      >
        <h3 className="uppercase text-gray-500 font-semibold text-2xl">
          {subHeader}
        </h3>
        <h2 className="text-primary font-bold text-4xl">{mainHeader}</h2>
      </motion.div>
    </>
  );
}

export default SectionHeader;
