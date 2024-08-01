import { useCallback } from 'react';
import { useSearchState, useSearchStateUpdate } from './context/Provider';

function Search() {
  let searchState = useSearchState();
  let searchUpdateState = useSearchStateUpdate();

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const debouncedSearch = useCallback(
    debounce((input) => {
      searchUpdateState({ searchString: input });
    }, 500),
    [searchState.authToken]
  );

  return <input onChange={(e) => debouncedSearch(e.target.value)} placeholder='Search movie titles...' maxLength={25} className='input input-bordered flex-grow' />;
}
export default Search;
