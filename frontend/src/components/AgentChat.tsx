/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Check, XCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import apiClient from '../api/axiosClient';
import { useAuth } from '../hooks/useAuth';

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
  const { appUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sessionKey = appUser ? `active_chat_session_id_${appUser.id}` : 'active_chat_session_id_guest';
  const [conversationId, setConversationId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedId = sessionStorage.getItem(sessionKey);
      Promise.resolve().then(() => {
        setConversationId(savedId);
        setMessages([]);
      });
    }
  }, [sessionKey]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const loadHistory = async () => {
      if (isOpen && conversationId) {
        setLoading(true);
        try {
          const res = await apiClient.get(`/agent/history/${conversationId}`);
          setMessages(res.data || []);
        } catch (err) {
          console.error('Failed to sync history', err);
        } finally {
          setLoading(false);
        }
      }
    };
    void loadHistory();
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
      sessionStorage.setItem(sessionKey, newSessionId);

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

  const isStaff = appUser?.role === 'admin' || appUser?.role === 'faculty';

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close assistant' : 'Open attendance assistant'}
        className="fixed bottom-[4.75rem] right-4 md:bottom-6 md:right-6 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-colors z-50 ring-4 ring-white/80 dark:ring-slate-900/80"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-[8.25rem] right-4 left-4 md:left-auto md:bottom-24 md:right-6 md:w-96 md:max-w-none max-w-lg mx-auto md:mx-0 h-[min(420px,calc(100vh-11rem))] md:h-[460px] bg-white dark:bg-slate-950 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col z-50 overflow-hidden">
          <div className="bg-slate-900 text-white px-4 py-3 shrink-0">
            <p className="font-semibold text-sm">Attendance Assistant</p>
            <p className="text-xs text-slate-400">Ask me to check or update attendance</p>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3">
            {messages.length === 0 && !loading && (
              <p className="text-xs md:text-sm text-slate-400 text-center mt-6 px-4">
                {isStaff ? (
                  <span>Try: &quot;Show me students below 75% attendance&quot;</span>
                ) : (
                  <span>Try: &quot;What is my attendance percentage?&quot;</span>
                )}
              </p>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[88%] rounded-xl px-3 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-100'
                  }`}
                >
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                  {msg.pendingConfirmation && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => void handleConfirm(true)}
                        disabled={loading}
                        className="flex items-center gap-1 bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-green-700 disabled:opacity-50"
                      >
                        <Check className="w-3 h-3" /> Confirm
                      </button>
                      <button
                        onClick={() => void handleConfirm(false)}
                        disabled={loading}
                        className="flex items-center gap-1 bg-slate-300 text-slate-700 text-xs px-3 py-1.5 rounded-lg hover:bg-slate-400 dark:bg-slate-700 dark:text-slate-200 disabled:opacity-50"
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

          <div className="p-2.5 md:p-3 border-t border-slate-200 dark:border-slate-800 flex gap-2 shrink-0 bg-white dark:bg-slate-950">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && void sendMessage()}
              placeholder="Ask something..."
              className="flex-1 min-w-0 border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={() => void sendMessage()}
              disabled={loading}
              className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 shrink-0"
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
