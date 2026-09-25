import React, { useState } from 'react';

interface InterventionsScreenProps {
  onOpenBreathing: () => void;
  onOpenChat?: () => void;
  onShowToast: (message: string) => void;
}

export const InterventionsScreen: React.FC<InterventionsScreenProps> = ({
  onOpenBreathing,
  onOpenChat,
  onShowToast,
}) => {
  const [interventions, setInterventions] = useState([
    {
      id: 'int-1',
      title: 'Tactile Paper Sub-question',
      description: 'Write down one specific sub-question on physical paper before opening your IDE or starting dense technical design. Dissolves working memory saturation.',
      status: 'Active Experiment',
      adopted: true,
      category: 'Cognitive Friction',
      icon: 'edit_note',
    },
    {
      id: 'int-2',
      title: '90-Second Urge Surfing',
      description: 'When the reflex to check notifications strikes, place both feet flat on the ground. Breathe in silence for 90 seconds while observing the sensation as a passing wave.',
      status: 'Equanimity Habit',
      adopted: true,
      category: 'Digital Impulses',
      icon: 'waves',
    },
    {
      id: 'int-3',
      title: 'Afternoon Energy Pivot (2:30 PM)',
      description: 'Transition from analytical architecture tasks to physical movement or foundational reading during natural circadian dips.',
      status: 'Circadian Cadence',
      adopted: false,
      category: 'Energy Rhythm',
      icon: 'wb_twilight',
    },
  ]);

  const toggleAdopted = (id: string) => {
    setInterventions(
      interventions.map((item) => {
        if (item.id === id) {
          const nextState = !item.adopted;
          onShowToast(
            nextState
              ? `Adopted "${item.title}" into sanctuary cadence.`
              : `Paused "${item.title}".`
          );
          return { ...item, adopted: nextState };
        }
        return item;
      })
    );
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-gutter-mobile py-4 space-y-space-lg pb-28">
      {/* Intro Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm uppercase tracking-wider font-semibold">
          <span className="material-symbols-outlined text-[16px]">spa</span>
          <span>Calm Interventions</span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-serif">
          Gentle Calibrations
        </h1>
        <p className="font-body-md text-on-surface-variant leading-relaxed">
          Subtle micro-shifts in environment and mindset to dissolve friction without moral judgment.
        </p>
      </div>

      {/* Quick Grounding Action Card */}
      <div className="rounded-2xl bg-surface-container-low p-space-md shadow-sm border border-surface-variant/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed shadow-xs">
            <span className="material-symbols-outlined text-[20px]">air</span>
          </div>
          <div>
            <span className="font-title-md text-title-md text-on-surface block">
              Box Breathing Ritual
            </span>
            <span className="font-body-sm text-on-surface-variant">
              4s Inhale · 4s Hold · 4s Exhale · 4s Rest
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenBreathing}
          className="px-3.5 py-2 rounded-xl bg-primary text-on-primary font-label-md hover:bg-primary-container transition-all active:scale-95 cursor-pointer shadow-xs whitespace-nowrap"
        >
          Begin
        </button>
      </div>

      {/* Sanctuary Companion (Feeling Low?) Card */}
      {onOpenChat && (
        <div className="rounded-2xl bg-surface-container p-space-md shadow-sm border border-surface-variant/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary shadow-xs">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                spa
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-title-md text-title-md text-on-surface block font-semibold">
                  Feeling Low or Weary?
                </span>
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>
              <span className="font-body-sm text-on-surface-variant">
                Talk with your Sanctuary Companion for hope & gentle self-compassion.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenChat}
            className="px-3.5 py-2 rounded-xl bg-primary text-on-primary font-label-md hover:bg-primary-container transition-all active:scale-95 cursor-pointer shadow-xs whitespace-nowrap"
          >
            Chat
          </button>
        </div>
      )}

      {/* Philosophy Callout Card */}
      <div className="rounded-2xl bg-surface-container-highest p-space-md shadow-sm border border-surface-variant/50 space-y-2">
        <div className="flex items-center gap-2 text-primary font-label-sm uppercase tracking-wider font-semibold">
          <span className="material-symbols-outlined text-[18px]">psychiatry</span>
          <span>Compassion Over Criticism</span>
        </div>
        <p className="font-body-md text-on-surface italic font-serif leading-relaxed">
          “Friction is simply information about working memory boundaries. It is never a character flaw.”
        </p>
      </div>

      {/* Active Interventions List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-title-md text-title-md text-on-surface flex items-center gap-1.5 font-semibold">
            <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
            <span>Micro-Interventions Arsenal</span>
          </h2>
          <span className="font-label-sm text-secondary bg-secondary-container px-2 py-0.5 rounded-full font-medium">
            {interventions.filter((i) => i.adopted).length} Active
          </span>
        </div>

        <div className="space-y-space-sm">
          {interventions.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-surface-container-low p-space-md shadow-sm border border-surface-variant/30 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-xs">
                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  </div>
                  <div>
                    <span className="font-title-md text-title-md text-on-surface block font-semibold">
                      {item.title}
                    </span>
                    <span className="font-label-sm text-secondary uppercase tracking-wider font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Toggle */}
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={item.adopted}
                    onChange={() => toggleAdopted(item.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                </label>
              </div>

              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
