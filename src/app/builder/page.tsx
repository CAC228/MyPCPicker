// src/pages/BuildPage.tsx
"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BuildList from '@/components/BuildList';
import { useBuild } from '@/context/BuildContext';
import { useUser } from '@clerk/nextjs';
import { IBuild } from '@/types';

const BuildPage = () => {
  const { build, removeFromBuild } = useBuild();
  const { user } = useUser();
  const userId = user ? user.id : null;
  const [savedBuilds, setSavedBuilds] = useState<IBuild[]>([]);

  useEffect(() => {
    if (userId) {
      fetch(`/api/saved-builds?userId=${userId}`)
        .then(response => response.json())
        .then(data => setSavedBuilds(data));
    }
  }, [userId]);

  const handleSaveBuild = async () => {
    try {
      const response = await fetch('/api/saved-builds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, build }),
      });
      const data = await response.json();
      setSavedBuilds([...savedBuilds, data]);
    } catch (error) {
      console.error('Error saving build:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Личный кабинет</h1>
        {userId && <BuildList userId={userId} />}
      </main>
      <Footer />
    </div>
  );
};

export default BuildPage;
