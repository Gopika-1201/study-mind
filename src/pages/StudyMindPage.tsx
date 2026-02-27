import { useState, useCallback } from 'react';
import { Brain, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import NoteInput from '@/components/study/NoteInput';
import ModeSelector, { type StudyMode } from '@/components/study/ModeSelector';
import ChatDisplay, { type Message } from '@/components/study/ChatDisplay';
import FollowUpInput from '@/components/study/FollowUpInput';
import { supabase } from '@/db/supabase';

const getSystemPrompt = (mode: StudyMode): string => {
  switch (mode) {
    case 'summarize':
      return 'You are StudyMind. Summarize these student notes into clear bullet points with key takeaways.';
    case 'quiz':
      return 'You are StudyMind. Create 5 multiple choice questions from these notes. Format: Q1: [question] A) B) C) D) Answer: [letter]';
    case 'flashcards':
      return 'You are StudyMind. Create 6 flashcards from these notes. Format: 1. [Term] A: [Definition]';
    case 'explain':
      return 'You are StudyMind. Explain these notes simply like a friendly teacher talking to a 15-year-old student.';
    default:
      return 'You are StudyMind, an AI study assistant.';
  }
};

export default function StudyMindPage() {
  const [notes, setNotes] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateContent = useCallback(
    async (mode: StudyMode, content: string) => {
      if (!content.trim()) {
        toast.error('Please enter some notes or a topic first');
        return;
      }

      setIsLoading(true);

      // Add user message to chat
      const userMessage: Message = { role: 'user', content };
      setMessages((prev) => [...prev, userMessage]);

      try {
        // Call Groq API via Edge Function
        const { data, error } = await supabase.functions.invoke('groq-chat', {
          body: {
            messages: [
              {
                role: 'system',
                content: getSystemPrompt(mode),
              },
              {
                role: 'user',
                content,
              },
            ],
          },
        });

        if (error) {
          const errorMsg = await error?.context?.text();
          console.error('Edge function error:', errorMsg || error?.message);
          toast.error('Failed to generate content. Please try again.');
          setIsLoading(false);
          return;
        }

        // Extract AI response
        const aiResponse = data?.choices?.[0]?.message?.content || 'No response generated';

        // Add AI response to chat
        const aiMessage: Message = { role: 'model', content: aiResponse };
        setMessages((prev) => [...prev, aiMessage]);

        setIsLoading(false);
      } catch (err) {
        console.error('Error generating content:', err);
        toast.error('An error occurred. Please try again.');
        setIsLoading(false);
      }
    },
    []
  );

  const handleFollowUp = useCallback(
    async (question: string) => {
      if (!question.trim()) return;

      setIsLoading(true);
      const userMessage: Message = { role: 'user', content: question };
      setMessages((prev) => [...prev, userMessage]);

      try {
        // Build conversation history for context
        const conversationMessages = messages.map((msg) => ({
          role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.content,
        }));

        // Add system prompt for chat
        const allMessages = [
          {
            role: 'system' as const,
            content: 'You are StudyMind, a helpful AI study assistant. Answer student questions clearly and helpfully.',
          },
          ...conversationMessages,
          {
            role: 'user' as const,
            content: question,
          },
        ];

        // Call Groq API via Edge Function
        const { data, error } = await supabase.functions.invoke('groq-chat', {
          body: {
            messages: allMessages,
          },
        });

        if (error) {
          const errorMsg = await error?.context?.text();
          console.error('Edge function error:', errorMsg || error?.message);
          toast.error('Failed to get response. Please try again.');
          setIsLoading(false);
          return;
        }

        // Extract AI response
        const aiResponse = data?.choices?.[0]?.message?.content || 'No response generated';

        const aiMessage: Message = { role: 'model', content: aiResponse };
        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
      } catch (err) {
        console.error('Error with follow-up:', err);
        toast.error('An error occurred. Please try again.');
        setIsLoading(false);
      }
    },
    [messages]
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">StudyMind</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Study Assistant</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Input & Controls */}
          <div className="space-y-6">
            <NoteInput value={notes} onChange={setNotes} disabled={isLoading} />
            <ModeSelector onModeSelect={(mode) => generateContent(mode, notes)} disabled={isLoading || !notes.trim()} />
            
            {/* Loading Spinner */}
            {isLoading && (
              <div className="flex items-center justify-center gap-3 p-6 bg-card rounded-lg border border-border">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="text-muted-foreground">AI is thinking...</span>
              </div>
            )}
          </div>

          {/* Right Column - Output */}
          <div className="space-y-6">
            <ChatDisplay messages={messages} isLoading={isLoading} />
            {messages.length > 0 && (
              <FollowUpInput onSubmit={handleFollowUp} disabled={isLoading} />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026 StudyMind. Powered by AI.
        </div>
      </footer>
    </div>
  );
}
