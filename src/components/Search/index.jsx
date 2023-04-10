import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setSearchValue } from '../../redux/slices/filterSlice';


const Search = () => {
  const dispatch = useDispatch();
  const { searchValue } = useSelector(selectFilter);
  const [localValue, setLocalValue] = useState('');
  const inputRef = useRef();

  const onClear = () => {
    dispatch(setSearchValue({ searchValue: '' }));
    setLocalValue('');
    inputRef.current.focus();
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue({ searchValue: str }));
    }, 1000)
    , []);

  const onChange = (e) => {
    setLocalValue(e.target.value);
    updateSearchValue(e.target.value);
  }

  return (
    <label className={styles.label}>
      <svg className={styles.icon}
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" x2="16.65" y1="21" y2="16.65" />
      </svg>
      <input
        ref={inputRef}
        value={localValue}
        onChange={onChange}
        className={styles.input}
        type="text"
        placeholder="Поиск пиццы..."
      />
      {searchValue && (
        <svg
          onClick={onClear}
          className={styles.close}
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  
        c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9 
        c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/>
        </svg>
      )}
    </label>

  )
};

export default Search;
