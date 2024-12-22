import Facebook from "../icons/Facebook";
import Instagram from "../icons/Instagram";
import Twitter from "../icons/Twitter";


function Footer() {
  return (

<section class="text-center bg-primary py-16 px-8 pt-12 font-semibold">
    <div class="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <nav class="flex flex-wrap justify-center -mx-5 -my-2">
            <div class="px-5 py-2">
                <a href="#" class="text-base leading-6 text-gray-200 hover:text-gray-900">
                    About
                </a>
            </div>
            <div class="px-5 py-2">
                <a href="#" class="text-base leading-6 text-gray-200 hover:text-gray-900">
                    Blog
                </a>
            </div>
            <div class="px-5 py-2">
                <a href="#" class="text-base leading-6 text-gray-200 hover:text-gray-900">
                    Chefs
                </a>
            </div>
            <div class="px-5 py-2">
                <a href="#" class="text-base leading-6 text-gray-200 hover:text-gray-900">
                    Delivery
                </a>
            </div>
            <div class="px-5 py-2">
                <a href="#" class="text-base leading-6 text-gray-200 hover:text-gray-900">
                    Contact
                </a>
            </div>
            <div class="px-5 py-2">
                <a href="#" class="text-base leading-6 text-gray-200 hover:text-gray-900">
                    Terms
                </a>
            </div>
        </nav>
        <div class="flex justify-center mt-8 space-x-6">
            <a href="#" class="text-gray-200 hover:text-gray-500">
                <span class="sr-only">Facebook</span>
                <Facebook />
            </a>
            <a href="#" class="text-gray-200 hover:text-gray-500">
                <span class="sr-only">Instagram</span>
                <Instagram />
            </a>
            <a href="#" class="text-gray-200 hover:text-gray-500">
                <span class="sr-only">Twitter</span>
                <Twitter />
            </a>
      
        </div>
        <p class="mt-8 text-base leading-6 text-center text-gray-200">
            © 2021 FastFoodCompany, Inc. All rights reserved.
        </p>
    </div>
</section>
  )
}

export default Footer
