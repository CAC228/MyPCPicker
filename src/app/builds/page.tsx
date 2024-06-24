"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ISavedBuild, IProduct } from '../../types';
import BuildModal from '../../components/BuildModal';

const BuildsPage = () => {
  const [builds, setBuilds] = useState<ISavedBuild[]>([]);
  const [selectedBuild, setSelectedBuild] = useState<ISavedBuild | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        const response = await axios.get<ISavedBuild[]>('/api/saved-builds?isPublic=true');
        setBuilds(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке сборок:', error);
      }
    };

    fetchBuilds();
  }, []);

  const handleOpenModal = (build: ISavedBuild) => {
    setSelectedBuild(build);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBuild(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Готовые сборки</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {builds.length > 0 ? (
            builds.map((build) => (
              <div key={build._id.toString()} className="border p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-2">Сборка от пользователя {build.userId}</h2>
                <ul>
                  {build.build.map((component) => {
                    const product = component.productId as unknown as IProduct;
                    return (
                      <li key={product._id.toString()} className="flex justify-between items-center">
                        <span>{component.componentType}</span>: {product.name}
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-2">
                  <button
                    onClick={() => handleOpenModal(build)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Просмотр
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Нет доступных сборок.</p>
          )}
        </div>
      </main>
      <Footer />
      {selectedBuild && (
        <BuildModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          build={selectedBuild}
        />
      )}
    </div>
  );
};

export default BuildsPage;
