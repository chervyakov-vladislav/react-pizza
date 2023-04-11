import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setCategoryId } from '../redux/slices/filterSlice';

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
]

export const Categories: React.FC = () => {
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
}
