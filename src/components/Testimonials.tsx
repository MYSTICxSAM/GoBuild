
import React from 'react';
import { Star, Quote } from 'lucide-react';

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
    <div className={`testimonial-card animate-fade-in animation-delay-${delay}`}>
      <div className="absolute -top-4 -left-4 bg-white rounded-full p-2 shadow-md text-primary">
        <Quote className="w-6 h-6" />
      </div>
      <div className="mb-4 flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
          />
        ))}
      </div>
      <p className="text-muted-foreground mb-6">{quote}</p>
      <div className="flex items-center">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
          <p className="text-xs text-primary mt-1">{service}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real feedback from real customers who found exceptional professionals through GoBuild.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Testimonial
            quote="I needed urgent help with carpenter and found a professional within an hour. The work was top-notch and the price was fair. Couldn't be happier!"
            name="Tirath Das Dogra"
            role="Homeowner"
            image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
            rating={5}
            service="Plumbing Services"
            delay={100}
          />
          
          <Testimonial
            quote="The carpenter we hired through HandyHub was exceptional. The attention to detail on our custom cabinets was beyond expectations. Very professional!"
            name="Anjali Abrol"
            role="Interior Designer"
            image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
            rating={5}
            service="Carpentry Services"
            delay={300}
          />
          
          <Testimonial
            quote="Working with an architect from HandyHub completely transformed our renovation project. The ideas were innovative and the execution was flawless."
            name="Shah Faesal"
            role="Restaurant Owner"
            image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
            rating={4}
            service="Architectural Design"
            delay={500}
          />
        </div>
        
        <div className="mt-16 bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 mx-auto md:mx-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                  <path d="M4 22h16"></path>
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                </svg>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold">Join Our Network</h3>
                <p className="text-muted-foreground">Are you a skilled professional?</p>
              </div>
            </div>
            <div className="flex-grow">
              <p className="text-muted-foreground mb-4">
                Join our community of skilled professionals and connect with customers looking for your expertise. Grow your business and build your reputation.
              </p>
              <button className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
                Apply as Professional
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
