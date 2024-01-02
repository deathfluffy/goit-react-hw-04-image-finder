import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal  ({ largeImageURL, tags, onClose })  {
useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  
}, []);
    const handleKeydown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
  const Overlay = (
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );

  return createPortal(Overlay, modalRoot);
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};


