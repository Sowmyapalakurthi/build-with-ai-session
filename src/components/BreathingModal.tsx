import React, { useState, useEffect } from 'react';

interface BreathingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BreathingModal: React.FC<BreathingModalProps> = ({ isOpen, onClose }) => {
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [countdown, setCountdown] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setPhase('Inhale');
      setCountdown(4);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) return prev - 1;

        // Advance phase (Box breathing 4-4-4-4)
        if (phase === 'Inhale') {
          setPhase('Hold');
          return 4;
        } else if (phase === 'Hold') {
          setPhase('Exhale');
          return 4;
        } else if (phase === 'Exhale') {
          setPhase('Rest');
          return 4;
        } else {
          setPhase('Inhale');
          setCyclesCompleted((c) => c + 1);
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, phase]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-md transition-opacity">
      <div className="w-full max-w-sm rounded-3xl bg-surface-container-lowest p-6 shadow-2xl flex flex-col items-center text-center space-y-5 border border-surface-variant/40 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1.5 text-primary">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              spa
            </span>
            <span className="font-label-sm uppercase tracking-wider text-secondary font-semibold">
              Mindful Pause
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-1">
          <h3 className="font-headline-sm text-2xl text-on-surface font-serif">
            Grounding Breath
          </h3>
          <p className="font-body-sm text-on-surface-variant">
            Allow the urgency of the moment to dissolve into stillness.
          </p>
        </div>

        {/* Breathing Circle Visualization */}
        <div className="relative w-44 h-44 flex items-center justify-center">
          <div
            className={`absolute inset-0 rounded-full bg-primary-fixed/40 transition-transform duration-1000 ease-in-out ${
              phase === 'Inhale'
                ? 'scale-100'
                : phase === 'Hold'
                ? 'scale-100'
                : phase === 'Exhale'
                ? 'scale-60'
                : 'scale-60'
            }`}
          />
          <div
            className={`absolute w-32 h-32 rounded-full bg-primary/20 transition-transform duration-1000 ease-in-out ${
              phase === 'Inhale' || phase === 'Hold' ? 'scale-100' : 'scale-75'
            }`}
          />
          <div className="relative z-10 flex flex-col items-center justify-center text-primary">
            <span className="font-headline-md text-3xl font-serif">{countdown}</span>
            <span className="font-label-md text-sm font-semibold tracking-wide uppercase mt-1">
              {phase}
            </span>
          </div>
        </div>

        <div className="bg-surface-container-low p-3.5 rounded-2xl w-full text-center">
          <p className="font-display-lg-mobile text-base text-primary italic font-serif">
            {phase === 'Inhale' && '“Inhale clarity and calm space...”'}
            {phase === 'Hold' && '“Rest gently in the quiet presence...”'}
            {phase === 'Exhale' && '“Exhale pressure, tension, and rush...”'}
            {phase === 'Rest' && '“Notice the peace between breaths...”'}
          </p>
          <span className="font-body-sm text-xs text-on-surface-variant block mt-1.5">
            {cyclesCompleted} gentle breath {cyclesCompleted === 1 ? 'cycle' : 'cycles'} anchored
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-primary text-on-primary font-label-md hover:bg-primary-container transition-all active:scale-[0.99] cursor-pointer"
        >
          Return Centered
        </button>
      </div>
    </div>
  );
};
