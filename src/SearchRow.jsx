/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from 'react';
import InputSearch from './components/InputSearch';
import SelectGenre from './components/SelectGenre';
import { Transition } from '@tailwindui/react';

function SearchRow(props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Transition show={isVisible} enter='transition-opacity duration-1000' enterFrom='opacity-0' enterTo='opacity-100'>
      <div className='flex flex-row justify-center items-center gap-4'>
        <InputSearch />
        <SelectGenre />
      </div>
    </Transition>
  );
}

export default SearchRow;
