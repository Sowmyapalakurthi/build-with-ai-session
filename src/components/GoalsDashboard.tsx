import React, { useState } from 'react';
import { LifeGoal, LifePillar } from '../types';

interface GoalsDashboardProps {
  goals: LifeGoal[];
  activeGoalId: string;
  onSelectActiveGoal: (goalId: string) => void;
  onNavigateToFocus: () => void;
  onOpenPlantGoal: () => void;
  onToggleSubtask: (goalId: string, subtaskId: string) => void;
  onAddSubtask: (goalId: string, subtaskTitle: string) => void;
  onDeleteGoal: (goalId: string) => void;
  onShowToast: (message: string) => void;
}

export const GoalsDashboard: React.FC<GoalsDashboardProps> = ({
  goals,
  activeGoalId,
  onSelectActiveGoal,
  onNavigateToFocus,
  onOpenPlantGoal,
  onToggleSubtask,
  onAddSubtask,
  onDeleteGoal,
  onShowToast,
}) => {
  const [selectedPillar, setSelectedPillar] = useState<string>('All');
  const [newSubtaskInputs, setNewSubtaskInputs] = useState<Record<string, string>>({});
  const [expandedGoalId, setExpandedGoalId] = useState<string | null>(activeGoalId || goals[0]?.id || null);

  const pillars: string[] = [
    'All',
    'Vocation & Craft',
    'Physical Vessel',
    'Exploration & Soul',
    'Inner Calm',
  ];

  const filteredGoals =
    selectedPillar === 'All'
      ? goals
      : goals.filter((g) => g.pillar === selectedPillar);

  // Statistics calculation
  const totalGoals = goals.length;
  const totalSubtasks = goals.reduce((acc, g) => acc + g.subtasks.length, 0);
  const completedSubtasks = goals.reduce(
    (acc, g) => acc + g.subtasks.filter((s) => s.completed).length,
    0
  );
  const overallPercentage = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

  const handleStartFocusOnGoal = (goal: LifeGoal) => {
    onSelectActiveGoal(goal.id);
    onShowToast(`Active focus set to "${goal.title}". Let's journey forward!`);
    onNavigateToFocus();
  };

  const handleQuickAddSubtask = (goalId: string) => {
    const text = (newSubtaskInputs[goalId] || '').trim();
    if (!text) return;
    onAddSubtask(goalId, text);
    setNewSubtaskInputs((prev) => ({ ...prev, [goalId]: '' }));
    onShowToast('New milestone root added to goal.');
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-4 py-4 space-y-5 pb-28">
      {/* Top Header & Quick Add */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container text-primary font-label-sm uppercase tracking-wider text-[11px] font-semibold">
            <span>🎯 Life Architecture</span>
          </div>
          <h1 className="font-headline-sm text-2xl font-serif text-on-surface font-semibold mt-1">
            My Goals Dashboard
          </h1>
          <p className="text-xs text-on-surface-variant">
            Track, nurture, and walk toward your visualized life horizons.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenPlantGoal}
          className="h-10 px-3.5 rounded-xl bg-primary text-on-primary text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:bg-primary-container transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Plant Goal</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="p-3.5 rounded-2xl bg-surface-container border border-surface-variant/60 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
            Total Goals
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-serif font-bold text-primary">{totalGoals}</span>
            <span className="text-[10px] text-on-surface-variant">active</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-surface-container border border-surface-variant/60 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
            Milestones
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-serif font-bold text-secondary">{completedSubtasks}</span>
            <span className="text-[10px] text-on-surface-variant">/ {totalSubtasks}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-surface-container border border-surface-variant/60 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
            Vitality
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-serif font-bold text-primary">{overallPercentage}%</span>
            <span className="text-[10px] text-on-surface-variant">reached</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
        {pillars.map((p) => {
          const isActive = selectedPillar === p;
          return (
            <button
              key={p}
              type="button"
              onClick={() => setSelectedPillar(p)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary text-on-primary font-semibold shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
              }`}
            >
              {p}
            </button>
          );
        })}
      </div>

      {/* Goals List */}
      <div className="space-y-3.5">
        {filteredGoals.map((goal) => {
          const isCurrentActive = goal.id === activeGoalId;
          const isExpanded = expandedGoalId === goal.id;
          const completedRoots = goal.subtasks.filter((s) => s.completed).length;
          const totalRoots = goal.subtasks.length;
          const goalPercent = totalRoots > 0 ? Math.round((completedRoots / totalRoots) * 100) : 0;

          return (
            <div
              key={goal.id}
              className={`rounded-2xl transition-all border shadow-xs ${
                isCurrentActive
                  ? 'bg-secondary-container/20 border-primary/40 ring-1 ring-primary/20'
                  : 'bg-surface-container-lowest border-surface-variant/60 hover:border-surface-variant'
              }`}
            >
              {/* Goal Card Header */}
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-secondary bg-secondary-container px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {goal.pillar}
                      </span>
                      <span className="text-xs text-on-surface-variant">
                        Target: {goal.targetHorizon}
                      </span>
                      {isCurrentActive && (
                        <span className="text-[10px] font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          Currently Focusing
                        </span>
                      )}
                    </div>
                    <h3 className="font-title-md text-base text-on-surface font-semibold leading-snug">
                      {goal.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setExpandedGoalId(isExpanded ? null : goal.id)}
                      className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                      title={isExpanded ? 'Collapse' : 'Expand details'}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isExpanded ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-on-surface-variant">
                    <span>
                      {completedRoots} of {totalRoots} subtasks completed
                    </span>
                    <span className="font-semibold text-primary">{goalPercent}%</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden border border-surface-variant/40">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{ width: `${goalPercent}%` }}
                    />
                  </div>
                </div>

                {/* Goal Actions */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-on-surface-variant italic truncate max-w-[240px]">
                    “{goal.anchorWhy || 'Walking toward quiet mastery'}”
                  </span>

                  <button
                    type="button"
                    onClick={() => handleStartFocusOnGoal(goal)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isCurrentActive
                        ? 'bg-primary text-on-primary shadow-xs hover:bg-primary-container'
                        : 'bg-secondary-container text-primary hover:bg-secondary-fixed'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">play_circle</span>
                    <span>{isCurrentActive ? 'Focus with Timer' : 'Set as Focus Goal'}</span>
                  </button>
                </div>
              </div>

              {/* Expanded Subtasks & Roots Section */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-surface-variant/40 bg-surface-container-low/50 space-y-3 rounded-b-2xl animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-xs font-semibold text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-primary">park</span>
                      Subtask Milestones
                    </span>
                    <span className="text-[11px] text-secondary">
                      Check off as your character advances
                    </span>
                  </div>

                  {/* Subtask list */}
                  <div className="space-y-1.5">
                    {goal.subtasks.map((st, idx) => (
                      <div
                        key={st.id}
                        onClick={() => onToggleSubtask(goal.id, st.id)}
                        className={`flex items-center gap-2.5 p-2 rounded-xl border text-xs transition-all cursor-pointer select-none ${
                          st.completed
                            ? 'bg-surface-container-lowest/60 text-on-surface-variant border-transparent'
                            : 'bg-surface-container-lowest text-on-surface border-surface-variant/50 hover:border-primary/30 shadow-xs'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
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
                          className={`flex-1 truncate ${
                            st.completed ? 'line-through text-on-surface-variant/60' : ''
                          }`}
                        >
                          {idx + 1}. {st.title}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Quick Add Subtask Input */}
                  <div className="flex gap-1.5 pt-1">
                    <input
                      type="text"
                      value={newSubtaskInputs[goal.id] || ''}
                      onChange={(e) =>
                        setNewSubtaskInputs({ ...newSubtaskInputs, [goal.id]: e.target.value })
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleQuickAddSubtask(goal.id);
                        }
                      }}
                      placeholder="+ Add milestone subtask..."
                      className="flex-1 bg-surface-container-lowest text-xs text-on-surface rounded-xl px-3 py-2 border border-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-primary/20"
                    />
                    <button
                      type="button"
                      onClick={() => handleQuickAddSubtask(goal.id)}
                      className="px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-primary transition-colors cursor-pointer shrink-0"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteGoal(goal.id)}
                      className="px-2.5 py-2 rounded-xl text-error hover:bg-error-container/20 text-xs transition-colors cursor-pointer shrink-0"
                      title="Archive goal"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
