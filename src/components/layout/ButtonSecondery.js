

import { motion } from "framer-motion";



function ButtonSecondery({title , type = "button", onClick}) {

    return (          
        <motion.button
            whileHover={{scale: 1.05}}
            whileTap={{ scale: 0.85 }}
            type={type}
            onClick={onClick}
            className="flex items-center justify-center p-2 text-gray-600 font-semibold text-primary border-2 border-primary rounded-full">
            {title}
        </motion.button>
    )
}



export default ButtonSecondery;