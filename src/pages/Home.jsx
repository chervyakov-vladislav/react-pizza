import { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Sort from '../components/Sort';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [activeSort, setActiveSort] = useState({ name: 'популярности', sortProperty: 'rating' });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://642985ae5a40b82da4d4b14f.mockapi.io/items?${categoryId === 0
      ? ''
      : 'category=' + categoryId
      }&sortBy=${activeSort.sortProperty}&order=desc`)
      .then((res) => res.json())
      .then((res) => {
        setPizzas(res);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, activeSort]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={setCategoryId} />
        <Sort value={activeSort} onClickSort={setActiveSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading
            ? [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />)
            : pizzas.map((data) => <PizzaBlock key={data.id} {...data} />)
        }
      </div>
    </div>
  )
};

export default Home;