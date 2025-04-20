import React, { useState } from 'react';
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

const ServicesPage = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [location, setLocation] = useState<string>('');
  const [mapCenter, setMapCenter] = useState({ lat: 51.505, lng: -0.09 });
  const { t } = useTranslation();

  const handleLocationChange = (value: string) => {
    setLocation(value);
  
    const locationCoords: { [key: string]: { lat: number; lng: number } } = {
      katra: { lat: 32.9910, lng: 74.9315 },
      gandhinagar: { lat: 32.7266, lng: 74.8570 },
      sainik: { lat: 32.6927, lng: 74.8905 },
      srinagar: { lat: 34.0837, lng: 74.7973 },
      baramulla: { lat: 34.2090, lng: 74.3429 },
    };
  
    setMapCenter(locationCoords[value] || { lat: 51.505, lng: -0.09 });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">{t('services.bookService')}</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">{t('services.bookService')}</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t('services.startDate')}</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !startDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : <span>{t('services.selectDate')}</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('services.location')}</label>
                    <Select onValueChange={handleLocationChange}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('services.selectLocation')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electrical">Jaanipur, Jammu</SelectItem>
                        <SelectItem value="carpentry">High Court, Jammu</SelectItem>
                        <SelectItem value="plumbing">Satwari Chowk, Jammu</SelectItem>
                        <SelectItem value="plumbing">Gandhinagar, Jammu</SelectItem>
                        <SelectItem value="plumbing">Ganghiyal Industrial Area, Jammu</SelectItem>
                        <SelectItem value="plumbing">Bahu Plaza, Jammu</SelectItem>
                        <SelectItem value="plumbing">RaghuNath Nagar, Jammu</SelectItem>
                        <SelectItem value="plumbing">Bus Stand, Jammu</SelectItem>
                        <SelectItem value="plumbing">Bari Brahmana, Jammu</SelectItem>
                        <SelectItem value="plumbing">Sainik Colony, Jammu</SelectItem>
                        <SelectItem value="plumbing">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('services.serviceType')}</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t('services.selectServiceType')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="carpenter">{t('professionals.carpenter')}</SelectItem>
                        <SelectItem value="mason">{t('professionals.mason')}</SelectItem>
                        <SelectItem value="helper">{t('professionals.helper')}</SelectItem>
                        <SelectItem value="painter">{t('professionals.painter')}</SelectItem>
                        <SelectItem value="welder">{t('professionals.welder')}</SelectItem>
                        <SelectItem value="driver">{t('professionals.driver')}</SelectItem>
                        <SelectItem value="steelCutter">{t('professionals.steelCutter')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full">{t('services.bookNow')}</Button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[430px]">
                <UserLocationMap center={mapCenter} />
              </div>
            </div>
          </div>
        </section>

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
              <div className="w-full md:w-1/2">
                <img src="./pp6.jpg" alt="Professional illustration" className="w-full h-auto rounded-lg shadow-lg" />
              </div>
            </div>

          </div>
        </section>


        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">{t('services.availableServices')}</h2>
            
            <div className="flex flex-wrap gap-2 mb-8">
              <Button variant="outline" className="rounded-full">{t('services.allServices')}</Button>
              <Button variant="outline" className="rounded-full">{t('professionals.carpenter')}</Button>
              <Button variant="outline" className="rounded-full">{t('professionals.mason')}</Button>
              <Button variant="outline" className="rounded-full">{t('professionals.helper')}</Button>
              <Button variant="outline" className="rounded-full">{t('professionals.steelCutter')}</Button>
              <Button variant="outline" className="rounded-full">{t('professionals.driver')}</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServiceCard 
                image="/worker1.jpg"
                name={t('professionals.welder')}
                rating={4.2}
                reviews={124}
                hourlyRate={45}
                description="Experienced welder specializing in residential and commercial welding repairs, installations, and maintenance."
              />
              <ServiceCard 
                image="/ppl1.jpg"
                name={t('professionals.mason')}
                rating={4.3}
                reviews={98}
                hourlyRate={55}
                description="Skilled mason with expertise in bricklaying, concrete work, and stone masonry for residential and commercial projects."
              />
              <ServiceCard 
                image="/ppl2.jpg"
                name={t('professionals.carpenter')}
                rating={4.4}
                reviews={86}
                hourlyRate={40}
                description="Skilled carpenter offering custom furniture building, cabinet installation, and general woodworking services."
              />
              <ServiceCard 
                image="/placeholder.svg"
                name={t('professionals.helper')}
                rating={4.6}
                reviews={77}
                hourlyRate={35}
                description="Reliable helper providing general assistance with construction, moving, and various manual labor tasks."
              />
              <ServiceCard 
                image="/placeholder.svg"
                name={t('professionals.driver')}
                rating={4.6}
                reviews={112}
                hourlyRate={30}
                description="Professional driver offering transportation services for materials, equipment, and personnel to job sites."
              />
              <ServiceCard 
                image="/placeholder.svg"
                name={t('professionals.steelCutter')}
                rating={4.8}
                reviews={64}
                hourlyRate={50}
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
