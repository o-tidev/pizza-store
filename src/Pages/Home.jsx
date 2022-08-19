import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import qs from "qs";

import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";

import {
  filterSortSelector,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas, pizzaDataSelector } from "../redux/slices/pizzaSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const sortType = useSelector((state) => state.filterSlice.sort.sortKey);
  const currentPage = useSelector((state) => state.filterSlice.currentPage);
  const { searchValue } = useSelector((state) => state.filterSlice);

  const { pizzas, status } = useSelector(pizzaDataSelector);

  const onCategorylClick = (idx) => {
    dispatch(setCategoryId(idx));
  };

  const onPageChange = (num) => {
    dispatch(setCurrentPage(num));
  };

  // const { searchValue } = React.useContext(AppContext);

  // const [pizzas, setPizzas] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(true);

  const skeleton = [...new Array(9)].map((_, idx) => (
    <Skeleton className="pizza-block" key={idx} />
  ));
  const items = pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const getPizzas = async () => {
    const order = sortType.includes("-") ? "desc" : "asc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortKey === params.sortKey);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onCategorylClick={onCategorylClick}
        />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>We caught and error 🥺</h2> <br />{" "}
          <span>Please, try again later, we couldn't load pitszzaz ;( </span>{" "}
          <br />
          <span>No nom nom nom today</span>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeleton : items}
        </div>
      )}

      <Pagination currentPage={currentPage} onPageChange={onPageChange} />
    </>
  );
}

export default Home;
