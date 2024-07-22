/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback, useMemo, memo, useRef } from 'react';
import { Search, Film } from 'lucide-react';
import Pagination from './Pagination';
import Modal from './Modal';

// todo:
// use env file for url, etc.
// use react query
// can only filter on one genre at a time.

const baseUrl = 'https://0kadddxyh3.execute-api.us-east-1.amazonaws.com';

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

function Movies() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchRef = useRef();
  const searchGenre = useRef();
  const perPageRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [authToken, setAuthToken] = useState('');

  const [genresArray, setGenresArray] = useState([]);
  const [moviesArray, setMoviesArray] = useState([]);
  const [moviesCount, setMoviesCount] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);

  const [pageTotal, setPageTotal] = useState(0);
  const [pageCurrent, setPageCurrent] = useState(1);

  const debouncedSearch = useCallback(
    debounce(() => {
      fetchMovies();
    }, 500),
    [authToken]
  );

  const handleSetPage = useCallback((page) => {
    console.log('page: ' + page);
    setPageCurrent(page);
  }, []);

  useEffect(() => {
    const fetchTokenAndGenres = async () => {
      const tokenResponse = await fetch(`${baseUrl}/auth/token`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const tokenJson = await tokenResponse.json();
      setAuthToken(tokenJson.token);
      const genresResponse = await fetch(baseUrl + `/genres/movies`, {
        headers: { Authorization: `Bearer ${tokenJson.token}` },
      });
      const genresJson = await genresResponse.json();
      setGenresArray(genresJson.data);
    };
    fetchTokenAndGenres();
  }, []);

  const fetchMovieDetails = useCallback(async (id) => {
    if (authToken === '') return;
    const movieDetailsResponse = await fetch(baseUrl + `/movies/${id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const moviesDetailResponseJson = await movieDetailsResponse.json();
    setMovieDetails(moviesDetailResponseJson);
    console.log(moviesDetailResponseJson);
    setIsModalOpen(true);
  });

  const fetchMovies = async () => {
    if (searchRef.current.value === '' || authToken === '') return;
    const moviesResponse = await fetch(baseUrl + `/movies?search=${searchRef.current?.value}&page=${pageCurrent}&limit=${perPageRef.current?.value}&genre=${searchGenre.current?.value}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const moviesResponseJson = await moviesResponse.json();
    setMoviesArray(moviesResponseJson.data);
    setPageTotal(moviesResponseJson.totalPages);
    const moviesCount = await fetch(baseUrl + `/movies?search=${searchRef.current?.value}&page=1&limit=1000`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const moviesCountJson = await moviesCount.json();
    setMoviesCount(moviesCountJson.data);
  };

  return (
    <>
      <div className='p-4 max-w-4xl mx-auto gap-2'>
        <div className='flex flex-row gap-2 p-4'>
          <div className='flex-none'>
            <h1 className='text-2xl font-bold'>Movie Search</h1>
          </div>
          <div className='flex-grow'></div>
          <div className='flex-none'>{moviesCount.length} movies found</div>
        </div>
        <div className='flex flex-row gap-2 p-4'>
          <input ref={searchRef} className='flex-grow p-2 border-b-2 border-black' type='text' placeholder='Search for a movie...' onChange={debouncedSearch} maxLength={25} />
          <select ref={searchGenre} onChange={fetchMovies} className='min-w-48'>
            <option value=''>All Genres</option>
            {genresArray.map((genre) => (
              <option key={genre.id} value={genre.title}>
                {genre.title}
              </option>
            ))}
          </select>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {moviesArray.map((movie) => (
            <div key={movie.id} className='cursor-pointer flex flex-col justify-center' onClick={() => fetchMovieDetails(movie.id)}>
              <h3 className='flex justify-center font-bold text-sm'>{movie.title}</h3>
              {movie.rating ? <div className='flex justify-center text-sm'>Rated {movie.rating}</div> : <div className='flex justify-center text-sm'>Not Rated</div>}
              <div className='flex justify-center'>{movie.posterUrl ? <img src={movie.posterUrl} width='100' height='150' alt={`${movie.title} Movie Poster`} /> : <img src='no-poster.webp' width='100' height='150' alt={`${movie.title} Movie Poster (Not Available)`} />}</div>
            </div>
          ))}
        </div>
        <div className='flex align-center gap-2 p-4'>
          <div className='align-bottom my-auto no-wrap'>
            Show{' '}
            <select ref={perPageRef} onChange={fetchMovies}>
              <option value='25'>25</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
              <option value='1000'>All</option>
            </select>{' '}
            Movies
          </div>
          <div className='flex flex-grow justify-end gap-2 text-sm'>{perPageRef.current?.value != 1000 ? <Pagination pageTotal={pageTotal} pageCurrent={pageCurrent} handleSetPage={handleSetPage} /> : ''}</div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={movieDetails.title} poster={movieDetails.posterUrl}>
        <div className='mb-2'>
          {movieDetails.summary}
          <span className='text-slate-400 italic text-xs ml-4'>Running time 1 hour 35 minutes {movieDetails.duration}</span>
        </div>
        <div className=''>
          <span className='font-semibold pr-2'>Published:</span>
          {movieDetails.datePublished}
        </div>
        <div className=''>
          <span className='font-semibold pr-2'>Rating:</span>
          {movieDetails.rating}
        </div>
        <ul className='flex flex-row'>
          <span className='font-semibold pr-2'>Starring:</span>
          {movieDetails.mainActors?.map((o, i) => (
            <li key={i}>
              {o}
              {i < movieDetails.mainActors.length - 1 && <span>,&nbsp;</span>}
            </li>
          ))}
        </ul>
        <ul className='flex flex-row'>
          <span className='font-semibold pr-2'>Writers:</span>
          {movieDetails.writers?.map((o, i) => (
            <li key={i}>
              {o}
              {i < movieDetails.writers.length - 1 && <span>,&nbsp;</span>}
            </li>
          ))}
        </ul>
        <div className=''>
          <span className='font-semibold pr-2'>Rating:</span>
          {movieDetails.ratingValue} use icons here
        </div>
      </Modal>
    </>
  );
}

export default Movies;
