import Dollar from "../icons/Dollar"
import ProgressBar from "../ui/ProgressBar"

import { motion } from "framer-motion";
import { descVariants } from "../../utils/animation";

function DashboardTop({todayIncome ,thisWeekIncome , thisMonthIncome , todayOrderCount , thisWeekOrderCount , thisMonthOrderCount ,todayOrderPercentage, thisWeekOrderPercentage, thisMothOrderPercentage}) {
  
  return (
    <div className="max-w-6xl m-auto grid grid-cols-1 md:grid-cols-3 gap-4">

        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          variants={descVariants}
          className="bg-light-SBackground dark:bg-dark-SBackground text-primary rounded-lg px-4 py-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
          <div>

            <div className="flex items-center justify-between mb-4">
              {/* <h2 className="text-xl font-semibold">Today's Reviews</h2> */}
              <h2 className="text-xl font-semibold">Today&apos;s Reviews</h2>
              <Dollar />
            </div>

            <div className="flex items-center justify-between mb-4">
              <p className="text-lg font-semibold">INCOME</p>
              <p className="font-semibold text-2xl">{todayIncome.toFixed(2)}$</p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <p className="text-lg font-semibold">SALE COUNT</p>
              <p className="font-semibold text-2xl">{todayOrderCount} Sales</p>
            </div>
            
            <ProgressBar prop={todayOrderPercentage.toFixed(2)} />
        
          </div>
        
        </motion.div>


        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          variants={descVariants}
          className="bg-third text-white rounded-lg px-4 py-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
          <div>

            <div className="flex items-center justify-between mb-4">
              {/* <h2 className="text-xl font-semibold">This Week's  Reviews</h2> */}
              <h2 className="text-xl font-semibold">This Week&apos;s  Reviews</h2>
              &apos;
              <Dollar />
            </div>

            <div className="flex items-center justify-between mb-4">
              <p className="text-lg font-semibold">INCOME</p>
              <p className="font-semibold text-2xl">{thisWeekIncome.toFixed(2)}$</p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <p className="text-lg font-semibold">SALE COUNT</p>
              <p className="font-semibold text-2xl">{thisWeekOrderCount} Sales</p>
            </div>

            <ProgressBar prop={thisWeekOrderPercentage.toFixed(2)} />
            
          </div>
        
        </motion.div>

        
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          variants={descVariants}
            className="bg-light-SBackground dark:bg-dark-SBackground text-primary rounded-lg px-4 py-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
          <div>

            <div className="flex items-center justify-between mb-4">
              {/* <h2 className="text-xl font-semibold">This Month's  Reviews</h2> */}
              <h2 className="text-xl font-semibold">This Month&apos;s  Reviews</h2>
              <Dollar />
            </div>

            <div className="flex items-center justify-between mb-4">
              <p className="text-lg font-semibold">INCOME</p>
              <p className="font-semibold text-2xl">{thisMonthIncome.toFixed(2)}$</p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <p className="text-lg font-semibold">SALE COUNT</p>
              <p className="font-semibold text-2xl">{thisMonthOrderCount} Sales</p>
            </div>

          </div>
        
        </motion.div>

    </div>
  )
}

export default DashboardTop
