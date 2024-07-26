import { useEffect, Suspense } from 'react';
import Modal from './Modal';
import Loading from './Loading';
import { format } from 'date-fns';
import Poster from './Poster';
import Header from './Header';
import Footer from './Footer';
import { useSearchState, useSearchStateUpdate } from './SearchProvider';
import dataMovies from './data/movies';
import dataGenres from './data/genres';

function Movies() {
  let searchState = useSearchState();
  let searchUpdateState = useSearchStateUpdate();

  useEffect(() => {
    const fetchTokenAndGenres = async () => {
      /*
      const tokenResponse = await fetch(`${searchState.baseUrl}/auth/token`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const tokenJson = await tokenResponse.json();
      searchUpdateState({ authToken: tokenJson.token });
      const genresResponse = await fetch(`${searchState.baseUrl}/genres/movies`, {
        headers: { Authorization: `Bearer ${tokenJson.token}` },
      });
      const genresJson = await genresResponse.json();
      */
      const genresJson = dataGenres;
      searchUpdateState({ genresArray: genresJson.data });
    };
    fetchTokenAndGenres();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [searchState.searchString, searchState.genreString, searchState.pageNow]);

  useEffect(() => {
    searchUpdateState({ pageNow: 1 });
    fetchMovies();
  }, [searchState.pageSize]);

  useEffect(() => {
    fetchMovieDetails();
  }, [searchState.selectedMovieId]);

  const fetchMovies = async () => {
    if (searchState.authToken === '') return;
    if (searchState.searchString?.length <= 2) {
      searchUpdateState({ moviesArray: [], pageNow: 1, pageCount: 0, movieCount: 0 });
    } else {
      /*
      const moviesResponse = await fetch(searchState.baseUrl + `/movies?search=${searchState.searchString}&page=${searchState.pageNow}&limit=${searchState.pageSize}&genre=${searchState.genreString}`, {
        headers: { Authorization: `Bearer ${searchState.authToken}` },
      });
      const moviesResponseJson = await moviesResponse.json();
      const moviesCount = await fetch(searchState.baseUrl + `/movies?search=${searchState.searchString}&page=1&limit=1000&genre=${searchState.genreString}`, {
        headers: { Authorization: `Bearer ${searchState.authToken}` },
      });
      const moviesCountJson = await moviesCount.json();
      */
      const moviesResponseJson = dataMovies;
      const moviesCountJson = dataMovies;
      searchUpdateState({ moviesArray: moviesResponseJson.data, pageCount: moviesResponseJson.totalPages, movieCount: moviesCountJson.data.length });
    }
  };

  const fetchMovieDetails = async () => {
    if (searchState.authToken === '') return;
    if (searchState.selectedMovieId !== '') {
      const movieDetailsResponse = await fetch(searchState.baseUrl + `/movies/${searchState.selectedMovieId}`, {
        headers: { Authorization: `Bearer ${searchState.authToken}` },
      });
      const moviesDetailResponseJson = await movieDetailsResponse.json();
      searchUpdateState({ detailsArray: moviesDetailResponseJson });
    }
  };

  return (
    <>
      <div className='w-full mx-auto gap-4 p-4'>
        <Header />
        <div className='flex gap-4 mt-4 overflow-x-auto no-scrollbar'>
          <Poster />
        </div>
        <Footer />
      </div>
      <Modal isOpen={searchState.selectedMovieId !== ''} onClose={() => searchUpdateState({ selectedMovieId: '' })} title={searchState.detailsArray.title} poster={searchState.detailsArray.posterUrl} rating={searchState.detailsArray.rating}>
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
