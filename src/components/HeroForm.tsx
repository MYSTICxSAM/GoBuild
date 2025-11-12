import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { MapPin, Calendar as CalendarIcon, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import UserLocationMap from '@/components/UserLocationMap';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const HeroForm: React.FC = () => {
const [startDate, setStartDate] = useState<Date>();
const [location, setLocation] = useState<string>('');
const [showSuggestions, setShowSuggestions] = useState(false); 
const [phoneNumber, setPhoneNumber] = useState<string>('');
const [serviceType, setServiceType] = useState<string>('');
const [referralCode, setReferralCode] = useState<string>('');
const [hdfu, setHdfu] = useState<string>('');
const [mapCenter, setMapCenter] = useState({ lat: 32.7266, lng: 74.8570 });
const [showSuccessDialog, setShowSuccessDialog] = useState(false);
const { toast } = useToast();
const [dateOpen, setDateOpen] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);

const locationList = [
  'Katra, Jammu',
  'Janipur, Jammu',
  'Satwari Chowk, Jammu',
  'Gandhinagar, Jammu',
  'Gangyal Industrial Area, Jammu',
  'Bahu Plaza, Jammu',
  'Residency Road, Jammu',
  'Bari Brahmana, Jammu',
  'Sainik Colony, Jammu',
  'Trikuta Nagar, jammu',
  'Bhagwati Nagar, jammu',
  'Shastri Nagar, jammu',
  'Rehari, jammu',
  'Talab Tillo, jammu',
  'Muthi, jammu',
  'Channi Himmat, jammu',
];

const locationCoords: any = {
  'katra, jammu': { lat: 32.9917, lng: 74.9319 },
  'Janipur, jammu': { lat: 32.7496, lng: 74.8373 },
  'satwari chowk, jammu': { lat: 32.6923199, lng: 74.8462223 },
  'gandhinagar, jammu': { lat: 32.7043905, lng: 74.8518208 },
  'gangyal industrial area, jammu': { lat: 32.6722807, lng: 74.866613 },
  'bahu plaza, jammu': { lat: 32.7038042, lng: 74.8698721 },
  'residency Road, jammu': { lat: 32.7293127, lng: 74.8654757 },
  'bari brahmana, jammu': { lat: 32.636539, lng: 74.9038354 },
  'sainik colony, jammu': { lat: 32.6738936, lng: 74.8723597 },
  'trikuta nagar, jammu': { lat: 32.6927306, lng: 74.8565729 },
  'bhagwati nagar, jammu': { lat: 32.7277661, lng: 74.826981 },
  'shastri nagar, jammu': { lat: 32.6931782, lng: 74.8514339 },
  'rehari, jammu': { lat: 32.7478515, lng: 74.8463835 },
  'talab tillo, jammu': { lat: 32.724354, lng: 74.8406902 },
  'muthi, jammu': { lat: 32.7585189, lng: 74.8114887 },
  'channi himmat, jammu': { lat: 32.6934058, lng: 74.873381 },
};

const handleLocationSelect = (value: string) => {
  setLocation(value);
  setShowSuggestions(false);

  const key = value.toLowerCase();
  if (locationCoords[key]) {
    setMapCenter(locationCoords[key]);
  }
};


const filteredLocations = locationList.filter((loc) =>
  loc.toLowerCase().includes(location.toLowerCase())
);

const handleSubmit = async () => {
  if (!startDate || !location || !phoneNumber || !serviceType) {
    toast({
      title: "Error",
      description: "Please fill in all fields",
      variant: "destructive",
    });
    return;
  }

  // Prevent multiple submissions
  if (isSubmitting) return;

  setIsSubmitting(true);

  try {
    const { error } = await supabase
      .from('User Request')
      .insert({
        Name: 'User', // Default name as requested
        DateOfService: format(startDate, 'yyyy-MM-dd'),
        Location: location,
        Phone: phoneNumber,
        ServiceType: serviceType,
        hdfu: hdfu,
        ReferalCode: referralCode?.trim() || null,
      });

    if (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
    
    setShowSuccessDialog(true);

    // Reset form
    setStartDate(undefined);
    setLocation('');
    setPhoneNumber('');
    setServiceType('');
    setHdfu('');
    setReferralCode('');
  } catch (error: any) {
    console.error('Error submitting form:', error);
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};

return(
<section id="hero-form" className="hero-pattern from-primary/5 to-background py-16">
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
              <Popover open={dateOpen} onOpenChange={setDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setDateOpen(!dateOpen)}
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
                    onSelect={(date) => {
                      setStartDate(date);
                      setDateOpen(false);
                    }}
                    initialFocus
                    className="p-3 pointer-events-auto"
                    disabled={(date) => date <= new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-sky-900">Referral Code</label>
              <Input
                type="text"
                placeholder="Enter referral code (Optional)"
                className="bg-white"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
            </div>
          </div>

          {/* LOCATION AUTOCOMPLETE */}
          <div className="space-y-2 relative">
            <label className="text-sm font-medium text-sky-900">Location</label>

            <Input
              placeholder="Enter location"
              className="bg-white"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setShowSuggestions(true);
              }}
            />

            {showSuggestions && location && filteredLocations.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 border rounded-md bg-white max-h-60 overflow-auto shadow-lg z-50">
                {filteredLocations.map((loc) => (
                  <div
                    key={loc}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLocationSelect(loc)}
                  >
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-sky-900">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="tel"
                placeholder="Enter your phone number"
                className="pl-10 bg-white"
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 10) {
                    setPhoneNumber(value);
                  }
                }}
              />
            </div>
            {phoneNumber && phoneNumber.length < 10 && (
              <p className="text-sm text-red-500">Please enter a valid 10-digit phone number</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-sky-900">Service Type</label>
            <Select onValueChange={setServiceType} value={serviceType}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="carpenter">Carpenter -  850rs/day</SelectItem>
                <SelectItem value="mason">Mason - 850rs/day</SelectItem>
                <SelectItem value="helper">Helper - 650rs/day</SelectItem>
                <SelectItem value="painter">Painter -  700rs/day</SelectItem>
                <SelectItem value="welder">Welder - 1200rs/day</SelectItem>
                <SelectItem value="labour">Labour - 650rs/day</SelectItem>
                <SelectItem value="steelcutter">Steel Cutter - 850rs/day</SelectItem>
                <SelectItem value="tiles">Tiles and Floor Work - 1000rs/day</SelectItem>
                <SelectItem value="plumber">Plumber - 1200rs/day</SelectItem>
                <SelectItem value="electrician">Electrician - 1200rs/day</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-sky-900">How did you find Gobuild?</label>
            <Select onValueChange={setHdfu} value={hdfu}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="social media">Social Media</SelectItem>
                <SelectItem value="ads">Ads and Billboards</SelectItem>
                <SelectItem value="newspaper">Newspaper</SelectItem>
                <SelectItem value="pamphlets">Pamphlets</SelectItem>
                <SelectItem value="friends">Friends</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="w-full animate-pulse-shadow text-white font-semibold text-lg"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Book Now"}
          </Button>
        </div>
      </div>

      {/* MAP */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-[625px]">
        <UserLocationMap center={mapCenter} />
      </div>
    </div>
  </div>

  <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Booking Successful!</DialogTitle>
        <DialogDescription>
          We will contact you in 15 minutes through phone or sms.
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</section>
)
}

export default HeroForm;