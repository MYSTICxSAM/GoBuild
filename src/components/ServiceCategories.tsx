import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  professionals: number;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, professionals, delay }) => {
  const { t } = useTranslation();
  
  return (
    <Card className={`service-card animate-fade-in animation-delay-${delay}`}>
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <div className="mb-4 text-primary">{icon}</div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-sm font-medium text-muted-foreground">{professionals}+ {t('services.professionalsAvailable')}</span>
            <Link to="/services"><Button variant="ghost" size="sm" className="hover:animate-pulse-shadow">
              {t('services.bookNow')}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button></Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ServiceCategories: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section id="services" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('services.expertServices')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('services.expertServicesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
          <ServiceCard
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 12l-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"></path>
                <path d="M17.64 15 22 10.64"></path>
                <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"></path>
              </svg>
            }
            title={t('professionals.carpenter')}
            description={t('services.carpenterDescription')}
            professionals={42}
            delay={100}
          />
          
          <ServiceCard
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18"></path>
                <path d="M5 21V7l8-4v18"></path>
                <path d="M19 21V11l-6-4"></path>
                <path d="M9 9h1"></path>
                <path d="M9 13h1"></path>
                <path d="M9 17h1"></path>
              </svg>
            }
            title={t('professionals.mason')}
            description={t('services.masonDescription')}
            professionals={28}
            delay={200}
          />

          <ServiceCard
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"></path>
                <path d="M18 22V5l-6-3-6 3v17"></path>
                <path d="M12 19v3"></path>
                <path d="M12 7v.01"></path>
                <path d="M12 11v.01"></path>
                <path d="M12 15v.01"></path>
              </svg>
            }
            title={t('professionals.electrician')}
            description={t('services.electricianDescription')}
            professionals={36}
            delay={300}
          />

          <ServiceCard
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 22h8"></path>
                <path d="M7 10h10"></path>
                <path d="M9 18h6"></path>
                <path d="M11 14h2"></path>
                <path d="m9 2 6 6"></path>
                <path d="M15 2 9 8"></path>
              </svg>
            }
            title="Tiles and Floor work"
            description="All types of Tiles work and flooring work and solutions from expert workers "
            professionals={25}
            delay={400}
          />

          <ServiceCard
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"></path>
                <path d="m6 16 6-3 6 3"></path>
                <path d="m6 12 6-3 6 3"></path>
                <path d="m6 8 6-3 6 3"></path>
              </svg>
            }
            title="Painter"
            description="Professional painting services for interiors and exteriors with premium finishes."
            professionals={32}
            delay={100}
          />

          <ServiceCard
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
            }
            title="Welder"
            description="Precision welding services for structural, industrial, and decorative metalwork."
            professionals={24}
            delay={200}
          />

          <ServiceCard
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                <path d="M22 10H2"></path>
                <path d="M12 6v12"></path>
              </svg>
            }
            title="Labour"
            description="Labour and helper service of all kinds with current availability"
            professionals={120}
            delay={30}
          />

          <ServiceCard
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            }
            title="Steel Cutter"
            description="Reliable automotive repair and maintenance services for all vehicle types."
            professionals={18}
            delay={400}
          />
        </div>
        
        <div className="text-center mt-12">
            <Link to="/services">
              <Button size="lg" className='animate-pulse-shadow'>
              Browse All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
