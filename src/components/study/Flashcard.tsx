import { Card } from '@/components/ui/card';
import { useState } from 'react';

export interface FlashcardData {
  front: string;
  back: string;
}

interface FlashcardProps {
  card: FlashcardData;
  cardNumber: number;
}

export default function Flashcard({ card, cardNumber }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative h-[200px] cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <Card
          className="absolute inset-0 flex flex-col items-center justify-center p-6 backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
            {cardNumber}
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Term</p>
            <p className="text-lg font-semibold">{card.front}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Click to flip</p>
        </Card>

        {/* Back */}
        <Card
          className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-primary text-primary-foreground backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="text-center">
            <p className="text-sm opacity-80 mb-2">Definition</p>
            <p className="text-base">{card.back}</p>
          </div>
          <p className="text-xs opacity-70 mt-4">Click to flip back</p>
        </Card>
      </div>
    </div>
  );
}
