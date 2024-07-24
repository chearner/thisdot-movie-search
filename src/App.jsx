import './App.css';
import Movies from './Movies';
import { SearchProvider } from './SearchProvider';

function App() {
  return (
    <SearchProvider>
      <Movies />
    </SearchProvider>
  );
}

export default App;
