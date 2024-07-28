import { useCallback } from 'react';
import { useSearchState, useSearchStateUpdate } from '../ContextProvider';

function InputSearch() {
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

  return <input className='flex-grow px-4 py-2 text-slate-500 bg-slate-100 border-slate-200 border-2 rounded-xl focus:outline-none' type='text' placeholder='Search movie titles...' onChange={(e) => debouncedSearch(e.target.value)} maxLength={25} />;
}
export default InputSearch;
