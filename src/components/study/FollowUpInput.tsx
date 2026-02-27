import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useState } from 'react';

interface FollowUpInputProps {
  onSubmit: (question: string) => void;
  disabled?: boolean;
}

export default function FollowUpInput({ onSubmit, disabled }: FollowUpInputProps) {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question.trim());
      setQuestion('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        placeholder="Ask a follow-up question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={disabled}
        className="flex-1"
      />
      <Button type="submit" disabled={disabled || !question.trim()}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
