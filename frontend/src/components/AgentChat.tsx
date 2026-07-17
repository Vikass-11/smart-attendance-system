import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Check, XCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import apiClient from '../api/axiosClient';

interface PendingConfirmation {
  toolName: string;
  input: Record<string, unknown>;
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
  const [conversationId, setConversationId] = useState<string | null>(() => {
    return localStorage.getItem('active_chat_session_id');
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const loadHistory = async () => {
      if (isOpen && conversationId) {
        setLoading(true);
        try {
          const res = await apiClient.get(`/agent/history/${conversationId}`);
          setMessages(res.data.messages || []);
        } catch (err) {
          console.error('Failed to sync history', err);
        } finally {
          setLoading(false);
        }
      }
    };
    loadHistory();
  }, [isOpen, conversationId]);

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
      
      const newSessionId = res.data.conversationId;
      setConversationId(newSessionId);
      localStorage.setItem('active_chat_session_id', newSessionId);

      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: 'assistant', text: res.data.reply, pendingConfirmation: res.data.pendingConfirmation },
      ]);
    } catch (err: unknown) {
      console.error('Agent chat error', err);
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
    } catch (err: unknown) {
      console.error('Agent confirmation error', err);
      setMessages((prev) => [...prev, { id: nextId(), role: 'assistant', text: 'Failed to process confirmation.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-50"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-t-2xl">
            <p className="font-semibold text-sm">Attendance Assistant</p>
            <p className="text-xs text-slate-400">Ask me to check or update attendance</p>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && !loading && (
              <p className="text-sm text-slate-400 text-center mt-8">
                Try: "Show me students below 75% attendance"
              </p>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                    msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-800'
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
                        className="flex items-center gap-1 bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-green-700 disabled:opacity-50"
                      >
                        <Check className="w-3 h-3" /> Confirm
                      </button>
                      <button
                        onClick={() => handleConfirm(false)}
                        disabled={loading}
                        className="flex items-center gap-1 bg-slate-300 text-slate-700 text-xs px-3 py-1.5 rounded-lg hover:bg-slate-400 disabled:opacity-50"
                      >
                        <XCircle className="w-3 h-3" /> Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && <p className="text-xs text-slate-400">Thinking...</p>}
          </div>

          <div className="p-3 border-t border-slate-200 flex gap-2">
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
              className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
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