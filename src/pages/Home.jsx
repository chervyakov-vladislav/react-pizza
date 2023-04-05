import { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Sort from '../components/Sort';
import { Pagination } from '../components/Pagination';
import { useContext } from 'react';
import { SearchContext } from '../App';

const Home = () => {
  const { searchValue } = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrntPage] = useState(1);
  const [activeSort, setActiveSort] = useState({
    name: 'популярности',
    sortProperty: 'rating'
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const url = `https://642985ae5a40b82da4d4b14f.mockapi.io`;
    const search = searchValue ? `&search=${searchValue}` : '';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sort = activeSort.sortProperty;

    fetch(`${url}/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=desc${search}`)
      .then((res) => res.json())
      .then((res) => {
        setPizzas(res);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, activeSort, searchValue, currentPage]);

  const skeletons = [...new Array(4)].map((_, index) => <PizzaSkeleton key={index} />);
  const pizzasContent = pizzas.map((data) => <PizzaBlock key={data.id} {...data} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={setCategoryId} />
        <Sort value={activeSort} onClickSort={setActiveSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletons : pizzasContent}
      </div>
      <Pagination currentPage={currentPage} onChangePage={setCurrntPage} />
    </div>
  )
};

export default Home;
