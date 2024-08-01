/* eslint-disable react-refresh/only-export-components */
import { useApiGet } from '../hooks/useApi';
import { keepPreviousData } from '@tanstack/react-query';
import { getGenres } from '../api/genres';
import Loading from './Loading';

function Genre(props) {
  const genres = useApiGet(['movies'], () => getGenres(), {
    enabled: true,
    refetchOnWindowFocus: false,
    retry: 0,
    placeholderData: keepPreviousData,
  });

  if (genres.isSuccess) {
    console.log(genres.data);
  }

  if (genres.isLoading) return <Loading />;

  return (
    <select onChange={props.onChange} className='select select-bordered w-full max-w-xs'>
      <option value=''>Genre</option>
      {genres.data
        ? genres.data.data.map((o) => (
            <option key={o.id} value={o.title}>
              {o.title} ({o.movies.length})
            </option>
          ))
        : null}
    </select>
  );
}

export default Genre;
