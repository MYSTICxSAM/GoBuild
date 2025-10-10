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
  backgroundImage: string; // ✅ new prop
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, professionals, delay, backgroundImage }) => {
  const { t } = useTranslation();
  
  return (
       <Card
  className={`service-card relative overflow-hidden text-white rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl`}
  style={{
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  {/* Dark overlay for text visibility */}
  <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 hover:opacity-50"></div>

  <CardContent className="p-6 relative z-10 flex flex-col h-full">
    <div className="mb-4 text-yellow-400 transform transition-transform duration-300 hover:-translate-y-1">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 transform transition-transform duration-300 hover:-translate-y-1">
      {title}
    </h3>
    <p className="text-gray-200 mb-4 flex-grow transform transition-transform duration-300 hover:-translate-y-1">
      {description}
    </p>
    <div className="flex items-center justify-between mt-auto">
      <span className="text-sm font-medium text-gray-300">
        {professionals}+ {t('services.professionalsAvailable')}
      </span>
      <Link to="/services">
        <Button
          variant="ghost"
          size="sm"
          className="hover:animate-pulse-shadow text-white border border-white hover:bg-white/20"
        >
          {t('services.bookNow')}
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </Link>
    </div>
  </CardContent>
</Card>
  );
};

const WorkerCategories: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section id="services" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('services.workerServices')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('services.workerServicesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
          <ServiceCard
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 12l-8.5 8.5c-.83.83-2.17.83-3 0a2.12 2.12 0 0 1 0-3L12 9"></path>
                <path d="M17.64 15 22 10.64"></path>
                <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"></path>
              </svg>
            }
            title={t('professionals.carpenter')}
            description={t('services.carpenterDescription')}
            professionals={42}
            delay={100}
            backgroundImage="../../../Workers/Worker4.jpeg"
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
            backgroundImage="../../../Workers/Worker3.jpeg"
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
            backgroundImage="../../../Workers/Worker5.jpeg"
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
            title="Tiles and Floor Work"
            description="All types of tiles and flooring work handled by expert professionals."
            professionals={25}
            delay={400}
            backgroundImage="data:image/jpeg;base64,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"
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
            description="Professional interior and exterior painting with premium finishes."
            professionals={32}
            delay={100}
            backgroundImage="../../../Workers/Worker2.jpeg"
          />

          <ServiceCard
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
            }
            title="Welder"
            description="Precision welding for structural, industrial, and decorative metalwork."
            professionals={24}
            delay={200}
            backgroundImage="../../../Workers/Worker1.jpeg"
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
            description="Skilled and general labour available for all types of construction work."
            professionals={120}
            delay={300}
            backgroundImage="../../../Workers/Worker7.jpeg"
          />

          <ServiceCard
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            }
            title="Steel Cutter"
            description="Expert steel cutting services with precision tools and safety measures."
            professionals={18}
            delay={400}
            backgroundImage="https://static.vecteezy.com/system/resources/previews/021/716/414/non_2x/man-s-hand-using-iron-cutter-in-the-workplace-fastening-iron-canopy-frame-with-spark-worker-cutting-steel-with-electric-iron-cutter-steel-cutter-grinder-cutting-iron-pipe-with-bright-sparks-photo.jpg"
          />
        </div>
        
        <div className="text-center mt-12">
          <Link to="/services">
            <Button size="lg" className="animate-pulse-shadow">
              Browse All Workers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WorkerCategories;
