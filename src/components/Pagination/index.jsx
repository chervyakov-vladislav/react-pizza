import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setCurrentPage } from '../../redux/slices/filterSlice';

import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

// мокапи не умеет возвращать общее количество страниц, захарркожен pageCount
const HARDCODE_PAGECOUNT = 3;

// не написано решение для количества айтемов на одной странице под разные разрешения
const HARDCODE_ITEMS_PER_PAGE = 4;

export const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector(selectFilter);

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => dispatch(setCurrentPage({ currentPage: event.selected + 1 }))}
      pageRangeDisplayed={HARDCODE_ITEMS_PER_PAGE}
      pageCount={HARDCODE_PAGECOUNT}
      forcePage={currentPage - 1}
    />
  );
};
