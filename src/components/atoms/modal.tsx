import React from 'react';
import ReactModal, { Props as ModalProps } from 'react-modal';

interface Props {
  title: string
}

export const Modal: React.FC<Props & ModalProps> = ({
  title, isOpen, onRequestClose, children,
}) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    overlayClassName="modal-overlay"
    className="modal"
  >
    <header>
      <span>{title}</span>
      <button type="button" onClick={onRequestClose} className="button-outline">X</button>
    </header>
    <section>
      {children}
    </section>
  </ReactModal>
);
