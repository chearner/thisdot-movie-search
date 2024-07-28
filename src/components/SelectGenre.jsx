/* eslint-disable react-refresh/only-export-components */
import { useCallback } from 'react';
import { useSearchState, useSearchStateUpdate } from '../ContextProvider';
import DataLoader from '../DataLoader';
import dataGenres from '../data/genres';

function SelectGenre() {
  let searchState = useSearchState();
  let searchUpdateState = useSearchStateUpdate();

  return (
    <select onChange={(e) => searchUpdateState({ genreString: e.target.value })} className='min-w-48 focus:outline-none cursor-pointer text-slate-500 px-4 py-2 bg-slate-100 border-2 border-slate-200 rounded-xl'>
      <option value=''>Genre</option>
      {dataGenres.data.map((genre) => (
        <option key={genre.id} value={genre.title}>
          {genre.title}
        </option>
      ))}
    </select>
  );
}

export default DataLoader(SelectGenre, dataGenres);
