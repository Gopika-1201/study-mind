import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';

export interface QuizQuestionData {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizQuestionProps {
  question: QuizQuestionData;
  questionNumber: number;
}

export default function QuizQuestion({ question, questionNumber }: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    setShowResult(true);
  };

  const isCorrect = selectedAnswer === question.options[question.correctAnswer];

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
          {questionNumber}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-lg mb-4">{question.question}</h4>
          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const optionValue = option;
                const isThisCorrect = index === question.correctAnswer;
                const isSelected = selectedAnswer === option;

                return (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                      showResult && isThisCorrect
                        ? 'border-green-500 bg-green-50 dark:bg-green-950'
                        : showResult && isSelected && !isThisCorrect
                          ? 'border-red-500 bg-red-50 dark:bg-red-950'
                          : 'border-border hover:bg-accent'
                    }`}
                  >
                    <RadioGroupItem value={optionValue} id={`q${questionNumber}-${index}`} disabled={showResult} />
                    <Label
                      htmlFor={`q${questionNumber}-${index}`}
                      className="flex-1 cursor-pointer flex items-center justify-between"
                    >
                      <span>{option}</span>
                      {showResult && isThisCorrect && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                      {showResult && isSelected && !isThisCorrect && <XCircle className="h-5 w-5 text-red-600" />}
                    </Label>
                  </div>
                );
              })}
            </div>
          </RadioGroup>
          {!showResult && (
            <Button onClick={handleSubmit} disabled={!selectedAnswer} className="mt-4">
              Submit Answer
            </Button>
          )}
          {showResult && (
            <div className={`mt-4 p-3 rounded-lg ${isCorrect ? 'bg-green-100 dark:bg-green-950' : 'bg-red-100 dark:bg-red-950'}`}>
              <p className={`font-semibold ${isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
