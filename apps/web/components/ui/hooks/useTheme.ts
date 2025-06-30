import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState('default');

  useEffect(() => {
    // Load theme from localStorage or default
    const savedTheme = localStorage.getItem('glance-theme') || 'default';
    setTheme(savedTheme);
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('glance-theme', newTheme);
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return { theme, changeTheme };
} 