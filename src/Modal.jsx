import React from 'react';
import { SquareX } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, poster, rating, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-5 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
      <div className='fixed inset-0 bg-black opacity-50' onClick={onClose}></div>
      <div style={{ '--image-url': `url(${poster})` }} className={`relative w-auto max-w-3xl bg-no-repeat bg-cover bg-ken-burns rounded-xl z-50 h-full min-h-full bg-[image:var(--image-url)]`}>
        <div style={{ '--color-1': `#000`, '--color-2': '#fff' }} className={`relative flex flex-col w-full rounded-xl my-auto min-h-full outline-none focus:outline-none p-[50px] bg-gradient-to-b from-black`}>
          <div className='flex pb-2'>
            <h3 className='text-3xl font-bold text-white'>
              {title}
              <span className='my-auto ml-5 text-[10px] border-[1px] border-white p-1 text-white'>{rating}</span>
            </h3>
            <button className='absolute top-4 right-4 text-white float-right outline-none focus:outline-none' onClick={onClose}>
              <SquareX />
            </button>
          </div>
          <div className='relative flex-auto text-white'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
