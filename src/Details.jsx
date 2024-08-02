/* eslint-disable react-refresh/only-export-components */
import { getDetails } from './api/details';
import { useApiGet } from './hooks/useApi';
import { keepPreviousData } from '@tanstack/react-query';
import { format } from 'date-fns';
import Modal from './components/Modal';
import Loading from './components/Loading';

function Details(props) {
  const details = useApiGet(['details', props.movieId], () => getDetails(props.movieId), {
    enabled: true,
    refetchOnWindowFocus: false,
    retry: 0,
    placeholderData: keepPreviousData,
  });

  if (details.isLoading) return <Loading />;

  return (
    <Modal title={details.data?.title} poster={details.data?.posterUrl ? details.data?.posterUrl : `./no-poster-${Math.floor(Math.random() * 2) + 1}.jpg`} rating={details.data?.rating}>
      <p className='mb-2 text-xl'>{details.data?.summary}</p>
      <p className='mb-2'>
        <span className='font-semibold pr-2'>Published:</span>
        {details.data?.datePublished ? format(details.data?.datePublished, 'MMMM dd, yyyy') : undefined}
      </p>
      <p className='mb-2 flex flex-row'>
        <span className='font-semibold pr-2'>Starring:</span>
        {details.data?.mainActors?.map((o, i) => (
          <span key={'actor' + o}>
            {o}
            {i < details.data?.mainActors.length - 1 && <>,&nbsp;</>}
          </span>
        ))}
      </p>
      <p className='mb-2 flex flex-row'>
        <span className='font-semibold pr-2'>Writers:</span>
        {details.data?.writers?.map((o, i) => (
          <span key={'writer' + o}>
            {o}
            {i < details.data?.writers.length - 1 && <>,&nbsp;</>}
          </span>
        ))}
      </p>
    </Modal>
  );
}

export default Details;
