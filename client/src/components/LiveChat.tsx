import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import { MotionDiv, FadeIn } from "@/components/ui/motion";

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
};

const initialMessages = [
  {
    id: "welcome",
    content: "",
    isUser: false,
    timestamp: new Date(),
  },
];

const botResponses: Record<string, string[]> = {
  en: [
    "Welcome to Quantum Edge! How can I help you today?",
    "I'd be happy to tell you about our services. We offer web development, mobile app development, UI/UX design, digital marketing, and more!",
    "Our process typically includes discovery, planning, design, development, testing, and launch phases. Would you like more details about any specific phase?",
    "To get started with your project, you can fill out our project request form. Would you like me to show you where to find it?",
    "Our team consists of experienced professionals in various tech fields. Each project gets assigned a dedicated team based on requirements.",
    "We'd be happy to discuss your project! Please leave your contact information via our contact form and our team will reach out to you soon.",
    "I understand. Is there anything else I can help you with?",
    "I don't have information about that. Would you like to speak with a real team member? I can help you get in touch with our support team.",
  ],
  tr: [
    "Quantum Edge'e hoş geldiniz! Size bugün nasıl yardımcı olabilirim?",
    "Hizmetlerimiz hakkında bilgi vermekten memnuniyet duyarım. Web geliştirme, mobil uygulama geliştirme, UI/UX tasarımı, dijital pazarlama ve daha fazlasını sunuyoruz!",
    "Sürecimiz genellikle keşif, planlama, tasarım, geliştirme, test ve lansman aşamalarını içerir. Herhangi bir aşama hakkında daha fazla bilgi almak ister misiniz?",
    "Projenize başlamak için proje talep formumuzu doldurabilirsiniz. Size formun nerede olduğunu göstermemi ister misiniz?",
    "Ekibimiz çeşitli teknoloji alanlarında deneyimli profesyonellerden oluşmaktadır. Her projeye, gereksinimlere dayalı olarak özel bir ekip atanır.",
    "Projenizi konuşmaktan memnuniyet duyarız! Lütfen iletişim formumuz aracılığıyla iletişim bilgilerinizi bırakın, ekibimiz en kısa sürede sizinle iletişime geçecektir.",
    "Anlıyorum. Başka bir konuda yardımcı olabilir miyim?",
    "Bu konuda bilgim yok. Gerçek bir ekip üyesiyle konuşmak ister misiniz? Destek ekibimizle iletişime geçmenize yardımcı olabilirim.",
  ],
};

// Simple AI matching function for demonstration
function getAIResponse(message: string, locale: string): string {
  const lowerMessage = message.toLowerCase();
  const responses = botResponses[locale] || botResponses.en;
  
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("merhaba") || lowerMessage.includes("selam")) {
    return responses[0];
  } else if (lowerMessage.includes("service") || lowerMessage.includes("hizmet")) {
    return responses[1];
  } else if (lowerMessage.includes("process") || lowerMessage.includes("süreç")) {
    return responses[2];
  } else if (lowerMessage.includes("start") || lowerMessage.includes("begin") || lowerMessage.includes("başla")) {
    return responses[3];
  } else if (lowerMessage.includes("team") || lowerMessage.includes("ekip")) {
    return responses[4];
  } else if (lowerMessage.includes("contact") || lowerMessage.includes("talk") || lowerMessage.includes("iletişim") || lowerMessage.includes("konuş")) {
    return responses[5];
  } else if (lowerMessage.includes("thank") || lowerMessage.includes("thanks") || lowerMessage.includes("teşekkür")) {
    return responses[6];
  } else {
    return responses[7];
  }
}

export default function LiveChat() {
  const { locale, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load translated welcome message after first render
  useEffect(() => {
    initialMessages[0].content = botResponses[locale][0];
    setMessages(initialMessages);
  }, [locale]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle bot typing animation
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isBotTyping) {
      timeout = setTimeout(() => {
        const lastUserMessage = [...messages].reverse().find(m => m.isUser);
        if (lastUserMessage) {
          const botResponse = getAIResponse(lastUserMessage.content, locale);
          setMessages(prev => [
            ...prev,
            {
              id: Date.now().toString(),
              content: botResponse,
              isUser: false,
              timestamp: new Date(),
            },
          ]);
        }
        setIsBotTyping(false);
      }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }
    return () => clearTimeout(timeout);
  }, [isBotTyping, messages, locale]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");
    setIsBotTyping(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else {
      setIsMinimized(!isMinimized);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    toast({
      title: locale === "en" ? "Chat closed" : "Sohbet kapatıldı",
      description: locale === "en" ? "You can reopen the chat anytime." : "Sohbeti istediğiniz zaman yeniden açabilirsiniz.",
    });
  };

  return (
    <>
      {/* Chat button */}
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 rounded-full size-14 shadow-lg z-50 flex items-center justify-center"
        aria-label={isOpen ? "Minimize chat" : "Open chat"}
      >
        <MessageCircle size={24} />
      </Button>

      {/* Chat window */}
      {isOpen && (
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed bottom-24 right-6 w-[350px] bg-card/90 backdrop-blur-sm rounded-lg shadow-lg z-50 overflow-hidden border",
            isMinimized ? "h-14" : "h-[500px]"
          )}
        >
          {/* Chat header */}
          <div className="flex items-center justify-between p-3 border-b bg-primary/10">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <MessageCircle size={16} />
              </div>
              <h3 className="font-semibold">
                {locale === "en" ? "Live Chat Support" : "Canlı Destek"}
              </h3>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={toggleChat}
                aria-label={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={closeChat}
                aria-label="Close"
              >
                <X size={16} />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages area */}
              <div className="p-4 h-[400px] overflow-y-auto flex flex-col gap-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "max-w-[80%] p-3 rounded-lg",
                      msg.isUser
                        ? "bg-primary text-primary-foreground self-end rounded-br-none"
                        : "bg-muted self-start rounded-bl-none"
                    )}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-[10px] mt-1 opacity-70">
                      {msg.timestamp.toLocaleTimeString(locale, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                ))}
                {isBotTyping && (
                  <FadeIn className="self-start bg-muted p-3 rounded-lg rounded-bl-none max-w-[80%]">
                    <div className="flex gap-1">
                      <span className="animate-bounce">•</span>
                      <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                        •
                      </span>
                      <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                        •
                      </span>
                    </div>
                  </FadeIn>
                )}
                <div ref={messageEndRef} />
              </div>

              {/* Input area */}
              <div className="border-t p-3 flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    locale === "en" ? "Type your message..." : "Mesajınızı yazın..."
                  }
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  size="icon"
                  aria-label="Send"
                >
                  <Send size={16} />
                </Button>
              </div>
            </>
          )}
        </MotionDiv>
      )}
    </>
  );
}