import { useState, useCallback } from 'react';
import { getMovies } from './api/movies';
import { useApiGet } from './hooks/useApi';
import { keepPreviousData } from '@tanstack/react-query';
import Details from './Details';
import Genre from './components/Genre';
import Theme from './components/Theme';
import Logout from './components/Logout';
import Loading from './components/Loading';

function Movies() {
  const [pageNow, setPageNow] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [searchString, setSearchString] = useState('');
  const [searchGenre, setSearchGenre] = useState('');
  const [movieId, setMovieId] = useState('');

  const changePageSize = async (e) => {
    e.preventDefault();
    setPageNow(1);
    setPageSize(e.target.value);
  };

  const changePageNow = async (e, page) => {
    e.preventDefault();
    setPageNow(page);
  };

  const changeSearchGenre = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setSearchGenre(e.target.value);
  };

  const showMovieDetails = (id) => {
    console.log(id);
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
  for (let i = 1; i <= movies.totalPages; i++) {
    if (i == pageNow) {
      pageLinks.push(<input key={i} className='join-item btn btn-square' type='radio' name='options' aria-label={i} defaultChecked />);
    } else {
      pageLinks.push(<input key={i} className='join-item btn btn-square' type='radio' name='options' aria-label={i} onClick={() => changePageNow(i)} />);
    }
  }

  if (movies.isSuccess) {
    console.log(movies.data);
  }

  if (movies.isLoading) return <Loading />;

  return (
    <>
      <div className='w-full mx-auto gap-4 p-4'>
        <header className='flex flex-row justify-center items-center gap-4 pb-2'>
          <h1 className='max-w-fit uppercase font-extrabold text-5xl bg-gradient-to-l from-[#6359f8] via-[#9c32e2] via-[#ff0b0b] via-[#ff6d00] to-[#ffb700] text-transparent bg-clip-text'>MOVIES</h1>
          <input onChange={(e) => debouncedSearch(e)} placeholder='Search movie titles...' maxLength={25} className='input input-bordered flex-grow' />
          <Genre onChange={(e) => changeSearchGenre(e)} value={searchGenre} />
          <Theme />
          <Logout />
        </header>
        <div className='flex gap-4 mt-4 overflow-x-auto no-scrollbar'>
          {movies.data
            ? movies.data.data.map((movie) => (
                <div key={movie.id} className='card glass min-w-56 min-h-96' onClick={() => setMovieId(movie.id)}>
                  <div style={movie.posterUrl?.length ? { '--image-url': `url(${movie.posterUrl})` } : { '--image-url': `url(no-poster.webp)` }} className='card-body bg-[image:var(--image-url)] flex justify-between rounded-xl bg-cover bg-no-repeat'></div>
                  <div className='card-title text-sm font-bold p-4'>{movie.title}</div>
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
          <div className='badge badge-primary'>{movies.data.data.length} Movies</div>
          <div className=''>{pageSize != 1000 ? <div className='join'>{pageLinks.map((link) => link)}</div> : ''}</div>
        </div>
      </div>
      {movieId !== '' ? <Details movieId={movieId} /> : undefined}
    </>
  );
}

export default Movies;
