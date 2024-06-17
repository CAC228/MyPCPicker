// src/components/BuildList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IBuild } from '../types';

const BuildList = ({ userId }: { userId?: string }) => {
  const [builds, setBuilds] = useState<IBuild[]>([]);

  useEffect(() => {
    if (userId) {
      axios.get(`/api/saved-builds?userId=${userId}`)
        .then(response => setBuilds(response.data))
        .catch(error => console.error('Error fetching builds:', error));
    }
  }, [userId]);

  return (
    <div>
      {builds.map((build) => (
        <div key={build._id}>
          <h2>Сборка {build._id}</h2>
          <ul>
            {build.components.map((component) => (
              <li key={component.productId._id}>{component.productId.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BuildList;
