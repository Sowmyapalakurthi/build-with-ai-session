import React, { useState } from 'react';
import { LifeGoal, LifePillar, Subtask } from '../types';

interface PlantGoalScreenProps {
  onPlantGoal: (goal: LifeGoal) => void;
  onShowToast: (message: string) => void;
  onCancel?: () => void;
  initialGoal?: Partial<LifeGoal>;
}

export const PlantGoalScreen: React.FC<PlantGoalScreenProps> = ({
  onPlantGoal,
  onShowToast,
  onCancel,
  initialGoal,
}) => {
  const [selectedPillar, setSelectedPillar] = useState<LifePillar>(
    initialGoal?.pillar || 'Vocation & Craft'
  );
  const [goalTitle, setGoalTitle] = useState(
    initialGoal?.title || 'Become Highly Skilled in Distributed Systems'
  );
  const [targetHorizon, setTargetHorizon] = useState(
    initialGoal?.targetHorizon || 'End of 2026'
  );
  const [anchorWhy, setAnchorWhy] = useState(
    initialGoal?.anchorWhy ||
      'To architect fault-tolerant systems with calm mastery and lead impactful technical initiatives.'
  );
  const [connectedIntention, setConnectedIntention] = useState(
    initialGoal?.connectedIntention ?? true
  );

  const [subtasks, setSubtasks] = useState<Subtask[]>(
    initialGoal?.subtasks || [
      {
        id: 'st-1',
        title: 'Study Raft consensus algorithm and write a toy implementation',
        completed: false,
      },
      {
        id: 'st-2',
        title: "Read 'Designing Data-Intensive Applications' chapters 5-9",
        completed: true,
      },
      {
        id: 'st-3',
        title: 'Build an event-driven pub/sub benchmark in Go or Java',
        completed: false,
      },
    ]
  );

  const [newSubtaskText, setNewSubtaskText] = useState('');

  const pillars: LifePillar[] = [
    'Vocation & Craft',
    'Physical Vessel',
    'Exploration & Soul',
    'Inner Calm',
  ];

  const handleAddSubtask = () => {
    const trimmed = newSubtaskText.trim();
    if (!trimmed) return;
    const newRoot: Subtask = {
      id: `st-${Date.now()}`,
      title: trimmed,
      completed: false,
    };
    setSubtasks([...subtasks, newRoot]);
    setNewSubtaskText('');
    onShowToast('New root milestone added to branch.');
  };

  const handleDeleteSubtask = (id: string) => {
    setSubtasks(subtasks.filter((s) => s.id !== id));
  };

  const handlePlantGoal = () => {
    if (!goalTitle.trim()) {
      onShowToast('Please name your goal horizon.');
      return;
    }

    const newGoal: LifeGoal = {
      id: initialGoal?.id || `goal-${Date.now()}`,
      title: goalTitle,
      pillar: selectedPillar,
      targetHorizon,
      anchorWhy,
      subtasks,
      connectedIntention,
      plantedAt: 'March 2026',
      status: 'nurturing',
    };

    onPlantGoal(newGoal);
    onShowToast('Horizon planted! Roots are taking hold.');
  };

  const handleSaveDraft = () => {
    onShowToast('Draft safely gathered in quiet reserves.');
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-gutter-mobile pb-28 pt-2 space-y-space-lg">
      {/* Intro Header */}
      <div className="flex flex-col items-start gap-space-xs pt-space-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-md text-label-md">
          <span>🌱 Cultivate New Horizon</span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight mt-1 font-serif">
          Plant a Life Goal
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
          Decompose a distant aspiration into tangible, patient subtasks.
        </p>
      </div>

      {/* Visual Sanctuary Botanical Card */}
      <div className="relative w-full rounded-2xl bg-surface-container overflow-hidden shadow-sm border border-surface-variant/40">
        <div className="relative h-36 w-full overflow-hidden">
          <img
            className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
            alt="Delicate sprouting seedling emerging from moss-dusted rich soil"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCNQRYMFnTMwM6TR2U3NnPrxQFMg4bkwkszbPxi0KQR7JJXSD_yCGOkjTW851mqNf7U9WNeaLtdV0mGdMMAMHm_hDVhIv3UXbKwb8him9Xn__o8LQtvFV8ISnWs-mUnvfUUisg4fTISM1Pn8xOrxnyFIzj-SYehRWMFnKVsH1yaPPJCDTncQ3cNkSMMFzeclcRwcLiM_w5ZdfAUKWpd2BjoRSeh5pgGsXHDbs-IckMbVwiJCkqTb0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/40 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">psychiatry</span>
              <span className="font-label-sm text-label-sm text-primary tracking-wide uppercase font-semibold">
                Nurtured Vision
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-bright/95 px-2.5 py-0.5 rounded-full shadow-xs font-medium">
              Phase 1 of Growth
            </span>
          </div>
        </div>
      </div>

      {/* Section 1: The Life Pillar & Category */}
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <label className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">filter_vintage</span>
            <span>Life Pillar</span>
          </label>
          <span className="font-label-sm text-label-sm text-on-surface-variant">Select domain</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar -mx-gutter-mobile px-gutter-mobile">
          {pillars.map((pillar) => {
            const isActive = selectedPillar === pillar;
            return (
              <button
                key={pillar}
                type="button"
                onClick={() => setSelectedPillar(pillar)}
                className={`category-pill flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? 'bg-secondary-container text-on-secondary-fixed shadow-xs'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-primary'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isActive ? 'bg-primary' : 'bg-outline-variant'
                  }`}
                />
                <span className="font-label-md text-label-md whitespace-nowrap">{pillar}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 2: Horizon Definition */}
      <div className="flex flex-col gap-space-sm bg-surface-container-low p-space-md rounded-2xl border border-surface-variant/30">
        <div className="flex flex-col gap-1">
          <label className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">
              temp_preferences_custom
            </span>
            <span>Goal Horizon</span>
          </label>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Name the clearing in the forest you are walking toward.
          </p>
        </div>
        <div className="flex flex-col gap-space-sm">
          <div className="relative">
            <input
              type="text"
              value={goalTitle}
              onChange={(e) => setGoalTitle(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-xs border border-surface-variant/30 transition-all"
              placeholder="e.g., Cultivate a daily contemplative tea ritual"
            />
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">
                calendar_month
              </span>
              <span>Target Horizon</span>
            </span>
            <div className="relative inline-flex items-center">
              <select
                value={targetHorizon}
                onChange={(e) => setTargetHorizon(e.target.value)}
                className="appearance-none bg-surface-container-high text-on-surface font-label-md text-label-md py-1.5 pl-3 pr-8 rounded-full focus:outline-none cursor-pointer shadow-xs border-0"
              >
                <option value="End of 2026">End of 2026</option>
                <option value="Mid 2026">Mid 2026</option>
                <option value="End of 2025">End of 2025</option>
                <option value="Ongoing Seasonal Flow">Ongoing Seasonal Flow</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-2 text-on-surface-variant text-[18px]">
                expand_more
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: The Anchor */}
      <div className="flex flex-col gap-space-sm bg-surface-container-low p-space-md rounded-2xl border border-surface-variant/30">
        <div className="flex items-center justify-between">
          <label className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">anchor</span>
            <span>The Anchor</span>
          </label>
          <span className="font-label-sm text-label-sm text-primary font-medium">Contemplation</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Why does this matter to your quiet center?
        </p>
        <div className="relative">
          <textarea
            rows={3}
            value={anchorWhy}
            onChange={(e) => setAnchorWhy(e.target.value)}
            className="w-full p-3.5 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-xs resize-none border border-surface-variant/30 transition-all leading-relaxed"
            placeholder="Reflect on why this purpose sustains your journey..."
          />
        </div>
      </div>

      {/* Section 4: Decompose into Patient Subtasks (Root & Branch) */}
      <div className="flex flex-col gap-space-sm bg-surface-container-low p-space-md rounded-2xl border border-surface-variant/30">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[20px]">park</span>
              <span>Roots &amp; Branches</span>
            </label>
            <span className="font-label-sm text-label-sm text-primary px-2.5 py-0.5 rounded-full bg-secondary-container font-medium">
              {subtasks.length} Roots Nurtured
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Big goals bloom automatically once all roots are nurtured and completed.
          </p>
        </div>

        {/* Root Progress Diagram Indicator */}
        <div className="p-3 bg-surface-container rounded-xl flex items-center gap-3 border border-surface-variant/40">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[20px]">nature</span>
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
              <span className="font-label-sm text-label-sm text-on-surface">
                Root Health &amp; Subtask Vitality
              </span>
              <span className="font-label-sm text-label-sm text-primary font-medium">
                {subtasks.length} Roots Placed
              </span>
            </div>
            <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.max(15, (subtasks.filter((s) => s.completed).length / Math.max(1, subtasks.length)) * 100))}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Existing Subtasks List */}
        <div className="flex flex-col gap-2 pt-1" id="subtaskList">
          {subtasks.map((st, index) => (
            <div
              key={st.id}
              className="subtask-row group flex items-center justify-between gap-2.5 p-3 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow-sm border border-surface-variant/30 transition-all"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <span className="material-symbols-outlined text-on-surface-variant/40 hover:text-on-surface-variant cursor-grab text-[18px] select-none">
                  drag_indicator
                </span>
                <span className="w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm flex items-center justify-center shrink-0 font-semibold">
                  {index + 1}
                </span>
                <span
                  onClick={() => {
                    setSubtasks(
                      subtasks.map((s) =>
                        s.id === st.id ? { ...s, completed: !s.completed } : s
                      )
                    );
                  }}
                  className={`font-body-sm text-body-sm text-on-surface truncate cursor-pointer select-none ${
                    st.completed ? 'line-through text-on-surface-variant/70' : ''
                  }`}
                  title="Click to toggle completion"
                >
                  {st.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteSubtask(st.id)}
                aria-label="Remove root"
                className="delete-btn text-on-surface-variant/40 hover:text-error transition-colors p-1 rounded-lg cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
          ))}
        </div>

        {/* Add New Subtask Input Box */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={newSubtaskText}
              onChange={(e) => setNewSubtaskText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSubtask();
                }
              }}
              placeholder="+ Add another subtask / milestone..."
              className="w-full h-11 pl-3.5 pr-4 rounded-xl bg-surface-container-lowest text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-xs border border-surface-variant/30"
            />
          </div>
          <button
            type="button"
            onClick={handleAddSubtask}
            className="h-11 px-4 rounded-xl bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-1.5 hover:bg-primary-container active:scale-95 transition-all shadow-xs shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Add Root</span>
          </button>
        </div>
      </div>

      {/* Section 5: Connected Habit or Intention */}
      <div className="flex flex-col gap-space-sm bg-surface-container-low p-space-md rounded-2xl border border-surface-variant/30">
        <label className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-[20px]">search_off</span>
          <span>Connected Intention</span>
        </label>
        <label className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container-lowest shadow-xs cursor-pointer hover:bg-surface-container-high transition-colors border border-surface-variant/30">
          <div className="pt-0.5">
            <input
              type="checkbox"
              checked={connectedIntention}
              onChange={(e) => setConnectedIntention(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-0 focus:ring-offset-0 accent-primary cursor-pointer mt-0.5"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-title-md text-body-md text-on-surface">
              Schedule 3 deep focus sessions per week for this goal
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
              Compass will softly whisper calendar holds during your peak daylight hours.
            </span>
          </div>
        </label>
      </div>

      {/* Micro delight: Seasonal Blessing Quote */}
      <div className="p-space-md rounded-2xl bg-surface-container flex items-center gap-3 border border-surface-variant/40">
        <span className="material-symbols-outlined text-primary text-[24px]">energy_savings_leaf</span>
        <p className="font-headline-sm text-body-md text-on-surface italic font-serif">
          "A forest does not hasten its canopy; it simply offers each root damp earth and quiet patience."
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5 pt-2">
        <button
          type="button"
          onClick={handlePlantGoal}
          className="w-full h-12 rounded-xl bg-primary text-on-primary font-title-md text-title-md flex items-center justify-center gap-2 shadow-sm hover:bg-primary-container active:scale-[0.99] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">nature_people</span>
          <span>Plant Goal into Sanctuary</span>
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="flex-1 h-11 rounded-xl bg-surface-container-high text-on-surface-variant font-label-lg text-label-lg flex items-center justify-center gap-1.5 hover:text-primary hover:bg-surface-variant active:scale-[0.99] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">bookmark_border</span>
            <span>Save Draft</span>
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 h-11 rounded-xl bg-surface-container text-on-surface-variant font-label-lg hover:text-on-surface transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
