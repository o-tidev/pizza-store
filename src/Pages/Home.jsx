import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import axios from "axios";
import Pagination from "../components/Pagination/Pagination";
import { AppContext } from "../App";

function Home() {
  const categoryId = useSelector(state => state.filterSlice.categoryId)
  console.log(categoryId);
  const setCategoryId = () => {}

  const { searchValue } = React.useContext(AppContext);

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: "popularity",
    sortKey: "rating",
  });

  const skeleton = [...new Array(9)].map((_, idx) => (
    <Skeleton className="pizza-block" key={idx} />
  ));
  const items = pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  useEffect(() => {
    const order = sortType.sortKey.includes("-") ? "desc" : "asc";
    const sortBy = sortType.sortKey.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    try {
      setIsLoading(true);
      axios
        .get(
          `https://62e3efe83c89b95396d4450b.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
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
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onCategorylClick={(idx) => setCategoryId(idx)}
        />
        <Sort sortType={sortType} onSortClick={(idx) => setSortType(idx)} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">{isLoading ? skeleton : items}</div>
      <Pagination onPageChange={(number) => setCurrentPage(number)} />
    </>
  );
}

export default Home;
