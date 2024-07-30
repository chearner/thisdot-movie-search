import api from './services/api';
import { useState, useEffect } from 'react';

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(api.isAuthenticated());

  const logout = () => {
    api.logout();
    setIsLoggedIn(false);
    location.reload(); // no router/pages yet
  };

  return { isLoggedIn, logout };
}

function Header() {
  return (
    <header className='flex flex-row justify-center items-center gap-4 pb-2'>
      <h1 className='flex uppercase font-extrabold text-5xl bg-gradient-to-l from-[#6359f8] via-[#9c32e2] via-[#ff0b0b] via-[#ff6d00] to-[#ffb700] text-transparent bg-clip-text'>MOVIES</h1>
      <div className='flex flex-grow justify-end'>
        <button className='bg-blue-200 rounded-xl px-4 py-2 font-bold text-white text-sm' onClick={useAuth().logout}>
          Log Out
        </button>
      </div>
    </header>
  );
}

export default Header;
