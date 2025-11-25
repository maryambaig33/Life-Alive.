import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles, Loader2 } from 'lucide-react';
import { getWellnessAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const WellnessChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Hello! I'm your Life Alive wellness companion. How are you feeling today? I can help with mindfulness tips, nutrition questions, or just finding some balance.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Format history for Gemini API
      const history = messages.map(m => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));

      const responseText = await getWellnessAdvice(history, userMessage.text);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText || "I'm having a moment of stillness. Could you try asking again?",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-earth-200 overflow-hidden">
      <div className="bg-sage-50 p-4 border-b border-sage-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-sage-200 flex items-center justify-center text-sage-700">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-serif font-bold text-sage-900">Wellness Coach</h2>
          <p className="text-xs text-sage-600">Always here to support you</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-earth-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-[80%] rounded-2xl p-4 shadow-sm
                ${msg.role === 'user' 
                  ? 'bg-sage-600 text-white rounded-br-none' 
                  : 'bg-white text-earth-800 border border-earth-100 rounded-bl-none'
                }
              `}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <span 
                className={`text-[10px] mt-2 block opacity-70 
                  ${msg.role === 'user' ? 'text-sage-100' : 'text-earth-400'}
                `}
              >
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-earth-100 shadow-sm flex items-center gap-2">
               <Loader2 className="w-4 h-4 text-sage-500 animate-spin" />
               <span className="text-xs text-earth-500">Thinking...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-earth-200">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about nutrition, mindfulness, or share your thoughts..."
            className="flex-1 p-3 rounded-xl border border-earth-200 focus:ring-2 focus:ring-sage-400 focus:border-transparent outline-none bg-earth-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-sage-600 text-white p-3 rounded-xl hover:bg-sage-700 transition-colors disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default WellnessChat;