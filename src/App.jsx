import api from './services/api';
import Login from './Login';
import MoviesPage from './MoviesPage';
import ContextProvider from './ContextProvider';

function App() {
  return <ContextProvider>{api.isAuthenticated() ? <MoviesPage /> : <Login />}</ContextProvider>;
}

export default App;
