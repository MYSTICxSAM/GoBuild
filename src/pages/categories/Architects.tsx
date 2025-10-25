import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const accentColor = 'text-purple-600';

const architects = [
  {
    id: 1,
    name: 'Aviral Design Studio Jammu',
    location: 'Jammu, India',
    pincode: '180001',
    category: 'Residential',
    shortDesc: 'Innovative designs and sustainable solutions.',
    fullDesc:
      'Aviral Design Studio is a leading architectural firm based in Jammu, renowned for its innovative and sustainable designs. The firm focuses on residential, commercial, and institutional projects with a modern, eco-friendly approach.',
    image: '/architects/Aviral_Design_Studio/image01.png',
  },
  {
    id: 2,
    name: 'Aashiana Architects',
    location: 'Jammu, India',
    pincode: '180002',
    category: 'Interior',
    shortDesc: 'Blending traditional aesthetics with modern functionality.',
    fullDesc:
      'Aashiana Architects specializes in modular kitchens and bathrooms, offering a perfect blend of traditional aesthetics with contemporary design. Known for detail-oriented residential projects and elegant interior concepts.',
    image: 'https://images.pexels.com/photos/7587861/pexels-photo-7587861.jpeg',
  },
  {
    id: 3,
    name: 'UrbanNest Architects',
    location: 'Pune, India',
    pincode: '411001',
    category: 'Residential',
    shortDesc: 'Eco-friendly homes with smart space optimization.',
    fullDesc:
      'UrbanNest focuses on sustainable architecture, with a strong emphasis on energy efficiency, natural light, and environmental harmony.',
    image: 'https://images.pexels.com/photos/7031580/pexels-photo-7031580.jpeg',
  },
  {
    id: 4,
    name: 'Studio Zenith',
    location: 'Jaipur, India',
    pincode: '302001',
    category: 'Commercial',
    shortDesc: 'Creative designs for luxury and modern living.',
    fullDesc:
      'Studio Zenith is known for creating bespoke architectural experiences that blend cultural heritage with contemporary aesthetics.',
    image: 'https://images.pexels.com/photos/27065116/pexels-photo-27065116.jpeg',
  },
  {
    id: 5,
    name: 'DesignWorks Studio',
    location: 'Mumbai, India',
    pincode: '400001',
    category: 'Commercial',
    shortDesc: 'Award-winning firm for commercial and urban design.',
    fullDesc:
      'DesignWorks Studio specializes in large-scale commercial projects and has received multiple awards for innovation in sustainable city planning.',
    image: 'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg',
  },
  {
    id: 6,
    name: 'Form & Function Architects',
    location: 'Delhi, India',
    pincode: '110001',
    category: 'Residential',
    shortDesc: 'Minimalist spaces that balance art and utility.',
    fullDesc:
      'Form & Function is a Delhi-based architecture firm known for minimalist and timeless commercial and residential designs.',
    image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg',
  },
];

const categories = ['Featured', 'Residential', 'Commercial', 'Interior'];

const Architecture: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  // Filter architects based on search input (name or pincode)
  const filteredArchitects = architects.filter(
    (arch) =>
      arch.name.toLowerCase().includes(search.toLowerCase()) ||
      arch.pincode.includes(search)
  );

  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-0 pt-12 sm:pt-20 flex flex-col md:flex-row items-center justify-between gap-10 mt-4">
        <div className="md:w-1/2 mt-4 sm:mt-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-snug">
            <span className="text-black">Find </span>
            <span className={accentColor}>Top Architects</span>
            <span className="text-black"> for Your Project</span>
          </h1>
        </div>

        {/* Hero image hidden on mobile */}
        <div className="md:w-1/2 flex justify-center hidden md:flex mt-4">
          <img
            src="https://thearchitectsdiary.com/wp-content/uploads/2019/12/architect-construction-plans.jpg"
            alt="Architectural planning"
            className="rounded-2xl shadow-xl object-cover w-full h-[300px] sm:h-[340px] md:max-w-[420px]"
          />
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-6xl mx-auto px-4 md:px-0 mt-8">
        <input
          type="text"
          placeholder="Search architects by name or pincode"
          className="w-full sm:w-1/2 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:outline-none mb-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      {/* Architect Cards Section */}
      {categories.map((cat) => {
        const catArchitects =
          cat === 'Featured'
            ? filteredArchitects.slice(0, 3) // top 3 as featured
            : filteredArchitects.filter((arch) => arch.category === cat);

        if (catArchitects.length === 0) return null;

        return (
          <section key={cat} className="max-w-6xl mx-auto px-4 md:px-0 mt-8 mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center mt-4">
              <span className={accentColor}>{cat} Architects</span>
            </h2>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {catArchitects.map((arch) => (
                <div
                  key={arch.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-[0_0_25px_rgba(128,0,128,0.3)] transition-transform transform hover:scale-105 overflow-hidden flex flex-col"
                >
                  <img
                    src={arch.image}
                    alt={arch.name}
                    className="w-full h-56 sm:h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-xl font-bold mb-1 text-gray-900 line-clamp-2">
                        {arch.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">{arch.location}</p>
                      <p className="text-gray-700 mb-5 text-sm line-clamp-3">{arch.shortDesc}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-auto">
                      <Link
                        to={`/architect/${arch.id}`}
                        className="text-purple-600 font-semibold hover:text-purple-800 transition underline text-sm text-center w-full sm:w-auto"
                      >
                        View Details
                      </Link>

                      <button
                        onClick={() => navigate('/services')}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-sm font-semibold w-full sm:w-auto"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <Footer />
    </div>
  );
};

export default Architecture;
