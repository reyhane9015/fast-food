import Image from "next/image";
import DashboardStarRating from './DashboardStarRating';
import ProgressBar from "../ui/ProgressBar";
import Link from "next/link";


import { motion } from "framer-motion";
import { descVariants } from "../../utils/animation";

function DashboardBests({itemSalesCount , cSalesCount , customerCount , cardInfo , itemSalesCountPercentage}) {
  return (
    <div className="max-w-6xl m-auto">
    
        <div className="max-w-6xl m-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

            <motion.div 
                initial="offscreen"
                whileInView="onscreen"
                variants={descVariants}
                className="relative bg-light-SBackground dark:bg-dark-SBackground rounded-lg p-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
                <h2 className="text-xl mb-2 text-gray-600 font-semibold dark:text-gray-300">Best Sellers</h2>
                <p className="text-gray-500 text-sm">Lorem Ipsom dolar sitapm is in transactions customers</p>

                {itemSalesCount.slice(0,9).map(([itemName,salesCount]) => 
                    <div key={itemName} className="flex items-center justify-between my-4">
                    <div className="flex gap-2 items-center text-gray-600 dark:text-gray-300">
                            <Image src="/pizza.png" width={40} height={40} alt="pizza" />
                            <span>{itemName}</span>
                    </div>
                        <div className="bg-third p-2 rounded-lg text-white font-semibold">
                            {salesCount} Sales
                        </div>
                    </div>
                )}

                <div className="absolute bottom-2 left-0 right-0 mx-auto w-fit text-center">
                    <Link href="/" className="text-gray-500 text-xs hover:text-primary">Show More</Link>
                </div>
                
            </motion.div>


            <div>
                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    variants={descVariants}
                    className="relative bg-light-SBackground dark:bg-dark-SBackground rounded-lg p-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
                    <h2 className="text-xl mb-2 font-semibold text-gray-600 dark:text-gray-300">Best Customers</h2>
                    <p className="text-gray-500 text-sm">Lorem Ipsom dolar sitapm</p>

                    <div className="text-xl mb-4 text-gray-500">
                        {customerCount.slice(0,5).map(([customer,count]) => 
                            <div key={customer} className="flex items-center justify-between my-4">
                                <div className="flex gap-2 items-center text-gray-600 dark:text-gray-300">
                                    <Image src="/profile.jpg" width={30} height={30} alt="profile" className="rounded-md border-2 border-gray-200" />
                                    <span className="text-sm">{customer}</span>
                                </div>
                                <div className="font-semibold text-sm text-primary dark:text-gray-300">
                                    {count} Items
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="absolute bottom-2 left-0 right-0 mx-auto w-fit text-center">
                        <Link href="/" className="text-gray-500 text-xs hover:text-primary">Show More</Link>
                    </div>
                </motion.div>

                <motion.div 
                    initial="offscreen"
                    whileInView="onscreen"
                    variants={descVariants}
                    className="relative bg-light-SBackground dark:bg-dark-SBackground rounded-lg p-8 mt-4 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
                    <h2 className="text-xl mb-2 text-gray-600 font-semibold dark:text-gray-300">Best selling countries</h2>
                    <p className="text-gray-500 text-sm">Lorem Ipsom dolar sitapm is in transactions</p>

                    {Object.entries(cSalesCount).slice(0,4).map(([country, count])  => 
                        <div key={country} className="flex items-center justify-between my-4">
                        <div className="flex gap-2 items-center text-gray-600 dark:text-gray-300">
                            {country === "iran" ?
                                <Image src="/iran.jpg" width={30} height={30} alt="flag" className="rounded-full" />
                                :
                                <Image src="/turkye.jpg" width={30} height={30} alt="flag" className="rounded-full" />
                            }
                            <span>{country}</span>
                        </div>
                            <div className="font-semibold text-sm text-gray-600 dark:text-gray-300">
                                {count} %
                            </div>
                        </div>
                    )}

                    <div className="absolute bottom-2 left-0 right-0 mx-auto w-fit text-center">
                        <Link href="/" className="text-gray-500 text-xs hover:text-primary">Show More</Link>
                    </div>
                </motion.div>

            </div>
        </div>

       
        <div className="max-w-6xl m-auto w-full grid grid-cols-1 md:grid-cols-[0.7fr_0.3fr] gap-4 py-8">

            <motion.div 
                initial="offscreen"
                whileInView="onscreen"
                variants={descVariants}
                className="relative bg-light-SBackground dark:bg-dark-SBackground rounded-lg py-8">
                <h2 className="text-xl mb-2 text-gray-600 font-semibold dark:text-gray-300 px-4">Transactions</h2>
                <p className="text-gray-500 text-sm px-4">Lorem Ipsom dolar sitapm is in transactions customers</p>

                <div className="min-w-full leading-normal h-[630px] overflow-y-hidden">
                    <table className="min-w-full leading-normal mt-4">
                        <thead>
                            <tr></tr>
                        </thead>
                        <tbody>
                            {cardInfo.slice(0,10).map((info, index) => 
                                <tr key={index} className="px-4 py-2 flex items-center justify-between text-gray-500">
                                    <td className="text-green-800 bg-green-200 rounded-md p-2 text-[12px]">Completed</td>
                                    <td className="text-md text-center">
                                        {info.cardNumber ? info.cardNumber : "** ** ** **"}
                                        <p className="text-[10px]">Card payment</p>
                                    </td>
                                    <td>{info.expiryDate ? info.expiryDate : "****"}</td>
                                    <td>{info.cvv ? info.cvv : "****"}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="absolute bottom-2 left-0 right-0 mx-auto w-fit text-center">
                        <Link href="/" className="text-gray-500 text-xs hover:text-primary">Show More</Link>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial="offscreen"
                whileInView="onscreen"
                variants={descVariants}
                className="relative bg-light-SBackground dark:bg-dark-SBackground rounded-lg shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
                <h2 className="text-xl text-gray-600 font-semibold dark:text-gray-300 p-8">Products Ratings</h2>

                <div className="h-[630px] overflow-y-hidden">
                    {itemSalesCountPercentage.slice(0,7).map(([itemName,salesCount]) => 
                        <div key={itemName} className="ratings-grid gap-2 my-4 px-4">
                            <div className="text-gray-600 dark:text-gray-300 pt-4 text-sm font-semibold">{itemName}</div>
                            <div>
                                <ProgressBar prop={salesCount} className="text-sm font-semibold text-gray-600" />
                                <DashboardStarRating rating={4} />
                            </div>
                        </div>
                    )}
                </div>

                <div className="absolute bottom-2 left-0 right-0 mx-auto w-fit text-center">
                    <Link href="/" className="text-gray-500 text-xs hover:text-primary">Show More</Link>
                </div>
                
            </motion.div>

        </div>
    </div>
  )
}

export default DashboardBests
