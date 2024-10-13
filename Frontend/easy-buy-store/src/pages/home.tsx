import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div>
      <h1 className="text-8xl font-extrabold py-6">EasyBuy</h1>
      <div className="flex justify-center mt-6 gap-3">
        <Link
          to="/products"
          className="bg-black text-white font-bold text-3xl py-6 px-8 rounded-full hover:bg-gray-800"
        >
          PRODUCTS
        </Link>
        <Link
          to="/products"
          className="bg-black text-white font-bold text-3xl py-6 px-8 rounded-full hover:bg-gray-800"
        >
          CATEGORIES
        </Link>
      </div>
    </div>
  );
};

export default Home;
