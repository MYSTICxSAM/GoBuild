import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const accentColor = 'text-yellow-600';

const Contractors: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen font-sans relative">
      <Navbar />

      <div className="max-w-6xl mx-auto w-full pt-20 mt-4 px-4 md:px-0 flex flex-col items-center">
        <div className="flex flex-col-reverse md:flex-row md:gap-16 items-center justify-between w-full">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
              <span className="text-black">Hire Reliable </span>
              <span className={accentColor}>Contractors</span>
              <span className="text-black"> for Your Needs</span>
            </h1>
            <p className="text-gray-700 text-lg mb-6">
              Find skilled contractors for construction, renovation, and repair projects. Trusted professionals delivering quality work on time and budget.
            </p>

            <button
              onClick={() => navigate('/services')}
              className="bg-yellow-600 text-white px-6 py-4 rounded-lg font-bold flex items-center justify-center gap-3 hover:bg-green-700 transition text-lg shadow-lg min-w-[200px]"
            >
              Book a Service
            </button>
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center animate-fade-in animation-delay-200">
            <img
              src="https://mccoymart.com/post/wp-content/webp-express/webp-images/uploads/Centring-Shuttering-Contractors.jpg.webp"
              alt="Contractor working on construction site"
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

export default Contractors;
