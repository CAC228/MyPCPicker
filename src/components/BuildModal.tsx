// src/components/BuildModal.tsx
import React from 'react';
import Modal from 'react-modal';
import { ISavedBuild } from '../types';
import Link from 'next/link';

interface BuildModalProps {
  isOpen: boolean;
  onClose: () => void;
  build: ISavedBuild | null;
}

const BuildModal: React.FC<BuildModalProps> = ({ isOpen, onClose, build }) => {
  if (!build) return null;

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Просмотр сборки">
      <h2 className="text-2xl font-bold mb-4">Сборка #{build._id.toString()}</h2>
      <ul className="space-y-2">
        {build.build.map((component) => (
          <li key={component.productId._id.toString()} className="flex justify-between items-center">
            <span>{component.componentType}</span>
            <Link href={`/product/${component.productId.specifications.partNumber}`} legacyBehavior>
              <a className="text-blue-600 hover:underline">{component.productId.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={onClose} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
        Закрыть
      </button>
    </Modal>
  );
};

export default BuildModal;
