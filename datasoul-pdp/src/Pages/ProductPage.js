import React, { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import RecommendedProducts from "../components/RecommendedProducts";
import "./index.css";
import CartIcon from "../assets/img/ShoppingCartSimple.png";
import Stars from "../assets/img/star.svg";

import { CartContext } from "../contexts/Cart";
import Cart from "../components/Cart";

function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [quantity] = useState(1);

  const starRate = (star) => {
    var starInline = <i class="far fa-star"></i>;
    var starSolid = <i class="fas fa-star"></i>;
    if (star == 5 || star >= 4.5) {
      return [starSolid, starSolid, starSolid, starSolid, starSolid];
    }
    if (star >= 4 && star <= 4.5) {
      return [starSolid, starSolid, starSolid, starSolid, starInline];
    }
    if (star == 4 || star >= 3.5) {
      return [starSolid, starSolid, starSolid, starSolid, starInline];
    }
    if (star >= 3 && star <= 3.5) {
      return [starSolid, starSolid, starSolid, starInline, starInline];
    }
    if (star == 3 || star >= 2.5) {
      return [starSolid, starSolid, starSolid, starInline, starInline];
    }
    if (star >= 2 && star <= 2.5) {
      return [starSolid, starSolid, starInline, starInline, starInline];
    }
    if (star == 2 || star >= 1.5) {
      return [starSolid, starSolid, starInline, starInline, starInline];
    }
    if (star >= 1 && star <= 1.5) {
      return [starSolid, starInline, starInline, starInline, starInline];
    }
    if (star <= 1) {
      return [starSolid, starInline, starInline, starInline, starInline];
    } else {
      return "Sem Avaliação";
    }
  };

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        const cartHeader = document?.querySelector(".cart-button");

        cartHeader.addEventListener("click", () => {
          setIsOpen(!isOpen);
        });
        setProduct(response.data);
      })
      .catch((error) => console.error("Erro:", error));
  }, [id]);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      img: product.image,
      title: product.title,
      price: product.price,
      quantity: parseInt(quantity, 10),
    });
    setIsOpen(true);
  };

  const handleCloseMiniCart = () => {
    setIsOpen(false);
  };

  return (
    <div className="product-page">
      <section className="product-section">
        <div className="product-image-section">
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>
        </div>
        <div className="product-info-section">
          <div className="product-details">
            <h2 className="product-title">{product.title}</h2>
            <div className="product-ratings">
              <p>{product?.rating?.rate} de 5</p>
              {starRate(product?.rating?.rate)}
              <p>({Math.round(product?.rating?.rate)})</p>
            </div>
            <div className="product-price-container">
              <span className="product-price-discount">R$ 109,90</span>
              <p className="product-price">R${product.price}</p>
            </div>
          </div>
          <button className="add-to-cart" onClick={handleAddToCart}>
            <span>
              <img src={CartIcon} alt="cart" />
            </span>
            ADICIONAR AO CARRINHO
          </button>
          <hr />
          <div className="product-description">
            <h3 className="main-product-title-description">DESCRIÇÃO</h3>
            <p className="product-description">{product.description}</p>
          </div>
        </div>

        {isOpen && (
          <div className="mini-cart-pop-up">
            <Cart isOpen={isOpen} onClose={handleCloseMiniCart} />
          </div>
        )}
      </section>
      <RecommendedProducts></RecommendedProducts>
    </div>
  );
}

export default ProductPage;
