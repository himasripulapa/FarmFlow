import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot, PhoneCall } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const WhatsAppHelpWidget: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Namaste! Welcome to FarmFlow Agri Helpline. How can we assist your farm harvest today?', isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { text: userText, isBot: false }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          text: `Thank you! An agri advisor or FarmFlow officer will review your batch log inquiry. You can also call toll-free 1800-FARM-FLOW.`,
          isBot: true
        }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-6 z-40">
      {isOpen ? (
        <div className="bg-white dark:bg-slate-900 border border-emerald-200 dark:border-slate-800 rounded-3xl w-80 sm:w-96 shadow-2xl overflow-hidden flex flex-col h-96 animate-in slide-in-from-bottom duration-200">
          
          {/* Header */}
          <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-sm">
                <Bot className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h4 className="font-bold text-sm">FarmFlow Support</h4>
                <p className="text-[10px] text-emerald-200">Online 24/7 • Multilingual Support</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-emerald-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 dark:bg-slate-950 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    m.isBot
                      ? 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100'
                      : 'bg-emerald-700 text-white font-medium'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-800"
            />
            <button
              type="submit"
              className="p-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-700 hover:bg-emerald-800 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl ring-4 ring-emerald-500/20 transition-transform hover:scale-105 active:scale-95"
          title="WhatsApp Support Chat"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      )}
    </div>
  );
};
