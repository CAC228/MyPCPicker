import React from 'react';
import Modal from 'react-modal';
import { ISavedBuild, IProduct } from '../types';
import Link from 'next/link';

interface BuildModalProps {
  isOpen: boolean;
  onClose: () => void;
  build: ISavedBuild | null;
}

const componentTranslations: { [key: string]: string } = {
  'cpu': 'Процессор',
  'cpu-cooler': 'Кулер для процессора',
  'motherboards': 'Материнская плата',
  'ram': 'Оперативная память',
  'storage': 'Накопитель',
  'gpu': 'Видеокарта',
  'case': 'Корпус',
  'power-supply': 'Блок питания',
  'os': 'Операционная система',
  'monitor': 'Монитор',
  'sound-card': 'Звуковая карта',
  'networking': 'Сетевое оборудование',
  'peripherals': 'Периферия',
  'accessories': 'Аксессуары / Другое',
};

const BuildModal: React.FC<BuildModalProps> = ({ isOpen, onClose, build }) => {
  if (!build) return null;

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Просмотр сборки">
      <h2 className="text-2xl font-bold mb-4">Сборка #{build._id.toString()}</h2>
      <ul className="space-y-2">
        {build.build.map((component) => {
          const product = component.productId as unknown as IProduct;
          return (
            <li key={product._id.toString()} className="flex justify-between items-center">
              <div>
                <span>{componentTranslations[component.componentType]}</span>
                <Link href={`/product/${product.specifications.partNumber}`} legacyBehavior>
                  <a className="text-blue-600 hover:underline ml-2">{product.name}</a>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
      <button onClick={onClose} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
        Закрыть
      </button>
    </Modal>
  );
};

export default BuildModal;
