import { useState, useRef, useEffect, ReactNode } from "react";
import { Bot, Send, User as UserIcon, MessageCircle, X, Maximize2, Minimize2 } from "lucide-react";

// Minimal Shadcn UI Component Definitions for self-containment
// In a real project, these would typically be imported from a shared components/ui directory.

const Button = ({ children, onClick, className, disabled, variant = "default", size = "default" }: { children: ReactNode; onClick?: () => void; className?: string; disabled?: boolean; variant?: string; size?: string; }) => (
  <button onClick={onClick} className={`px-4 py-2 rounded-md ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
    {children}
  </button>
);

const Input = ({ value, onChange, placeholder, onKeyPress, className, disabled }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void; className?: string; disabled?: boolean; }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    onKeyPress={onKeyPress}
    className={`border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${className}`}
    disabled={disabled}
  />
);

const Card = ({ children, className }: { children: ReactNode; className?: string; }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>{children}</div>
);
const CardHeader = ({ children, className }: { children: ReactNode; className?: string; }) => (
  <div className={`p-4 border-b border-gray-200 ${className}`}>{children}</div>
);
const CardTitle = ({ children, className }: { children: ReactNode; className?: string; }) => (
  <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>
);
const CardContent = ({ children, className }: { children: ReactNode; className?: string; }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);


// Message Component (defined within this file for self-containment)
interface MessageProps {
  message: ChatMessage;
  isLatest: boolean;
}

const Message = ({ message, isLatest }: MessageProps) => {
  const isAgent = message.role === "agent";
  return (
    <div className={`flex items-start gap-3 ${isAgent ? "justify-start" : "justify-end"}`}>
      {isAgent && (
        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-orange-600" />
        </div>
      )}
      <div
        className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
          isAgent ? "bg-white rounded-tl-md border border-gray-100" : "bg-orange-600 text-white rounded-br-md"
        } ${isLatest ? "animate-fade-in" : ""}`}
      >
        <p className="text-sm break-words whitespace-pre-wrap">{message.text}</p>
        <p className={`text-xs mt-1 ${isAgent ? "text-gray-500" : "text-orange-100"}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      {!isAgent && (
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
          <UserIcon className="w-4 h-4 text-gray-600" />
        </div>
      )}
    </div>
  );
};


// MessageInput Component (defined within this file for self-containment)
interface MessageInputProps {
  onSendMessage: (text: string) => void;
  disabled: boolean;
}

const MessageInput = ({ onSendMessage, disabled }: MessageInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    onSendMessage(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !disabled) {
      handleSubmit();
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-100">
      <div className="flex gap-3">
        <Input
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:ring-orange-500 focus:border-orange-500 transition-all"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
        />
        <Button
          onClick={handleSubmit}
          disabled={disabled || !input.trim()}
          className="bg-orange-600 hover:bg-orange-700 text-white rounded-full p-3 transition-colors flex items-center justify-center w-12 h-12 shadow-lg"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};


// Main ChatInterface Component
interface ChatMessage {
  id: string;
  role: "user" | "agent";
  text: string;
  timestamp: Date;
}

const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false); // State for full-screen mode
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "agent",
      text: "Hello! I'm your AI Insurance Assistant. How can I help you today? I can answer questions about policies, claims, or coverage.",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const chatHistory = [{ role: "user", parts: [{ text: text.trim() }] }];
      const payload = { contents: chatHistory };
      const apiKey = ""; // Canvas will provide this at runtime
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API error! Status: ${response.status}`);
      }

      const result = await response.json();
      let agentMessageText = "";

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        agentMessageText = result.candidates[0].content.parts[0].text;
      } else {
        agentMessageText = "Sorry, I couldn't get a valid response from the AI.";
      }

      const formattedText = formatInsurancePlans(agentMessageText);

      const agentMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "agent",
        text: formattedText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentMessage]);

    } catch (error) {
      console.error("Error communicating with AI:", error);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: "agent",
          text: "Oops! Something went wrong while processing your request. Please try again.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Helper to clean and format insurance plan suggestions
  const formatInsurancePlans = (raw: string) => {
    let formatted = raw;

    formatted = formatted.replace(/\/tool-use[\s\S]*$/g, "");
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, "$1");
    formatted = formatted.replace(
      /(20s|30s|40s|50s and beyond|Under 30|30-49|50-64|65\+)/g,
      "\n$1\n"
    );
    formatted = formatted.replace(/(?:^|\n)[*-]\s*/g, "\n- ");
    formatted = formatted.replace(/<\/?[^>]+(>|$)/g, "");
    formatted = formatted.replace(/\s{2,}/g, " ");
    formatted = formatted.replace(/These are just general suggestions[\s\S]*?(?=\n|$)/gi, "");
    formatted = formatted.replace(/^\s*[\r\n]/gm, "");
    formatted = formatted.trim().replace(/\n{3,}/g, "\n\n");

    if (formatted.length > 400) {
      const sentences = formatted.split(/(?<=[.!?])\s+/);
      let result = "";
      let current = "";
      for (const sentence of sentences) {
        if ((current + sentence).length > 400) {
          result += current.trim() + "\n\n";
          current = "";
        }
        current += sentence + " ";
      }
      result += current.trim();
      formatted = result;
    }
    return formatted;
  };

  // Dynamically apply classes based on fullScreen state
  const cardClasses = `shadow-2xl z-50 flex flex-col bg-white border border-gray-200 rounded-xl
    ${isFullScreen
      ? 'fixed inset-0 w-full h-full rounded-none' // Full screen
      : 'fixed bottom-6 right-6 w-96 h-[400px]' // Compact size: w-96 (24rem), h-[400px]
    }`;

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 rounded-full w-18 h-18 bg-orange-600 hover:bg-orange-700 shadow-xl z-50 transition-all duration-300 hover:scale-110 text-white flex items-center justify-center"
        >
          <MessageCircle className="h-10 w-10" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className={cardClasses}>
          <CardHeader className="bg-gradient-to-r from-orange-400 via-orange-600 to-orange-700 text-white rounded-t-xl py-4 px-5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center font-bold">
                <Bot className="h-5 w-5 mr-2" />
                Insurance Assistant
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFullScreen(prev => !prev)} // Toggle full screen
                  className="text-white hover:bg-orange-800 rounded-full p-2 transition-colors"
                >
                  {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)} // Close chat
                  className="text-white hover:bg-orange-800 rounded-full p-2 transition-colors"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Messages container (flex-1 ensures it takes available space) */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-white" // Background changed to white for chat area
          >
            <div className="space-y-6">
              {messages.map((message, index) => (
                <Message
                  key={message.id}
                  message={message}
                  isLatest={index === messages.length - 1}
                />
              ))}

              {isTyping && (
                <div className="flex items-start gap-3 animate-fade-in">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-md p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input (fixed at the bottom) */}
          <MessageInput onSendMessage={handleSendMessage} disabled={isTyping} />
        </Card>
      )}
    </>
  );
};

export default ChatInterface;
