

import { motion } from "framer-motion";
import Link from "next/link";


function LinkSecondery({href , title}) {

    return (          
        <motion.div
            whileTap={{ scale: 0.85 }}
            className="min-w-[160px] flex items-center justify-center p-4 text-gray-600 font-semibold text-primary border-2 border-primary rounded-full hover:bg-primary hover:text-white">
            <Link href={href} >
                {title}
            </Link>
        </motion.div>
    )
}



export default LinkSecondery;