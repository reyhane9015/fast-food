"use client";

import Image from "next/image";
import { CartContext }  from './../AppContext';
import { useState , useContext } from "react";
import { toast } from 'react-hot-toast';
import MenuItemCard from "./MenuItemCard";
// import { useSession } from 'next-auth/react';
// import FlyingButton from 'react-flying-item';


function MenuItem(menuItem) {

  const {name, description, category, basePrice, sizes , extraItems} = menuItem;

  const {addToCart , cartProducts } = useContext(CartContext);

  const[showModal , setShowModal] = useState(false);
  const[selectedSize , setSelectedSize] = useState(sizes?.[0] || null);
  const[selectedExtraItems , setSelectedExtraItems] = useState([]);
  const[loading , setLoading] =useState(false);



  const handleAddToCart = () => {

    const hasOptions = sizes.length > 0 || extraItems.length > 0;

    const itemToAdd = {menuItem , selectedSize , selectedExtraItems };

    // console.log("itemtoAdd" ,itemToAdd);
    // console.log("cart cartProduct in MenuItem" , cartProducts);


    if(hasOptions && !showModal) {
      setShowModal(true);
      return;
    }




    addToCart(itemToAdd).then(itemUpdated => {

      if (itemUpdated) {
        setTimeout(() => {
          toast.success('Item quantity updated in cart!');
        }, 1000);
      } else {
        setTimeout(() => {
          toast.success('Item added to cart successfully!');
        }, 1000);
      }

      setTimeout(() => {
        setShowModal(false);
      }, 3000);

    });
  


    // const itemUpdated = addToCart(itemToAdd);
    // setShowModal(false);

    // if(itemUpdated) {
    //   toast.success('Item quantity updated in cart!');
    // } else {
    //   toast.success('Item added to cart successfully!');
    // }



    // const existingItemIndex = cartProducts.findIndex(item =>
    //   item._id === menuItem._id &&
    //   item.size._id === selectedSize?._id &&
    //   JSON.stringify(item.extras) === JSON.stringify(selectedExtraItems)
    // )

    // if (existingItemIndex !== -1) {
    //   // If the item exists in cartProducts, increase its quantity
    //   cartProducts[existingItemIndex].quantity += 1;
    //   setShowModal(false);
    //   toast.success('Item quantity updated in cart!');
    // } else {
    //   // If the item does not exist in cartProducts, add it  
    //   addToCart(itemToAdd);
    //   setShowModal(false);
    //   toast.success('Item added to cart successfully!');
    // }
  }




  const handleExtaItemsClick = (e, extraItems) => {

    const checked = e.target.checked;
    if(checked) {
      setSelectedExtraItems(prev => [...prev , extraItems]);
    } else {
      setSelectedExtraItems(prev => {
        return prev.filter(e => e.name !== extraItems.name);
      })
    }
  }

  // Total Price
  let selectedPrice = basePrice;
    if(selectedSize) {
      selectedPrice += selectedSize.price;
    }

    if(selectedExtraItems?.length > 0) {
      for(const extra of selectedExtraItems) {
        selectedPrice += extra.price;
      }
    }




  return (
   <>
      {showModal && (
        <div onClick={() => setShowModal(false)} 
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-light-background dark:bg-dark-SBackground p-4 rounded-lg w-4/5 sm:w-2/5"
          >

            <div className="overflow-y-scroll p-2" style={{maxHeight:'calc(100vh - 40px)'}}>

              <Image src="/pizza.png" alt="pizza" width={180} height={180} className="block mx-auto" />
              <h2 className="text-3xl font-bold text-center mb-4">{name}</h2>
              <p className="text-center text-gray-500 text-xl mb-4">{description}</p>
      

              {sizes?.length > 0 && (
                <div className="p-2">
                  <h3 className="mb-2 text-gray-500">Pick your size</h3>
                  {sizes.map(size => (
                      <label key={size.name} className="flex items-center gap-2 p-4 border rounded-md mb-1">
                        <input 
                            type="radio" 
                            name="size"
                            onChange={() => setSelectedSize(size)}
                            checked={selectedSize?.name === size.name}
                          />
                          {size.name} {basePrice + size.price}$
                      </label>
                    ))
                  }
                </div>
              )}

              {extraItems?.length > 0 && (
                <div className="p-2">
                  <h3 className="mb-2 text-gray-500">Pick your extra items</h3>
                  {extraItems.map(extraItems => (
                      <label key={extraItems.name} className="flex items-center gap-2 p-4 border rounded-md mb-1">
                        <input 
                          type="checkbox" 
                          name={extraItems.name}
                          onChange={(e) => handleExtaItemsClick(e , extraItems)}
                          checked={selectedExtraItems.map(e => e._id).includes(extraItems._id)}
                        />
                        {extraItems.name} + {extraItems.price}$
                      </label>
                    ))
                  }
                </div>
              )}



            

            
              {/* <FlyingButton src='/pizza.png' targetTop={'5%'} targetLeft={'80%'}> */}
                <button
                  onClick={handleAddToCart}
                  className="mx-auto text-center mt-4 bg-primary text-white rounded-full py-4 px-2 sticky bottom-2 font-semibold"
                >
                  Add to cart {selectedPrice}$
                </button>
              {/* </FlyingButton> */}
             


            </div>
          </div>
        </div>
      )}

      <MenuItemCard onAddToCard={handleAddToCart} {...menuItem} />


   </>
  )
}

export default MenuItem
