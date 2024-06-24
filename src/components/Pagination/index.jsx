import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './pagination.module.scss';

const Pagination = ({ currenPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
      forcePage={currenPage}
    />
  );
};

export default Pagination;
