import { motion } from "framer-motion";

function ButtonPrimary({ title, type = "button", onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.85 }}
      type={type}
      onClick={onClick}
      className="flex items-center justify-center bg-primary text-white py-2 px-8 rounded-full"
    >
      {title}
    </motion.button>
  );
}

export default ButtonPrimary;
