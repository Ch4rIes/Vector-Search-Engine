import React, { useState , useContext } from 'react';
import Modal from './Modal';
import '../styles.css'


function DocumentCard(props) {

  const [showModal, setShowModal] = useState(false);

  const handleTitleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="document-card">
      <div className="card-body">
        <h5 className="card-title" onClick={handleTitleClick}>{props.title}</h5>
        <p className="card-text">{props.document.substring(0, 100)}...</p>
      </div>
      <Modal show={showModal} handleClose={handleCloseModal}>
        <div className="modal-body">{props.document}</div>
      </Modal>
    </div>

  );
}

export default DocumentCard;
