import Login from './Login';
import Movies from './Movies';
import { useAuth } from './hooks/useAuth';

function App() {
  return <>{useAuth().isAuthenticated() ? <Movies /> : <Login />}</>;
}

export default App;
