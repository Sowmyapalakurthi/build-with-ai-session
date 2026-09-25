import React, { useState } from 'react';
import { FocusSession } from '../types';

interface DeepSessionFlowScreenProps {
  session: FocusSession;
  onSaveSession: (updatedSession: FocusSession) => void;
  onClose: () => void;
  onShowToast: (message: string) => void;
}

export const DeepSessionFlowScreen: React.FC<DeepSessionFlowScreenProps> = ({
  session,
  onSaveSession,
  onClose,
  onShowToast,
}) => {
  const [selectedChips, setSelectedChips] = useState<string[]>(
    session.selectedChips || ['Clear mental breakthrough']
  );
  const [progressNote, setProgressNote] = useState(session.progressNote);
  const [nextStep, setNextStep] = useState(session.nextStep);
  const [isSealing, setIsSealing] = useState(false);
  const [sealed, setSealed] = useState(false);
  const [addedEvidence, setAddedEvidence] = useState(session.addedToEvidence || false);

  const availableChips = [
    'Clear mental breakthrough',
    'Read foundational docs',
    'Debugged tricky issue',
    'Small patient progress',
  ];

  const toggleChip = (chip: string) => {
    if (selectedChips.includes(chip)) {
      setSelectedChips(selectedChips.filter((c) => c !== chip));
    } else {
      setSelectedChips([...selectedChips, chip]);
    }
  };

  const handleSeal = () => {
    setIsSealing(true);
    setTimeout(() => {
      setIsSealing(false);
      setSealed(true);
      const updated: FocusSession = {
        ...session,
        selectedChips,
        progressNote,
        nextStep,
        addedToEvidence: addedEvidence,
      };
      onSaveSession(updated);
      onShowToast('Session sealed peacefully into sanctuary archives.');
      setTimeout(() => {
        onClose();
      }, 1200);
    }, 900);
  };

  const handleAddEvidence = () => {
    setAddedEvidence(true);
    onShowToast('Added to Vision Board Evidence!');
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-gutter-mobile py-space-md space-y-space-lg pb-16">
      {/* Top Quiet Status Bar & Breath Indicator */}
      <div className="flex items-center justify-between bg-surface-container-low px-space-md py-space-xs rounded-full shadow-sm border border-surface-variant/30">
        <div className="flex items-center gap-space-xs">
          <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="font-label-md text-label-md text-secondary tracking-wide uppercase font-semibold">
            Session Complete
          </span>
        </div>
        <div className="flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px] text-secondary">
            hourglass_bottom
          </span>
          <span>{session.durationMinutes}m Devoted</span>
        </div>
      </div>

      {/* Reflective Header & Gentle Breathing Iconography */}
      <div className="space-y-space-xs">
        <div className="flex items-center gap-space-xs text-secondary">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            spa
          </span>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
            Mindful Closing
          </span>
        </div>
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-serif">
          How did that session feel?
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Pause for a calm breath. Capture your natural momentum without rush or self-judgment.
        </p>
      </div>

      {/* Connected Goal Pathway Banner (Sanctuary Card) */}
      <div className="bg-surface-container p-space-md rounded-2xl shadow-sm relative overflow-hidden space-y-space-sm border border-surface-variant/40">
        <div className="flex items-center justify-between gap-space-xs">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Focus Vector
          </span>
          <span className="inline-flex items-center gap-1 bg-surface-container-lowest px-space-sm py-0.5 rounded-full font-label-sm text-label-sm text-primary shadow-xs font-medium">
            <span>🌱</span> Step nurtured
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-start gap-space-xs">
            <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">adjust</span>
            <span className="font-title-md text-title-md text-on-surface">
              {session.goalTitle}
            </span>
          </div>
          <div className="flex items-center gap-2 pl-6">
            <span className="text-outline-variant font-body-sm text-body-sm">↳</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant italic">
              Toward: “{session.parentHorizon}”
            </span>
          </div>
        </div>
      </div>

      {/* Reflection 1: Meaningful Progress */}
      <div className="bg-surface-container-low p-space-lg rounded-2xl shadow-sm space-y-space-md border border-surface-variant/30">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2 font-serif">
              <span>What meaningful progress did you make?</span>
            </label>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Notice the internal shift, regardless of how modest it appears.
          </p>
        </div>

        {/* Quick Select Tonal Chips */}
        <div className="flex flex-wrap gap-2" id="progress-chips-group">
          {availableChips.map((chip) => {
            const isSelected = selectedChips.includes(chip);
            return (
              <button
                key={chip}
                type="button"
                onClick={() => toggleChip(chip)}
                className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-label-md font-label-md transition-all shadow-xs cursor-pointer active:scale-95 ${
                  isSelected
                    ? 'bg-secondary-container text-on-secondary-fixed'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    isSelected ? 'bg-primary' : 'bg-transparent group-hover:bg-primary/50'
                  }`}
                />
                <span>{chip}</span>
              </button>
            );
          })}
        </div>

        {/* Journal Textarea */}
        <div className="relative">
          <textarea
            value={progressNote}
            onChange={(e) => setProgressNote(e.target.value)}
            className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-xl p-space-md placeholder-outline focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-xs resize-none border border-surface-variant/30 leading-relaxed"
            placeholder="Write a quiet observation about your work..."
            rows={3}
          />
          <div className="absolute bottom-2.5 right-3 text-on-surface-variant/60 font-label-sm text-label-sm flex items-center gap-1 pointer-events-none">
            <span className="material-symbols-outlined text-[14px]">edit_note</span>
            <span>Reflected</span>
          </div>
        </div>
      </div>

      {/* Visual Anchor: Cartoon Horizon Milestone Note */}
      <div className="rounded-2xl overflow-hidden shadow-sm relative bg-surface-container border border-surface-variant/40">
        <div className="relative h-36 w-full">
          <img
            className="w-full h-full object-cover"
            alt="Cartoon traveler standing atop celestial mountain summit of mastery"
            src="/src/assets/images/focus_phase_mastery_1790331595530.jpg"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/30 to-transparent flex items-end p-space-md">
            <div className="space-y-0.5">
              <span className="text-[11px] uppercase tracking-wider text-sky-200 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />
                Goal Horizon Manifested
              </span>
              <p className="font-headline-sm text-headline-sm text-inverse-on-surface italic font-serif">
                “Roots deepen in stillness before leaves unfurl into mastery.”
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reflection 2: Distractions & Mindful Self-Compassion */}
      <div className="bg-surface-container-low p-space-lg rounded-2xl shadow-sm space-y-space-md border border-surface-variant/30">
        <div className="space-y-1">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-serif">
            Did distractions arise?
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Acknowledging impulses without criticism takes away their power.
          </p>
        </div>

        {/* Logged Urge Snapshot */}
        <div className="bg-surface-container-highest p-space-md rounded-xl space-y-2 border border-surface-variant/40">
          <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
            <span className="flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[16px] text-tertiary">flare</span>
              <span>Recorded Impulse</span>
            </span>
            <span className="bg-surface-container px-2 py-0.5 rounded-full font-label-sm text-label-sm text-on-surface">
              Minute {session.recordedImpulses[0]?.minute || 26}
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface italic">
            “{session.recordedImpulses[0]?.text || 'Felt stuck on bean scope ambiguity.'}”
          </p>
        </div>

        {/* Mindful Compassion Card */}
        <div className="flex items-start gap-space-sm bg-primary-fixed/30 p-space-md rounded-xl border border-primary-fixed/40">
          <span
            className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            favorite
          </span>
          <div className="space-y-1">
            <p className="font-label-md text-label-md text-on-primary-fixed font-semibold">
              Sanctuary Observation
            </p>
            <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
              {session.sanctuaryObservation}
            </p>
          </div>
        </div>
      </div>

      {/* Reflection 3: Gentle Next Step for Tomorrow */}
      <div className="bg-surface-container-low p-space-lg rounded-2xl shadow-sm space-y-space-md border border-surface-variant/30">
        <div className="space-y-1">
          <label className="font-headline-sm text-headline-sm text-on-surface block font-serif" htmlFor="next-step-input">
            Gentle next step for tomorrow?
          </label>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Leave a soft stone on the trail for your future self to step upon.
          </p>
        </div>
        <div className="relative flex items-center">
          <span className="absolute left-3.5 material-symbols-outlined text-secondary text-[20px]">
            wb_twilight
          </span>
          <input
            id="next-step-input"
            type="text"
            value={nextStep}
            onChange={(e) => setNextStep(e.target.value)}
            className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-xl pl-11 pr-space-md py-space-sm placeholder-outline shadow-xs focus:outline-none focus:ring-2 focus:ring-primary/20 border border-surface-variant/30"
          />
        </div>
      </div>

      {/* Action Section */}
      <div className="pt-space-sm pb-space-lg space-y-space-md">
        {/* Primary Seal Session Button */}
        <button
          type="button"
          onClick={handleSeal}
          disabled={isSealing || sealed}
          className="w-full bg-primary-container text-on-primary font-label-lg text-label-lg py-3.5 px-space-lg rounded-2xl shadow-md flex items-center justify-center gap-space-xs hover:bg-primary transition-all active:scale-[0.99] cursor-pointer disabled:opacity-85"
        >
          {isSealing ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
              <span>Sealing in stillness...</span>
            </>
          ) : sealed ? (
            <>
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span>Saved to Sanctuary</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                bookmark_added
              </span>
              <span>Seal Session & Return to Sanctuary</span>
            </>
          )}
        </button>

        {/* Secondary Evidence Button */}
        <button
          type="button"
          onClick={handleAddEvidence}
          className={`w-full font-label-md text-label-md py-3 px-space-md rounded-2xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
            addedEvidence
              ? 'bg-secondary-container text-on-secondary-fixed'
              : 'bg-surface-container text-primary hover:bg-surface-container-high'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {addedEvidence ? 'check' : 'photo_library'}
          </span>
          <span>{addedEvidence ? 'Added to Vision Board Evidence' : 'Add to Vision Board Evidence'}</span>
        </button>

        {/* Serene Micro-Footer Quote */}
        <div className="text-center pt-space-xs">
          <span className="font-body-sm text-body-sm text-on-surface-variant/70 italic">
            Every focused breath leaves the world clearer.
          </span>
        </div>
      </div>
    </div>
  );
};
