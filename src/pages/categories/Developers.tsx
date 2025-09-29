import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const accentColor = 'text-blue-600';

const Developers: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen font-sans relative">
      <Navbar />

      <div className="max-w-6xl mx-auto w-full pt-20 mt-4 px-4 md:px-0 flex flex-col items-center">
        <div className="flex flex-col-reverse md:flex-row md:gap-16 items-center justify-between w-full">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
              <span className="text-black">Hire Skilled </span>
              <span className={accentColor}>Developers</span>
              <span className="text-black"> for Your Projects</span>
            </h1>
            <p className="text-gray-700 text-lg mb-6">
              Connect with talented software developers experienced in web, mobile, and software applications. Get your projects delivered with efficiency and quality.
            </p>

            <button
              onClick={() => navigate('/services')}
              className="bg-blue-600 text-white px-6 py-4 rounded-lg font-bold flex items-center justify-center gap-3 hover:bg-purple-700 transition text-lg shadow-lg min-w-[200px]"
            >
              Book a Service
            </button>
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center animate-fade-in animation-delay-200">
            <img
              src="https://media.istockphoto.com/id/1451456915/photo/female-freelance-developer-coding-and-programming-coding-on-two-with-screens-with-code.jpg?s=612x612&w=0&k=20&c=BFFIc-xOwzeRyR8ui9VkFKEqqqQFBbISJzr-ADN6hS8="
              alt="Software developers working together"
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

export default Developers;
