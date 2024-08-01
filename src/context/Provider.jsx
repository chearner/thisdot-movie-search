/* eslint-disable react-refresh/only-export-components */
import { useState, createContext, useContext } from 'react';

const AppContext = createContext();
const AppContextUpdate = createContext();

export function useAppState() {
  const context = useContext(AppContext);
  return context;
}

export function useAppStateUpdate() {
  return useContext(AppContextUpdate);
}

export default function ContextProvider({ children }) {
  const [appState, setAppState] = useState({});

  function appStateUpdate(newState) {
    setAppState((oldState) => {
      return { ...oldState, ...newState };
    });
  }

  return (
    <AppContext.Provider value={appState}>
      <AppContextUpdate.Provider value={appStateUpdate}>{children}</AppContextUpdate.Provider>
    </AppContext.Provider>
  );
}
