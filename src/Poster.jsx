import { useState } from 'react';
import { useSearchState, useSearchStateUpdate } from './SearchProvider';
import MovieGenre from './MovieGenre';
import NoPoster from './assets/NoPoster';

function Poster(props) {
  let searchState = useSearchState();
  let searchUpdateState = useSearchStateUpdate();

  return (
    /*
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {searchState.moviesArray.map((movie) => (
        <div key={movie.id} className='cursor-pointer flex flex-col justify-between border-2 rounded-xl p-2 border-black hover:animate-rainbow-shadow shadow-md shadow-black/30' onClick={() => searchUpdateState({ selectedMovieId: movie.id })}>
          <h3 className='text-pretty font-bold h-18 px-2'>{movie.title}</h3>
          <div className='flex justify-center m-h-[150px]'>{movie.posterUrl ? <img src={movie.posterUrl} width='100' height='150' alt={`${movie.title} Movie Poster`} /> : <NoPoster title={movie.title} />}</div>
        </div>
      ))}
    </div>
    */
    <div className='flex flex-row items-center gap-4 pt-4 overflow-x-auto no-scrollbar'>
      <div className='flex space-x-4 p-4'>
        {searchState.moviesArray.map((movie) => (
          <div key={movie.id} onClick={() => searchUpdateState({ selectedMovieId: movie.id })} className='cursor-pointer'>
            <div style={movie.posterUrl?.length ? { '--image-url': `url(${movie.posterUrl})` } : null} className='flex-none bg-[image:var(--image-url)] rounded-xl bg-no-repeat bg-cover shadow-md shadow-black/30 w-48 h-72'></div>
            <div className='flex justify-center font-bold m-2'>{movie.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Poster;
