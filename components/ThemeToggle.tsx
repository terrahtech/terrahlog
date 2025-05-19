'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // On component mount: get theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.classList.add(`${savedTheme}-mode`);
    } else {
      document.body.classList.add('light-mode'); // default
    }
  }, []);

  // When theme changes: update body class and localStorage
  useEffect(() => {
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(`${theme}-mode`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="fixed right-2 top-[40%] z-50 ">
      <div className="vertical-text bg-[var(--secondary)] rounded-full overflow-hidden shadow-lg">
        <button
          onClick={() => setTheme('light')}
          className={`py-2 px-4 text-sm font-medium transition ${
            theme === 'light' ? 'bg-white text-black' : 'text-gray-100'
          }`}
        >
          Light
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={`py-2 px-4 text-sm font-medium transition ${
            theme === 'dark' ? 'bg-white text-black' : 'text-gray-800'
          }`}
        >
          Dark
        </button>
      </div>
    </div>
  );
}
