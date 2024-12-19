
import Image from 'next/image';
import { motion } from "framer-motion";
import { feautersVariants } from "../utils/animation";


function CustomersOpinions() {
  return (
    <div className="relative z-40 max-w-6xl mx-auto my-24">

        <div className="grid gap-6 grid-cols-1 md:grid-cols-4 md:grid-rows-2">



            <motion.div
                initial={{opacity: 0 , x: -100}}
                whileInView={{
                    opacity: 1,
                    x:0,
                    transition: {
                        type:"easeIn",
                        duration:1,
                        delay:.2
                    }
                }}
                className="bg-gray-100 p-8 rounded-md md:col-span-2">
                <div className="flex space-x-4">
                    <Image width={50} height={50} className="rounded-full ring-2 ring-primary"  src="/customer1.jpg" alt="customer" />
                    <div className="text-sm">
                            <h4 className="opacity-90">Customer 1</h4>
                            <p className="opacity-50">best customer</p>
                    </div>
                </div>
                <p className="mt-6 text-md">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt
                </p>

                <p className="mt-6 text-sm opacity-50">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt
                </p>
            </motion.div>



            <motion.div 
                initial={{opacity: 0 , x: 100}}
                whileInView={{
                    opacity: 1,
                    x:0,
                    transition: {
                        type:"easeIn",
                        duration:1,
                        delay:.3
                    }
                }}
                className="bg-third p-8 rounded-md">
                <div className="flex space-x-4">
                    <Image width={50} height={50} className="rounded-full ring-2 ring-primary"  src="/customer2.jpg" alt="customer" />
                    <div className="text-sm">
                            <h4 className="opacity-90">Customer 2</h4>
                            <p className="opacity-50">best customer</p>
                    </div>
                </div>
                <p className="mt-6 tex-md">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt
                </p>

                <p className="mt-6 text-sm opacity-50 line-clamp-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt
                </p>
            </motion.div>




            <motion.div 
                initial={{opacity: 0 , x: 100}}
                whileInView={{
                    opacity: 1,
                    x:0,
                    transition: {
                        type:"easeIn",
                        duration:1,
                        delay:.4
                    }
                }}
                className="hidden md:block md:row-span-2 bg-primary p-8 rounded-md">
                <div className="flex space-x-4">
                    <Image width={50} height={50} className="rounded-full ring-2 ring-primary"  src="/customer3.jpg" alt="customer" />
                    <div className="text-sm">
                            <h4 className="opacity-90">Customer 3</h4>
                            <p className="opacity-50">best customer</p>
                    </div>
                </div>
                <p className="mt-6 text-md">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt
                </p>

                <p className="mt-6 text-sm opacity-50">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt 
                    adipisicing elit. Ducimus laudantium sunt Lorem ipsum dolor sit amet consectetur 
                    adipisicing elit. Ducimus laudantium sunt adipisicing elit. Ducimus laudantium sunt
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt
                </p>
            </motion.div>



            <motion.div 
                initial={{opacity: 0 , x: -100}}
                whileInView={{
                    opacity: 1,
                    x:0,
                    transition: {
                        type:"easeIn",
                        duration:1,
                        delay:.3
                    }
                }}
                className="bg-gray-100 p-8 rounded-md">
                <div className="flex space-x-4">
                    <Image width={50} height={50} className="rounded-full ring-2 ring-primary"  src="/customer4.jpg" alt="customer" />
                    <div className="text-sm">
                            <h4 className="opacity-90">Customer 4</h4>
                            <p className="opacity-50">best customer</p>
                    </div>
                </div>
                <p className="mt-6 text-md">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                </p>

                <p className="mt-6 text-sm opacity-50 line-clamp-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt
                </p>
            </motion.div>




            <motion.div
                initial={{opacity: 0 , x: 100}}
                whileInView={{
                    opacity: 1,
                    x:0,
                    transition: {
                        type:"easeIn",
                        duration:1,
                        delay:.3
                    }
                }}
                className="bg-third p-8 rounded-md md:col-span-2">
                <div className="flex space-x-4">
                    <Image width={50} height={50} className="rounded-full ring-2 ring-primary"  src="/customer5.jpg" alt="customer" />
                    <div className="text-sm">
                            <h4 className="opacity-90">Customer 5</h4>
                            <p className="opacity-50">best customer</p>
                    </div>
                </div>
                <p className="mt-6 text-md">
                    Lorem ipsum dolor sit amet consectetur
                </p>

                <p className="mt-6 text-sm opacity-50 line-clamp-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt
                </p>
            </motion.div>



            {/* box 6 */}
            <motion.div
              initial={{opacity: 0 , x: -100}}
              whileInView={{
                  opacity: 1,
                  x:0,
                  transition: {
                      type:"easeIn",
                      duration:1,
                      delay:.3
                  }
              }}
                className="bg-primary p-8 rounded-md md:hidden">
                <div className="flex space-x-4">
                    <Image width={50} height={50} className="rounded-full ring-2 ring-primary"  src="/customer3.jpg" alt="customer" />
                    <div className="text-sm">
                            <h4 className="opacity-90">Customer 3</h4>
                            <p className="opacity-50">best customer</p>
                    </div>
                </div>
                <p className="mt-6 text-md">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt
                </p>

                <p className="mt-6 text-sm opacity-50">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt
                </p>
            </motion.div>
    

        </div>
    </div>
  )
}

export default CustomersOpinions
