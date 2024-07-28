import { useSearchState, useSearchStateUpdate } from './ContextProvider';
import Pagination from './components/Pagination';

function Footer() {
  let searchState = useSearchState();
  let searchUpdateState = useSearchStateUpdate();

  return (
    <div className={`flex items-center justify-between align-center gap-2 p-4 text-sm transition-opacity duration-500 ease-in-out ${searchState.movieCount > 0 ? 'opacity-100' : 'opacity-0'}`}>
      <div className=''>
        Show{' '}
        <select onChange={(e) => searchUpdateState({ pageSize: e.target.value })} className='focus:outline-none font-bold'>
          <option value='25'>25</option>
          <option value='50'>50</option>
          <option value='100'>100</option>
          <option value='1000'>1000</option>
        </select>{' '}
        Per Page
      </div>
      <div className=''>{searchState.movieCount > 0 ? `${searchState.movieCount} Movies` : ``}</div>
      <div className={`transition-opacity duration-500 ease-in-out ${searchState.pageCount > 1 ? 'opacity-100' : 'opacity-0'}`}>{searchState.pageSize != 1000 ? <Pagination /> : ''}</div>
    </div>
  );
}

export default Footer;
