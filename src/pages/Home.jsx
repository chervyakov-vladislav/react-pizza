import { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Sort from '../components/Sort';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://642985ae5a40b82da4d4b14f.mockapi.io/items')
      .then((res) => res.json())
      .then((res) => {
        setPizzas(res);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
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