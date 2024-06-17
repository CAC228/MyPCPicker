// src/app/builder/page.tsx

import React, { useState, useEffect } from 'react';
import { useBuild } from '../../context/BuildContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

interface IBuildComponent {
  componentType: string;
  productId: string;
}

interface ISavedBuild {
  _id: string;
  userId: string;
  build: IBuildComponent[];
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
}

const componentTypes = [
  { name: 'Процессор', slug: 'cpu' },
  { name: 'Кулер для процессора', slug: 'cpu-cooler' },
  { name: 'Материнская плата', slug: 'motherboards' },
  { name: 'Оперативная память', slug: 'ram' },
  { name: 'Накопитель', slug: 'storage' },
  { name: 'Видеокарта', slug: 'gpu' },
  { name: 'Корпус', slug: 'case' },
  { name: 'Блок питания', slug: 'power-supply' },
  { name: 'Операционная система', slug: 'os' },
  { name: 'Монитор', slug: 'monitor' },
  { name: 'Звуковая карта', slug: 'sound-card' },
  { name: 'Сетевое оборудование', slug: 'networking' },
  { name: 'Периферия', slug: 'peripherals' },
  { name: 'Аксессуары / Другое', slug: 'accessories' },
];

const BuildPage = () => {
  const { build, removeFromBuild } = useBuild();
  const { user } = useUser();
  const [savedBuilds, setSavedBuilds] = useState<ISavedBuild[]>([]);

  useEffect(() => {
    if (user) {
      fetch(`/api/saved-builds?userId=${user.id}`)
        .then(response => response.json())
        .then(data => setSavedBuilds(data));
    }
  }, [user]);

  const handleSaveBuild = () => {
    fetch('/api/saved-builds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ build, userId: user.id }),
    })
      .then(response => response.json())
      .then(data => setSavedBuilds([...savedBuilds, data]));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Сборка ПК</h1>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Компонент</th>
              <th className="border p-2">Выбор</th>
              <th className="border p-2">Цена</th>
              <th className="border p-2">Действия</th>
            </tr>
          </thead>
          <tbody>
            {componentTypes.map((component) => (
              <tr key={component.slug} className="border-t">
                <td className="border p-2">{component.name}</td>
                <td className="border p-2">
                  {build[component.slug] ? (
                    <div className="flex items-center space-x-2">
                      <img src={build[component.slug].image_url} alt={build[component.slug].name} className="w-12 h-12 object-cover" />
                      <span>{build[component.slug].name}</span>
                    </div>
                  ) : (
                    <Link href={`/category/${component.slug}`} legacyBehavior>
                      <a className="text-blue-600 hover:underline">Выбрать {component.name}</a>
                    </Link>
                  )}
                </td>
                <td className="border p-2">
                  {build[component.slug] && build[component.slug].prices.length > 0 ? (
                    <span>{build[component.slug].prices[0].price} руб.</span>
                  ) : (
                    <span>-</span>
                  )}
                </td>
                <td className="border p-2">
                  {build[component.slug] ? (
                    <button
                      onClick={() => removeFromBuild(component.slug)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Удалить
                    </button>
                  ) : (
                    <span>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <button
            onClick={handleSaveBuild}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Сохранить сборку
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BuildPage;
