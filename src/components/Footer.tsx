import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
              <p className="mt-3 text-gray-400">{t('footer.tagline')}</p>
            </div>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61575209711749&rdid=JTYVbMh4ok4a5cCN&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1aECBVh8hC%2F#" className="hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/gobuild_in/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <Link to="/contact" className="hover:text-accent transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </Link>
              <a href="https://www.linkedin.com/company/gobuildin/?viewAsMember=true" className="hover:text-accent transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">{t('footer.services')}</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={scrollToServices} className="text-gray-400 hover:text-white transition-colors">{t('professionals.carpenter')}</button>
              </li>
              <li>
                <button onClick={scrollToServices} className="text-gray-400 hover:text-white transition-colors">{t('professionals.mason')}</button>
              </li>
              <li>
                <button onClick={scrollToServices} className="text-gray-400 hover:text-white transition-colors">{t('professionals.helper')}</button>
              </li>
              <li>
                <button onClick={scrollToServices} className="text-gray-400 hover:text-white transition-colors">{t('professionals.tiles')}</button>
              </li>
              <li>
                <button onClick={scrollToServices} className="text-gray-400 hover:text-white transition-colors">{t('professionals.painter')}</button>
              </li>
              <li>
                <button onClick={scrollToServices} className="text-gray-400 hover:text-white transition-colors">{t('professionals.labour')}</button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">{t('footer.company')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">{t('common.about')}</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors">{t('footer.howItWorks')}</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">{t('common.contact')}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-accent" />
                <span className="text-gray-400 whitespace-pre-line">
                  {t('footer.address')}
                </span>

              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-accent" />
                <Link to="tel:+91889931011" className="text-gray-400 hover:text-white transition-colors">+91 8899310111</Link>
                <Link to="tel:+917051514790" className="text-gray-400 hover:text-white transition-colors">+91 7051514790</Link>
                <Link to="tel:+919596133638" className="text-gray-400 hover:text-white transition-colors">+91 9596133638</Link>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-accent" />
                <Link to="mailto:info@gobuild.in" className="text-gray-400 hover:text-white transition-colors">info@gobuild.in</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} GoBuild. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/policy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
            <Link to="/" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
            <Link to="/" className="text-gray-400 hover:text-white text-sm">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
