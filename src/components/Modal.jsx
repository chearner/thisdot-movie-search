import React from 'react';

const Modal = (props) => {
  return (
    <>
      <div className='modal'>
        <div style={{ '--image-url': `url(${props.poster})` }} className='modal-box bg-no-repeat bg-cover bg-ken-burns bg-[image:var(--image-url)]'>
          <h3 className='font-bold text-lg'>
            {props.title}
            <span className='my-auto ml-5 text-[10px] border-[1px] border-primary p-1'>{props.rating}</span>
          </h3>
          {props.children}
          <div className='modal-action'>
            <form method='dialog' className='modal-action'>
              <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
              <label htmlFor='movie-details' className='btn'>
                Close!
              </label>
            </form>
            <label className='modal-backdrop' htmlFor='movie-details'>
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
