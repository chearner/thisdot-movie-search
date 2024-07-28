/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from 'react';
import { useSearchState, useSearchStateUpdate } from './ContextProvider';
import DataLoader from './DataLoader';
import dataMovies from './data/movies';
import { Transition } from '@tailwindui/react';

function MoviesRow(props) {
  let searchState = useSearchState();
  let searchUpdateState = useSearchStateUpdate();
  const [isVisible, setIsVisible] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    const start = (searchState.pageNow - 1) * searchState.pageSize;
    const end = start + searchState.pageSize;
    const movies = dataMovies.data.slice(start, end);
    setMovies(movies);
    searchUpdateState({ pageCount: Math.floor(dataMovies.data.length / searchState.pageSize), movieCount: dataMovies.data.length });
  }, [searchState.pageNow]);

  return (
    <Transition show={isVisible} enter='transition-opacity duration-1000' enterFrom='opacity-0' enterTo='opacity-100'>
      <div className='flex gap-4 mt-4 overflow-x-auto no-scrollbar'>
        {movies.map((movie) => (
          <div key={movie.id} onClick={() => searchUpdateState({ selectedMovieId: movie.id })} className='cursor-pointer'>
            <div style={movie.posterUrl?.length ? { '--image-url': `url(${movie.posterUrl})` } : { '--image-url': `url(no-poster.webp)` }} className='flex-none bg-[image:var(--image-url)] rounded-xl bg-no-repeat bg-cover shadow-md shadow-black/30 w-48 h-72'></div>
            <div className='flex justify-center font-bold m-2'>{movie.title}</div>
          </div>
        ))}
      </div>
    </Transition>
  );
}

export default DataLoader(MoviesRow, dataMovies);
