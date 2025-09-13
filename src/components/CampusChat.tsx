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
    <Card className="flex flex-col h-[600px] max-w-4xl mx-auto bg-gradient-card border shadow-elegant">
      <div className="flex items-center gap-3 p-4 border-b bg-gradient-primary text-primary-foreground">
        <MessageSquare className="h-5 w-5" />
        <h2 className="font-semibold">Campus Assistant</h2>
        <div className="ml-auto">
          <div className="w-2 h-2 bg-accent rounded-full animate-glow"></div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3 animate-fade-in",
              message.sender === 'user' ? "justify-end" : "justify-start"
            )}
          >
            {message.sender === 'bot' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
            )}
            
            <div
              className={cn(
                "max-w-[80%] p-3 rounded-lg",
                message.sender === 'user'
                  ? "bg-primary text-primary-foreground ml-auto"
                  : "bg-muted"
              )}
            >
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {message.content}
              </div>
            </div>
            
            {message.sender === 'user' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <User className="h-4 w-4 text-accent-foreground" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3 animate-fade-in">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about schedules, dining, library, facilities, or admin..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!inputValue.trim()} variant="default">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CampusChat;