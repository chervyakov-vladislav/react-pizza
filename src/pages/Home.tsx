import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { useSelector } from 'react-redux';
import { FilterSliceState, selectFilter, setFilters } from '../redux/slices/filterSlice'
import { fetchPizzas, selectPizza } from '../redux/slices/pizzasSlice';
import { useAppDispatch } from '../redux/store';

import { Categories } from '../components/Categories';
import { PizzaBlock } from '../components/PizzaBlock';
import { PizzaSkeleton } from '../components/PizzaBlock/PizzaSkeleton';
import { Sort, sortArr } from '../components/Sort';
import { Pagination } from '../components/Pagination';
import { LoadingStatus, PizzaBlockInteface } from '../@types/types';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { pizzas, status } = useSelector(selectPizza);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.slice(1));

      const sort = sortArr.find((item) => item.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        } as FilterSliceState)
      );

      isSearch.current = true;
    }
  }, [dispatch]);

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
  }, [categoryId, sort, currentPage, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const getPizzas = () => {
      const search = searchValue ? `&search=${searchValue}` : '';
      const category = categoryId > 0 ? `category=${categoryId}` : '';

      dispatch(
        fetchPizzas({
          currentPage: String(currentPage),
          category,
          sort: sort.sortProperty,
          search,
        })
      );
    };

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage, dispatch]);

  const skeletons = [...new Array(4)].map((_, index) => <PizzaSkeleton key={index} />);
  const pizzasContent = pizzas.map((data: PizzaBlockInteface) => <PizzaBlock key={data.id} {...data} />);

  return (
    <div className="container">
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <Pagination />

      {status === LoadingStatus.ERROR ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === LoadingStatus.LOADING ? skeletons : pizzasContent}
        </div>
      )
      }
    </div>
  )
};
