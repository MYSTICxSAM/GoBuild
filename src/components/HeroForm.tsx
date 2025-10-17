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
const [phoneNumber, setPhoneNumber] = useState<string>('');
const [serviceType, setServiceType] = useState<string>('');
const [referralCode, setReferralCode] = useState<string>('');
const [hdfu, setHdfu] = useState<string>('');
const [mapCenter, setMapCenter] = useState({ lat: 32.7266, lng: 74.8570 });
const [showSuccessDialog, setShowSuccessDialog] = useState(false);
const { toast } = useToast();
const [dateOpen, setDateOpen] = useState(false);

const handleLocationChange = (value: string) => {
  setLocation(value);

  const locationCoords: { [key: string]: { lat: number; lng: number } } = {
    katra: { lat: 32.9917, lng: 74.9319 },
    sikandarpur: { lat: 26.042059, lng: 84.041435 },
    ayanagar: { lat: 28.4706, lng: 77.1264 },
    jaanipur: { lat: 32.7496, lng: 74.8373 },
    highcourt: { lat: 32.7294, lng: 74.8648 }, // near Janipur-HC area
    satwari: { lat: 32.6887, lng: 74.8371 },
    gandhinagar: { lat: 32.7266, lng: 74.8570 },
    ganghiyal: { lat: 32.6749, lng: 74.8090 },
    bahuplaza: { lat: 32.7150, lng: 74.8600 },
    raghunath: { lat: 32.7300, lng: 74.8605 },
    busstand: { lat: 32.7357, lng: 74.8733 },
    baribrahmana: { lat: 32.6204, lng: 74.9072 },
    sainik: { lat: 32.6927, lng: 74.8905 },
    other: { lat: 0, lng: 0 }, // default/fallback for unknown
  };

  setMapCenter(locationCoords[value] || { lat: 32.7266, lng: 74.8570 });
};

const [isSubmitting, setIsSubmitting] = useState(false);

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
        ReferalCode: referralCode,
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

          <div className="space-y-2">
            <label className="text-sm font-medium text-sky-900">Location</label>
            <Select onValueChange={handleLocationChange} value={location}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="katra">Katra, Jammu</SelectItem>
                {/* <SelectItem value="sikandarpur">Sikandarpur, Delhi</SelectItem> */}
                {/* <SelectItem value="ayanagar">Aya Nagar, Delhi</SelectItem> */}
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