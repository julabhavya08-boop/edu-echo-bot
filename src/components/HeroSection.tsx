import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, Clock, MapPin, BookOpen, Settings } from 'lucide-react';
import campusHero from '@/assets/campus-hero.jpg';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <Card className="p-6 bg-gradient-card border shadow-elegant hover:shadow-glow transition-smooth hover:scale-105 group">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
        {icon}
      </div>
      <h3 className="font-semibold text-card-foreground">{title}</h3>
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
  </Card>
);

interface HeroSectionProps {
  onStartChat: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartChat }) => {
  const features = [
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Academic Schedules",
      description: "Get real-time information about class schedules, exam dates, and academic calendar events."
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Campus Facilities",
      description: "Find locations, hours, and services for gym, labs, parking, health center, and more."
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Library Services",
      description: "Access library hours, book study rooms, get research help, and use digital resources."
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Administrative Help",
      description: "Navigate registrar services, financial aid, transcripts, and other admin procedures."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${campusHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Your Smart Campus
              <span className="block bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
                Information Assistant
              </span>
            </h1>
            
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Get instant answers about schedules, dining, library services, facilities, 
              and administrative procedures. Your personal campus guide powered by AI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="lg"
                onClick={onStartChat}
                className="text-lg px-8 py-4"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Start Chatting
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-4 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Everything You Need to Know About Campus
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI assistant has comprehensive knowledge about all aspects of campus life. 
            Just ask naturally and get accurate, helpful information instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>

        {/* Quick Start Section */}
        <div className="mt-20 text-center">
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-card border shadow-elegant">
            <h3 className="text-2xl font-bold text-card-foreground mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-muted-foreground mb-6">
              Simply type your question in natural language. Ask about anything from 
              "What time does the library close?" to "How do I register for classes?"
            </p>
            <Button variant="cta" size="lg" onClick={onStartChat}>
              <MessageCircle className="h-5 w-5 mr-2" />
              Ask Your First Question
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;