import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import ProductPage from "./Pages/ProductPage";
import { CartProvider } from "./contexts/Cart";
import "./index.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header></Header>
          <Routes>
            <Route exact path="/produto/:id" element={<ProductPage />} />
            <Route path="/" element={<Navigate to="/produto/2" />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
