
import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
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
              <a href="#" className="hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Carpenter</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Mason</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Helper</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Electrician</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Painter</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Driver and Mechanic</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a>
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
                <a href="tel:+14155551234" className="text-gray-400 hover:text-white transition-colors">+91 7051514790</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-accent" />
                <a href="mailto:info@gobuild.com" className="text-gray-400 hover:text-white transition-colors">info@gobuild.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} GoBuild. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
