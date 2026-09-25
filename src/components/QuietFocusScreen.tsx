import React, { useState, useEffect } from 'react';
import { LifeGoal, FocusSession, ImpulseLog } from '../types';

interface QuietFocusScreenProps {
  goals: LifeGoal[];
  activeGoalId: string;
  onSelectActiveGoal: (goalId: string) => void;
  onCompleteSession: (session: FocusSession) => void;
  onViewCompletedSession: () => void;
  onOpenBreathing: () => void;
  onShowToast: (message: string) => void;
}

export const QuietFocusScreen: React.FC<QuietFocusScreenProps> = ({
  goals,
  activeGoalId,
  onSelectActiveGoal,
  onCompleteSession,
  onViewCompletedSession,
  onOpenBreathing,
  onShowToast,
}) => {
  const [sessionMinutes, setSessionMinutes] = useState<number>(25);
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isDemoPlaying, setIsDemoPlaying] = useState<boolean>(false);
  const [elapsedMinutes, setElapsedMinutes] = useState<number>(0);

  // Quick urge surf toggle
  const [showUrgeInput, setShowUrgeInput] = useState<boolean>(false);
  const [urgeText, setUrgeText] = useState<string>('');

  const currentGoal = goals.find((g) => g.id === activeGoalId) || goals[0];

  // Timer Tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  // Demo simulator (advances character smoothly across the trail)
  useEffect(() => {
    let demoTimer: NodeJS.Timeout | null = null;
    if (isDemoPlaying) {
      demoTimer = setInterval(() => {
        setTimeLeft((prev) => {
          const step = Math.max(1, Math.floor((sessionMinutes * 60) / 30));
          if (prev <= step) {
            setIsDemoPlaying(false);
            return 0;
          }
          return prev - step;
        });
      }, 400);
    }
    return () => {
      if (demoTimer) clearInterval(demoTimer);
    };
  }, [isDemoPlaying, sessionMinutes]);

  useEffect(() => {
    const elapsed = Math.floor((sessionMinutes * 60 - timeLeft) / 60);
    setElapsedMinutes(elapsed);
  }, [timeLeft, sessionMinutes]);

  const progressPercent = Math.min(
    100,
    Math.max(0, ((sessionMinutes * 60 - timeLeft) / (sessionMinutes * 60)) * 100)
  );

  const handleToggleTimer = () => {
    if (isDemoPlaying) setIsDemoPlaying(false);
    setIsActive(!isActive);
  };

  const handleResetTimer = (mins: number) => {
    setIsActive(false);
    setIsDemoPlaying(false);
    setSessionMinutes(mins);
    setTimeLeft(mins * 60);
  };

  const handleToggleDemo = () => {
    if (!isDemoPlaying) {
      setIsActive(false);
      setIsDemoPlaying(true);
      if (timeLeft <= 5) {
        setTimeLeft(sessionMinutes * 60);
      }
      onShowToast('Simulating character walking along the path...');
    } else {
      setIsDemoPlaying(false);
    }
  };

  const handleLogQuickUrge = () => {
    if (!urgeText.trim()) return;
    onShowToast('Urge noted without judgment. Keep breathing.');
    setUrgeText('');
    setShowUrgeInput(false);
  };

  const handleFinishEarly = () => {
    setIsActive(false);
    setIsDemoPlaying(false);
    const devotedMins = elapsedMinutes > 0 ? elapsedMinutes : sessionMinutes;
    const subtaskTitle =
      currentGoal?.subtasks.find((s) => !s.completed)?.title ||
      currentGoal?.subtasks[0]?.title ||
      'Daily Focus Step';

    const newSession: FocusSession = {
      id: `sess-${Date.now()}`,
      goalId: currentGoal?.id || 'goal-1',
      goalTitle: subtaskTitle,
      parentHorizon: currentGoal?.title || 'Visualized Life Goal',
      durationMinutes: devotedMins,
      completedAt: 'Just now',
      progressNote: `Character advanced ${Math.round(progressPercent)}% toward "${currentGoal?.title}". Maintained gentle cognitive presence.`,
      selectedChips: ['Clear mental breakthrough'],
      recordedImpulses: [{ minute: Math.max(1, elapsedMinutes), text: 'Felt focus friction, paused with compassion.', timestamp: 'Mid-session' }],
      sanctuaryObservation: 'You guarded your attention and took patient steps forward.',
      nextStep: `Continue next milestone on ${subtaskTitle}.`,
      addedToEvidence: true,
    };

    onCompleteSession(newSession);
  };

  // Determine cartoon image based on progress
  const getSceneImage = () => {
    if (progressPercent >= 85) return '/src/assets/images/focus_phase_mastery_1790331595530.jpg';
    if (progressPercent >= 55) return '/src/assets/images/focus_phase_bloom_1790331582728.jpg';
    if (progressPercent >= 25) return '/src/assets/images/focus_phase_growth_1790331567132.jpg';
    return '/src/assets/images/traveler_walking_path_1790331822308.jpg';
  };

  const getPhaseNarrative = () => {
    if (progressPercent >= 85) {
      return {
        stage: 'Summit Reached',
        speech: 'We made it to the mountain peak!',
        desc: 'Your visualized goal horizon is manifesting beneath your feet.',
      };
    }
    if (progressPercent >= 55) {
      return {
        stage: 'Deep Trail Flow',
        speech: 'Finding strong steady pace...',
        desc: 'Passing under the illuminated trees of deep understanding.',
      };
    }
    if (progressPercent >= 25) {
      return {
        stage: 'Stepping Forward',
        speech: 'One unhurried step at a time...',
        desc: 'Nurturing the sprout of your chosen craft.',
      };
    }
    return {
      stage: 'Setting Out',
      speech: 'Beginning the journey...',
      desc: 'Planting intention at the trailhead of your visualized goal.',
    };
  };

  const narrative = getPhaseNarrative();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-4 py-3 space-y-4 pb-28">
      {/* 1. Clean Goal Selector Bar */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-container border border-surface-variant/60 shadow-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[18px]">explore</span>
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-semibold text-secondary uppercase tracking-wider block">
              Walking Toward Goal
            </span>
            <select
              value={activeGoalId}
              onChange={(e) => {
                onSelectActiveGoal(e.target.value);
                onShowToast('Target goal updated for this walk.');
              }}
              className="font-title-md text-xs sm:text-sm font-semibold text-on-surface bg-transparent border-none p-0 cursor-pointer focus:outline-none truncate max-w-[260px]"
            >
              {goals.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-primary bg-secondary-container px-2.5 py-1 rounded-full whitespace-nowrap">
          {currentGoal?.subtasks.length || 0} milestones
        </span>
      </div>

      {/* 2. Crisp, Large Focus Timer */}
      <div className="rounded-3xl bg-surface-container-lowest p-5 sm:p-6 shadow-sm border border-surface-variant/60 flex flex-col items-center justify-center space-y-4">
        {/* Digital Clock */}
        <div className="text-center">
          <span className="font-display-lg-mobile text-6xl sm:text-7xl font-serif text-on-surface tabular-nums tracking-tight font-normal">
            {formatTime(timeLeft)}
          </span>
          <p className="text-xs font-semibold text-secondary uppercase tracking-widest mt-1">
            {isActive ? 'Character walking in quiet focus' : isDemoPlaying ? 'Fast-forwarding trail preview' : 'Ready to step forward'}
          </p>
        </div>

        {/* Time preset chips */}
        <div className="flex items-center gap-2">
          {[15, 25, 45, 60].map((mins) => (
            <button
              key={mins}
              type="button"
              onClick={() => handleResetTimer(mins)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                sessionMinutes === mins
                  ? 'bg-primary text-on-primary font-semibold shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {mins}m
            </button>
          ))}
        </div>

        {/* Primary Controls */}
        <div className="flex items-center gap-2.5 w-full pt-1">
          <button
            type="button"
            onClick={handleToggleTimer}
            className={`flex-1 h-12 rounded-2xl font-semibold text-sm shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer ${
              isActive
                ? 'bg-secondary text-on-secondary hover:opacity-90'
                : 'bg-primary text-on-primary hover:bg-primary-container'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isActive ? 'pause' : 'play_arrow'}
            </span>
            <span>{isActive ? 'Pause Walk' : 'Begin Walking'}</span>
          </button>

          <button
            type="button"
            onClick={handleFinishEarly}
            className="h-12 px-4 rounded-2xl bg-secondary-container text-primary text-xs font-semibold flex items-center gap-1.5 hover:bg-secondary-fixed transition-all active:scale-95 cursor-pointer shadow-xs whitespace-nowrap border border-secondary/20"
            title="Complete step & seal progress"
          >
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Seal Milestone</span>
          </button>
        </div>
      </div>

      {/* 3. DIRECTLY UNDER THE TIMER: Character Walking Toward Visualized Goal */}
      <div className="rounded-3xl bg-surface-container-lowest p-4 sm:p-5 shadow-sm border border-surface-variant/60 space-y-3.5 overflow-hidden relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <h3 className="font-title-md text-sm font-semibold text-on-surface">
              Character Journey Path
            </h3>
          </div>
          <span className="text-xs font-semibold text-primary bg-secondary-container px-2.5 py-0.5 rounded-full">
            {narrative.stage} ({Math.round(progressPercent)}%)
          </span>
        </div>

        {/* The Atmospheric Cartoon Journey Scene */}
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-inner bg-surface-container border border-surface-variant/40 group">
          <img
            src={getSceneImage()}
            alt="Character journeying toward goal"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-700 ease-out"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-inverse-surface/20 to-transparent" />

          {/* Speech Bubble above traveler */}
          <div
            className="absolute bottom-16 sm:bottom-20 transition-all duration-500 ease-out"
            style={{
              left: `${Math.min(75, Math.max(15, progressPercent))}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="bg-white/95 backdrop-blur-md text-primary text-[11px] font-semibold px-2.5 py-1 rounded-xl shadow-md border border-white/50 whitespace-nowrap animate-bounce flex items-center gap-1">
              <span>🎒</span>
              <span>{narrative.speech}</span>
            </div>
          </div>

          {/* Trail Caption */}
          <div className="absolute bottom-3 left-4 right-4 text-white space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-sky-200 uppercase tracking-wider">
                Destination Horizon: {currentGoal?.targetHorizon}
              </span>
              <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full text-white">
                {Math.round(progressPercent)}% along trail
              </span>
            </div>
            <p className="text-xs text-slate-200 line-clamp-1 italic font-serif">
              {narrative.desc}
            </p>
          </div>
        </div>

        {/* Dynamic Trail Walker Bar */}
        <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-variant/40 space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-on-surface-variant">
            <span className="flex items-center gap-1">
              <span>🚩</span> Trailhead
            </span>
            <span className="text-primary font-bold truncate max-w-[200px]">
              🏔️ {currentGoal?.title}
            </span>
          </div>

          {/* Interactive Progress Trail with Walking Character Marker */}
          <div className="relative w-full h-3 bg-surface-container rounded-full overflow-visible border border-surface-variant/50">
            {/* Filled trail */}
            <div
              className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />

            {/* Walking character avatar placed along the trail */}
            <div
              className="absolute -top-3.5 transition-all duration-500 ease-out"
              style={{
                left: `${progressPercent}%`,
                transform: 'translateX(-50%)',
              }}
            >
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md ring-2 ring-white text-sm animate-serene-breathe">
                🚶
              </div>
            </div>
          </div>

          {/* Goal Milestones along the trail */}
          <div className="pt-2 grid grid-cols-3 gap-1.5 text-center">
            {currentGoal?.subtasks.slice(0, 3).map((st, i) => {
              const markerPercent = (i + 1) * 33;
              const isReached = progressPercent >= markerPercent || st.completed;
              return (
                <div
                  key={st.id}
                  className={`p-1.5 rounded-xl border text-[10px] transition-all leading-tight ${
                    isReached
                      ? 'bg-secondary-container border-primary text-on-secondary-fixed font-semibold'
                      : 'bg-surface-container border-surface-variant/40 text-on-surface-variant'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <span>{isReached ? '✓' : `St. ${i + 1}`}</span>
                  </div>
                  <span className="truncate block">{st.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trail simulation & Quick tools */}
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={handleToggleDemo}
            className={`text-xs px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
              isDemoPlaying
                ? 'bg-primary text-on-primary border-primary'
                : 'bg-surface-container-low text-secondary border-surface-variant/60 hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">
              {isDemoPlaying ? 'pause' : 'directions_walk'}
            </span>
            <span>{isDemoPlaying ? 'Pause Simulation' : 'Preview Walking'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowUrgeInput(!showUrgeInput)}
            className="text-xs text-secondary hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[15px]">flare</span>
            <span>Urge rising?</span>
          </button>
        </div>

        {/* Quick urge surf inline */}
        {showUrgeInput && (
          <div className="pt-2 flex gap-1.5 animate-in fade-in duration-200">
            <input
              type="text"
              value={urgeText}
              onChange={(e) => setUrgeText(e.target.value)}
              placeholder="Name the distraction urge gently..."
              className="flex-1 bg-surface-container-low text-xs rounded-xl px-3 py-2 border border-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-primary/20"
            />
            <button
              type="button"
              onClick={handleLogQuickUrge}
              className="px-3 py-2 bg-primary text-on-primary text-xs font-semibold rounded-xl hover:bg-primary-container cursor-pointer shrink-0"
            >
              Ride Urge
            </button>
            <button
              type="button"
              onClick={onOpenBreathing}
              className="px-2.5 py-2 bg-secondary-container text-primary text-xs font-semibold rounded-xl hover:bg-secondary-fixed cursor-pointer shrink-0"
              title="Pause for breath"
            >
              Breath
            </button>
          </div>
        )}
      </div>

      {/* Review Completed Session Reflection Quick Link */}
      <div className="p-3 rounded-2xl bg-surface-container border border-surface-variant/40 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-primary">history_edu</span>
          <span className="text-on-surface-variant">
            Previous 45m session archived quietly.
          </span>
        </div>
        <button
          type="button"
          onClick={onViewCompletedSession}
          className="text-primary font-semibold hover:underline cursor-pointer"
        >
          View Session Flow →
        </button>
      </div>
    </div>
  );
};
