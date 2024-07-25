import { useCallback } from 'react';
import { useSearchState, useSearchStateUpdate } from './SearchProvider';

function Header() {
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

  return (
    <div className='flex flex-row justify-center gap-4'>
      <h1 className='uppercase font-extrabold text-4xl text-slate-700'>
        MOVIE<span className='bg-gradient-to-br from-pink-500 to-purple-500 bg-clip-text text-transparent'>SEARCH</span>
      </h1>
      <input className='text-xl flex-grow px-4 py-2 text-slate-500 bg-slate-100 border-slate-200 border-2 rounded-xl focus:outline-none' type='text' placeholder='Search movie titles...' onChange={(e) => debouncedSearch(e.target.value)} maxLength={25} />
      <select onChange={(e) => searchUpdateState({ genreString: e.target.value })} className='min-w-48 focus:outline-none cursor-pointer text-slate-500 px-4 py-2 bg-slate-100 border-2 border-slate-200 rounded-xl'>
        <option value=''>Movie Genre</option>
        {searchState.genresArray.map((genre) => (
          <option key={genre.id} value={genre.title}>
            {genre.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Header;
