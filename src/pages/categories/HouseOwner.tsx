import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const accentColor = 'text-green-600';

const HomeOwners: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen font-sans relative">
      <Navbar />

      <div className="max-w-6xl mx-auto w-full pt-20 mt-4 px-4 md:px-0 flex flex-col items-center">
        <div className="flex flex-col-reverse md:flex-row md:gap-16 items-center justify-between w-full">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
              <span className="text-black">Find Your </span>
              <span className={accentColor}>Perfect Home</span>
              <span className="text-black"> for Rent</span>
            </h1>
            <p className="text-gray-700 text-lg mb-6">
              Search and discover quality rental homes tailored to your preferences. Explore verified listings to find a comfortable and affordable place to call home.
            </p>

            <button
              onClick={() => navigate('/services')}
              className="bg-green-600 text-white px-6 py-4 rounded-lg font-bold flex items-center justify-center gap-3 hover:bg-orange-700 transition text-lg shadow-lg min-w-[200px]"
            >
              Explore Rentals
            </button>
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center animate-fade-in animation-delay-200">
            <img
              src="https://i.pinimg.com/736x/3c/eb/83/3ceb83c7dc6cc67617668fdd1ef19e77.jpg"
              alt="Cozy home available for rent"
              className="rounded-2xl shadow-xl object-cover w-full h-[340px] md:max-w-[420px]"
            />
          </div>
        </div>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default HomeOwners;
