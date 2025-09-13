import React, { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import CampusChat from '@/components/CampusChat';

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  const handleStartChat = () => {
    setShowChat(true);
    // Scroll to chat section
    setTimeout(() => {
      document.getElementById('chat-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <HeroSection onStartChat={handleStartChat} />
      
      {showChat && (
        <div id="chat-section" className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Chat with Campus Assistant
            </h2>
            <p className="text-lg text-muted-foreground">
              Ask me anything about campus life and I'll help you find the information you need.
            </p>
          </div>
          <CampusChat />
        </div>
      )}
    </div>
  );
};

export default Index;
