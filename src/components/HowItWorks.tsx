
import React from 'react';
import { Search, Calendar, UserCheck } from 'lucide-react';

const steps = [
  {
    icon: <Search className="h-12 w-12" />,
    title: "Find the right professional",
    description: "Search through our extensive network of verified professionals based on your specific needs and project requirements.",
    delay: 100,
  },
  {
    icon: <Calendar className="h-12 w-12" />,
    title: "Book a service",
    description: "Choose a convenient date and time from the professional's availability, and customize your booking to match your project needs.",
    delay: 300,
  },
  {
    icon: <UserCheck className="h-12 w-12" />,
    title: "Get the job done",
    description: "Meet with your professional and get your project completed to your satisfaction with our quality guarantee.",
    delay: 500,
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How GoBuild Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Finding and booking professional services has never been easier. Our streamlined process ensures you get quality work with minimal hassle.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-between">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex-1 relative animate-fade-in animation-delay-${step.delay} flex flex-col items-center text-center`}
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                {step.icon}
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-0.5 bg-gradient-to-r from-primary/40 to-primary/10"></div>
              )}
              
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              
              <div className="mt-6 bg-white h-12 w-12 rounded-full border-2 border-primary text-primary font-bold flex items-center justify-center text-xl shadow-sm">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 p-6 bg-accent/10 rounded-2xl max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 14 4-4"></path>
                <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-2">100% Satisfaction Guarantee</h4>
              <p className="text-muted-foreground">
                If you're not completely satisfied with the service, we'll work to make it right or refund your payment. Your satisfaction is our top priority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
