import React, { useEffect } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import axios from "axios";

function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'popularity',
    sortKey: 'rating'
  });
  
  useEffect(() => {
    try {
      setIsLoading(true);
      axios
        .get(
          `https://62e3efe83c89b95396d4450b.mockapi.io/pizzas?${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortType.sortKey}&order=desc`
        )
        .then((response) => {
          const { data } = response;
          setPizzas(data);
          setIsLoading(false);
        });
    } catch (error) {
      alert("Oops, error while loading pizzas ;(");
      alert(error.message);
    }
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);


  return (
    <>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onCategorylClick={(idx) => setCategoryId(idx)}
        />
        <Sort
          sortType={sortType}
          onSortClick={(idx) => setSortType(idx)}
        />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(9)].map((_, idx) => (
              <Skeleton className="pizza-block" key={idx} />
            ))
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </>
  );
}

export default Home;
