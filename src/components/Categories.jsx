const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
]

function Categories({ value, onClickCategory }) {
  return (
    <div className="categories">
      <ul>
        {
          categories.map((categoryName, categoryIndex) => {
            return <li
              key={categoryIndex}
              onClick={() => onClickCategory(categoryIndex)}
              className={value === categoryIndex ? 'active' : ''}
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
