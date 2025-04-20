import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface ServiceCardProps {
  image: string;
  name: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  description: string;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  name,
  rating,
  reviews,
  hourlyRate,
  description,
  className,
}) => {
  const { t } = useTranslation();

  // Helper function to render star rating
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="ml-1 font-medium">{rating}</span>
        <span className="text-muted-foreground ml-1">({reviews} {t('services.reviews')})</span>
      </div>
    );
  };

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-lg", className)}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute top-0 right-0 m-2 bg-white px-2 py-1 rounded-md text-sm font-medium text-primary">
          Rs.{hourlyRate}/Day
        </div>
      </div>
      
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg">{name}</h3>
          {renderRating(rating)}
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
        
        <div className="flex items-center mt-4 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground mr-1" />
          <span className="text-muted-foreground">Available to start immediately</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between">
        <a href="/services"><Button variant="outline" className="w-[88%]">View Profile</Button></a>
        <a href="/services"><Button className="w-[88%]">{t('services.bookNow')}</Button></a>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
