/* eslint-disable react-refresh/only-export-components */
import { useState, createContext, useContext, useSyncExternalStore } from 'react';

const SearchContext = createContext();
const SearchContextUpdate = createContext();

export function useSearchState() {
  const context = useContext(SearchContext);
  return context;
}

export function useSearchStateUpdate() {
  return useContext(SearchContextUpdate);
}

export default function ContextProvider({ children }) {
  const [searchState, setSearchState] = useState({
    baseUrl: 'https://0kadddxyh3.execute-api.us-east-1.amazonaws.com',
    authToken: '',
    searchString: '',
    genreString: '',
    movieCount: 0,
    pageSize: 25,
    pageCount: 0,
    pageNow: 0,
    selectedMovieId: '',
  });

  function searchStateUpdate(newState) {
    setSearchState((oldState) => {
      return { ...oldState, ...newState };
    });
  }

  return (
    <SearchContext.Provider value={searchState}>
      <SearchContextUpdate.Provider value={searchStateUpdate}>{children}</SearchContextUpdate.Provider>
    </SearchContext.Provider>
  );
}
