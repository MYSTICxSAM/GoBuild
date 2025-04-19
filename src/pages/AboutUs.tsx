
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
  ShieldCheck
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import teamMembers from '@/data/team-members.json';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section with Gradient Background */}
      <section className="pt-24 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About GoBuild</h1>
            <p className="text-lg text-muted-foreground mb-8">
              We connect skilled professionals with clients who need quality services.
              Our platform makes it easy to find, book, and manage service providers for all your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                At GoBuild, we're on a mission to revolutionize how people access services by creating a platform that seamlessly connects skilled professionals with clients in need.
              </p>
              <p className="text-lg text-muted-foreground">
                We believe everyone deserves access to quality services at fair prices, while providing professionals with opportunities to grow their business and showcase their expertise.
              </p>
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
                <p className="font-bold">Since 2023</p>
                <p>Serving communities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Trophy className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-muted-foreground">
                We're committed to delivering exceptional quality in everything we do, from platform features to customer support.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Trust</h3>
              <p className="text-muted-foreground">
                We build trust through transparency, reliability, and always putting our users' best interests first.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Heart className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="text-muted-foreground">
                We foster a supportive community where professionals and clients can connect and grow together.
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
              <p className="text-4xl font-bold mb-2">500+</p>
              <p className="text-lg">Service Providers</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">10k+</p>
              <p className="text-lg">Happy Clients</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">30+</p>
              <p className="text-lg">Service Categories</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">4.8/5</p>
              <p className="text-lg">Average Rating</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
