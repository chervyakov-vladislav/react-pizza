import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filter/slice';
import { selectFilter } from '../redux/slices/filter/selectors';

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
]

export const Categories: React.FC = React.memo(() => {
  const { categoryId } = useSelector(selectFilter);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {
          categories.map((categoryName, categoryIndex) => {
            return <li
              key={categoryIndex}
              onClick={() => dispatch(setCategoryId({ categoryId: categoryIndex }))}
              className={categoryId === categoryIndex ? 'active' : ''}
            >
              {categoryName}
            </li>
          })
        }
      </ul>
    </div>
  );
});
