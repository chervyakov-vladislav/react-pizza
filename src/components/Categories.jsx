import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
]

function Categories() {
  const categoryId = useSelector((state) => state.filter.categoryId);
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

export default Categories;
