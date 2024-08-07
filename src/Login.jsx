import { useState } from 'react';
import { getToken } from './api/token';
import { useApiGet } from './hooks/useApi';
import Loading from './components/Loading';
import Error from './components/Error';
import Blob from './components/Blob';
import Footer from './components/Footer';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    api.refetch();
  };

  const api = useApiGet(['token'], getToken, {
    enabled: false,
    refetchOnWindowFocus: false,
    retry: 0,
  });

  if (api.isSuccess) {
    localStorage.setItem('token', api.data.token);
    location.reload();
  }

  if (api.isLoading) return <Loading />;

  if (api.isError || api.isLoadingError) return <Error error={api.error?.message} />;

  return (
    <div className='login'>
      <Blob opacity={0.6} />
      <div className='flex flex-col h-screen justify-center items-center text-center'>
        <div className='space-y-2'>
          <h1 className='mx-auto max-w-fit uppercase font-extrabold text-5xl bg-gradient-to-l from-[#6359f8] via-[#9c32e2] via-[#ff0b0b] via-[#ff6d00] to-[#ffb700] text-transparent bg-clip-text'>MOVIES</h1>
          <p className='max-w-lg'>Search for your favorite movies. Application built with React, React Query, Tailwind and DaisyUI for demostration purposes only. Use any email and password to login.</p>
        </div>
        <form className='max-w-sm space-y-4' action='#' onSubmit={handleLogin}>
          <label className='sr-only' htmlFor='username'>
            Email
          </label>
          <div className='relative'>
            <input placeholder='Username' id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} maxLength={25} className='input input-bordered' />
          </div>
          <label className='sr-only' htmlFor='password'>
            Password
          </label>
          <div className='relative'>
            <input placeholder='Password' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} maxLength={25} className='input input-bordered' />
          </div>
          <button className='btn btn-neutral' onClick={handleLogin} type='submit'>
            Sign In
          </button>
        </form>
        <Footer />
      </div>
    </div>
  );
}
