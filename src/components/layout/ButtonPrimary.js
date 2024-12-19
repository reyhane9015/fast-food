

import { motion } from "framer-motion";



function ButtonPrimary({title , type = "button" , onClick}) {

    return (          
        <motion.button
            whileHover={{scale: 1.05}}
            whileTap={{ scale: 0.85 }}
            type={type}
            onClick={onClick}
            className="flex items-center justify-center bg-primary text-white p-4 rounded-full">
            {title}
        </motion.button>
    )
}



export default ButtonPrimary;