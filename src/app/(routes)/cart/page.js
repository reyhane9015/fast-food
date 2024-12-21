'use client';

import { useState, useEffect , useContext } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import Link from 'next/link';
// import Trash from '@/components/icons/Trash';
import Image from "next/image";
import UserForm from '@/components/UserForm';
import { useSession } from 'next-auth/react';
import { CartContext } from './../../../components/AppContext';
import  Delete from '@/components/icons/Delete';

import ButtonSecondery from '@/components/layout/ButtonSecondery';
import ButtonPrimary from '@/components/layout/ButtonPrimary';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';


export default function CartPage() {

    const {cartProducts , removeCartProduct , cartProductPrice ,updateCartProducts, generateProductKey , clearCart} = useContext(CartContext);


    const session = useSession();
    const status = session.status;

    const [userName , setUserName] = useState('');
    const[user , setUser] = useState(null);

    const[isSaving , setIsSaving] = useState(false);
    const[profileFetched , setProfileFetched] = useState(false);
    
    const router = useRouter();


    useEffect(() => {

        setUserName(session.data?.user?.name);

        fetch('/api/profile')
        .then(response => {response.json()
        .then(data => {
                // console.log("data is" , data);
                setUser(data);
                // setProfileFetched(true); 
            })
        })
    } , [status]);



    // console.log("cart cartProduct" , cartProducts);

    
    let total = 0;
    for (const p of cartProducts) {
        total += cartProductPrice(p);
    }


    const handleDecreaseQuantity = (product) => {
        if(product.quantity > 1) {
            const updatedProduct = {...product, quantity: product.quantity - 1};
            updateCartProducts(updatedProduct, updatedProduct.quantity);
        }
    }

    const handleIncreaseQuantity = (product) => {
        const updatedProduct = {...product, quantity: product.quantity + 1};
        updateCartProducts(updatedProduct, updatedProduct.quantity);
    }

    const handleQuantityChange = (product, newQuantity) => {
        const parsedQuantity = parseInt(newQuantity, 10);
        if (!isNaN(parsedQuantity)) {
            const validQuantity = Math.max(1, parsedQuantity);
            updateCartProducts(product, validQuantity);
        }
    }
    


   


    async function proceedToCheckout(e) {

        e.preventDefault();

        setIsSaving(true);

        try {
            const response = await fetch('/api/orders' , {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({user , cartProducts , totalPrice: total})
            })
            const result = await response.json();
            // console.log("result is:" , result);

            // console.log(result._id);

            let id = result._id;
            
            setIsSaving(false);

            window.location.href = `/orders/${id}/checkout`;
            // router.push(`/orders/${result._id}/checkout`);
        } catch(error) {
            console.error("Error during checkout:", error);
            setIsSaving(false);
            toast.error("Something went wrong. Please try again later.");
        }
    }



    if(status === "loading" || !user) {
        return <div 
                className="relative z-40 text-center font-semibold text-primary text-2xl h-screen flex justify-center items-center">
                    Loading...
                </div>
    }


  
    if (cartProducts?.length === 0) {
      return (
        <section className="text-center">
          <SectionHeader mainHeader="Cart" />
            <p className="relative z-40 text-center font-semibold text-primary text-2xl h-screen flex justify-center items-center">
              Your shopping cart is empty
            </p>
        </section>
      );
    }



    return (
      <section className="max-w-6xl mx-auto bg-light-background dark:bg-dark-background min-h-screen">
        <div className="relative z-40 text-center pt-24">
          <SectionHeader subHeader="Cart" mainHeader="Details" />
        </div>


        {status == "authenticated" ? 
            <>
                {/* <div className="flex items-center justify-end w-full relative z-40 my-2">
                    <button className="w-[100px] border border-gray-500 rounded-md p-2 mb-4" onClick={clearCart}>
                        Clear Cart
                    </button>
                </div> */}

                 <div className="w-[100px] relative z-40 my-2">
                    <ButtonSecondery onClick={clearCart} title="Clear Cart" className="" />
                 </div>


                <div className="relative z-40 grid grid-cols-1 gap-4 lg:gap-2">

                    <div className="rounded-lg bg-light-SBackground dark:bg-dark-SBackground">

                        {/* {cartProducts?.length === 0 && (
                            <div className="relative z-40">Your shopping cart is empty</div>
                        )} */}

                    

                        <div className="py-4 overflow-x-auto">
                            <div
                                className="inline-block min-w-full rounded-lg overflow-hidden"
                            >
                    
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th
                                                className="px-8 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-SBackground text-left text-md font-semibold text-light-text dark:text-dark-text uppercase tracking-wider"
                                            >
                                            
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-SBackground text-left text-md font-semibold text-light-text dark:text-dark-text uppercase tracking-wider"
                                            >
                                            Image
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-SBackground text-left text-md font-semibold text-light-text dark:text-dark-text uppercase tracking-wider"
                                            >
                                                Name
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-SBackground text-left text-md font-semibold text-light-text dark:text-dark-text uppercase tracking-wider"
                                            >
                                                Size
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-SBackground text-left text-md font-semibold text-light-text dark:text-dark-text uppercase tracking-wider"
                                            >
                                            Extras
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-SBackground text-left text-md font-semibold text-light-text dark:text-dark-text uppercase tracking-wider"
                                            >
                                                BasePrice
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-SBackground text-left text-md font-semibold text-light-text dark:text-dark-text uppercase tracking-wider"
                                            >
                                                Quantity
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-SBackground text-left text-md font-semibold text-light-text dark:text-dark-text uppercase tracking-wider"
                                            >
                                                Price of one item
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-SBackground text-left text-md font-semibold text-light-text dark:text-dark-text uppercase tracking-wider"
                                            >
                                                Total price
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-SBackground text-left text-md font-semibold text-light-text dark:text-dark-text uppercase tracking-wider"
                                            >
                                            
                                            </th>
                                    
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {cartProducts?.length > 0 && (
                                            cartProducts.map((product , index) => {

                                            const productKey = generateProductKey(product);

                                            // console.log(productKey);

                                            
                                            return (
                                            <tr key={productKey} className="hover:bg-gray-200 hover:cursor-pointer border-dashed border-b-2 border-b-gray-300 dark:hover:bg-dark-background">

                                                <td className="font-semibold text-center text-light-text dark:text-dark-text">{index + 1}</td>

                                                <td className="py-4 text-light-text dark:text-dark-text text-center">
                                                    <Image src="/pizza.png" alt="pizza" width={60} height={60} className="block mx-auto" />
                                                </td>

                                                <td className="font-semibold text-light-text dark:text-dark-text text-center">{product.name}</td>

                                                <td className="px-5 py-5 text-light-text dark:text-dark-text text-center">
                                                    {product.size &&   
                                                        <div>
                                                            <span className="whitespace-nowrap text-sm">{product.size.name}</span>
                                                            <span className="whitespace-nowrap text-sm"> + {product.size.price}$</span>
                                                        </div>
                                                    }
                                                </td>

                                                {product.extras.length > 0 ?
                                                    <td className="px-5 py-5 text-light-text dark:text-dark-text">
                                                        {product.extras.map((ex) => (
                                                            <div key={ex._id}>
                                                                <span className="whitespace-nowrap text-sm">{ex.name}</span>
                                                                <span className="whitespace-nowrap text-sm"> + {ex.price}$</span>
                                                            </div>
                                                        ))}
                                                    </td> :
                                                    <td className="px-5 py-5 text-light-text dark:text-dark-text">------------</td>
                                                }


                                                <td className="px-5 py-5 text-sm text-light-text dark:text-dark-text text-center">
                                                    {product.basePrice}$
                                                </td>


                                                {/* <td className="font-semibold text-primary text-xl px-5 py-5 text-center">
                                                    {product.quantity}
                                                </td> */}

                                                <td className="font-semibold text-primary text-xl px-5 py-5 text-center">
                                                    <div className="flex items-center justify-center space-x-2">

                                                    <button 
                                                        type="button" 
                                                        className="text-xl px-2 py-1 bg-gray-200 rounded-full hover:bg-primary hover:text-white"
                                                        onClick={() => handleDecreaseQuantity(product)}
                                                    >
                                                        -
                                                    </button>


                                                    <input type="number" 
                                                        className="w-12 text-center border border-gray-300 rounded-md
                                                        [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
                                                       
                                                        value={product.quantity} 
                                                        readOnly
                                                        onChange={(e) =>{
                                                             console.log('product id:', product.id); 
                                                             console.log('input value:', e.target.value);
                                                             handleQuantityChange(product.id,e.target.value)}
                                                            } 
                                                    />


                                                    <button 
                                                        type="button" 
                                                        className="text-xl px-2 py-1 bg-gray-200 rounded-full hover:bg-primary hover:text-white"
                                                        onClick={() => handleIncreaseQuantity(product)}
                                                    >
                                                        +
                                                    </button>

                                                    </div>
                                                </td>



                                        
                                                <td className="px-5 py-5 text-light-text dark:text-dark-text text-center">{cartProductPrice(product) / (product.quantity)}$</td>
                                                

                                                <td className="font-semibold text-primary px-5 py-5 text-center">
                                                    <span className="text-xl">{cartProductPrice(product)}$</span>
                                                </td>

                                            

                                                <td className="py-5 text-center">
                                                    <button type="button" className="hover:text-primary" onClick={() => {
                                                        removeCartProduct(index); 
                                                        toast.success(`${cartProducts[index].name} removed from the cart`)}}
                                                    >
                                                    
                                                        <Delete />
                                                    </button>
                                                </td>
                                            </tr>
                                            
                                            )
                                            
                                            })
                                          
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                
                    


                        <div className="text-light-text dark:text-dark-text">
                            <div className="font-semibold text-xl text-right p-8 rounded-md mt-8 border-b-2">
                                <div>
                                    SubTotal Price: <span>{total}$</span>
                                </div>
                                <div>
                                    Delivery Price: <span>10$</span>
                                </div>
                            </div>

                            <div className="font-semibold text-2xl text-right rounded-md m-8">
                                Total Price: <span>{total + 10}$</span>
                            </div>
                        </div>

                    </div>

                    <div className="bg-light-SBackground dark:bg-dark-SBackground p-4 rounded-lg min-h-[650px]">

                        {user !== null && <UserForm user={user} isEditable={false} /> }


                        {/* <button type="button" onClick={proceedToCheckout} className="md:w-[60%] mx-auto font-semibold text-2xl bg-primary text-white p-4 rounded-md mt-8">
                            pay {total + 10}$
                        </button> */}

                        <div className="md:w-[60%] mx-auto mt-8">
                            <ButtonPrimary onClick={proceedToCheckout} title={`pay ${total + 10}$`} />
                        </div>



                        
                        
                    </div>
                </div>
            </>
        :
        <div className="relative z-40 text-center text-lg text-gray-600 font-semibold">Please Login to continue?
            <Link href="/login" className="text-primary underline">Login</Link>
        </div>
        }



      </section>
    );
  }