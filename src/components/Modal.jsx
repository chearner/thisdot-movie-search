import React from 'react';

const Modal = (props) => {
  return (
    <dialog className='modal'>
      <div style={{ '--image-url': `url(${props.poster})` }} className='modal-box bg-no-repeat bg-cover bg-ken-burns bg-[image:var(--image-url)]'>
        <h3 className='font-bold text-lg'>
          {props.title}
          <span className='my-auto ml-5 text-[10px] border-[1px] border-primary p-1'>{props.rating}</span>
        </h3>
        {props.children}
        <div className='modal-action'>
          <form method='dialog'>
            <label htmlFor='movie-details' className='btn'>
              Close!
            </label>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
