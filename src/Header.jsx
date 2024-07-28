import InputSearch from './components/InputSearch';
import SelectGenre from './components/SelectGenre';

function Header() {
  return (
    <header className='flex flex-row justify-center items-center gap-4'>
      <h1 className='uppercase font-extrabold text-5xl bg-gradient-to-l from-[#6359f8] via-[#9c32e2] via-[#ff0b0b] via-[#ff6d00] to-[#ffb700] text-transparent bg-clip-text'>MOVIES</h1>
      <InputSearch />
      <SelectGenre />
    </header>
  );
}

export default Header;
