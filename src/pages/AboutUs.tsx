import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Users, 
  Building, 
  Trophy, 
  Target, 
  Clock, 
  Heart,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import teamMembers from '@/data/team-members.json';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AboutUs: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section with Gradient Background */}
      <section className="pt-24 hero-pattern from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('aboutUs.hero.title')}</h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t('aboutUs.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('aboutUs.mission.title')}</h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t('aboutUs.mission.description1')}
              </p>
              <p className="text-lg text-muted-foreground">
                {t('aboutUs.mission.description2')}
              </p>
              <br />
              <Link to="/contact">
                <Button size="lg" className="animate-pulse-shadow">
                    {t('aboutUs.mission.contactUs')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/GoBuild.png" 
                  alt="Team meeting" 
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
                <p className="font-bold">Since 2025</p>
                <p>Serving communities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('aboutUs.values.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Trophy className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('aboutUs.values.excellence.title')}</h3>
              <p className="text-muted-foreground">
                {t('aboutUs.values.excellence.description')}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('aboutUs.values.trust.title')}</h3>
              <p className="text-muted-foreground">
                {t('aboutUs.values.trust.description')}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Heart className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('aboutUs.values.community.title')}</h3>
              <p className="text-muted-foreground">
                {t('aboutUs.values.community.description')}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Target className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('aboutUs.values.innovation.title')}</h3>
              <p className="text-muted-foreground">
                {t('aboutUs.values.innovation.description')}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Building className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('aboutUs.values.integrity.title')}</h3>
              <p className="text-muted-foreground">
                {t('aboutUs.values.integrity.description')}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('aboutUs.values.collaboration.title')}</h3>
              <p className="text-muted-foreground">
                {t('aboutUs.values.collaboration.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="/placeholder.svg" alt={member.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary mb-3">{member.position}</p>
                    <p className="text-muted-foreground text-sm">
                      {member.details}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">1000+</p>
              <p className="text-lg">{t('aboutUs.stats.serviceProviders')}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">50+</p>
              <p className="text-lg">{t('aboutUs.stats.happyClients')}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">9+</p>
              <p className="text-lg">{t('aboutUs.stats.serviceCategories')}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">4.2/5</p>
              <p className="text-lg">{t('aboutUs.stats.averageRating')}</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
