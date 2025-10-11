import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { Description } from '@radix-ui/react-toast';
import { sub } from 'date-fns';

const accentColor = 'text-purple-600';

// Gallery data organized by groups
const gallerySections = [
  {
    title: 'Aviral Design Studio Jammu',
    description: 'Leading architectural firm known for innovative designs and sustainable solutions',
    images: [
      '../../../architects/Aviral_Design_Studio/image01.png',
      '../../../architects/Aviral_Design_Studio/image02.png',
      '../../../architects/Aviral_Design_Studio/image03.png',
      '../../../architects/Aviral_Design_Studio/image04.png',
      '../../../architects/Aviral_Design_Studio/image05.png',
      '../../../architects/Aviral_Design_Studio/image06.png',
    ],
  },
  {
    title: 'Aashiana Architects',
    subtitle: 'Specialized in Modular kitchen and Bathroom',
    description: 'Renowned for blending traditional aesthetics with modern functionality in residential projects',
    images: [
      'https://images.pexels.com/photos/7587861/pexels-photo-7587861.jpeg',
      'https://images.pexels.com/photos/27065116/pexels-photo-27065116.jpeg',
      'https://images.pexels.com/photos/7031580/pexels-photo-7031580.jpeg',


    ],
  }
];

const Architecture: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen font-sans relative">
      <Navbar />

      <div className="max-w-6xl mx-auto w-full pt-20 mt-4 px-4 md:px-0 flex flex-col items-center">
        <div className="flex flex-col-reverse md:flex-row md:gap-16 items-center justify-between w-full">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 animate-fade-in">
              <span className="text-black">Find </span>
              <span className={accentColor}>Expert Architects</span>
              <span className="text-black"> for Your Project</span>
            </h1>
            <p className="text-gray-700 text-lg mb-6">
              Connect with top architects to design your dream home or commercial space. Creative, practical, and professional architecture services tailored to your needs.
            </p>

            <button
              onClick={() => navigate('/services')}
              className="bg-purple-600 text-white px-6 py-4 rounded-lg font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition text-lg shadow-lg min-w-[200px]"
            >
              Book a Service
            </button>
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center animate-fade-in animation-delay-200">
            <img
              src="https://thearchitectsdiary.com/wp-content/uploads/2019/12/architect-construction-plans.jpg"
              alt="Modern architecture building facade"
              className="rounded-2xl shadow-xl object-cover w-full h-[340px] md:max-w-[420px]"
            />
          </div>
        </div>
      </div>

      {/* Gallery Sections */}
      <div className="max-w-6xl mx-auto px-4 md:px-0 mt-20">
        {gallerySections.map((section, secIndex) => (
          <div key={secIndex} className="mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-2 text-center animate-fade-in">
              <span className={accentColor}>{section.title}</span>
            </h2>
             <p className="text-center text-gray-600 mb-6 text-lg">
            
      {section.description}
    </p>
     

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {section.images.map((img, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl transform transition hover:scale-105 shadow-md hover:shadow-[0_0_25px_rgba(128,0,128,0.5)]"
                >
                  <img
                    src={img}
                    alt={`${section.title} Project ${index + 1}`}
                    className="w-full h-60 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default Architecture;
