// src/pages/profile.tsx (обновленный)
"use client";
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BuildList from '../components/BuildList';

const ProfilePage = () => {
  const userId = 'user123';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Личный кабинет</h1>
        <BuildList userId={userId} />
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
