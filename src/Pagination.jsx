/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useCallback } from 'react';

function Pagination(props) {
  const pageLinks = [];
  for (let i = 1; i <= props.pageTotal; i++) {
    if (i === props.pageCurrent) {
      pageLinks.push(
        <li key={i} className='flex items-center rounded-lg border-black border-2'>
          <a href='#' className='font-bold p-2' title={`Show Page ${i}`}>
            {i}
          </a>
        </li>
      );
    } else if (i >= props.pageCurrent - 3 && i <= props.pageCurrent + 3) {
      pageLinks.push(
        <li key={i} className='flex items-center rounded-lg border-black border-2'>
          <a href='#' onClick={() => props.handleSetPage(i)} className='p-2' title={`Show Page ${i}`}>
            {i}
          </a>
        </li>
      );
    }
  }
  if (props.pageCurrent + 4 <= props.pageTotal) {
    pageLinks.push(
      <li key='x' className='text-slate-400'>
        ...
      </li>
    );
  }
  if (props.pageCurrent - 4 >= 1) {
    pageLinks.unshift(
      <li key='y' className='text-slate-400'>
        ...
      </li>
    );
  }

  const handleSetPage = useCallback((page) => {
    return props.handleSetPage(page);
  });

  return (
    <>
      <ul className='flex flex-row list-none gap-2'>
        {props.pageCurrent > 1 ? (
          <li className='flex items-center rounded-lg border-2 border-black'>
            <a href='#' onClick={() => handleSetPage(props.pageCurrent - 1)} className='p-2' title='Show Previous Page'>
              Prev
            </a>
          </li>
        ) : (
          <li className='flex items-center rounded-lg border-2 border-slate-400'>
            <a href='#' className='text-slate-400 p-2' title='Show Previous Page'>
              Prev
            </a>
          </li>
        )}
        {pageLinks.map((link) => link)}
        {props.pageCurrent < props.pageTotal ? (
          <li className='flex items-center rounded-lg border-2 border-black'>
            <a href='#' onClick={() => handleSetPage(props.pageCurrent + 1)} className='p-2' title='Show Next Page'>
              Next
            </a>
          </li>
        ) : (
          <li className='flex items-center rounded-lg border-2 border-slate-400'>
            <a href='#' className='text-slate-400 p-2' title='Show Next Page'>
              Next
            </a>
          </li>
        )}
      </ul>
    </>
  );
}

export default Pagination;
