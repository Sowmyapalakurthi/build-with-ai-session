import React, { useState } from 'react';
import { WeeklyReflectionData } from '../types';

interface WeeklyReflectionScreenProps {
  reflectionData: WeeklyReflectionData;
  onUpdateReflection: (data: WeeklyReflectionData) => void;
  onOpenBreathing: () => void;
  onPlanNextWeek?: () => void;
}

export const WeeklyReflectionScreen: React.FC<WeeklyReflectionScreenProps> = ({
  reflectionData,
  onUpdateReflection,
  onOpenBreathing,
  onPlanNextWeek,
}) => {
  const [showBreatheBanner, setShowBreatheBanner] = useState(false);
  const [anchored, setAnchored] = useState(false);
  const [sownLater, setSownLater] = useState(reflectionData.fallowObservation.sown);
  const [experimentAdopted, setExperimentAdopted] = useState(
    reflectionData.systemCalibration.adopted
  );

  const toggleBreathe = () => {
    setShowBreatheBanner(!showBreatheBanner);
  };

  const handleSowLater = () => {
    const updated = {
      ...reflectionData,
      fallowObservation: {
        ...reflectionData.fallowObservation,
        sown: !sownLater,
      },
    };
    setSownLater(!sownLater);
    onUpdateReflection(updated);
  };

  const handleToggleExperiment = () => {
    const nextState = !experimentAdopted;
    setExperimentAdopted(nextState);
    onUpdateReflection({
      ...reflectionData,
      systemCalibration: {
        ...reflectionData.systemCalibration,
        adopted: nextState,
      },
    });
  };

  const handleAnchor = () => {
    setAnchored(true);
    setTimeout(() => {
      setAnchored(false);
      if (onPlanNextWeek) onPlanNextWeek();
    }, 2400);
  };

  return (
    <div className="flex flex-col w-full px-gutter-mobile space-y-space-lg pb-10 max-w-xl mx-auto">
      {/* Header Block (Mindful Editorial Intro) */}
      <div className="pt-space-md pb-space-xs flex flex-col space-y-space-xs">
        <div className="inline-flex items-center gap-space-xs text-primary">
          <span className="material-symbols-outlined text-[18px]">nature_people</span>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
            Weekly Inward View
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
          Weekly Reflection
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Week {reflectionData.weekNumber} • {reflectionData.month} {reflectionData.year} —{' '}
          <span className="italic font-display-lg-mobile text-body-md text-primary">
            {reflectionData.theme}
          </span>
        </p>
      </div>

      {/* Calming Ambient Breath Card */}
      <div className="relative overflow-hidden rounded-2xl bg-surface-container-low p-space-md shadow-sm border border-surface-variant/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                spa
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-title-md text-title-md text-on-surface">Grounding Status</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {reflectionData.groundingStatus.cadence} • {reflectionData.groundingStatus.pillarsTended} pillars tended
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleBreathe}
              className={`px-3 py-1.5 rounded-full font-label-md text-label-md shadow-sm active:scale-95 transition-all flex items-center gap-1 cursor-pointer ${
                showBreatheBanner
                  ? 'bg-primary-fixed text-on-primary-fixed'
                  : 'bg-surface-container-high text-primary hover:bg-surface-container-highest'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">air</span>
              <span>{showBreatheBanner ? 'Exhale' : 'Pause'}</span>
            </button>
            <button
              onClick={onOpenBreathing}
              title="Full Grounding Breath Exercise"
              className="w-8 h-8 rounded-full bg-surface-container-high text-primary flex items-center justify-center hover:bg-surface-container-highest transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">self_improvement</span>
            </button>
          </div>
        </div>

        {showBreatheBanner && (
          <div className="mt-space-sm pt-space-sm text-center border-t border-surface-variant/30 animate-in fade-in slide-in-from-top-1 duration-200">
            <p className="font-display-lg-mobile text-body-md text-primary italic font-serif">
              Inhale clarity... Exhale urgency.
            </p>
          </div>
        )}
      </div>

      {/* Section 1: What Moved Forward? (Sanctuary Growth) */}
      <section className="flex flex-col space-y-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[20px]">psychiatry</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-serif">
              What Moved Forward?
            </h2>
          </div>
          <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold">
            Sanctuary Growth
          </span>
        </div>

        {/* Growth Container */}
        <div className="rounded-2xl bg-surface-container p-space-md shadow-sm space-y-space-md border border-surface-variant/40">
          {reflectionData.growthItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <div className="flex flex-col space-y-space-xs">
                <div className="flex items-start justify-between gap-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm">
                      <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-title-md text-on-surface">{item.title}</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {item.sessions}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-primary-fixed-dim text-on-primary-fixed font-label-sm text-label-sm whitespace-nowrap font-medium">
                    {item.milestoneBadge}
                  </span>
                </div>

                {/* Micro botanical progression indicator */}
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className={`${item.colorClass} h-full rounded-full transition-all duration-700`}
                    style={{ width: `${item.progressPercent}%` }}
                  />
                </div>
                <span className="font-body-sm text-body-sm text-secondary italic">
                  {item.summary}
                </span>
              </div>
              {index < reflectionData.growthItems.length - 1 && (
                <div className="h-px bg-surface-variant/80" />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Section 2: What Was Neglected? (Gentle Observation) */}
      <section className="flex flex-col space-y-space-sm">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-secondary text-[20px]">filter_vintage</span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-serif">
            What Lay Fallow?
          </h2>
        </div>
        <div className="rounded-2xl bg-surface-container-low p-space-md shadow-sm flex flex-col space-y-space-sm border border-surface-variant/30">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-[18px]">bedtime</span>
            <span className="font-label-md text-label-md text-secondary font-semibold">
              Zero-Shame Observation
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface leading-relaxed">
            <strong className="font-title-md text-title-md text-primary">
              {reflectionData.fallowObservation.title}
            </strong>{' '}
            {reflectionData.fallowObservation.description}
          </p>
          <div className="rounded-xl bg-surface-container-lowest p-space-sm flex items-center justify-between shadow-xs">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              {sownLater ? 'Scheduled 30-min block for quiet weekend focus' : reflectionData.fallowObservation.actionPrompt}
            </span>
            <button
              onClick={handleSowLater}
              className={`px-3 py-1 rounded-lg font-label-sm text-label-sm transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                sownLater
                  ? 'bg-primary text-on-primary'
                  : 'bg-secondary-fixed text-on-secondary-fixed hover:opacity-90'
              }`}
              type="button"
            >
              {sownLater ? '✓ Sown' : 'Sow Later'}
            </button>
          </div>
        </div>
      </section>

      {/* Section 3: What Distracted You? (Behavioral Urge Analysis) */}
      <section className="flex flex-col space-y-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[20px]">bubble_chart</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-serif">
              Distraction Urge Anatomy
            </h2>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            Root Friction
          </span>
        </div>
        <div className="rounded-2xl bg-surface-container p-space-md shadow-sm space-y-space-md border border-surface-variant/40">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {reflectionData.distractionUrges.description}
          </p>

          {/* SVG Breakdown Bar */}
          <div className="w-full h-4 rounded-full overflow-hidden flex bg-surface-variant shadow-inner">
            {reflectionData.distractionUrges.breakdown.map((item, idx) => (
              <div
                key={idx}
                className="h-full transition-all duration-500"
                style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                title={`${item.label} (${item.percentage}%)`}
              />
            ))}
          </div>

          {/* Legend & Insight Breakdown */}
          <div className="space-y-space-sm">
            {reflectionData.distractionUrges.breakdown.map((item, idx) => (
              <div key={idx} className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 mt-1"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <span className="font-title-md text-title-md text-on-surface block">
                      {item.label}
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {item.subtext}
                    </p>
                  </div>
                </div>
                <span className="font-label-lg text-label-lg font-bold text-on-surface shrink-0">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: What Did You Learn About Yourself? (Compass Mirror) */}
      <section className="flex flex-col space-y-space-sm">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            psychology
          </span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-serif">
            The Compass Mirror
          </h2>
        </div>

        {/* Editorial Sanctuary Insight Card */}
        <div className="rounded-2xl bg-surface-container-highest p-space-md shadow-md space-y-space-sm relative overflow-hidden border border-surface-variant/50">
          <div className="flex items-center gap-space-xs text-primary">
            <span className="material-symbols-outlined text-[18px]">lightbulb</span>
            <span className="font-label-md text-label-md uppercase tracking-wider font-semibold">
              {reflectionData.compassMirror.type}
            </span>
          </div>
          <blockquote className="font-headline-md text-title-lg text-on-surface italic leading-relaxed font-serif">
            {reflectionData.compassMirror.quote}
          </blockquote>
          <div className="pt-space-xs flex items-center justify-between text-on-surface-variant">
            <span className="font-body-sm text-body-sm">{reflectionData.compassMirror.source}</span>
            <div className="flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span className="font-label-sm text-label-sm font-semibold">
                {reflectionData.compassMirror.validity}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Gentle System Calibration for Next Week */}
      <section className="flex flex-col space-y-space-sm">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-secondary text-[20px]">tune</span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-serif">
            Gentle System Calibration
          </h2>
        </div>
        <div className="rounded-2xl bg-surface-container-low p-space-md shadow-sm space-y-space-sm border border-surface-variant/30">
          <div className="flex items-start gap-space-sm">
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">draw</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="font-title-md text-title-md text-on-surface">
                Micro-Intervention for Week {reflectionData.systemCalibration.week}
              </span>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Before starting complex backend sessions, write down{' '}
                <span className="font-semibold text-primary">one specific sub-question on tactile paper</span> first. Clarity dissolves friction.
              </p>
            </div>
          </div>

          {/* Actionable commitment toggle */}
          <div className="rounded-xl bg-surface-container-lowest p-space-sm flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
              <span className="font-label-md text-label-md text-on-surface">Adopt this experiment</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={experimentAdopted}
                onChange={handleToggleExperiment}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>
        </div>
      </section>

      {/* Contemplative Footer CTA */}
      <div className="pt-space-sm pb-space-lg flex flex-col space-y-space-sm">
        <button
          type="button"
          onClick={handleAnchor}
          className={`w-full h-12 rounded-xl font-label-lg text-label-lg shadow-sm active:scale-[0.99] transition-all flex items-center justify-center gap-space-xs cursor-pointer ${
            anchored
              ? 'bg-secondary text-on-secondary'
              : 'bg-primary-container text-on-primary hover:opacity-95'
          }`}
        >
          {anchored ? (
            <>
              <span className="material-symbols-outlined text-[20px]">done_all</span>
              <span>Anchored in Clarity</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">anchor</span>
              <span>Anchor Insights & Plan Next Week</span>
            </>
          )}
        </button>
        <p className="font-body-sm text-body-sm text-center text-on-surface-variant">
          Your sanctuary log will settle quietly into your memory archives.
        </p>
      </div>
    </div>
  );
};
