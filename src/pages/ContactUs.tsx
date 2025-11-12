import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

const ContactUs: React.FC = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('contactUs.toast.title'),
      description: t('contactUs.toast.description'),
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row">
              {/* Left Column - Contact Form */}
              <div className="w-full lg:w-1/2 lg:pr-12">
                <div className="mb-10">
                  <h5 className="text-primary font-medium mb-2 text-6xl">{t('contactUs.title')}</h5>
                  {/* <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('contactUs.subtitle')}</h2>
                  <p className="text-muted-foreground">
                    {t('contactUs.description')} */}
                  {/* </p> */}
                </div>
                
                {/* <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t('contactUs.form.fullName')}</Label>
                    <Input id="fullName" placeholder={t('contactUs.form.fullNamePlaceholder')} required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('contactUs.form.email')}</Label>
                    <Input id="email" type="email" placeholder={t('contactUs.form.emailPlaceholder')} required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">{t('contactUs.form.subject')}</Label>
                    <Input id="subject" placeholder={t('contactUs.form.subjectPlaceholder')} required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">{t('contactUs.form.message')}</Label>
                    <Textarea 
                      id="message" 
                      placeholder={t('contactUs.form.messagePlaceholder')} 
                      className="min-h-[120px]" 
                      required 
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    <Send className="mr-2 h-4 w-4" />
                    {t('contactUs.form.send')}
                  </Button>
                </form> */}
                <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/contact.jpg" 
                  alt="Contact" 
                  className="w-full h-[400px] object-cover"
                />
                </div>
              </div>
              
              {/* Right Column - Illustration and Contact Info */}
              <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
                {/* <div className="relative">
                  <img 
                    src="/lovable-uploads/9399e14c-67fc-4236-93b4-f2939bcfa5e1.png" 
                    alt="Contact illustration" 
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg"></div>
                </div> */}
                
                <div className="mt-10 space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4 bg-primary/10 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{t('contactUs.contactInfo.email')}</h3>
                      {/* <p className="text-muted-foreground">support@gobuild.in</p> */}
                      <p className="text-muted-foreground">info@gobuild.in</p>
                      <p className="text-muted-foreground">admin@gobuild.in</p>
                      
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4 bg-primary/10 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{t('contactUs.contactInfo.phone')}</h3>
                      <p className="text-muted-foreground">+91 8899310111</p>
                      <p className="text-muted-foreground">+91 7051514790</p>
                      <p className="text-muted-foreground">+91 9596133638</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4 bg-primary/10 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{t('contactUs.contactInfo.address')}</h3>
                      <p className="text-muted-foreground">
                      House No - 251 <br></br> Near Chaddha Classes, Rehari Colony <br></br>
                        Jammu & Kashmir
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ContactUs;
