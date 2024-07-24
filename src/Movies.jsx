/* eslint-disable no-undef */
import { useState, useEffect, useCallback, Suspense } from 'react';
import Pagination from './Pagination';
import Modal from './Modal';
import Loading from './Loading';
import NoPoster from './assets/NoPoster';
import { Clapperboard } from 'lucide-react';
import { format } from 'date-fns';
import { useSearchState, useSearchStateUpdate } from './SearchProvider';

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
  let searchState = useSearchState();
  let searchUpdateState = useSearchStateUpdate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useCallback(
    debounce((input) => {
      searchUpdateState({ searchString: input });
    }, 500),
    [searchState.authToken]
  );

  // this get auth token and genre typs on page load
  useEffect(() => {
    const fetchTokenAndGenres = async () => {
      const tokenResponse = await fetch(`${searchState.baseUrl}/auth/token`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const tokenJson = await tokenResponse.json();
      searchUpdateState({ authToken: tokenJson.token });
      const genresResponse = await fetch(`${searchState.baseUrl}/genres/movies`, {
        headers: { Authorization: `Bearer ${tokenJson.token}` },
      });
      const genresJson = await genresResponse.json();
      searchUpdateState({ genresArray: genresJson.data });
      console.log(genresJson);
    };
    fetchTokenAndGenres();
  }, []);

  // this gets movie details on click
  const fetchMovieDetails = useCallback(
    async (id) => {
      if (searchState.authToken === '') return;
      const movieDetailsResponse = await fetch(searchState.baseUrl + `/movies/${id}`, {
        headers: { Authorization: `Bearer ${searchState.authToken}` },
      });
      const moviesDetailResponseJson = await movieDetailsResponse.json();
      searchUpdateState({ detailsArray: moviesDetailResponseJson });
      setIsModalOpen(true);
    },
    [searchState.authToken]
  );

  useEffect(() => {
    fetchMovies();
  }, [searchState.searchString, searchState.genreString, searchState.pageNow]);

  useEffect(() => {
    searchUpdateState({ pageNow: 1 });
    fetchMovies();
  }, [searchState.pageSize]);

  // this get movies on input change, genre change, pagination click or results per page change
  const fetchMovies = useCallback(async () => {
    // no auth token return
    if (searchState.authToken === '') return;
    // search min 2 chars, API search will not work so reset
    if (searchState.searchString?.length <= 2) {
      searchUpdateState({ moviesArray: [], pageNow: 1, pageCount: 0, movieCount: 0 });
    } else {
      const moviesResponse = await fetch(searchState.baseUrl + `/movies?search=${searchState.searchString}&page=${searchState.pageNow}&limit=${searchState.pageSize}&genre=${searchState.genreString}`, {
        headers: { Authorization: `Bearer ${searchState.authToken}` },
      });
      const moviesResponseJson = await moviesResponse.json();
      const moviesCount = await fetch(searchState.baseUrl + `/movies?search=${searchState.searchString}&page=1&limit=1000&genre=${searchState.genreString}`, {
        headers: { Authorization: `Bearer ${searchState.authToken}` },
      });
      const moviesCountJson = await moviesCount.json();
      searchUpdateState({ moviesArray: moviesResponseJson.data, pageCount: moviesResponseJson.totalPages, movieCount: moviesCountJson.data.length });
    }
  }, [searchState.searchString, searchState.genreString, searchState.pageNow, searchState.pageSize]);

  return (
    <>
      <div className='max-w-5xl mx-auto gap-2'>
        <div className='flex flex-row gap-2 p-4'>
          <div className='flex flex-row items-center'>
            <Clapperboard />
            <h1 className='text-2xl font-bold ml-2'>Movie Search</h1>
          </div>
          <div className='flex-grow'></div>
          <div className='flex-none'>{searchState.movieCount > 0 ? `${searchState.movieCount} movies found` : ``}</div>
        </div>
        <div className='flex flex-row gap-2 p-4'>
          <input className='text-xl font-bold flex-grow p-2 border-b-2 border-black focus:outline-none' type='text' placeholder='Search movie titles...' onChange={(e) => debouncedSearch(e.target.value)} maxLength={25} />
          <select onChange={(e) => searchUpdateState({ genreString: e.target.value })} className='min-w-48 focus:outline-none cursor-pointer border-b-2 border-black'>
            <option value=''>All Genres</option>
            {searchState.genresArray.map((genre) => (
              <option key={genre.id} value={genre.title}>
                {genre.title}
              </option>
            ))}
          </select>
        </div>
        <Suspense fallback={<Loading />}>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 '>
            {searchState.moviesArray.map((movie) => (
              <div key={movie.id} className='cursor-pointer flex flex-col justify-between border-2 rounded-xl p-2 border-black hover:animate-rainbow-shadow shadow-md shadow-black/30' onClick={() => fetchMovieDetails(movie.id)}>
                <h3 className='text-pretty font-bold h-18 px-2'>{movie.title}</h3>
                <div className='flex justify-center m-h-[150px]'>{movie.posterUrl ? <img src={movie.posterUrl} width='100' height='150' alt={`${movie.title} Movie Poster`} /> : <NoPoster title={movie.title} />}</div>
              </div>
            ))}
          </div>
        </Suspense>
        <div className='flex align-center gap-2 p-4'>
          <div className='align-bottom my-auto no-wrap'>
            Show{' '}
            <select onChange={(e) => searchUpdateState({ pageSize: e.target.value })} className='focus:outline-none font-bold'>
              <option value='25'>25</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
              <option value='1000'>1000</option>
            </select>{' '}
            Per Page
          </div>
          <div className='flex flex-grow justify-end items-center gap-2 text-sm'>{searchState.pageSize != 1000 ? <Pagination /> : ''}</div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={searchState.detailsArray.title} poster={searchState.detailsArray.posterUrl} rating={searchState.detailsArray.rating}>
        <div className='mb-2 text-xl'>{searchState.detailsArray.summary}</div>
        <div className='mb-2'>
          <span className='font-semibold pr-2'>Published:</span>
          {searchState.detailsArray.datePublished ? format(searchState.detailsArray.datePublished, 'MMMM dd, yyyy') : undefined}
        </div>
        <div className='mb-2 flex flex-row'>
          <span className='font-semibold pr-2'>Starring:</span>
          {searchState.detailsArray.mainActors?.map((o, i) => (
            <>
              {o}
              {i < searchState.detailsArray.mainActors.length - 1 && <>,&nbsp;</>}
            </>
          ))}
        </div>
        <div className='mb-2 flex flex-row'>
          <span className='font-semibold pr-2'>Writers:</span>
          {searchState.detailsArray.writers?.map((o, i) => (
            <>
              {o}
              {i < searchState.detailsArray.writers.length - 1 && <>,&nbsp;</>}
            </>
          ))}
        </div>
      </Modal>
    </>
  );
}

export default Movies;
