import css from './Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ url, onClose }) => {
  useEffect(() => {
    const handleEsc = event => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc, false);

    return () => document.removeEventListener('keydown', handleEsc, false);
  }, [onClose]);

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>{url && <img src={url} alt={url} />}</div>
    </div>
  );
};
