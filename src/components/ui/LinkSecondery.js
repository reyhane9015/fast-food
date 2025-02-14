import { motion } from "framer-motion";
import Link from "next/link";

function LinkSecondery({ href, title }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.85 }}
      className="flex items-center justify-center whitespace-nowrap bg-primary text-primary bg-transparent hover:shadow-lg hover:shadow-primary/50 border-2 border-primary px-4 py-2 md:px-8 rounded-full text-md lg:text-lg font-semibold hover:bg-primary hover:text-white"
    >
      <Link href={href}>{title}</Link>
    </motion.div>
  );
}

export default LinkSecondery;
