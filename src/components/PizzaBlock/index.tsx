import React from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { addProduct } from '../../redux/slices/cart/slice';
import { selectCartById } from '../../redux/slices/cart/selectors';

import { PizzaBlockInteface } from '../../@types/types';

export const pastryType = ['тонкое', 'традиционное'];

export const PizzaBlock: React.FC<PizzaBlockInteface> = (props) => {
  const dispatch = useDispatch();
  const item = useSelector(selectCartById(props.id));
  const [activePastry, setPastryType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const onClickAdd = () => {
    const product = {
      ...props,
      size: props.sizes[activeSize],
      type: pastryType[activePastry],
    };

    dispatch(addProduct({ product }))
  }

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link key={props.id} to={`/pizza/${props.id}`}>
          <img className="pizza-block__image"
            src={props.imageUrl}
            alt={props.title} />
          <h4 className="pizza-block__title">{props.title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {
              props.types.map((type, index) =>
                <li key={type} onClick={() => setPastryType(index)} className={index === activePastry ? 'active' : ''}>
                  {pastryType[type]}
                </li>
              )
            }
          </ul>
          <ul>
            {
              props.sizes.map((size, index) =>
                <li key={size} onClick={() => setActiveSize(index)} className={index === activeSize ? 'active' : ''}>
                  {size} см.
                </li>
              )
            }
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {props.price} ₽</div>
          <button onClick={onClickAdd} className="button button--outline button--add">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white" />
            </svg>
            <span>Добавить</span>
            {item?.count && <i>{item.count}</i>}
          </button>
        </div>
      </div>
    </div>
  )
};
