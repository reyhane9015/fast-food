import Image from "next/image";
import { motion } from "framer-motion";
import { btnVariants } from "../../utils/animation";

function Reviews() {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      variants={btnVariants}
      className="relative flex flex-col items-center justify-center md:items-start"
    >
      <div className="opacity-60 text-gray-500 font-sm pb-4">Reviews</div>
      <div className="flex -space-x-3 font-mono text-white text-sm font-bold leading-6">
        <div className="z-30 w-16 h-16 rounded-full flex items-center justify-center bg-primary shadow-lg ring-2 ring-white">
          +45
        </div>
        <div className="z-20 w-16 h-16 rounded-full flex items-center justify-center bg-gray-100 shadow-lg ring-2 ring-white">
          <Image
            className="rounded-full ring-2 ring-primary"
            src="/assets/customer1.webp"
            width={60}
            height={60}
            alt="customer"
          />
        </div>
        <div className="z-10 w-16 h-16 rounded-full flex items-center justify-center bg-gray-100 shadow-lg ring-2 ring-white">
          <Image
            className="rounded-full ring-2 ring-primary"
            src="/assets/customer2.webp"
            width={60}
            height={60}
            alt="customer"
          />
        </div>
        <div className="z-0 w-16 h-16 rounded-full flex items-center justify-center bg-gray-100 shadow-lg ring-2 ring-white">
          <Image
            className="rounded-full ring-2 ring-primary"
            src="/assets/customer3.webp"
            width={60}
            height={60}
            alt="customer"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Reviews;
