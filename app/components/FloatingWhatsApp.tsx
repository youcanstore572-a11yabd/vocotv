'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Send, X } from 'lucide-react';
import { CONSTANTS } from '@/lib/seo';

const BRAND = CONSTANTS.BRAND_NAME;

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------
interface ChatMessage {
  id: string;
  sender: 'support' | 'user';
  text: string;
  time: string;
}

// ---------------------------------------------------------------------------
// MODULE-SCOPE HELPERS — stable component references, no per-render allocation
// ---------------------------------------------------------------------------
function getCurrentTime(): string {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

function buildInitialHistory(): ChatMessage[] {
  return [
    {
      id: 'welcome',
      sender: 'support',
      text: `Hello! How can we assist you with ${BRAND} today?`,
      time: getCurrentTime(),
    },
  ];
}

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="white"
    className="w-7 h-7 md:w-8 md:h-8"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.448 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const SupportProfilePic = ({ size = 40 }: { size?: number }) => (
  <div
    className="rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-white/20"
    style={{ width: size, height: size }}
  >
    <Image
      src="/img/profile.webp"
      alt={`${BRAND} Customer Service Representative`}
      width={size}
      height={size}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  </div>
);

// ---------------------------------------------------------------------------
// STYLES — plain <style> tag; styled-jsx is not guaranteed in App Router
// ---------------------------------------------------------------------------
const FLOATING_STYLES = `
  body.mobile-menu-open .whatsapp-element {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }
  @keyframes whatsapp-fade-in {
    from { opacity: 0; transform: translateY(10px) scale(0.95); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes whatsapp-message-in {
    from { opacity: 0; transform: translateY(10px) scale(0.95); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .whatsapp-animate-fade-in    { animation: whatsapp-fade-in 0.3s ease-out; }
  .whatsapp-animate-message-in { animation: whatsapp-message-in 0.2s ease-out; }
`;

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------
export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [showBubble, setShowBubble] = useState(true);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(buildInitialHistory);

  const bubbleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextCycleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);

  // Auto help bubble — cycles while the chat is closed
  useEffect(() => {
    if (open) {
      setShowBubble(false);
      return;
    }

    const showBubbleCycle = () => {
      setShowBubble(true);
      bubbleTimeoutRef.current = setTimeout(() => {
        setShowBubble(false);
        nextCycleTimeoutRef.current = setTimeout(showBubbleCycle, 6000);
      }, 4000);
    };

    showBubbleCycle();

    return () => {
      if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
      if (nextCycleTimeoutRef.current) clearTimeout(nextCycleTimeoutRef.current);
    };
  }, [open]);

  // Auto-scroll chat to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Focus input when chat opens
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, [open]);

  // Escape key — only attached while chat is open
  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open]);

  const sendToWhatsapp = useCallback(() => {
    const trimmed = message.trim();
    if (!trimmed) return;

    setChatHistory((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, sender: 'user', text: trimmed, time: getCurrentTime() },
    ]);
    setMessage('');

    const url = `${CONSTANTS.CONTACT.whatsappUrl}?text=${encodeURIComponent(trimmed)}`;
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');

    if (!newWindow) {
      window.location.href = url;
    }
  }, [message]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendToWhatsapp();
      }
    },
    [sendToWhatsapp]
  );

  return (
    <div className="whatsapp-global-wrapper">
      {/* Auto help bubble */}
      {!open && showBubble && (
        <div className="fixed bottom-28 right-6 z-[30] whatsapp-animate-fade-in whatsapp-element">
          <div className="bg-gradient-to-r from-green-500 to-green-600 shadow-lg rounded-none px-4 py-2.5 text-sm font-medium text-white relative max-w-[220px]">
            Need help? Chat with us!
            <div
              className="absolute -bottom-2 right-6 w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rotate-45"
              aria-hidden="true"
            />
          </div>
        </div>
      )}

      {/* Floating action button */}
      <button
        ref={fabRef}
        type="button"
        onClick={() => {
          setOpen((prev) => !prev);
          setShowBubble(false);
        }}
        className="fixed bottom-6 right-6 z-[40] group whatsapp-element focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2"
        aria-label={open ? 'Close WhatsApp chat' : 'Chat with us on WhatsApp'}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <div className="relative">
          {!open && (
            <span
              className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30"
              aria-hidden="true"
            />
          )}
          <div className="relative bg-gradient-to-r from-green-500 to-green-600 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 group-hover:shadow-xl">
            <WhatsAppIcon />
          </div>
        </div>
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-4 md:right-6 w-[340px] sm:w-[380px] max-w-[calc(100vw-32px)] rounded-none overflow-hidden shadow-2xl z-[35] bg-white border border-slate-200 flex flex-col max-h-[80vh] md:max-h-[500px] whatsapp-element"
          role="dialog"
          aria-label="WhatsApp live chat window"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 flex items-center justify-between text-white flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <SupportProfilePic size={40} />
              <div className="min-w-0">
                <p className="font-bold text-sm sm:text-base truncate">
                  {BRAND} Support
                </p>
                <p className="text-[10px] sm:text-xs opacity-90 truncate">
                  Global Support • Typically responds in minutes
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="hover:bg-white/20 rounded-none p-1 transition flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              aria-label="Close chat window"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto bg-slate-50 min-h-[200px] max-h-[300px] md:max-h-[350px]"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {chatHistory.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                } whatsapp-animate-message-in`}
              >
                {msg.sender === 'support' && (
                  <div className="flex-shrink-0 mr-2 self-end">
                    <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white shadow-sm">
                      <Image
                        src="/img/profile.webp"
                        alt=""
                        width={28}
                        height={28}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3 py-2 sm:px-4 sm:py-2.5 rounded-none shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-gray-800'
                  }`}
                >
                  <p className="text-sm sm:text-base break-words">{msg.text}</p>
                  <span
                    className={`block text-[10px] sm:text-xs mt-1 text-right ${
                      msg.sender === 'user' ? 'text-green-100' : 'text-gray-400'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t flex gap-2 items-center flex-shrink-0">
            <label htmlFor="whatsapp-chat-input" className="sr-only">
              Type your message
            </label>
            <input
              id="whatsapp-chat-input"
              ref={inputRef}
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 rounded-none px-4 py-2.5 sm:py-3 border border-slate-200 outline-none bg-white text-gray-700 text-sm sm:text-base placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 transition min-w-0"
            />
            <button
              type="button"
              onClick={sendToWhatsapp}
              disabled={!message.trim()}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 text-white p-2.5 sm:p-3 rounded-none shadow-md transition-transform hover:scale-105 disabled:hover:scale-100 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
              aria-label="Send message via WhatsApp"
            >
              <Send size={18} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* Global styles — plain <style>, not styled-jsx */}
      <style dangerouslySetInnerHTML={{ __html: FLOATING_STYLES }} />
    </div>
  );
}