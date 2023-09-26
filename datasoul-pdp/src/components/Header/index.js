import { React } from "react";
import Logo from "../../assets/img/logo-datasoul.png";
import Cart from "../../assets/img/cart.png";
import Burguer from "../../assets/img/menu-burger.png";
import "./index.css";

const ProductList = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="list-burguer">
          <a href="">
            <img className="burguer-list" src={Burguer} alt="list" />
          </a>
        </div>

        <div className="logo">
          <a href="/">
            <img src={Logo} alt="logo" />
          </a>
        </div>

        <ul className={`nav-links`}>
          <li>
            <a href="/2">MENU ITEM 01</a>
          </li>
          <li>
            <a href="/">MENU ITEM 02</a>
          </li>
          <li>
            <a href="/">MENU ITEM 03</a>
          </li>
          <li>
            <a href="/">MENU ITEM 04</a>
          </li>
          <li>
            <a href="/">MENU ITEM 05</a>
          </li>
          <li>
            <a href="/">MENU ITEM 06</a>
          </li>
        </ul>
        <button className="cart-button">
          <img src={Cart} />
          Cart
        </button>
      </nav>
    </header>
  );
};

export default ProductList;
