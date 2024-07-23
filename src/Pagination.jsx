/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
//import { useCallback } from 'react';

function Pagination(props) {
  const pageLinks = [];

  for (let i = 1; i <= props.pageTotal; i++) {
    if (i === props.pageNow) {
      pageLinks.push(
        <li key={i} className='flex items-center rounded-xl border-black border-2'>
          <a href='#' className='font-bold p-2 focus:outline-none' title={`Show Page ${i}`}>
            {i}
          </a>
        </li>
      );
    } else if (i >= props.pageNow - 3 && i <= props.pageNow + 3) {
      pageLinks.push(
        <li key={i} className='flex items-center rounded-xl border-black border-2'>
          <a href='#' onClick={() => props.fetchMovies(i)} className='p-2 focus:outline-none' title={`Show Page ${i}`}>
            {i}
          </a>
        </li>
      );
    }
  }

  if (props.pageNow + 4 <= props.pageTotal) {
    pageLinks.push(
      <li key='x' className='text-slate-400 focus:outline-none'>
        ...
      </li>
    );
  }

  if (props.pageNow - 4 >= 1) {
    pageLinks.unshift(
      <li key='y' className='text-slate-400 focus:outline-none'>
        ...
      </li>
    );
  }

  return (
    <>
      <ul className='flex flex-row list-none gap-2'>
        {props.pageNow > 1 ? (
          <li className='flex items-center rounded-xl border-2 border-black'>
            <a href='#' onClick={() => props.fetchMovies(props.pageNow - 1)} className='p-2 focus:outline-none' title='Show Previous Page'>
              Prev
            </a>
          </li>
        ) : (
          <li className='flex items-center rounded-xl border-2 border-slate-400'>
            <a href='#' className='text-slate-400 p-2 focus:outline-none' title='Show Previous Page'>
              Prev
            </a>
          </li>
        )}
        {pageLinks.map((link) => link)}
        {props.pageNow < props.pageTotal ? (
          <li className='flex items-center rounded-xl border-2 border-black'>
            <a href='#' onClick={() => props.fetchMovies(props.pageNow + 1)} className='p-2 focus:outline-none' title='Show Next Page'>
              Next
            </a>
          </li>
        ) : (
          <li className='flex items-center rounded-xl border-2 border-slate-400'>
            <a href='#' className='text-slate-400 p-2 focus:outline-none' title='Show Next Page'>
              Next
            </a>
          </li>
        )}
      </ul>
    </>
  );
}

export default Pagination;
