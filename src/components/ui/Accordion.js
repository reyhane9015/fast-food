"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { descVariants } from "../../utils/animation";
import Arrow from "./../icons/Arrow";

const Accordion = ({ title, content, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="flex justify-between items-center gap-2 w-full bg-gray-100 dark:bg-dark-SBackground shadow-md rounded-md p-3 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bg-primary text-white w-8 h-8 md:w-10 md:h-10 rounded-md flex items-center justify-center font-bold text-lg">
          <span>{index + 1}</span>
        </div>

        <span className="text-md md:text-lg font-medium text-gray-600">
          {title}
        </span>

        <Arrow isOpen={isOpen} />
      </button>

      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        animate={{ height: isOpen ? "auto" : 0 }}
        variants={descVariants}
        className="overflow-hidden rounded-md mt-2 mx-2 md:text-lg text-gray-600 bg-gray-100 dark:bg-dark-SBackground"
      >
        <div className="p-4">
          <p className="text-gray-600">{content}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Accordion;
