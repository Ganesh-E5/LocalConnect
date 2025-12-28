import React, { createContext, useState, useEffect } from 'react';
import { apiFetch } from '../api';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    const fetchUser = async () => {
      try {
        const data = await apiFetch('/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data.user || data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
