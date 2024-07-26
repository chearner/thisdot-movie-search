/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react';
import { useSearchState, useSearchStateUpdate } from './DataProvider';
import DataLoader from './DataLoader';
import dataMovies from './data/movies';

function MovieRow(props) {
  let searchState = useSearchState();
  let searchUpdateState = useSearchStateUpdate();

  useEffect(() => {
    searchUpdateState({ movieCount: props.data.data.length });
  }, []);

  return (
    <div className='flex gap-4 mt-4 overflow-x-auto no-scrollbar'>
      {props.data.data.map((movie) => (
        <div key={movie.id} onClick={() => searchUpdateState({ selectedMovieId: movie.id })} className='cursor-pointer'>
          <div style={movie.posterUrl?.length ? { '--image-url': `url(${movie.posterUrl})` } : { '--image-url': `url(no-poster.webp)` }} className='flex-none bg-[image:var(--image-url)] rounded-xl bg-no-repeat bg-cover shadow-md shadow-black/30 w-48 h-72'></div>
          <div className='flex justify-center font-bold m-2'>{movie.title}</div>
        </div>
      ))}
    </div>
  );
}

export default DataLoader(MovieRow, dataMovies);
