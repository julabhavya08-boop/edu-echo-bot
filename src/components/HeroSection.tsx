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
    <div className="min-h-screen bg-gradient-mesh relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{ backgroundImage: `url(${campusHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        
        {/* Decorative Shapes */}
        <div className="absolute top-10 right-10 w-20 h-20 border-2 border-primary-foreground/20 rotate-45 animate-glow"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-accent/20 rounded-full animate-float"></div>
        
        <div className="relative container mx-auto px-4 py-24 text-center">
          <div className="max-w-5xl mx-auto animate-slide-up">
            <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full border border-primary-foreground/20">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-primary-foreground/90 font-medium">AI-Powered Campus Assistant</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-primary-foreground mb-8 leading-tight">
              Your Smart Campus
              <span className="block bg-gradient-to-r from-accent via-primary-glow to-secondary bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                Navigator & Guide
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Instant answers about schedules, dining, library services, facilities, 
              and administrative procedures. Your AI-powered campus companion.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                variant="hero" 
                size="lg"
                onClick={onStartChat}
                className="text-lg px-10 py-5 shadow-float hover:shadow-glow transition-bounce group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <MessageCircle className="h-6 w-6 mr-3 animate-glow" />
                Start Your Journey
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-10 py-5 border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/15 backdrop-blur-sm transition-bounce"
              >
                Explore Features
              </Button>
            </div>

            {/* Stats Section */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center p-6 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl border border-primary-foreground/20">
                <div className="text-3xl font-bold text-primary-foreground mb-2 animate-glow">24/7</div>
                <div className="text-sm text-primary-foreground/80">Always Available</div>
              </div>
              <div className="text-center p-6 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl border border-primary-foreground/20">
                <div className="text-3xl font-bold text-primary-foreground mb-2 animate-glow">1000+</div>
                <div className="text-sm text-primary-foreground/80">Topics Covered</div>
              </div>
              <div className="text-center p-6 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl border border-primary-foreground/20">
                <div className="text-3xl font-bold text-primary-foreground mb-2 animate-glow">Instant</div>
                <div className="text-sm text-primary-foreground/80">Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="container mx-auto px-4 py-24 relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm text-primary font-medium">Comprehensive Campus Knowledge</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-slide-up">
            Everything You Need to Know
            <span className="block text-3xl md:text-4xl bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              About Campus Life
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our advanced AI assistant provides instant, accurate information about all aspects of university life. 
            Ask naturally and get comprehensive answers in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="animate-slide-up group" 
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <Card className="p-8 bg-gradient-card border-2 border-border/50 shadow-accent hover:shadow-float transition-bounce hover:scale-105 relative overflow-hidden">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="p-3 rounded-2xl bg-gradient-primary text-primary-foreground group-hover:animate-glow shadow-elegant">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-lg text-card-foreground group-hover:text-primary transition-smooth">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed relative z-10">{feature.description}</p>
                
                {/* Decorative corner */}
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-primary/20 group-hover:border-primary/40 transition-smooth"></div>
              </Card>
            </div>
          ))}
        </div>

        {/* Enhanced Quick Start Section */}
        <div className="mt-28 text-center">
          <Card className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-card via-muted/30 to-card border-2 border-primary/20 shadow-float relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary animate-shimmer bg-[length:200%_100%]"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-success/10 rounded-full mb-6 border border-success/20">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-success font-medium">Ready to Explore?</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-card-foreground mb-6 animate-slide-up">
                Start Your Campus Journey
                <span className="block text-2xl md:text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Ask Anything, Anytime
                </span>
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Simply type your question in natural language. From "What time does the library close?" 
                to "How do I register for classes?" - I'm here to help with everything campus-related.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="cta" 
                  size="lg" 
                  onClick={onStartChat}
                  className="px-8 py-4 shadow-elegant hover:shadow-glow transition-bounce group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <MessageCircle className="h-6 w-6 mr-3 animate-glow" />
                  Ask Your First Question
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-4 border-2 transition-bounce"
                >
                  View Sample Questions
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;