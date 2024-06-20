// src/app/builder/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useBuild } from '../../context/BuildContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';

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
  const { userId } = useAuth();
  const [isPublic, setIsPublic] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      for (const key in build) {
        if (build[key] && build[key].prices.length > 0) {
          total += build[key].prices[0].price;
        }
      }
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [build]);

  const handleSaveBuild = async () => {
    if (!userId) {
      alert('Вы должны быть авторизованы, чтобы сохранить сборку.');
      return;
    }
    try {
      const buildData = Object.entries(build).map(([componentType, product]) => ({
        componentType,
        productId: product._id,
      }));
      await axios.post('/api/saved-builds', { build: buildData, isPublic });
      alert('Сборка сохранена.');
    } catch (error) {
      console.error('Ошибка сохранения сборки:', error);
    }
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
        <div className="mt-4 flex items-center justify-between">
          <div className="text-2xl font-bold">
            Итого: {totalPrice} руб.
          </div>
          <div className="flex items-center">
            <button
              onClick={handleSaveBuild}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Сохранить сборку
            </button>
            <label className="ml-4 flex items-center">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={() => setIsPublic(!isPublic)}
                className="mr-2"
              />
              Сделать сборку публичной
            </label>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BuildPage;