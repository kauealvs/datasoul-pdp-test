import React, { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

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

  const remove = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  const changeProductQuantity = (productId, newQuantity) => {
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
        remove,
        changeProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
