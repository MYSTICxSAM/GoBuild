import React, { useState, useEffect } from 'react';
import { Menu, X, User, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import UserProfileMenu from './UserProfileMenu';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

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
            <Link to="/blog" className="text-foreground hover:text-primary transition-colors">{t('common.blog')}</Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">{t('common.about')}</Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">{t('common.contact')}</Link>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <LanguageSelector />
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
              <Link 
                to="/services" 
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t('common.services')}
              </Link>
              <Link to="/blog"
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground     hover:bg-muted hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t('common.blog')}
              </Link>
              <Link 
                to="/about" 
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t('common.about')}
              </Link>
              <Link 
                to="/contact" 
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t('common.contact')}
              </Link>
              <div className="pt-2 space-y-2">
                <LanguageSelector />
                {user ? (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                  >
                    {t('common.signOut')}
                  </Button>
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
