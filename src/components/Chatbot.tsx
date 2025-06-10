
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your insurance assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const quickReplies = [
    "Policy information",
    "Claim status", 
    "Renew policy",
    "Contact support"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage("");
  };

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("policy") || lowerMessage.includes("insurance")) {
      return "I can help you with policy information. You can view your active policies in the dashboard or get quotes for new policies. What specific information do you need?";
    } else if (lowerMessage.includes("claim")) {
      return "For claim-related queries, you can file a new claim through our portal or check the status of existing claims. Would you like me to guide you through the process?";
    } else if (lowerMessage.includes("renew")) {
      return "Policy renewal is easy! You can renew your policy online with just a few clicks. I can help you find the renewal option for your specific policy.";
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("support")) {
      return "You can reach our support team at 1800-123-4567 or email us at support@buddiesinsurance.com. Our team is available 24/7 to assist you.";
    } else {
      return "I'm here to help with insurance-related questions. You can ask me about policies, claims, renewals, or contact information. How can I assist you?";
    }
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-insurance-primary hover:bg-insurance-dark shadow-xl z-50 transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-2xl z-50 flex flex-col bg-background border-border">
          <CardHeader className="bg-insurance-primary text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                Insurance Assistant
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-insurance-dark"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isBot
                        ? 'bg-muted text-foreground'
                        : 'bg-insurance-primary text-white'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.isBot && <Bot className="h-4 w-4 mt-1 flex-shrink-0" />}
                      <p className="text-sm">{message.text}</p>
                      {!message.isBot && <User className="h-4 w-4 mt-1 flex-shrink-0" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Quick options:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickReplies.map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs"
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-insurance-primary hover:bg-insurance-dark"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
