import { useSearchState, useSearchStateUpdate } from './SearchProvider';

function Pagination() {
  let searchState = useSearchState();
  let searchUpdateState = useSearchStateUpdate();
  let pageLinks = [];

  for (let i = 1; i <= searchState.pageCount; i++) {
    if (i == searchState.pageNow) {
      pageLinks.push(
        <li key={i} className='flex items-center rounded-xl border-black border-2'>
          <a href='#' className='font-bold p-2 focus:outline-none' title={`Show Page ${i}`}>
            {i}
          </a>
        </li>
      );
    } else if (i >= searchState.pageNow - 3 && i <= searchState.pageNow + 3) {
      pageLinks.push(
        <li key={i} className='flex items-center rounded-xl border-black border-2' onClick={() => searchUpdateState({ pageNow: i })}>
          <a href='#' className='p-2 focus:outline-none' title={`Show Page ${i}`}>
            {i}
          </a>
        </li>
      );
    }
  }

  if (searchState.pageNow + 3 <= searchState.pageCount) {
    pageLinks.push(
      <li key='123' className='text-black font-bold focus:outline-none flex items-center'>
        ...
      </li>
    );
  }

  if (searchState.pageNow - 3 >= 1) {
    pageLinks.unshift(
      <li key='321' className='text-black font-bold focus:outline-none flex items-center'>
        ...
      </li>
    );
  }

  return (
    <>
      <ul className='flex flex-row list-none gap-2'>
        {searchState.pageNow > 1 ? (
          <li className='flex items-center rounded-xl border-2 border-black' onClick={() => searchUpdateState({ pageNow: searchState.pageNow - 1 })}>
            <a href='#' className='p-2 focus:outline-none' title='Show Previous Page'>
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
        {searchState.pageNow < searchState.pageCount ? (
          <li className='flex items-center rounded-xl border-2 border-black' onClick={() => searchUpdateState({ pageNow: searchState.pageNow + 1 })}>
            <a href='#' className='p-2 focus:outline-none' title='Show Next Page'>
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
