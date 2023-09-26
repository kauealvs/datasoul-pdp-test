import React, { createContext, useState } from "react";

const CartItemType = {
  id: 0,
  title: "",
  price: 0,
  image: "",
  quantity: 0,
};

// const CartAction = {
//   ADD_TO_CART: "ADD_TO_CART",
//   REMOVE_FROM_CART: "REMOVE_FROM_CART",
//   UPDATE_QUANTITY: "UPDATE_QUANTITY",
//   TOGGLE_MINI_CART: "TOGGLE_MINI_CART",
// };

const CartContext = createContext(undefined);

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleMiniCart = () => {
    setIsMiniCartOpen(!isMiniCartOpen);
  };

  const addToCart = (item) => {
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingItemIndex].quantity += 1;
        return updatedCartItems;
      }
      return [...prevCartItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleCart,
        toggleMiniCart,
        isCartOpen,
        isMiniCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
