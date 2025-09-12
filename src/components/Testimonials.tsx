import React from 'react';
import { Star, Quote} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  service: string;
  delay: number;
}

const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  name,
  role,
  image,
  rating,
  service,
  delay,
}) => {
  return (
    <div className={`group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 animate-fade-in animation-delay-${delay}`}>
      {/* Quote icon with enhanced styling */}
      <div className="absolute -top-4 -left-4 bg-gradient-to-br from-primary to-primary/80 rounded-full p-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
        <Quote className="w-6 h-6 text-white" />
      </div>
      
      {/* Star rating */}
      <div className="mb-6 flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 transition-colors duration-200 ${
              i < rating 
                ? "text-yellow-500 fill-yellow-500 group-hover:scale-110" 
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-600">({rating}.0)</span>
      </div>
      
      {/* Quote text with improved typography */}
      <p className="text-gray-700 mb-8 leading-relaxed text-lg italic group-hover:text-gray-900 transition-colors duration-300">
        "{quote}"
      </p>
      
      {/* User info section with enhanced layout */}
      <div className="flex items-center">
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-full mr-4 object-cover border-3 border-gray-100 group-hover:border-primary/20 transition-all duration-300 group-hover:scale-105"
          />
          {/* Online indicator */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white group-hover:scale-110 transition-transform duration-300"></div>
        </div>
        <div className="flex-1">
          <p className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors duration-300">{name}</p>
          <p className="text-sm text-gray-600 mb-1">{role}</p>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {service}
          </div>
        </div>
      </div>
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const handleApplyAsProf = () => {
    //handle the click , go to services page and then scroll to apply as professional
    navigate('/services');
    
    // Add a small delay to ensure the page loads before scrolling
    setTimeout(() => {
      // Find the apply as professional section and scroll to it
      const applySection = document.querySelector('[data-section="apply-professional"]')
      if (applySection) {
        const navbarHeight = 80;
        const elementPosition = (applySection as HTMLElement).getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        // Fallback: scroll to the middle of the services page where the form likely is
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight * 0.21, // Scroll to about 60% down the page
            behavior: 'smooth'
          });
        }, 100);
      }
    }, 100);
  }

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-48 translate-y-48"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {t('testimonials.title')}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <Testimonial
            quote={t('testimonials.testimonial1.quote')}
            name={t('testimonials.testimonial1.name')}
            role={t('testimonials.testimonial1.role')}
            image="https://ui-avatars.com/api/?name=A+H&background=0EA5E9&color=fff&size=300&bold=true"
            rating={5}
            service={t('testimonials.testimonial1.service')}
            delay={100}
          />
          
          <Testimonial
            quote={t('testimonials.testimonial2.quote')}
            name={t('testimonials.testimonial2.name')}
            role={t('testimonials.testimonial2.role')}
            image="https://ui-avatars.com/api/?name=S+K&background=16A34A&color=fff&size=300&bold=true"
            rating={5}
            service={t('testimonials.testimonial2.service')}
            delay={300}
          />
          
          <Testimonial
            quote={t('testimonials.testimonial3.quote')}
            name={t('testimonials.testimonial3.name')}
            role={t('testimonials.testimonial3.role')}
            image="https://ui-avatars.com/api/?name=R+P&background=DC2626&color=fff&size=300&bold=true"
            rating={4}
            service={t('testimonials.testimonial3.service')}
            delay={500}
          />
        </div>
        
        {/* Enhanced Call-to-Action Section */}
        <div className="mt-20 relative">
          <div className="bg-gradient-to-r from-primary to-primary/90 p-10 rounded-3xl shadow-2xl max-w-5xl mx-auto relative overflow-hidden group hover:shadow-3xl transition-all duration-500">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 group-hover:scale-125 transition-transform duration-700"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-shrink-0 text-center lg:text-left">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white mb-6 mx-auto lg:mx-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Join Our Network</h3>
                  <p className="text-white/90 text-lg">Ready to grow your business?</p>
                </div>
              </div>
              
              <div className="flex-grow text-center lg:text-left">
                <p className="text-white/90 mb-6 text-lg leading-relaxed">
                  Join our community of skilled professionals and connect with customers looking for your expertise. 
                  Grow your business, build your reputation, and access exclusive opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg" onClick={handleApplyAsProf}>
                    Apply as Professional
                  </button>
                  <Link to="/about"><button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300">
                    Learn More
                  </button>
                  </Link>
                </div>
                
                {/* Stats */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-8 pt-6 border-t border-white/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">1500+</div>
                    <div className="text-white/80 text-sm">Professionals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">150+</div>
                    <div className="text-white/80 text-sm">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">4.9★</div>
                    <div className="text-white/80 text-sm">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
