import { useState, useCallback } from 'react';
import { getMovies } from './api/movies';
import { useApiGet } from './hooks/useApi';
import { keepPreviousData } from '@tanstack/react-query';
import Details from './Details';
import Genre from './components/Genre';
import Theme from './components/Theme';
import Logout from './components/Logout';
import Loading from './components/Loading';
import Blob from './components/Blob';

function Movies() {
  const [pageNow, setPageNow] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [searchString, setSearchString] = useState('');
  const [searchGenre, setSearchGenre] = useState('');
  const [movieId, setMovieId] = useState('');

  const changePageSize = (e) => {
    e.preventDefault();
    setPageNow(1);
    setPageSize(e.target.value);
  };

  const changePageNow = (page) => {
    setPageNow(page);
  };

  const changeSearchGenre = (e) => {
    e.preventDefault();
    setSearchGenre(e.target.value);
  };

  const showMovieDetails = async (id) => {
    await setMovieId(id);
    document.getElementById('movie-details').checked = true;
  };

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const debouncedSearch = useCallback(
    debounce((e) => {
      setSearchString(e.target.value);
    }, 500),
    []
  );

  const movies = useApiGet(['movies', { pageNow, pageSize, searchString, searchGenre }], () => getMovies({ pageNow, pageSize, searchString, searchGenre }), {
    enabled: true,
    refetchOnWindowFocus: false,
    retry: 0,
    placeholderData: keepPreviousData,
  });

  let pageLinks = [];
  if (movies.isSuccess) {
    for (let i = 1; i <= movies.data.totalPages; i++) {
      if (i == pageNow) {
        pageLinks.push(<input key={i} className='join-item btn btn-square' type='radio' name='options' aria-label={i} defaultChecked />);
      } else {
        pageLinks.push(<input key={i} className='join-item btn btn-square' type='radio' name='options' aria-label={i} onClick={() => changePageNow(i)} />);
      }
    }
  }

  if (movies.isLoading) return <Loading />;

  return (
    <>
      <Blob />
      <div className='w-full mx-auto gap-4 p-4'>
        <header className='flex flex-row justify-center items-center gap-4 pb-2'>
          <h1 className='max-w-fit uppercase font-extrabold text-5xl bg-gradient-to-l from-[#6359f8] via-[#9c32e2] via-[#ff0b0b] via-[#ff6d00] to-[#ffb700] text-transparent bg-clip-text'>MOVIES</h1>
          <span className='flex-grow relative'>
            <input onChange={(e) => debouncedSearch(e)} placeholder='Search movie titles...' maxLength={25} className='input input-bordered w-full' />
            <div className='absolute inset-x-5 badge badge-neutral hidden'>{movies.data.data.length * movies.data.totalPages} Movies</div>
          </span>
          <Genre onChange={(e) => changeSearchGenre(e)} value={searchGenre} />
          <Theme />
          <Logout />
        </header>
        <div className='flex gap-4 mt-4 overflow-x-auto no-scrollbar'>
          {movies.data
            ? movies.data.data.map((movie) => (
                <div key={movie.id} className='card glass min-w-56 min-h-96' onClick={() => showMovieDetails(movie.id)}>
                  <div className=''>
                    <div className='poster-overlay'></div>
                    <img src={movie.posterUrl ? movie.posterUrl : './no-poster.webp'} className='poster' alt={movie.title} />
                  </div>
                  <div className='card-title text-sm font-bold p-4 z-10 bottom-0 h-full items-end'>{movie.title}</div>
                </div>
              ))
            : undefined}
        </div>
        <div className='flex items-center justify-between align-center gap-2 p-4 text-sm'>
          <div className=''>
            Show
            <select onChange={(e) => changePageSize(e)} value={pageSize} className='select select-bordered max-w-xs mx-2'>
              <option value='25'>25</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
              <option value='1000'>1000</option>
            </select>
            Per Page
          </div>
          <div className=''>{pageSize != 1000 ? <div className='join'>{pageLinks.map((link) => link)}</div> : ''}</div>
        </div>
        <div className='w-full p-10 text-sm flex flex-col justify-center items-center'>
          <p>For demostration purposes only.</p>
          <p>
            <a href='https://github.com/chearner/thisdot-movie-search' target='_blank' className='mx-2'>
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
              </svg>
            </a>
          </p>
        </div>
      </div>
      {movieId !== '' ? (
        <>
          <input type='checkbox' className='modal-toggle' id='movie-details' />
          <Details movieId={movieId} />
        </>
      ) : undefined}
    </>
  );
}

export default Movies;
