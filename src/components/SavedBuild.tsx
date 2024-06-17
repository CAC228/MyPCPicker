import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

const SavedBuilds = () => {
  const { user } = useUser();
  const [builds, setBuilds] = useState<ISavedBuild[]>([]);

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        const response = await axios.get('/api/saved-builds');
        setBuilds(response.data);
      } catch (error) {
        console.error('Error fetching saved builds:', error);
      }
    };

    if (user) {
      fetchBuilds();
    }
  }, [user]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete('/api/saved-builds', { data: { id } });
      setBuilds(builds.filter((build) => build._id !== id));
    } catch (error) {
      console.error('Error deleting build:', error);
    }
  };

  const handleTogglePublic = async (buildId: string, isPublic: boolean) => {
    try {
      await axios.put('/api/saved-builds', { buildId, isPublic });
      setBuilds(
        builds.map((build) =>
          build._id === buildId ? { ...build, isPublic: !isPublic } : build
        )
      );
    } catch (error) {
      console.error('Error updating build:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Мои сборки</h1>
      <ul>
        {builds.map((build) => (
          <li key={build._id} className="border-t py-2">
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-semibold">Сборка #{build._id}</h2>
                <p>{build.build.map(component => component.componentType).join(', ')}</p>
                <p>Создана: {new Date(build.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(build._id)}
                >
                  Удалить
                </button>
                <button
                  className={`${
                    build.isPublic ? 'bg-green-500' : 'bg-gray-500'
                  } text-white px-4 py-2 rounded hover:bg-green-600`}
                  onClick={() => handleTogglePublic(build._id, build.isPublic)}
                >
                  {build.isPublic ? 'Сделать приватной' : 'Сделать публичной'}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedBuilds;
