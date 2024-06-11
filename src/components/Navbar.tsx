"use client";

import { useState, Fragment } from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ShoppingCartIcon, HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useCart } from '../context/CartContext';

const categories = [
  { name: 'Видеокарты', slug: 'gpu', icon: 'nav-videocard-2023.png' },
  { name: 'Процессоры', slug: 'cpu', icon: 'nav-cpu-2023.png' },
  { name: 'Материнские платы', slug: 'motherboards', icon: 'nav-motherboard-2023.png' },
  { name: 'Оперативная память', slug: 'ram', icon: 'nav-memory-2023.png' },
  { name: 'Накопители', slug: 'storage', icon: 'nav-ssd-2023.png' },
  // Добавьте другие категории здесь
];

const navLinks = [
  { name: 'Builder', href: '/builder', icon: <HomeIcon className="w-5 h-5 mr-2" /> },
  { 
    name: 'Products', 
    href: '#', 
    icon: <ChevronDownIcon className="w-5 h-5 mr-2" />, 
    subMenu: categories 
  },
  { name: 'Guides', href: '/guides', icon: <HomeIcon className="w-5 h-5 mr-2" /> },
  { name: 'Completed Builds', href: '/completed-builds', icon: <HomeIcon className="w-5 h-5 mr-2" /> },
  { name: 'Trends', href: '/trends', icon: <HomeIcon className="w-5 h-5 mr-2" /> },
  { name: 'Forums', href: '/forums', icon: <HomeIcon className="w-5 h-5 mr-2" /> },
];

export default function Navbar() {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" legacyBehavior>
            <a className="text-2xl font-bold">BuildMyPC</a>
          </Link>
          {navLinks.map((link) => (
            <div key={link.name} className="relative">
              {link.subMenu ? (
                <>
                  <button 
                    onClick={toggleMenu} 
                    className="flex items-center px-3 py-2 text-white hover:bg-gray-700 rounded-md focus:outline-none"
                  >
                    {link.icon}
                    {link.name}
                  </button>
                  <Transition
                    as={Fragment}
                    show={isMenuOpen}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <div className="absolute left-0 top-full mt-2 w-72 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg z-10">
                      <div className="py-1">
                        {link.subMenu.map((category) => (
                          <Link href={`/category/${category.slug}`} key={category.slug} legacyBehavior>
                            <a className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                              <img src={`//cdna.pcpartpicker.com/static/forever/img/${category.icon}`} alt={category.name} className="w-6 h-6 mr-2" />
                              {category.name}
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </Transition>
                </>
              ) : (
                <Link href={link.href} legacyBehavior>
                  <a className="flex items-center px-3 py-2 text-white hover:bg-gray-700 rounded-md">
                    {link.icon}
                    {link.name}
                  </a>
                </Link>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <Link href="#" legacyBehavior>
            <a className="text-lg">
              <MagnifyingGlassIcon className="w-6 h-6" />
            </a>
          </Link>
          <Link href="/cart" legacyBehavior>
            <a className="flex items-center space-x-2 text-lg">
              <ShoppingCartIcon className="w-6 h-6" />
              <span>Корзина ({cart.length})</span>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
