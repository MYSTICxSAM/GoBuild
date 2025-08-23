
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WorkerCategories from "../components/WorkerCategories";
import ServiceCategories from "../components/ServiceCategories";
import HowItWorks from "../components/HowItWorks";
import FeaturedProfessionals from "../components/FeaturedProfessionals";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import HeroForm from "@/components/HeroForm";
import FAQ from "../components/FAQ";
// import { Banner } from "@/components/Banner";

const Index: React.FC = () => {
  // Smooth scroll functionality
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== "#") {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            const navbarHeight = 80; // Approximate navbar height
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function(e) {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      {/* <Banner/> */}
      <HeroForm/>
      <WorkerCategories />
      {/* <ServiceCategories /> */}
      <HowItWorks />
      <FAQ />
      {/* <FeaturedProfessionals /> */}
      {/* <Testimonials /> */}
      <Footer />
    </div>
  );
};

export default Index;
