'use client';
import { FC, ReactNode, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ThemeToggle from './ThemeToggle';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // Collapse sidebar on small screens initially
    const handleResize = () => {
      setCollapsed(window.innerWidth < 990);
    };

    handleResize(); // run on initial load
    window.addEventListener('resize', handleResize); // optional: auto-collapse on resize

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`transition-all duration-300  ${collapsed ? 'ml-14 md:ml-20' : 'ml-14 md:ml-64'} w-full`}>
        <Header collapsed={collapsed} />
        <main className="mt-16 px-6 py-2 min-h-[calc(100vh-4rem)]">{children}</main>
      </div>
      
      <ThemeToggle />
    </div>
  );
}
