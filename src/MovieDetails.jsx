/* eslint-disable react-refresh/only-export-components */
import { useSearchState, useSearchStateUpdate } from './ContextProvider';
import DataLoader from './DataLoader';
import Modal from './components/Modal';
import { format } from 'date-fns';
import dataDetails from './data/details';

function MovieDetails(props) {
  let searchState = useSearchState();
  let searchUpdateState = useSearchStateUpdate();

  return (
    <Modal isOpen={searchState.selectedMovieId !== ''} onClose={() => searchUpdateState({ selectedMovieId: '' })} title={props.data.title} poster={props.data.posterUrl} rating={props.data.rating}>
      <div className='mb-2 text-xl'>{props.data.summary}</div>
      <div className='mb-2'>
        <span className='font-semibold pr-2'>Published:</span>
        {props.data.datePublished ? format(props.data.datePublished, 'MMMM dd, yyyy') : undefined}
      </div>
      <div className='mb-2 flex flex-row'>
        <span className='font-semibold pr-2'>Starring:</span>
        {props.data.mainActors?.map((o, i) => (
          <span key={'actor' + o}>
            {o}
            {i < props.data.mainActors.length - 1 && <>,&nbsp;</>}
          </span>
        ))}
      </div>
      <div className='mb-2 flex flex-row'>
        <span className='font-semibold pr-2'>Writers:</span>
        {props.data.writers?.map((o, i) => (
          <span key={'writer' + o}>
            {o}
            {i < props.data.writers.length - 1 && <>,&nbsp;</>}
          </span>
        ))}
      </div>
    </Modal>
  );
}

export default DataLoader(MovieDetails, dataDetails);
