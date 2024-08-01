import React from 'react';
import { useAuth } from '../hooks/useAuth';

function Logout() {
  return (
    <button className='btn btn-neutral' onClick={useAuth().logout}>
      Log Out
    </button>
  );
}

export default Logout;
