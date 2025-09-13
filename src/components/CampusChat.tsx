import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Bot, User, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const sampleResponses = {
  schedule: "📅 **Academic Schedule Info:**\n\n• **Fall 2024:** Aug 26 - Dec 13\n• **Spring 2025:** Jan 21 - May 9\n• **Finals Week:** Dec 9-13 (Fall), May 5-9 (Spring)\n• **Registration:** Opens Nov 1 for Spring courses\n\nNeed specific course schedules? Just ask!",
  
  dining: "🍽️ **Campus Dining Options:**\n\n• **Main Cafeteria:** 7AM-10PM daily\n• **Student Union Food Court:** 11AM-9PM\n• **Coffee Corner:** 6:30AM-6PM\n• **Late Night Grill:** 8PM-1AM (Thu-Sat)\n\n**Today's Special:** Mediterranean Bowl at Main Cafe!",
  
  library: "📚 **Library Services:**\n\n• **Hours:** 6AM-2AM (Mon-Thu), 6AM-10PM (Fri-Sun)\n• **Study Rooms:** Available for booking online\n• **Research Help:** Librarians available 9AM-9PM\n• **Printing:** $0.10/page B&W, $0.25/page color\n• **Digital Resources:** 24/7 online access\n\nBooking link: library.campus.edu/rooms",
  
  facilities: "🏢 **Campus Facilities:**\n\n• **Gym:** 5AM-11PM, includes pool & courts\n• **Computer Labs:** 24/7 access with ID card\n• **Health Center:** 8AM-6PM, emergency 24/7\n• **Career Services:** By appointment\n• **Parking:** Lots A-D, permits required\n\nNeed specific building hours or locations?",
  
  admin: "📋 **Administrative Services:**\n\n• **Registrar:** Mon-Fri 9AM-5PM\n• **Financial Aid:** Mon-Fri 8AM-4:30PM\n• **Student Accounts:** Online portal available 24/7\n• **Transcripts:** Order online or visit Registrar\n• **ID Card Services:** Mon-Fri 9AM-4PM\n\n**Emergency Contact:** (555) 123-HELP"
};

const CampusChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your Campus Assistant. I can help you with schedules, dining, library services, facilities, and administrative procedures. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('schedule') || lowerQuery.includes('semester') || lowerQuery.includes('class') || lowerQuery.includes('course')) {
      return sampleResponses.schedule;
    }
    if (lowerQuery.includes('dining') || lowerQuery.includes('food') || lowerQuery.includes('eat') || lowerQuery.includes('meal') || lowerQuery.includes('cafeteria')) {
      return sampleResponses.dining;
    }
    if (lowerQuery.includes('library') || lowerQuery.includes('book') || lowerQuery.includes('study') || lowerQuery.includes('research')) {
      return sampleResponses.library;
    }
    if (lowerQuery.includes('gym') || lowerQuery.includes('facilities') || lowerQuery.includes('building') || lowerQuery.includes('parking') || lowerQuery.includes('health')) {
      return sampleResponses.facilities;
    }
    if (lowerQuery.includes('admin') || lowerQuery.includes('registrar') || lowerQuery.includes('financial') || lowerQuery.includes('transcript') || lowerQuery.includes('tuition')) {
      return sampleResponses.admin;
    }
    
    return "I can help you with:\n\n• **Schedules** - Academic calendar, course times\n• **Dining** - Meal plans, cafeteria hours, menus\n• **Library** - Hours, study spaces, resources\n• **Facilities** - Gym, labs, parking, health center\n• **Administrative** - Registrar, financial aid, transcripts\n\nJust ask me about any of these topics!";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getResponse(userMessage.content),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-[700px] max-w-5xl mx-auto bg-gradient-to-br from-card via-muted/30 to-card border-2 border-primary/20 shadow-float relative overflow-hidden">
      {/* Animated header with gradient */}
      <div className="flex items-center gap-3 p-6 border-b-2 border-primary/20 bg-gradient-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent animate-shimmer bg-[length:200%_100%]"></div>
        <div className="relative z-10 flex items-center gap-3 w-full">
          <div className="p-2 bg-primary-foreground/20 rounded-xl backdrop-blur-sm">
            <MessageSquare className="h-6 w-6 animate-glow" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Campus AI Assistant</h2>
            <p className="text-sm text-primary-foreground/80">Your intelligent campus guide</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs font-medium">Online</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-mesh">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-4 animate-slide-up group",
              message.sender === 'user' ? "justify-end" : "justify-start"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {message.sender === 'bot' && (
              <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-primary shadow-elegant flex items-center justify-center group-hover:animate-glow">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
            )}
            
            <div
              className={cn(
                "max-w-[75%] p-4 rounded-2xl relative overflow-hidden transition-bounce",
                message.sender === 'user'
                  ? "bg-gradient-to-br from-accent to-accent/80 text-accent-foreground shadow-accent ml-auto"
                  : "bg-gradient-to-br from-card to-muted border-2 border-border/50 shadow-elegant hover:shadow-glow"
              )}
            >
              {message.sender === 'user' && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-foreground/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              )}
              <div className="whitespace-pre-wrap text-sm leading-relaxed relative z-10">
                {message.content}
              </div>
              <div className="text-xs opacity-60 mt-2 relative z-10">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            
            {message.sender === 'user' && (
              <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 shadow-elegant flex items-center justify-center group-hover:animate-glow">
                <User className="h-5 w-5 text-secondary-foreground" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-4 animate-slide-up">
            <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-primary shadow-elegant flex items-center justify-center animate-pulse">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="bg-gradient-to-br from-card to-muted border-2 border-border/50 p-4 rounded-2xl shadow-elegant">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-6 border-t-2 border-primary/20 bg-gradient-to-r from-card via-muted/50 to-card">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about schedules, dining, library, facilities, or admin procedures..."
              className="pr-12 py-3 text-base border-2 border-primary/20 rounded-2xl bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-bounce"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
              Press Enter
            </div>
          </div>
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim()} 
            variant="default"
            size="lg"
            className="px-6 py-3 rounded-2xl bg-gradient-primary hover:shadow-glow transition-bounce group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <Send className="h-5 w-5 relative z-10 group-hover:animate-glow" />
          </Button>
        </div>
        
        {/* Quick suggestions */}
        <div className="mt-4 flex flex-wrap gap-2">
          {['Library hours?', 'Dining options today?', 'Gym facilities?', 'Registration help?'].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInputValue(suggestion)}
              className="px-3 py-1 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-bounce hover:scale-105 border border-primary/20"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CampusChat;