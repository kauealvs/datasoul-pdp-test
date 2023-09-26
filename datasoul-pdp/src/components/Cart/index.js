import React, { useContext } from "react";

import { CartContext } from "../../contexts/Cart";

import CloseIcon from "../../assets/img/close-icon.png";
import RemoveIcon from "../../assets/img/remove-icon.png";
import ArrowUp from "../../assets/img/arrow-up.png";
import ArrowDown from "../../assets/img/arrow-down.png";

import "./index.css";

function Cart({ isOpen, onClose }) {
  const { cartItems, changeProductQuantity, remove } = useContext(CartContext);

  const handleQuantityChange = (productId, newQuantity) => {
    changeProductQuantity(productId, newQuantity);
  };

  const handleDecreaseQuantity = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      handleQuantityChange(productId, currentQuantity - 1);
    } else {
      handleRemoveFromCart(productId);
    }
  };

  const handleRemoveFromCart = (productId) => {
    if (cartItems.length === 1) {
      remove(productId);
    }
    remove(productId);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) =>
        Math.round((total + item.price * item.quantity) * 100) / 100,
      0
    );
  };

  return (
    <div>
      {isOpen && (
        <div className="minicart">
          <div className="minicart-content">
            <button className="close-button" onClick={onClose}>
              <img src={CloseIcon} alt="close" />
            </button>
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <p>Seu carrinho está vazio</p>
                <a href="/" className="button-continue-empty">
                  CONTINUAR COMPRANDO
                </a>
              </div>
            ) : (
              <>
                <h2>Meu Carrinho</h2>
                <ul>
                  {cartItems.map((item) => (
                    <>
                      <li className="card-product" key={item.id}>
                        <div>
                          <button
                            className="remove-button"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            <img src={RemoveIcon} alt="close" />
                          </button>
                        </div>
                        <img src={item.img} alt={item.title} />
                        <div className="info-product-cart">
                          <h3>{item.title}</h3>

                          <div className="product-price-container">
                            <span className="product-price-discount">
                              R$ 109,90
                            </span>
                            <p>
                              {item.price.toLocaleString("BRL", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="quantity-container">
                          <span className="quantity">
                            {item.quantity}
                            qtd
                          </span>
                          <div className="qtd-icons">
                            <button
                              className="button-quantity"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                            >
                              <img src={ArrowUp} alt="plus" />
                            </button>
                            <button
                              className="button-quantity"
                              onClick={() =>
                                handleDecreaseQuantity(item.id, item.quantity)
                              }
                            >
                              <img src={ArrowDown} alt="minus" />
                            </button>
                          </div>
                        </div>
                      </li>
                    </>
                  ))}
                </ul>
              </>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="minicart-bottom">
              <hr className="firts-line" />
              <div className="price-total-container">
                <p className="price-total">TOTAL </p>
                <p className="price-total">
                  {calculateTotal().toLocaleString("BRL", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
              <hr className="second-line" />
              <a href="/" className="button-finish">
                FINALIZAR COMPRA
              </a>
              <a href="/" className="button-continue">
                CONTINUAR COMPRANDO
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default Cart;
