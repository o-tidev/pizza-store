import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import qs from "qs";
import axios from "axios";

import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import { AppContext } from "../App";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const sortType = useSelector((state) => state.filterSlice.sort.sortKey);
  const currentPage = useSelector((state) => state.filterSlice.currentPage);

  const onCategorylClick = (idx) => {
    dispatch(setCategoryId(idx));
  };

  const onPageChange = (num) => {
    dispatch(setCurrentPage(num));
  };

  const { searchValue } = React.useContext(AppContext);

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const skeleton = [...new Array(9)].map((_, idx) => (
    <Skeleton className="pizza-block" key={idx} />
  ));
  const items = pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const fetchPizzas = () => {
    const order = sortType.includes("-") ? "desc" : "asc";
    const sortBy = sortType.replace("-", "");
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
      fetchPizzas();
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
      <div className="content__items">{isLoading ? skeleton : items}</div>
      <Pagination currentPage={currentPage} onPageChange={onPageChange} />
    </>
  );
}

export default Home;
