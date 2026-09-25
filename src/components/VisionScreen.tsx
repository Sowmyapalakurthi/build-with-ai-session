import React, { useState } from 'react';
import { LifeGoal, LifePillar } from '../types';

interface VisionScreenProps {
  goals: LifeGoal[];
  onOpenPlantGoal: () => void;
  onToggleSubtask: (goalId: string, subtaskId: string) => void;
  onShowToast: (message: string) => void;
}

export const VisionScreen: React.FC<VisionScreenProps> = ({
  goals,
  onOpenPlantGoal,
  onToggleSubtask,
  onShowToast,
}) => {
  const [selectedPillarFilter, setSelectedPillarFilter] = useState<string>('All');

  const pillars: string[] = [
    'All',
    'Vocation & Craft',
    'Physical Vessel',
    'Exploration & Soul',
    'Inner Calm',
  ];

  const filteredGoals =
    selectedPillarFilter === 'All'
      ? goals
      : goals.filter((g) => g.pillar === selectedPillarFilter);

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-gutter-mobile py-4 space-y-space-lg pb-28">
      {/* Vision Intro */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm uppercase tracking-wider font-semibold">
            <span>🌱 Life Architecture</span>
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-serif">
            Sanctuary Horizons
          </h1>
          <p className="font-body-md text-on-surface-variant">
            Nurtured goals taking root without haste or synthetic urgency.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenPlantGoal}
          className="h-11 px-3.5 rounded-xl bg-primary text-on-primary font-label-md flex items-center gap-1.5 shadow-sm hover:bg-primary-container transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Plant Goal</span>
        </button>
      </div>

      {/* Hero Visual Card (same tranquil botanical asset) */}
      <div className="relative w-full rounded-2xl bg-surface-container overflow-hidden shadow-sm border border-surface-variant/40">
        <div className="relative h-32 w-full overflow-hidden">
          <img
            className="w-full h-full object-cover opacity-90"
            alt="Sprouting seedling in soft forest light"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCNQRYMFnTMwM6TR2U3NnPrxQFMg4bkwkszbPxi0KQR7JJXSD_yCGOkjTW851mqNf7U9WNeaLtdV0mGdMMAMHm_hDVhIv3UXbKwb8him9Xn__o8LQtvFV8ISnWs-mUnvfUUisg4fTISM1Pn8xOrxnyFIzj-SYehRWMFnKVsH1yaPPJCDTncQ3cNkSMMFzeclcRwcLiM_w5ZdfAUKWpd2BjoRSeh5pgGsXHDbs-IckMbVwiJCkqTb0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/30 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <span className="font-label-sm text-primary uppercase tracking-wide font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">psychiatry</span>
              {goals.length} Horizons Planted
            </span>
            <span className="font-label-sm text-on-surface-variant bg-surface-bright/90 px-2 py-0.5 rounded-full shadow-xs">
              Seasonal Flow 2026
            </span>
          </div>
        </div>
      </div>

      {/* Pillar Filter Selector */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-gutter-mobile px-gutter-mobile">
        {pillars.map((p) => {
          const isActive = selectedPillarFilter === p;
          return (
            <button
              key={p}
              type="button"
              onClick={() => setSelectedPillarFilter(p)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full font-label-md transition-all cursor-pointer ${
                isActive
                  ? 'bg-secondary-container text-on-secondary-fixed font-semibold shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:text-primary'
              }`}
            >
              {p}
            </button>
          );
        })}
      </div>

      {/* Goals List */}
      <div className="space-y-space-md">
        {filteredGoals.map((goal) => {
          const completedRoots = goal.subtasks.filter((s) => s.completed).length;
          const totalRoots = goal.subtasks.length;
          const progressPercent = totalRoots > 0 ? (completedRoots / totalRoots) * 100 : 0;

          return (
            <div
              key={goal.id}
              className="rounded-2xl bg-surface-container-low p-space-md shadow-sm border border-surface-variant/30 space-y-3 transition-all hover:shadow-md"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm uppercase tracking-wider text-secondary font-semibold">
                      {goal.pillar}
                    </span>
                    <span className="text-outline-variant font-body-sm">•</span>
                    <span className="font-body-sm text-on-surface-variant">
                      {goal.targetHorizon}
                    </span>
                  </div>
                  <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">
                    {goal.title}
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm whitespace-nowrap font-medium">
                  {completedRoots}/{totalRoots} Roots
                </span>
              </div>

              {/* Anchor Contemplation */}
              {goal.anchorWhy && (
                <p className="font-body-sm text-body-sm text-on-surface-variant italic bg-surface-container-lowest/80 p-3 rounded-xl border border-surface-variant/20 leading-relaxed">
                  “{goal.anchorWhy}”
                </p>
              )}

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-on-surface-variant font-medium">
                  <span>Root Vitality</span>
                  <span>{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Subtasks */}
              <div className="space-y-1.5 pt-1">
                {goal.subtasks.map((st, idx) => (
                  <div
                    key={st.id}
                    onClick={() => {
                      onToggleSubtask(goal.id, st.id);
                      onShowToast(
                        st.completed
                          ? 'Root returned to nurturing state.'
                          : 'Root nurtured to completion!'
                      );
                    }}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer transition-all border ${
                      st.completed
                        ? 'bg-surface-container-lowest/50 text-on-surface-variant border-transparent'
                        : 'bg-surface-container-lowest text-on-surface shadow-xs hover:border-primary/20 border-surface-variant/30'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border ${
                        st.completed
                          ? 'bg-primary border-primary text-on-primary'
                          : 'border-outline-variant bg-transparent'
                      }`}
                    >
                      {st.completed && (
                        <span className="material-symbols-outlined text-[12px] font-bold">
                          check
                        </span>
                      )}
                    </div>
                    <span
                      className={`font-body-sm text-body-sm flex-1 truncate ${
                        st.completed ? 'line-through text-on-surface-variant/60' : ''
                      }`}
                    >
                      {idx + 1}. {st.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer Intention note */}
              {goal.connectedIntention && (
                <div className="flex items-center gap-1.5 pt-1 text-xs text-secondary">
                  <span className="material-symbols-outlined text-[15px]">event_repeat</span>
                  <span>3 deep focus blocks scheduled weekly</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
