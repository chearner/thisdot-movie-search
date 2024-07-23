import { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import Pagination from './Pagination';
import Modal from './Modal';
import Loading from './Loading';
import NoPoster from './assets/NoPoster';
import { Clapperboard } from 'lucide-react';
import { format } from 'date-fns';

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

  // use ref to avoid tracking unneeded state, better state ultimately would be needed.
  const searchRef = useRef();
  const searchGenre = useRef();
  const perPageRef = useRef();

  const [authToken, setAuthToken] = useState('');

  const [genresArray, setGenresArray] = useState([]);
  const [moviesArray, setMoviesArray] = useState([]);
  const [moviesCount, setMoviesCount] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);

  const [pageTotal, setPageTotal] = useState(0);
  const [pageNow, setPageNow] = useState(1);

  const debouncedSearch = useCallback(
    debounce(() => {
      fetchMovies(pageNow);
    }, 500),
    [authToken]
  );

  // this get auth token and genre typs on page load
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

  // this gets movie details on click
  const fetchMovieDetails = useCallback(
    async (id) => {
      if (authToken === '') return;
      const movieDetailsResponse = await fetch(baseUrl + `/movies/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const moviesDetailResponseJson = await movieDetailsResponse.json();
      setMovieDetails(moviesDetailResponseJson);
      setIsModalOpen(true);
    },
    [authToken]
  );

  // this get movies on input change, genre change, pagination click or results per page change
  const fetchMovies = async (page) => {
    // no auth token return
    if (authToken === '') return;
    // search min 2 chars, API search will not work so reset
    if (searchRef.current?.value.length < 2) {
      setMoviesArray([]);
      setPageNow(0);
      setPageTotal(0);
      setMoviesCount([]);
    } else {
      setPageNow(page);
      const moviesResponse = await fetch(baseUrl + `/movies?search=${searchRef.current?.value}&page=${page}&limit=${perPageRef.current?.value}&genre=${searchGenre.current?.value}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const moviesResponseJson = await moviesResponse.json();
      setMoviesArray(moviesResponseJson.data);
      setPageTotal(moviesResponseJson.totalPages);
      const moviesCount = await fetch(baseUrl + `/movies?search=${searchRef.current?.value}&page=1&limit=1000&genre=${searchGenre.current?.value}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const moviesCountJson = await moviesCount.json();
      setMoviesCount(moviesCountJson.data);
    }
  };

  return (
    <>
      <div className='max-w-5xl mx-auto gap-2'>
        <div className='flex flex-row gap-2 p-4'>
          <div className='flex flex-row items-center'>
            <Clapperboard />
            <h1 className='text-2xl font-bold ml-2'>Movie Search</h1>
          </div>
          <div className='flex-grow'></div>
          <div className='flex-none'>{moviesCount.length > 0 ? `${moviesCount.length} movies found` : ``}</div>
        </div>
        <div className='flex flex-row gap-2 p-4'>
          <input ref={searchRef} className='text-xl font-bold flex-grow p-2 border-b-2 border-black focus:outline-none' type='text' placeholder='Search movie titles...' onChange={debouncedSearch} maxLength={25} />
          <select ref={searchGenre} onChange={() => fetchMovies(1)} className='min-w-48 focus:outline-none cursor-pointer border-b-2 border-black'>
            <option value=''>All Genres</option>
            {genresArray.map((genre) => (
              <option key={genre.id} value={genre.title}>
                {genre.title}
              </option>
            ))}
          </select>
        </div>
        <Suspense fallback={<Loading />}>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {moviesArray.map((movie) => (
              <div key={movie.id} className='cursor-pointer flex flex-col justify-between border-2 rounded-xl p-2 border-black' onClick={() => fetchMovieDetails(movie.id)}>
                <h3 className='text-pretty font-bold h-18 px-2'>{movie.title}</h3>
                <div className='flex justify-center m-h-[150px]'>{movie.posterUrl ? <img src={movie.posterUrl} width='100' height='150' alt={`${movie.title} Movie Poster`} /> : <NoPoster title={movie.title} />}</div>
              </div>
            ))}
          </div>
        </Suspense>
        <div className='flex align-center gap-2 p-4'>
          <div className='align-bottom my-auto no-wrap'>
            Show{' '}
            <select ref={perPageRef} onChange={() => fetchMovies(1)} className='focus:outline-none font-bold'>
              <option value='25'>25</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
              <option value='1000'>1000</option>
            </select>{' '}
            Per Page
          </div>
          <div className='flex flex-grow justify-end gap-2 text-sm'>{perPageRef.current?.value != 1000 ? <Pagination pageTotal={pageTotal} pageNow={pageNow} fetchMovies={fetchMovies} /> : ''}</div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={movieDetails.title} poster={movieDetails.posterUrl} rating={movieDetails.rating}>
        <div className='mb-2 text-xl'>{movieDetails.summary}</div>
        <div className='mb-2'>
          <span className='font-semibold pr-2'>Published:</span>
          {movieDetails.datePublished ? format(movieDetails.datePublished, 'MMMM dd, yyyy') : undefined}
        </div>
        <div className='mb-2 flex flex-row'>
          <span className='font-semibold pr-2'>Starring:</span>
          {movieDetails.mainActors?.map((o, i) => (
            <>
              {o}
              {i < movieDetails.mainActors.length - 1 && <>,&nbsp;</>}
            </>
          ))}
        </div>
        <div className='mb-2 flex flex-row'>
          <span className='font-semibold pr-2'>Writers:</span>
          {movieDetails.writers?.map((o, i) => (
            <>
              {o}
              {i < movieDetails.writers.length - 1 && <>,&nbsp;</>}
            </>
          ))}
        </div>
      </Modal>
    </>
  );
}

export default Movies;
