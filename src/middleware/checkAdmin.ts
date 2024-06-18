import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { getAuth } from '@clerk/nextjs/server';

const checkAdmin = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId, sessionId, getToken } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const token = await getToken({ template: 'integration_default' });
      const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const user = await response.json();

      if (user.public_metadata.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
      }

      return handler(req, res);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};

export default checkAdmin;
