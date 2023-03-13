import { Overlay, ModalImg } from './Modal.styled';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onModalClose, imageURL, imageTags }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      onModalClose();
    }
  };

  const handleOverlayClick = evt => {
    if (evt.target === evt.currentTarget) {
      onModalClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <ModalImg>
        <img src={imageURL} alt={imageTags} />
      </ModalImg>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  imageURL: PropTypes.string.isRequired,
  imageTags: PropTypes.string,
};
