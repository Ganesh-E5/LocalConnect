const BASE_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!res.ok) {
    const error = await res.json();
    throw error;
  }
  return res.json();
};
