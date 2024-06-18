// src/app/page.tsx

"use client";

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Добро пожаловать!</h1>
        <p className="mb-4">Выберите категорию, чтобы начать просмотр комплектующих:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/category/gpu" legacyBehavior>
            <a className="block bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 text-center">
              Видеокарты
            </a>
          </Link>
          <Link href="/category/cpu" legacyBehavior>
            <a className="block bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 text-center">
              Процессоры
            </a>
          </Link>
          <Link href="/category/cpu-cooler" legacyBehavior>
            <a className="block bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 text-center">
              Кулеры для процессоров
            </a>
          </Link>
          <Link href="/category/motherboards" legacyBehavior>
            <a className="block bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 text-center">
              Материнские платы
            </a>
          </Link>
          <Link href="/category/ram" legacyBehavior>
            <a className="block bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 text-center">
              Оперативная память
            </a>
          </Link>
          <Link href="/category/storage" legacyBehavior>
            <a className="block bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 text-center">
              Накопители
            </a>
          </Link>
          <Link href="/category/cases" legacyBehavior>
            <a className="block bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 text-center">
              Корпуса
            </a>
          </Link>
          <Link href="/category/power-supplies" legacyBehavior>
            <a className="block bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 text-center">
              Блоки питания
            </a>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}