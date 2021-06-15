import classes from './Pagination.module.css';
import React from 'react';

const Pagination = ({ totalUsersCount, pageSize, currentPage, onPageChanged }) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.map(page => {
        return <span className={currentPage === page && classes.selectedPage} onClick={() => onPageChanged(page)}>{page}</span>
      })}
    </div>
  )
}


export default Pagination;