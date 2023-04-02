import { useState } from 'react';

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
]

function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClickCategory = (index) => { setActiveIndex(index) }

  return (
    <div className="categories">
      <ul>
        {
          categories.map((category, categoryIndex) => {
            return <li
              key={categoryIndex}
              onClick={() => handleClickCategory(categoryIndex)}
              className={activeIndex === categoryIndex ? 'active' : ''}
            >
              {category}
            </li>
          })
        }
      </ul>
    </div>
  );
}

export default Categories;
