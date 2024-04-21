import css from './Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ url, onClose }) => {
  const handleEsc = event => {
    if (event.keyCode === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEsc, false);

    return () => document.removeEventListener('keydown', handleEsc, false);
  }, []);

  const handleOverlayClick = () => {
    onClose();
  };

  return (
    <div
      className={css.overlay}
      onClick={handleOverlayClick}
    >
      <div className={css.modal}>{url && <img src={url} alt={url} />}</div>
    </div>
  );
};
