import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const scrollToServices = () => {
    // First navigate to home page if not already there
    if (window.location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If already on home page, just scroll
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold">Go<span className="text-accent">Build</span></h3>
              <p className="mt-3 text-gray-400">Connecting you with skilled professionals for all your service needs.</p>
            </div>
            <div className="flex space-x-4">
              <Link to="/contact" className="hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="hover:text-accent transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="hover:text-accent transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={scrollToServices} className="text-gray-400 hover:text-white transition-colors">Carpenter</button>
              </li>
              <li>
                <button onClick={scrollToServices} className="text-gray-400 hover:text-white transition-colors">Mason</button>
              </li>
              <li>
                <button onClick={scrollToServices} className="text-gray-400 hover:text-white transition-colors">Helper</button>
              </li>
              <li>
                <button onClick={scrollToServices} className="text-gray-400 hover:text-white transition-colors">Electrician</button>
              </li>
              <li>
                <button onClick={scrollToServices} className="text-gray-400 hover:text-white transition-colors">Painter</button>
              </li>
              <li>
                <button onClick={scrollToServices} className="text-gray-400 hover:text-white transition-colors">Driver and Mechanic</button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors">How It Works</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-accent" />
                <span className="text-gray-400">SMVDU, Kakrayal Katra Reasi, Jammu & Kashmir</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-accent" />
                <Link to="tel:+14155551234" className="text-gray-400 hover:text-white transition-colors">+91 7051514790</Link>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-accent" />
                <Link to="mailto:info@gobuild.com" className="text-gray-400 hover:text-white transition-colors">info@gobuild.com</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} GoBuild. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
            <Link to="/" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
            <Link to="/" className="text-gray-400 hover:text-white text-sm">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
