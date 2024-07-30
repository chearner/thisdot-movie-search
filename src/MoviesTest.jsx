import { getMovies } from './api/movies';
import { useApiGet } from './services/request';
import Loading from './components/Loading';
import Error from './components/Error';

function MoviesTest() {
  const { data, isLoading, error, isError, isLoadingError, refetch } = useApiGet(['movies'], getMovies, {
    enabled: true,
    refetchOnWindowFocus: true,
    retry: 1,
  });

  if (isLoading) return <Loading />;

  if (isError || isLoadingError) return <Error error={error?.message} />;

  return (
    <>
      {data?.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </>
  );
}

export default MoviesTest;
