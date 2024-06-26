// src/components/Navbar.tsx

import { useState, Fragment } from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  WrenchScrewdriverIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
  ChartBarIcon,
  HeartIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/solid';
import { useBuild } from '../context/BuildContext';
import { useAuth, UserButton } from '@clerk/nextjs';

const categories = [
  { name: 'Видеокарты', slug: 'gpu', icon: 'nav-videocard-2023.png' },
  { name: 'Процессоры', slug: 'cpu', icon: 'nav-cpu-2023.png' },
  { name: 'Материнские платы', slug: 'motherboards', icon: 'nav-motherboard-2023.png' },
  { name: 'Оперативная память', slug: 'ram', icon: 'nav-memory-2023.png' },
  { name: 'Накопители', slug: 'storage', icon: 'nav-ssd-2023.png' },
  { name: 'Блоки питания', slug: 'power-supplies', icon: 'nav-powersupply-2023.png' },
  { name: 'Корпуса', slug: 'cases', icon: 'nav-case-2023.png' },
  { name: 'Охлаждение CPU', slug: 'cpu-coolers', icon: 'nav-cpucooler-2023.png' },
];

const navLinks = [
  { name: 'Сборка', href: '/builder', icon: <WrenchScrewdriverIcon className="w-5 h-5 mr-2" /> },
  {
    name: 'Продукты',
    href: '#',
    icon: <ChevronDownIcon className="w-5 h-5 mr-2" />,
    subMenu: categories,
  },
  { name: 'Руководства', href: '/guides', icon: <BookOpenIcon className="w-5 h-5 mr-2" /> },
  { name: 'Готовые сборки', href: '/completed-builds', icon: <BuildingLibraryIcon className="w-5 h-5 mr-2" /> },
  { name: 'Отзывы', href: '/reviews', icon: <ChatBubbleBottomCenterTextIcon className="w-5 h-5 mr-2" /> },
  { name: 'Избранное', href: '/favorites', icon: <HeartIcon className="w-5 h-5 mr-2" /> },
  { name: 'Сравнение', href: '/compare', icon: <ChartBarIcon className="w-5 h-5 mr-2" /> },
];

export default function Navbar() {
  const { build } = useBuild();
  const { isSignedIn } = useAuth();
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
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-gray-700">
                      {link.icon}
                      {link.name}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute z-10 mt-2 w-72 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 divide-y divide-gray-700">
                      <div className="p-4 grid grid-cols-2 gap-4">
                        {link.subMenu.map((category) => (
                          <Menu.Item key={category.slug}>
                            {({ active }) => (
                              <Link href={`/category/${category.slug}`} legacyBehavior>
                                <a className={`flex items-center p-2 rounded-md ${active ? 'bg-gray-700' : ''}`}>
                                  <img src={`//cdna.pcpartpicker.com/static/forever/img/${category.icon}`} alt={category.name} className="w-10 h-10 mr-2" />
                                  <span className="text-white">{category.name}</span>
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
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
          <Link href="/search" legacyBehavior>
            <a className="text-lg">
              <MagnifyingGlassIcon className="w-6 h-6" />
            </a>
          </Link>
          <Link href="/builder" legacyBehavior>
            <a className="flex items-center space-x-2 text-lg">
              <WrenchScrewdriverIcon className="w-6 h-6" />
              <span>Сборка ({Object.keys(build).length})</span>
            </a>
          </Link>
          {!isSignedIn ? (
            <div className="flex items-center space-x-4">
              <Link href="/login" legacyBehavior>
                <a className="text-lg">Вход</a>
              </Link>
              <Link href="/signup" legacyBehavior>
                <a className="text-lg">Регистрация</a>
              </Link>
            </div>
          ) : (
            <UserButton />
          )}
        </div>
      </div>
    </nav>
  );
}
