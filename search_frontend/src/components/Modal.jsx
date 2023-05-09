import React from 'react';
import ReactDOM from 'react-dom';

function Modal(props) {
  const { show, handleClose, children } = props;

  if (!show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-overlay" onClick={handleClose}></div>
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;