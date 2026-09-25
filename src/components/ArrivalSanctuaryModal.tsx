import React, { useState } from 'react';

interface ArrivalSanctuaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinueToVision: () => void;
  onSkipToFocus: () => void;
}

export const ArrivalSanctuaryModal: React.FC<ArrivalSanctuaryModalProps> = ({
  isOpen,
  onClose,
  onContinueToVision,
  onSkipToFocus,
}) => {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([
    'Career & Craft',
    'Physical Vessel',
  ]);
  const [achievement, setAchievement] = useState(
    'Become highly skilled in backend engineering and build distributed systems with poise.'
  );
  const [whyMatter, setWhyMatter] = useState(
    'I want to feel confident in designing resilient systems and earn meaningful recognition without burning out.'
  );

  const pillars = [
    {
      title: 'Career & Craft',
      desc: 'Backend systems, technical leadership',
      icon: 'terminal',
    },
    {
      title: 'Physical Vessel',
      desc: 'Consistent strength, vitality',
      icon: 'self_improvement',
    },
    {
      title: 'Inner Life & Experiences',
      desc: 'Contemplative reading, Kerala retreat',
      icon: 'local_florist',
    },
    {
      title: 'Mind & Discipline',
      desc: 'Deep attention, reduced digital urges',
      icon: 'psychology',
    },
  ];

  const togglePillar = (title: string) => {
    if (selectedAreas.includes(title)) {
      setSelectedAreas(selectedAreas.filter((a) => a !== title));
    } else {
      setSelectedAreas([...selectedAreas, title]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-surface/95 backdrop-blur-md pt-safe pb-safe flex flex-col justify-start">
      <div className="max-w-xl mx-auto w-full px-4 py-4 relative flex flex-col min-h-screen">
        {/* Close Button on top right */}
        <div className="flex justify-end pt-2 pb-1">
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
            title="Close sanctuary modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Ambient Glow Element */}
        <div className="relative w-full px-1 pt-0 pb-4 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-secondary-container/40 blur-3xl pointer-events-none" />
          <div className="absolute top-20 -left-12 w-48 h-48 rounded-full bg-surface-container-high/60 blur-3xl pointer-events-none" />

          {/* Top Sanctuary Header & Brand Badge */}
          <div className="relative flex items-center justify-between mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container shadow-xs">
              <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                spa
              </span>
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">
                Arrival Sanctuary
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>Orientation Phase</span>
            </div>
          </div>

          {/* Editorial Greeting Headline */}
          <div className="relative space-y-2 mb-5">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface leading-tight font-serif">
              Before we set a timer, let's understand where you want to go.
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Time is not a resource to squeeze. It is the soil where your chosen self takes form.
            </p>
          </div>

          {/* Philosophy Gentle Callout Card */}
          <div className="relative rounded-2xl bg-surface-container-low p-4 shadow-xs border border-surface-variant/30">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-on-secondary-container text-lg">
                  explore
                </span>
              </div>
              <div className="space-y-1">
                <p className="font-label-md text-label-md text-secondary font-semibold">
                  The Compass Principle
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant italic font-serif leading-relaxed">
                  “Compass isn't about counting minutes. It's about bridging what you do today with the person you want to become.”
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Step Horizon Sanctuary Card */}
        <div className="w-full rounded-3xl bg-surface-container-lowest shadow-md p-5 sm:p-6 space-y-6 border border-surface-variant/40 mb-6">
          {/* Card Sub-header & Step Metaphor */}
          <div className="flex items-center justify-between pb-1">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                  Step 2 of 4
                </span>
                <span className="text-outline-variant font-body-sm">•</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Life Horizon
                </span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-serif">
                Your 2026 Life Horizon
              </h2>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-xl">all_inclusive</span>
            </div>
          </div>

          {/* Discovery Question 1: Horizon Pillars */}
          <div className="space-y-3">
            <label className="block font-title-md text-title-md text-on-surface">
              What are the core areas of your life you want to nurture over the next year?
            </label>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Select each space calling for steady, quiet elevation:
            </p>

            {/* Interactive Category Chips */}
            <div className="space-y-2.5 pt-1" id="category-selector-group">
              {pillars.map((p) => {
                const isSelected = selectedAreas.includes(p.title);
                return (
                  <div
                    key={p.title}
                    onClick={() => togglePillar(p.title)}
                    className={`category-chip transition-all duration-200 cursor-pointer rounded-2xl p-3.5 flex items-start justify-between group border ${
                      isSelected
                        ? 'bg-secondary-container text-on-secondary-container shadow-xs border-secondary/20'
                        : 'bg-surface-container-low hover:bg-surface-container text-on-surface border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isSelected ? 'bg-primary' : 'bg-surface-container-highest'
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-xs font-bold ${
                            isSelected ? 'text-on-primary' : 'text-on-surface-variant hidden'
                          }`}
                        >
                          check
                        </span>
                      </div>
                      <div>
                        <p className="font-title-md text-title-md font-semibold text-on-surface">
                          {p.title}
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`material-symbols-outlined text-lg ${
                        isSelected ? 'text-primary' : 'text-on-surface-variant'
                      }`}
                    >
                      {p.icon}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Discovery Question 2: Horizon Achievement */}
          <div className="space-y-2 pt-2">
            <label className="block font-title-md text-title-md text-on-surface" htmlFor="achievement-input">
              What is one big achievement that would feel deeply meaningful by the end of 2026?
            </label>
            <div className="relative">
              <textarea
                id="achievement-input"
                rows={3}
                value={achievement}
                onChange={(e) => setAchievement(e.target.value)}
                className="w-full bg-surface-container-low rounded-2xl p-3.5 text-on-surface font-body-md text-body-md shadow-inner focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all resize-none leading-relaxed border border-surface-variant/30"
              />
              <div className="absolute right-3.5 bottom-3.5 flex items-center gap-1.5 text-primary pointer-events-none">
                <span className="material-symbols-outlined text-base">verified</span>
              </div>
            </div>
          </div>

          {/* Discovery Question 3: The Rooted 'Why' */}
          <div className="space-y-2 pt-1">
            <div className="flex items-baseline justify-between">
              <label className="block font-title-md text-title-md text-on-surface" htmlFor="why-input">
                Why does this matter to you?
              </label>
              <span className="font-label-sm text-label-sm text-secondary font-medium">
                Foundational “Why”
              </span>
            </div>
            <div className="relative">
              <textarea
                id="why-input"
                rows={3}
                value={whyMatter}
                onChange={(e) => setWhyMatter(e.target.value)}
                className="w-full bg-surface-container-low rounded-2xl p-3.5 text-on-surface font-body-md text-body-md shadow-inner focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all resize-none leading-relaxed border border-surface-variant/30"
              />
              <div className="absolute right-3.5 bottom-3.5 flex items-center gap-1 text-primary pointer-events-none">
                <span className="material-symbols-outlined text-base">favorite</span>
              </div>
            </div>
          </div>

          {/* Gentle Progress Indicator Bar */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center font-label-sm text-label-sm">
              <span className="text-on-surface-variant">
                Pillar {selectedAreas.length} of 4 Clarified
              </span>
              <span className="font-semibold text-primary">50% Sanctuary Grounding</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.min(100, (selectedAreas.length / 4) * 100)}%` }}
              />
            </div>
          </div>

          {/* Action Navigation Buttons */}
          <div className="space-y-3 pt-3">
            <button
              type="button"
              onClick={onContinueToVision}
              className="w-full py-3.5 px-6 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg font-semibold shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue to Life Architecture</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
            <button
              type="button"
              onClick={onSkipToFocus}
              className="w-full py-2.5 px-4 rounded-xl text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors text-center cursor-pointer"
            >
              Skip to Quiet Focus for today
            </button>
          </div>
        </div>

        {/* Visual Breathing Space / Botanical Illustration Spot */}
        <div className="px-6 py-6 flex items-center justify-center gap-3 opacity-80 text-center">
          <span className="material-symbols-outlined text-secondary text-sm">filter_vintage</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Take a calm breath. Your intentions are safely saved.
          </span>
          <span className="material-symbols-outlined text-secondary text-sm">filter_vintage</span>
        </div>
      </div>
    </div>
  );
};
