import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'qs';

import { setFilters } from '../redux/slices/filterSlice'

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Sort, { sortArr } from '../components/Sort';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  const { searchValue } = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const fetchPizzas = () => {
    setIsLoading(true);

    const baseUrl = `https://642985ae5a40b82da4d4b14f.mockapi.io`;
    const search = searchValue ? `&search=${searchValue}` : '';
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    axios
      .get(`${baseUrl}/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=desc${search}`)
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.slice(1));

      const sort = sortArr.find((item) => item.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );

      isSearch.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort, searchValue, currentPage]);

  const skeletons = [...new Array(4)].map((_, index) => <PizzaSkeleton key={index} />);
  const pizzasContent = pizzas.map((data) => <PizzaBlock key={data.id} {...data} />);

  return (
    <div className="container">
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <Pagination />
      <div className="content__items">
        {isLoading ? skeletons : pizzasContent}
      </div>
    </div>
  )
};

export default Home;
