import { useEffect } from 'react';
import MoviesRow from './MoviesRow';
import MovieDetails from './MovieDetails';
import Header from './Header';
import Footer from './Footer';
import { useSearchState, useSearchStateUpdate } from './ContextProvider';
import dataMovies from './data/movies';
import dataGenres from './data/genres';
import dataDetails from './data/details';

function MoviesPage() {
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
    console.log('fetch');
    fetchMovies();
  }, [searchState.searchString, searchState.genreString, searchState.pageNow]);

  useEffect(() => {
    console.log('page now to 1');
    searchUpdateState({ pageNow: 1 });
    fetchMovies();
  }, [searchState.pageSize]);

  useEffect(() => {
    fetchMovieDetails();
  }, [searchState.selectedMovieId]);

  const fetchMovies = async () => {
    /*
    if (searchState.authToken === '' || searchState.searchString?.length <= 2) {
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
      const moviesResponseJson = dataMovies;
      const moviesCountJson = dataMovies;
      searchUpdateState({ moviesArray: moviesResponseJson.data, pageCount: moviesResponseJson.totalPages, movieCount: moviesCountJson.data.length });
    }
       */
  };

  const fetchMovieDetails = async () => {
    /*
    if (searchState.authToken === '') return;
    if (searchState.selectedMovieId !== '') {
      const movieDetailsResponse = await fetch(searchState.baseUrl + `/movies/${searchState.selectedMovieId}`, {
        headers: { Authorization: `Bearer ${searchState.authToken}` },
      });
      const moviesDetailResponseJson = await movieDetailsResponse.json();
      searchUpdateState({ detailsArray: moviesDetailResponseJson });
      console.log(moviesDetailResponseJson);
    }
      */
    const genresJson = dataDetails;
  };

  return (
    <>
      <div className='w-full mx-auto gap-4 p-4'>
        <Header />
        <MoviesRow />
        <Footer />
      </div>
      <MovieDetails />
    </>
  );
}

export default MoviesPage;
