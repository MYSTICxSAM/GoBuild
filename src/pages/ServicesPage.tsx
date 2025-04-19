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
import ServiceMap from '@/components/ServiceMap';
import ServiceCard from '@/components/ServiceCard';
import { ApplyAsProfessionalForm } from '@/components/ApplyAsProfessionalForm';

const ServicesPage = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [location, setLocation] = useState<string>('');
  const [mapCenter, setMapCenter] = useState({ lat: 51.505, lng: -0.09 });

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    setMapCenter({ lat: 51.505, lng: -0.09 });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Find Professional Services</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Book a Service</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Start Date</label>
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
                            {startDate ? format(startDate, "PPP") : <span>Select date</span>}
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
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">End Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !endDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : <span>Select date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            fromDate={startDate}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter your location"
                        className="pl-9"
                        value={location}
                        onChange={handleLocationChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Service Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="carpentry">Carpentry</SelectItem>
                        <SelectItem value="painting">Painting</SelectItem>
                        <SelectItem value="cleaning">Cleaning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full">Book Now</Button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[400px]">
                <ServiceMap center={mapCenter} />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Available Services</h2>
            
            <div className="flex flex-wrap gap-2 mb-8">
              <Button variant="outline" className="rounded-full">All Services</Button>
              <Button variant="outline" className="rounded-full">Plumbing</Button>
              <Button variant="outline" className="rounded-full">Electrical</Button>
              <Button variant="outline" className="rounded-full">Carpentry</Button>
              <Button variant="outline" className="rounded-full">Painting</Button>
              <Button variant="outline" className="rounded-full">Cleaning</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServiceCard 
                image="/worker1.jpg"
                name="Umar Abdullah"
                title="Master Plumber"
                rating={4.8}
                reviews={124}
                hourlyRate={45}
                description="Experienced plumber specializing in residential and commercial plumbing repairs, installations, and maintenance."
              />
              <ServiceCard 
                image="/ppl1.jpg"
                name="Aisha Khan"
                title="Interior Designer Contractor"
                rating={4.9}
                reviews={98}
                hourlyRate={55}
                description="Licensed Interior Designer contractor with over 10 years of experience in residential interior designing, lighting installations, and troubleshooting."
              />
              <ServiceCard 
                image="/ppl2.jpg"
                name="Priya Abrol"
                title="Professional Carpenter"
                rating={4.7}
                reviews={86}
                hourlyRate={40}
                description="Skilled carpenter offering custom furniture building, cabinet installation, and general woodworking services."
              />
              <ServiceCard 
                image="/placeholder.svg"
                name="Mariam Khatun"
                title="Interior Painter"
                rating={4.6}
                reviews={77}
                hourlyRate={35}
                description="Meticulous painter providing interior and exterior painting services with attention to detail and quality finishes."
              />
              <ServiceCard 
                image="/placeholder.svg"
                name="Vivek Ray"
                title="Cleaning Specialist"
                rating={4.9}
                reviews={112}
                hourlyRate={30}
                description="Professional cleaning services for homes and offices, including deep cleaning, move-in/move-out, and regular maintenance."
              />
              <ServiceCard 
                image="/placeholder.svg"
                name="Priyanka Mahajan"
                title="HVAC Technician"
                rating={4.8}
                reviews={64}
                hourlyRate={50}
                description="Certified HVAC technician offering installation, repair, and maintenance services for heating and cooling systems."
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Apply as Professional</h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              Join our network of skilled professionals and connect with clients in your area. 
              Fill out the form below to start your journey with GoBuild.
            </p>
            <ApplyAsProfessionalForm />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;
