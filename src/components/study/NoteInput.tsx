import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface NoteInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function NoteInput({ value, onChange, disabled }: NoteInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="notes" className="text-lg font-semibold">
        Your Study Notes or Topic
      </Label>
      <Textarea
        id="notes"
        placeholder="Paste your study notes here or type a topic you want to learn about..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="min-h-[200px] resize-none text-base"
      />
    </div>
  );
}
