import React, { useState, useEffect } from 'react';
import { Menu, X, User, Search, LayoutDashboard } from 'lucide-react'; // ⚡ added LayoutDashboard icon
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import UserProfileMenu from './UserProfileMenu';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false); // Desktop dropdown
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false); // Mobile dropdown
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearchClick = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      const navbarHeight = 80; // Approximate navbar height
      const targetPosition = servicesSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Go<span className="text-accent">Build</span></span>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder={t('common.search')} 
                className="pl-8 w-[200px] lg:w-[300px]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchClick();
                  }
                }}
              />
            </div>
            <Link to="/" className="text-foreground hover:text-primary transition-colors">{t('common.home')}</Link>
            <Link to="/services" className="text-foreground hover:text-primary transition-colors">{t('common.services')}</Link>

            {/* New "All Services" dropdown button */}
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
            <button
              className="text-foreground hover:text-primary px-1 py-2 rounded-md text-base font-low transition-colors "
            >
              {t('common.solutions')}
            </button>
              <div
                className={`absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${isServicesOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <Link to="/categories/workers" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Worker</Link>
                {/* <Link to="/categories/houseowners" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home Owners</Link> */}
                <Link to="/categories/architects" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Architects/Designers</Link>
                <Link to="/categories/contractors" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Contractors</Link>
                <Link to="/categories/developers" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Developers</Link>
                <Link to="/categories/suppliers" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Material Suppliers</Link>
              </div>
            </div>

            <Link to="/blog" className="text-foreground hover:text-primary transition-colors">{t('common.blog')}</Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">{t('common.about')}</Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">{t('common.contact')}</Link>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <LanguageSelector />

            {/* ⚡ Architect Dashboard button added here */}
            {user && (
              <Button
                variant="outline"
                className="flex items-center space-x-2 border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => navigate('/architectDashboard')}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
            )}

            {user ? (
              <UserProfileMenu />
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/auth/login">{t('common.signIn')}</Link>
                </Button>
                <Button asChild>
                  <Link to="/auth/register">{t('common.joinNow')}</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
{isOpen && (
  <div className="bg-white md:hidden pt-4 pb-4 animate-fade-in">
    <div className="flex flex-col space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder={t('common.search')} 
          className="pl-8"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchClick();
              setIsOpen(false);
            }
          }}
        />
      </div>

      <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Home</Link>

      {/* Services main link (redirect only) */}
      <Link to="/services" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Services</Link>

      {/* New "All Services" mobile button */}
      <button
        className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted hover:text-primary transition-colors flex justify-between items-center"
        onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
      >
        {t('common.solutions')}
        <span className={`transform transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : 'rotate-0'}`}>▼</span>
      </button>

      {isMobileServicesOpen && (
        <div className="pl-4 mt-2 space-y-1">
          <Link to="/categories/workers" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={() => setIsOpen(false)}>Worker</Link>
          {/* <Link to="/categories/houseowners" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={() => setIsOpen(false)}>Home Owners</Link> */}
          <Link to="/categories/architects" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={() => setIsOpen(false)}>Architects/Designers</Link>
          <Link to="/categories/contractors" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={() => setIsOpen(false)}>Contractors</Link>
          <Link to="/categories/developers" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={() => setIsOpen(false)}>Developers</Link>
          <Link to="/categories/suppliers" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={() => setIsOpen(false)}>Material Suppliers</Link>
        </div>
      )}

      <Link to="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Blog</Link>
      <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>About</Link>
      <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Contact</Link>

      <div className="pt-2 space-y-2">

        {/* Profile Button added above sign out */}
        {user && (
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center space-x-2"
            onClick={() => {
              setIsOpen(false);
              navigate('/profile'); // Navigate to profile route using react-router-dom
            }}
          >
            <User className="h-5 w-5" />
            <span>{t('common.profile')}</span>
          </Button>
        )}

        {/* 🔹 Architect Dashboard Button (added, do not remove) */}
        {user && (
          <Button
            variant="outline"
            className="w-full flex items-center justify-center space-x-2"
            onClick={() => {
              setIsOpen(false);
              navigate('/architectDashboard');
            }}
          >
            <span>Architect Dashboard</span>
          </Button>
        )}

        {user ? (
          <UserProfileMenu />
        ) : (
          <>
            <Button 
              variant="outline" 
              className="w-full animate-pulse-shadow" 
              asChild
              onClick={() => setIsOpen(false)}
            >
              <Link to="/auth/login">{t('common.signIn')}</Link>
            </Button>
            <Button 
              className="w-full animate-pulse-shadow"
              asChild
              onClick={() => setIsOpen(false)}
            >
              <Link to="/auth/register">{t('common.joinNow')}</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  </div>
)}

      </div>
    </nav>
  );
};

export default Navbar;


