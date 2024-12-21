"use client"

import {SessionProvider} from "next-auth/react";
import { useState ,useEffect , createContext } from "react";

import { UserProvider } from './UserContext';

export const CartContext = createContext({});



function AppProvider({children}) {

  const[cartProducts , setCartProducts] = useState([]);

  const [isItemAdded, setIsItemAdded] = useState(false);

  const ls = typeof window !=='undefined' ? window.localStorage : null;

  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if(ls) {
      const savedTheme = ls.getItem('theme');
      if(savedTheme) {
        setTheme(savedTheme);
      }
    }

    const savedCart = ls.getItem('cart');
    if(savedCart) {
      setCartProducts(JSON.parse(savedCart));
    }

  },[ls]);

  const toggleTheme = () => {
    const newTheme = theme ==="light" ? "dark" : "light";
    setTheme(newTheme);
    if(ls) {
      ls.setItem('theme' , newTheme);
    }
  };


  const saveCartProductsToLocalStorage = (cartProducts) => {
    if(ls) {
      ls.setItem('cart' , JSON.stringify(cartProducts));
    }
  }



  const clearCart = () => {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }


  const addToCart = ({ menuItem, selectedSize, selectedExtraItems }) => {
    return new Promise((resolve) => {
      let itemUpdated = false;

      setCartProducts(prevProducts => {
        const newProduct = {
          ...menuItem,
          size: selectedSize,
          extras: selectedExtraItems,
          quantity: 1,
        };

        const existingProductIndex = prevProducts.findIndex(item =>
          item._id === menuItem._id &&
          item.size?._id === selectedSize?._id &&
          JSON.stringify(item.extras) === JSON.stringify(selectedExtraItems)
        );

        let newProducts;
        if (existingProductIndex !== -1) {
          // If the item exists, increase its quantity
          newProducts = prevProducts.map((item, index) =>
            index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
          );
          itemUpdated = true;
        } else {
          // If the item does not exist, add it to the cart
          newProducts = [...prevProducts, newProduct];
        }

        saveCartProductsToLocalStorage(newProducts);
        resolve(itemUpdated);
        return newProducts;
      });

      setIsItemAdded(true);
      setTimeout(() => {
        setIsItemAdded(false);
      }, 1000);
    });
  };



  const removeCartProduct = (indexToRemove) => {
    // console.log("Index to remove:", indexToRemove);

    setCartProducts(prevCartProducts => {

      const newCartProducts = prevCartProducts.filter((value, index) => index !== indexToRemove);

      // console.log("New cart products:", newCartProducts);
      
      saveCartProductsToLocalStorage(newCartProducts);

      return newCartProducts;
    })

  }


  // const updateCartProducts = (productId, newQuantity) => {
  //   setCartProducts(prevProducts => 
  //       prevProducts.map(product => 
  //           product._id === productId ? { ...product, quantity: newQuantity } : product
  //       )
  //   );
  // };




  const generateProductKey = (product) => {

    if (!product || !product._id || !product.size || !product.size._id) {
      console.error('Invalid product:', product);
      return null;
    }

    const extraItemsKey = JSON.stringify((product.extraItems || []).map(extra => extra._id).sort());
    const extrasKey = JSON.stringify((product.extras || []).map(extra => extra._id).sort());
    return `${product._id}-${product.size._id}-${extraItemsKey}-${extrasKey}`;
  };


  const updateCartProducts = (product, newQuantity) => {
    
    const productKey = generateProductKey(product);
    setCartProducts(prevProducts =>
        prevProducts.map(item =>
            generateProductKey(item) === productKey
                ? { ...item, quantity: newQuantity }
                : item
        )
    );
  };



  const cartProductPrice = (cartProduct) => {
    let price = cartProduct.basePrice;

    if(cartProduct.size) {
      price += cartProduct.size.price;
    }

    if(cartProduct.extras?.length > 0) {
      for(const extra of cartProduct.extras) {
        price += extra.price;
      }
    }
    
    if(cartProduct.quantity > 1) {
      price = price * cartProduct.quantity;
    }


    // console.log("price is" , price);
    return price;
  }


  const cartProductsCount = () => {
  
    const totalQuantity = cartProducts.reduce((acc , curr) => {
      return acc + curr.quantity;
    },0);

    return totalQuantity;
    
  }


  const value = {cartProducts ,setCartProducts , isItemAdded, cartProductsCount ,addToCart ,clearCart  ,removeCartProduct ,updateCartProducts , generateProductKey, cartProductPrice ,theme , toggleTheme };



    return (
      <SessionProvider>
        <UserProvider>
          <CartContext.Provider 
            value={value}
          >
            <div className={theme}>
                {children}
            </div>
          </CartContext.Provider>
        </UserProvider>
      </SessionProvider>
    )
}

export default AppProvider
