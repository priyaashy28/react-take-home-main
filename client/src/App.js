import "./App.css";

import { Route, Routes } from "react-router-dom";

import { AddProduct } from "./components/addProduct";
import { ProductDetails } from "./components/productDetails";
import { ProductsList } from "./components/productsList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductsList />}></Route>
        <Route path="/api/products/:id" element={<ProductDetails />}></Route>
        <Route path="/api/products" element={<AddProduct />}></Route>
      </Routes>
    </>
  );
}

export default App;
