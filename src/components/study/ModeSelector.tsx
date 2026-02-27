import { Button } from '@/components/ui/button';
import { FileText, HelpCircle, CreditCard, Lightbulb } from 'lucide-react';

export type StudyMode = 'summarize' | 'quiz' | 'flashcards' | 'explain';

interface ModeSelectorProps {
  onModeSelect: (mode: StudyMode) => void;
  disabled?: boolean;
}

const modes = [
  {
    id: 'summarize' as StudyMode,
    label: 'SUMMARIZE',
    icon: FileText,
    description: 'Get clear bullet points',
  },
  {
    id: 'quiz' as StudyMode,
    label: 'QUIZ ME',
    icon: HelpCircle,
    description: '5 multiple choice questions',
  },
  {
    id: 'flashcards' as StudyMode,
    label: 'FLASHCARDS',
    icon: CreditCard,
    description: '6 flashcards',
  },
  {
    id: 'explain' as StudyMode,
    label: 'EXPLAIN SIMPLY',
    icon: Lightbulb,
    description: 'Easy explanation for students',
  },
];

export default function ModeSelector({ onModeSelect, disabled }: ModeSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Choose Study Mode</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {modes.map((mode) => {
          const Icon = mode.icon;
          return (
            <Button
              key={mode.id}
              onClick={() => onModeSelect(mode.id)}
              disabled={disabled}
              variant="outline"
              className="h-auto flex-col items-start gap-2 p-4 hover:bg-accent hover:border-primary transition-colors"
            >
              <div className="flex items-center gap-2 w-full">
                <Icon className="h-5 w-5 text-primary" />
                <span className="font-semibold">{mode.label}</span>
              </div>
              <span className="text-sm text-muted-foreground">{mode.description}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
