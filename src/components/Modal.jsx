import React from 'react';

const Modal = (props) => {
  return (
    <>
      <dialog id='my_modal_1' className='modal modal-open'>
        <div style={{ '--image-url': `url(${props.poster})` }} className='text-white modal-box bg-no-repeat bg-cover bg-ken-burns bg-[image:var(--image-url)]'>
          <h3 className='font-bold text-lg'>
            {props.title}
            <span className='my-auto ml-5 text-[10px] border-[1px] border-white p-1 text-white'>{props.rating}</span>
          </h3>
          {props.children}
          <div className='modal-action'>
            <form method='dialog'>
              <button className='btn'>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
