

import { motion } from "framer-motion";
import Link from "next/link";


function LinkPrimary({href , title}) {

    return (          
        <motion.div
            whileTap={{ scale: 0.85 }}
            className="min-w-[160px] flex justify-center items-center bg-primary font-semibold text-white p-4 rounded-full border-2 border-primary hover:bg-transparent hover:text-primary">
            <Link href={href} >
                {title}
            </Link>
        </motion.div>
    )
}



export default LinkPrimary;