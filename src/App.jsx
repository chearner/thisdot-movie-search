import './App.css';
import MoviesPage from './MoviesPage';
import ContextProvider from './ContextProvider';

function App() {
  return (
    <ContextProvider>
      <MoviesPage />
    </ContextProvider>
  );
}

export default App;
