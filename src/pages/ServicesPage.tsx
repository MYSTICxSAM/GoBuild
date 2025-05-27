import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import UserLocationMap from '@/components/UserLocationMap';
import ServiceCard from '@/components/ServiceCard';
import { ApplyAsProfessionalForm } from '@/components/ApplyAsProfessionalForm';
import { useTranslation } from 'react-i18next';
import HeroForm from '@/components/HeroForm';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <HeroForm />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('services.applyAsProfessional')}</h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              {t('services.joinNetwork')}
            </p>

            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Form - Left */}
              <div className="w-full md:w-1/2">
                <div className="p-8 bg-sky-100 rounded-xl shadow-2xl">
                  <ApplyAsProfessionalForm />
                </div>
              </div>

              {/* Image - Right */}
              <div className="w-full md:w-1/2 ">
                <img src="./pp6.jpg" alt="Professional illustration" className="w-full h-[500px] rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">{t('services.availableServices')}</h2>
            
            <div className="flex flex-wrap gap-2 mb-8">
              <Link to="/"><Button variant="outline" className="rounded-full">{t('services.allServices')}</Button></Link>
              <Button variant="outline" className="rounded-full">{t('professionals.carpenter')}</Button>
              <Button variant="outline" className="rounded-full">{t('professionals.mason')}</Button>
              <Button variant="outline" className="rounded-full">{t('professionals.helper')}</Button>
              <Button variant="outline" className="rounded-full">{t('professionals.steelCutter')}</Button>
              <Button variant="outline" className="rounded-full">{t('professionals.tiles')}</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServiceCard 
                image="/worker2.jpg"
                name={t('professionals.welder')}
                rating={4.2}
                reviews={124}
                description="Experienced welder specializing in residential and commercial welding repairs, installations, and maintenance."
              />
              <ServiceCard 
                image="/ppl7.jpg"
                name={t('professionals.mason')}
                rating={4.3}
                reviews={98}
                description="Skilled mason with expertise in bricklaying, concrete work, and stone masonry for residential and commercial projects."
              />
              <ServiceCard 
                image="/carpenter.jpg"
                name={t('professionals.carpenter')}
                rating={4.4}
                reviews={86}
                description="Skilled carpenter offering custom furniture building, cabinet installation, and general woodworking services."
              />
              <ServiceCard 
                image="/ppl8.jpg"
                name={t('professionals.helper')}
                rating={4.6}
                reviews={77}
                description="Reliable helper providing general assistance with construction, moving, and various manual labor tasks."
              />
              <ServiceCard 
                image="/driver2.jpg"
                name={t('professionals.tiles')}
                rating={4.6}
                reviews={112}
                description="Professional worker for floor and tiles work of all kinds."
              />
              <ServiceCard 
                image="/steel_cutter2.jpg"
                name={t('professionals.steelCutter')}
                rating={4.8}
                reviews={64}
                description="Expert steel cutter specializing in precise metal cutting, fabrication, and installation for construction projects."
              />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;
