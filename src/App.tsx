/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabKey, LifeGoal, FocusSession, WeeklyReflectionData, Subtask } from './types';
import {
  INITIAL_GOALS,
  INITIAL_WEEKLY_REFLECTION,
  INITIAL_LATEST_SESSION,
} from './data/initialData';
import { TopHeader } from './components/TopHeader';
import { Navigation } from './components/Navigation';
import { WeeklyReflectionScreen } from './components/WeeklyReflectionScreen';
import { DeepSessionFlowScreen } from './components/DeepSessionFlowScreen';
import { PlantGoalScreen } from './components/PlantGoalScreen';
import { ArrivalSanctuaryModal } from './components/ArrivalSanctuaryModal';
import { QuietFocusScreen } from './components/QuietFocusScreen';
import { GoalsDashboard } from './components/GoalsDashboard';
import { BreathingModal } from './components/BreathingModal';
import { SanctuaryCompanionChat } from './components/SanctuaryCompanionChat';

export default function App() {
  // Navigation & Subview State - Default to Focus Timer screen
  const [currentTab, setCurrentTab] = useState<TabKey>('focus');
  const [activeSubview, setActiveSubview] = useState<'main' | 'session-flow' | 'plant-goal'>('main');
  const [showOrientationModal, setShowOrientationModal] = useState<boolean>(false);
  const [showBreathingModal, setShowBreathingModal] = useState<boolean>(false);
  const [showChatModal, setShowChatModal] = useState<boolean>(false);

  // App Data with LocalStorage Persistence
  const [goals, setGoals] = useState<LifeGoal[]>(() => {
    try {
      const saved = localStorage.getItem('compass_goals');
      return saved ? JSON.parse(saved) : INITIAL_GOALS;
    } catch {
      return INITIAL_GOALS;
    }
  });

  const [activeGoalId, setActiveGoalId] = useState<string>(() => {
    return goals[0]?.id || 'goal-1';
  });

  const [weeklyReflection, setWeeklyReflection] = useState<WeeklyReflectionData>(() => {
    try {
      const saved = localStorage.getItem('compass_reflection');
      return saved ? JSON.parse(saved) : INITIAL_WEEKLY_REFLECTION;
    } catch {
      return INITIAL_WEEKLY_REFLECTION;
    }
  });

  const [latestSession, setLatestSession] = useState<FocusSession>(() => {
    try {
      const saved = localStorage.getItem('compass_latest_session');
      return saved ? JSON.parse(saved) : INITIAL_LATEST_SESSION;
    } catch {
      return INITIAL_LATEST_SESSION;
    }
  });

  // Floating Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('compass_goals', JSON.stringify(goals));
    } catch {
      // ignore
    }
  }, [goals]);

  useEffect(() => {
    try {
      localStorage.setItem('compass_reflection', JSON.stringify(weeklyReflection));
    } catch {
      // ignore
    }
  }, [weeklyReflection]);

  useEffect(() => {
    try {
      localStorage.setItem('compass_latest_session', JSON.stringify(latestSession));
    } catch {
      // ignore
    }
  }, [latestSession]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2800);
  };

  // Actions
  const handlePlantGoal = (newGoal: LifeGoal) => {
    setGoals([newGoal, ...goals]);
    setActiveGoalId(newGoal.id);
    setActiveSubview('main');
    setCurrentTab('goals');
    showToast(`Horizon "${newGoal.title}" planted into dashboard.`);
  };

  const handleToggleSubtask = (goalId: string, subtaskId: string) => {
    setGoals((prevGoals) =>
      prevGoals.map((g) => {
        if (g.id !== goalId) return g;
        return {
          ...g,
          subtasks: g.subtasks.map((st) =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          ),
        };
      })
    );
  };

  const handleAddSubtask = (goalId: string, title: string) => {
    const newSubtask: Subtask = {
      id: `st-${Date.now()}`,
      title,
      completed: false,
    };
    setGoals((prev) =>
      prev.map((g) => (g.id === goalId ? { ...g, subtasks: [...g.subtasks, newSubtask] } : g))
    );
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== goalId));
    if (activeGoalId === goalId) {
      const remaining = goals.filter((g) => g.id !== goalId);
      if (remaining.length > 0) setActiveGoalId(remaining[0].id);
    }
    showToast('Goal safely archived.');
  };

  const handleCompleteSession = (newSession: FocusSession) => {
    setLatestSession(newSession);
    setActiveSubview('session-flow');
  };

  const handleSaveSession = (updatedSession: FocusSession) => {
    setLatestSession(updatedSession);
  };

  // Header Title Determination
  const getHeaderTitle = () => {
    if (activeSubview === 'session-flow') return 'Deep Session Flow';
    if (activeSubview === 'plant-goal') return 'Plant a Life Goal';
    switch (currentTab) {
      case 'focus':
        return 'Focus Walk';
      case 'goals':
        return 'Goals Dashboard';
      case 'reflections':
        return 'Reflections';
      case 'companion':
        return 'Sanctuary Companion';
      default:
        return 'Compass';
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased flex flex-col min-h-screen relative selection:bg-secondary-container selection:text-on-secondary-fixed">
      {/* Fixed Top Header */}
      <TopHeader
        title={getHeaderTitle()}
        showBack={activeSubview !== 'main'}
        onBack={() => setActiveSubview('main')}
        onOpenOrientation={() => setShowOrientationModal(true)}
        onOpenChat={() => {
          setCurrentTab('companion');
          setActiveSubview('main');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full pt-16 bg-surface">
        {activeSubview === 'session-flow' ? (
          <DeepSessionFlowScreen
            session={latestSession}
            onSaveSession={handleSaveSession}
            onClose={() => setActiveSubview('main')}
            onShowToast={showToast}
          />
        ) : activeSubview === 'plant-goal' ? (
          <PlantGoalScreen
            onPlantGoal={handlePlantGoal}
            onShowToast={showToast}
            onCancel={() => setActiveSubview('main')}
          />
        ) : currentTab === 'focus' ? (
          <QuietFocusScreen
            goals={goals}
            activeGoalId={activeGoalId}
            onSelectActiveGoal={setActiveGoalId}
            onCompleteSession={handleCompleteSession}
            onViewCompletedSession={() => setActiveSubview('session-flow')}
            onOpenBreathing={() => setShowBreathingModal(true)}
            onShowToast={showToast}
          />
        ) : currentTab === 'goals' ? (
          <GoalsDashboard
            goals={goals}
            activeGoalId={activeGoalId}
            onSelectActiveGoal={setActiveGoalId}
            onNavigateToFocus={() => setCurrentTab('focus')}
            onOpenPlantGoal={() => setActiveSubview('plant-goal')}
            onToggleSubtask={handleToggleSubtask}
            onAddSubtask={handleAddSubtask}
            onDeleteGoal={handleDeleteGoal}
            onShowToast={showToast}
          />
        ) : currentTab === 'reflections' ? (
          <WeeklyReflectionScreen
            reflectionData={weeklyReflection}
            onUpdateReflection={setWeeklyReflection}
            onOpenBreathing={() => setShowBreathingModal(true)}
            onPlanNextWeek={() => {
              showToast('Insights anchored. Preparing quiet horizon for next week.');
            }}
          />
        ) : (
          <SanctuaryCompanionChat
            isInline={true}
            onOpenBreathing={() => setShowBreathingModal(true)}
          />
        )}
      </main>

      {/* Fixed Bottom Tab Navigation (Only visible when not in a modal / fullscreen flow subview) */}
      {activeSubview === 'main' && (
        <Navigation
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            setActiveSubview('main');
          }}
        />
      )}

      {/* Arrival Sanctuary / Orientation Modal (Image 7) */}
      <ArrivalSanctuaryModal
        isOpen={showOrientationModal}
        onClose={() => setShowOrientationModal(false)}
        onContinueToVision={() => {
          setShowOrientationModal(false);
          setCurrentTab('goals');
          setActiveSubview('plant-goal');
          showToast('Proceeding to life horizon architecture.');
        }}
        onSkipToFocus={() => {
          setShowOrientationModal(false);
          setCurrentTab('focus');
          setActiveSubview('main');
          showToast('Ready for unhurried focus today.');
        }}
      />

      {/* Ambient Breathing Exercise Modal */}
      <BreathingModal
        isOpen={showBreathingModal}
        onClose={() => setShowBreathingModal(false)}
      />

      {/* Floating Sanctuary Toast Notification */}
      <div
        className={`fixed bottom-20 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-full bg-inverse-surface text-inverse-on-surface font-body-sm text-body-sm shadow-xl flex items-center gap-2 transition-all duration-300 z-50 pointer-events-none max-w-sm text-center ${
          toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <span className="material-symbols-outlined text-[18px] text-inverse-primary shrink-0">
          check_circle
        </span>
        <span className="truncate">{toastMessage || 'Action completed'}</span>
      </div>
    </div>
  );
}
