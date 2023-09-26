import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Logo from "../../assets/img/logo-datasoul.png";
// import Cart from "../../assets/img/cart.png";
import "./index.css";

const RecommendedProducts = () => {
  const [products, setProducts] = useState([]);

  const settings = {
    dots: true,
    infinite: false,
    centerMode: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
    ],
  };

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Erro:", error));
  }, []);
  return (
    <section className="section-recommended-products">
      <h1 className="recommended-title">Produtos Recomendados</h1>
      <ul className="products">
        <Slider {...settings}>
          {products.map((product) => (
            <li className="product-card" key={product.id}>
              <Link className="product-link" to={`/produto/${product.id}`}>
                <img className="product-img" src={product.image} />
                <h2 className="product-title">{product.title}</h2>
              </Link>
              <div className="container-prices">
                <span className="product-price-discount">R$ 109,90</span>
                <p className="price"> R${product.price}</p>
              </div>
            </li>
          ))}
        </Slider>
      </ul>
    </section>
  );
};

export default RecommendedProducts;
