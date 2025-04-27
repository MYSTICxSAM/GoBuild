import React from 'react';
import { Star, MapPin, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import ScrollToTop from "./ScrollToTop";
import { useTranslation } from 'react-i18next';

interface ProfessionalCardProps {
  name: string;
  profession: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  available: string;
  verification: string[];
  delay: number;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  name,
  profession,
  image,
  rating,
  reviewCount,
  location,
  available,
  verification,
  delay,
}) => {
  const { t } = useTranslation();
  
  return (
    <Card className={`overflow-hidden animate-fade-in animation-delay-${delay}`}>
      <div className="aspect-[16/9] relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
        {verification.includes("Top Rated") && (
          <Badge className="absolute top-3 right-3 bg-primary text-white">
            {t('featuredProfessionals.topRated')}
          </Badge>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-xl">{name}</h3>
            <p className="text-muted-foreground">{profession}</p>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
            <span className="font-medium">{rating}</span>
            <span className="text-muted-foreground text-sm ml-1">({reviewCount})</span>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{available}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {verification.map((badge, index) => (
            badge !== "Top Rated" && (
              <Badge key={index} variant="outline" className="bg-secondary">
                {badge}
              </Badge>
            )
          ))}
        </div>
        
        <Button className="w-full">{t('featuredProfessionals.viewProfile')}</Button>
      </CardContent>
    </Card>
  );
};

const FeaturedProfessionals: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section id="professionals" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('featuredProfessionals.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('featuredProfessionals.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProfessionalCard
            name={t('featuredProfessionals.professional1.name')}
            profession={t('featuredProfessionals.professional1.profession')}
            image="/professional1.jpg"
            rating={4.9}
            reviewCount={127}
            location={t('featuredProfessionals.professional1.location')}
            available={t('featuredProfessionals.professional1.available')}
            verification={["Verified", "Background Checked", "Top Rated"]}
            delay={100}
          />
          
          <ProfessionalCard
            name="Kanta Wazir"
            profession="Electrical Contractor"
            image="/pp6.jpg"
            rating={5.0}
            reviewCount={87}
            location="Jammu, J&K"
            available="Available this week"
            verification={["Background Check", "10+ Years", "Certified", "Insured"]}
            delay={200}
          />
          
          <ProfessionalCard
            name="Saniya Lone"
            profession="Architect & Designer"
            image="/ppl4.jpg"
            rating={4.8}
            reviewCount={156}
            location="Kashmir, J&K"
            available="Available tomorrow"
            verification={["Top Rated", "Background Check", "Licensed", "Insured"]}
            delay={300}
          />
          
          <ProfessionalCard
            name="Aisha Abdullah"
            profession="Interior Designer"
            image="/ppl1.jpg"
            rating={4.9}
            reviewCount={92}
            location="Srinagar, J&K"
            available="Available next week"
            verification={["Background Check", "7+ Years", "Award Winning"]}
            delay={400}
          />
        </div>
        
        <div className="text-center mt-12">
          <Button className="w-52">
            <Link to="/services">Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProfessionals;
