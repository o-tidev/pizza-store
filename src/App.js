import "./scss/app.scss";
import React, { useEffect } from "react";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import Skeleton from "./components/PizzaBlock/Skeleton"
import axios from "axios";

function App() {
  const [pizzas, setPizzas] = React.useState([]);

  useEffect(() => {
    axios.get(`https://62e3efe83c89b95396d4450b.mockapi.io/pizzas`)
      .then((response) => {
        const { data } = response;
        setPizzas(data);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">All pizzas</h2>
          <div className="content__items">
            {pizzas.map((pizza) => (
              <PizzaBlock key={pizza.id} {...pizza} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
