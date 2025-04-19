import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { MapPin, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserLocationMap from '@/components/UserLocationMap';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';


const HeroForm: React.FC = () => {
const [startDate, setStartDate] = useState<Date>();
const [location, setLocation] = useState<string>('');
const [mapCenter, setMapCenter] = useState({ lat: 51.505, lng: -0.09 });

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
return(
<section className="hero-pattern from-primary/5 to-background py-16">
  <div className="container mx-auto px-4">
    <h1 className="text-4xl font-bold mb-8 text-center">Find Professional Services</h1>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* FORM */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Book a Service</h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-sky-900">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white",
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
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-sky-900">Location</label>
            <Select onValueChange={handleLocationChange}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jaanipur">Jaanipur, Jammu</SelectItem>
                <SelectItem value="highcourt">High Court, Jammu</SelectItem>
                <SelectItem value="satwari">Satwari Chowk, Jammu</SelectItem>
                <SelectItem value="gandhinagar">Gandhinagar, Jammu</SelectItem>
                <SelectItem value="ganghiyal">Ganghiyal Industrial Area, Jammu</SelectItem>
                <SelectItem value="bahuplaza">Bahu Plaza, Jammu</SelectItem>
                <SelectItem value="raghunath">RaghuNath Nagar, Jammu</SelectItem>
                <SelectItem value="busstand">Bus Stand, Jammu</SelectItem>
                <SelectItem value="baribrahmana">Bari Brahmana, Jammu</SelectItem>
                <SelectItem value="sainik">Sainik Colony, Jammu</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-sky-900">Service Type</label>
            <Select>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="carpenter">Carpenter</SelectItem>
                <SelectItem value="mason">Mason</SelectItem>
                <SelectItem value="helper">Helper</SelectItem>
                <SelectItem value="painter">Painter</SelectItem>
                <SelectItem value="welder">Welder</SelectItem>
                <SelectItem value="driver">Driver</SelectItem>
                <SelectItem value="steelcutter">Steel Cutter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full animate-pulse-shadow text-white font-semibold text-lg">
            Book Now
          </Button>
        </div>
      </div>

      {/* MAP */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-[430px]">
        <UserLocationMap center={mapCenter} />
      </div>
    </div>
  </div>
</section>

)
}

export default HeroForm;