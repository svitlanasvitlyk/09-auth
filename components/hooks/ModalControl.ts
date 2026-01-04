import { useState } from 'react';

function ModalControl(): {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
} {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
}

export default ModalControl;