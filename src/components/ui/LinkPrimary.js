import { motion } from "framer-motion";
import Link from "next/link";

function LinkPrimary({ href, title }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.85 }}
      className="flex items-center justify-center whitespace-nowrap bg-primary text-white hover:shadow-lg hover:shadow-primary/50 px-4 py-2 md:px-8 rounded-full text-md lg:text-lg font-semibold border-2 border-transparent hover:bg-transparent hover:text-primary hover:border-2 hover:border-primary"
    >
      <Link href={href}>{title}</Link>
    </motion.div>
  );
}

export default LinkPrimary;
