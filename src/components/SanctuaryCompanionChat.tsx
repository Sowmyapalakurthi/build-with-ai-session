import React, { useState, useRef, useEffect } from 'react';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'companion';
  text: string;
  timestamp: string;
}

interface SanctuaryCompanionChatProps {
  isOpen?: boolean;
  isInline?: boolean;
  onClose?: () => void;
  onOpenBreathing?: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome',
    sender: 'companion',
    text: "Welcome to this quiet space. If you're feeling low, overwhelmed, or questioning your progress today, remember: seasons of rest are not wasted time. You don't have to prove anything right now. What is feeling heavy on your heart or mind?",
    timestamp: 'Just now',
  },
];

const SUGGESTED_PROMPTS = [
  "I feel like I'm falling behind and wasting time...",
  "I'm overwhelmed and losing motivation to keep going.",
  "I'm criticizing myself for being distracted today.",
  "I just need a gentle reminder to keep believing in myself.",
];

export const SanctuaryCompanionChat: React.FC<SanctuaryCompanionChatProps> = ({
  isOpen = true,
  isInline = false,
  onClose,
  onOpenBreathing,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('compass_chat_messages');
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('compass_chat_messages', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen || isInline) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isInline]);

  const handleSendMessage = async (textToSend?: string) => {
    const content = (textToSend || inputText).trim();
    if (!content || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: content,
          messages: nextMessages.slice(-6).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error('Network error');
      }

      const data = await res.json();
      const companionMsg: ChatMessage = {
        id: `comp-${Date.now()}`,
        sender: 'companion',
        text: data.reply || "Take a gentle breath. You are safe, and your journey unfolds in its own quiet rhythm.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, companionMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `comp-${Date.now()}`,
        sender: 'companion',
        text: "Let your shoulders soften and release the jaw. Feeling low is not a failure — it is your nervous system asking for tenderness, not pressure. Give yourself permission to pause for just 10 minutes right now.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages(INITIAL_MESSAGES);
  };

  if (!isOpen && !isInline) return null;

  const content = (
    <div
      className={`w-full flex flex-col overflow-hidden bg-surface-container-lowest border border-surface-variant/60 shadow-sm ${
        isInline
          ? 'rounded-3xl max-w-xl mx-auto h-[calc(100vh-140px)]'
          : 'max-w-lg h-[90vh] max-h-[700px] rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-200'
      }`}
    >
      {/* Chat Sanctuary Header */}
      <div className="px-4 sm:px-5 py-3.5 bg-surface-container-low border-b border-surface-variant/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-secondary-container flex items-center justify-center text-primary shadow-xs">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                spa
              </span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-primary rounded-full ring-2 ring-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-title-md text-sm font-semibold text-on-surface">
                Sanctuary Companion
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-primary text-[10px] font-semibold uppercase tracking-wider">
                Gentle Hope
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Compassionate guidance when you feel low or weary
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {onOpenBreathing && (
            <button
              type="button"
              onClick={onOpenBreathing}
              title="Pause for breathing"
              className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-primary transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">air</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleClearHistory}
            title="Reset conversation"
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px]">refresh</span>
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-surface/40">
        {/* Subtle Grounding Quote Banner */}
        <div className="p-3 rounded-2xl bg-surface-container-low border border-surface-variant/40 flex items-center gap-2.5 text-secondary">
          <span className="material-symbols-outlined text-[18px] shrink-0 text-primary">energy_savings_leaf</span>
          <span className="text-xs italic font-serif leading-snug">
            “When roots feel dry, we do not shout at the tree to bloom. We simply offer water and patience.”
          </span>
        </div>

        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs transition-all ${
                  isUser
                    ? 'bg-primary text-on-primary rounded-br-xs'
                    : 'bg-surface-container-low text-on-surface rounded-bl-xs border border-surface-variant/50'
                }`}
              >
                {!isUser && (
                  <div className="flex items-center gap-1.5 text-primary mb-1 text-[10px] font-semibold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[13px]">spa</span>
                    <span>Companion</span>
                  </div>
                )}
                <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
              </div>
              <span className="text-[10px] text-on-surface-variant/70 px-1">
                {m.timestamp}
              </span>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start space-y-1">
            <div className="bg-surface-container-low text-on-surface rounded-2xl rounded-bl-xs p-3.5 border border-surface-variant/50 shadow-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[17px] animate-spin">
                spa
              </span>
              <span className="text-xs text-on-surface-variant italic">
                Crafting a compassionate reflection...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length <= 4 && !isLoading && (
        <div className="px-3.5 py-2 bg-surface-container-lowest border-t border-surface-variant/30 flex gap-1.5 overflow-x-auto no-scrollbar">
          {SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(prompt)}
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-surface-container text-xs text-secondary hover:bg-secondary-container hover:text-primary transition-colors cursor-pointer shrink-0 border border-surface-variant/40"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Bar */}
      <div className="p-3 sm:p-3.5 bg-surface-container-lowest border-t border-surface-variant/40">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="What feels heavy? Speak freely, without judgment..."
              disabled={isLoading}
              className="w-full bg-surface-container-low text-on-surface text-xs sm:text-sm rounded-xl pl-3.5 pr-8 py-2.5 shadow-inner focus:outline-none focus:ring-1 focus:ring-primary/20 border border-surface-variant/60"
            />
            {inputText.trim() && (
              <button
                type="button"
                onClick={() => setInputText('')}
                className="absolute right-2.5 top-2.5 text-on-surface-variant hover:text-on-surface text-xs"
              >
                <span className="material-symbols-outlined text-[15px]">cancel</span>
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container disabled:opacity-40 transition-all active:scale-95 cursor-pointer shadow-xs shrink-0"
            title="Send message"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
        <div className="flex items-center justify-between mt-1.5 px-1 text-[10px] text-on-surface-variant/70">
          <span>Safe, private, compassionate support</span>
          {onOpenBreathing && (
            <button
              type="button"
              onClick={onOpenBreathing}
              className="text-secondary hover:underline cursor-pointer flex items-center gap-0.5"
            >
              <span className="material-symbols-outlined text-[12px]">air</span>
              <span>Need 60s breathing break</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (isInline) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-3 pb-24">
        {content}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-inverse-surface/65 backdrop-blur-md transition-all">
      {content}
    </div>
  );
};
