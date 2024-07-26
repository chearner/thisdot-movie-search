import { useSearchState, useSearchStateUpdate } from './SearchProvider';
import DataLoader from './DataLoader';
import NoPoster from './assets/NoPoster';
import dataMovies from './data/movies';

function Poster(props) {
  let searchState = useSearchState();
  let searchUpdateState = useSearchStateUpdate();

  return (
    <>
      {props.data.data.map((movie) => (
        <div key={movie.id} onClick={() => searchUpdateState({ selectedMovieId: movie.id })} className='cursor-pointer'>
          <div style={movie.posterUrl?.length ? { '--image-url': `url(${movie.posterUrl})` } : { '--image-url': `url(no-poster.webp)` }} className='flex-none bg-[image:var(--image-url)] rounded-xl bg-no-repeat bg-cover shadow-md shadow-black/30 w-48 h-72'></div>
          <div className='flex justify-center font-bold m-2'>{movie.title}</div>
        </div>
      ))}
    </>
  );
}

export default DataLoader(Poster, dataMovies);
