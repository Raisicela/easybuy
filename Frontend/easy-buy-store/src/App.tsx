import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import "./App.css";
import Categories from "./pages/categories";
import { ROUTES } from "./config/enums";
import Products from "./pages/products";
import { Navbar } from "./components/nabvar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Navbar />
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.PRODUCTS} element={<Products />} />
            <Route path={ROUTES.CATEGORIES} element={<Categories />} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
