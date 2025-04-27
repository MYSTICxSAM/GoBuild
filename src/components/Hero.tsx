import React from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation();

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
    <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 hero-pattern">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 space-y-6 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              {t('hero.subtitle')}
            </p>
            
            <div className="relative max-w-md">
              <div className="flex w-full items-center space-x-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder={t('hero.searchPlaceholder')}
                    className="pl-10 h-12"
                  />
                </div>
                <Button size="lg" className="animate-pulse-shadow" onClick={handleSearchClick}>
                  {t('hero.searchButton')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 pt-4 text-sm text-muted-foreground">
              <span>{t('common.popularServices')}</span>
              <div className="flex flex-wrap gap-2">
                <Link to="/services" className="px-3 py-1 bg-secondary rounded-full hover:bg-primary/10 transition-colors">{t('professionals.mason')}</Link>
                <Link to="/services" className="px-3 py-1 bg-secondary rounded-full hover:bg-primary/10 transition-colors">{t('professionals.helper')}</Link>
                <Link to="/services" className="px-3 py-1 bg-secondary rounded-full hover:bg-primary/10 transition-colors">{t('professionals.welder')}</Link>
                <Link to="/services" className="px-3 py-1 bg-secondary rounded-full hover:bg-primary/10 transition-colors">{t('professionals.steelCutter')}</Link>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl animate-fade-in animation-delay-200">
              <img
                src="/worker1.jpg"
                alt="Professional carpenter working" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-white p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M15.5 12v4.5a3 3 0 1 1-6 0V12"></path>
                      <path d="M12 2.5a3 3 0 1 0 3 3v1.5"></path>
                      <path d="M13.5 7h-3A1.5 1.5 0 0 0 9 8.5V12"></path>
                      <path d="M16 9h2.5a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5H16"></path>
                    </svg>
                  </div>
                  <div className="text-white">
                    <p className="font-semibold text-lg">{t('hero.carpentryServices')}</p>
                    <p className="text-white/80 text-sm">{t('hero.professionalsAvailable')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white rounded-lg p-4 shadow-lg animate-fade-in animation-delay-300 animate-bounce-slow hidden md:block">
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm">{t('hero.verifiedExperts')}</p>
                  <p className="text-xs text-muted-foreground">{t('hero.backgroundChecked')}</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-lg animate-fade-in animation-delay-400 animate-bounce-slow hidden md:block">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t('hero.happyCustomers')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
