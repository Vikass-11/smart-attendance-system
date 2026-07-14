import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Check, XCircle, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import apiClient from '../api/axiosClient';

interface PendingConfirmation {
  toolName: string;
  input: Record<string, any>;
  toolCallId: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  pendingConfirmation?: PendingConfirmation | null;
}

let messageIdCounter = 0;
const nextId = () => `msg-${Date.now()}-${messageIdCounter++}`;

const AgentChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    setLoading(true);
    const userText = input;
    setMessages((prev) => [...prev, { id: nextId(), role: 'user', text: userText }]);
    setInput('');

    try {
      const res = await apiClient.post('/agent/chat', {
        message: userText,
        conversationId,
      });
      setConversationId(res.data.conversationId);
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: 'assistant', text: res.data.reply, pendingConfirmation: res.data.pendingConfirmation },
      ]);
    } catch (err) {
      setMessages((prev) => [...prev, { id: nextId(), role: 'assistant', text: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (confirmed: boolean) => {
    setLoading(true);
    if (!conversationId) {
      setLoading(false);
      return;
    }

    try {
      const res = await apiClient.post('/agent/confirm', { conversationId, confirmed });
      setMessages((prev) => [
        ...prev.map((m) => (m.pendingConfirmation ? { ...m, pendingConfirmation: null } : m)),
        { id: nextId(), role: 'assistant', text: res.data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [...prev, { id: nextId(), role: 'assistant', text: 'Failed to process confirmation.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-indigo-600 to-indigo-500 text-white p-4 rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 transition-all z-50"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50 overflow-hidden">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white px-4 py-4 relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl" />
            <div className="flex items-center gap-2 relative z-10">
              <div className="bg-indigo-500/20 p-1.5 rounded-lg ring-1 ring-indigo-400/30">
                <Sparkles className="w-4 h-4 text-indigo-300" />
              </div>
              <div>
                <p className="font-semibold text-sm">Attendance Assistant</p>
                <p className="text-xs text-slate-400">Ask me anything, I'm here to help</p>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
            {messages.length === 0 && (
              <div className="text-center mt-8">
                <p className="text-sm text-slate-400 mb-2">Try asking:</p>
                <p className="text-xs text-indigo-500 bg-indigo-50 rounded-lg px-3 py-2 inline-block">
                  "Show me students below 75% attendance"
                </p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-indigo-600 to-indigo-500 text-white'
                      : 'bg-white text-slate-800 border border-slate-100'
                  }`}
                >
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                  {msg.pendingConfirmation && (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleConfirm(true)}
                        disabled={loading}
                        className="flex items-center gap-1 bg-emerald-500 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-emerald-600 disabled:opacity-50 transition-colors"
                      >
                        <Check className="w-3 h-3" /> Confirm
                      </button>
                      <button
                        onClick={() => handleConfirm(false)}
                        disabled={loading}
                        className="flex items-center gap-1 bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-lg hover:bg-slate-200 disabled:opacity-50 transition-colors"
                      >
                        <XCircle className="w-3 h-3" /> Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-1 text-xs text-slate-400 px-1">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </div>

          <div className="p-3 border-t border-slate-200 flex gap-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask something..."
              className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-gradient-to-br from-indigo-600 to-indigo-500 text-white p-2 rounded-lg hover:shadow-md disabled:opacity-50 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AgentChat;