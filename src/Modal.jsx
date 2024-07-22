/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react';

const Modal = ({ isOpen, onClose, title, poster, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
      <div className='fixed inset-0 bg-black opacity-50' onClick={onClose}></div>
      <div className='relative w-auto max-w-3xl mx-auto my-6 z-50'>
        <div className={`relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none`}>
          <div className='flex items-start justify-between p-5 rounded-t bg-slate-100'>
            <h3 className='text-2xl font-bold'>{title}</h3>
            <button className='ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none' onClick={onClose}>
              <span className='bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none'>×</span>
            </button>
          </div>
          <div className='relative p-6 flex-auto'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
