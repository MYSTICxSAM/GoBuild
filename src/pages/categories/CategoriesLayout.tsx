import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar'; // Adjust the path as needed

const CategoriesLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-0 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default CategoriesLayout;
