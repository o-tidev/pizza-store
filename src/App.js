import "./scss/app.scss";
import React from "react";

import Header from "./components/Header";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import FullPizza from "./Pages/FullPizza";
import Cart from "./Pages/Cart";

import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (

      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  );
}

export default App;
