import './App.css';
import Movies from './Movies';
import { DataProvider } from './DataProvider';

function App() {
  return (
    <DataProvider>
      <Movies />
    </DataProvider>
  );
}

export default App;
