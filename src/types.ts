export type LifePillar =
  | 'Vocation & Craft'
  | 'Physical Vessel'
  | 'Exploration & Soul'
  | 'Inner Calm';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface LifeGoal {
  id: string;
  title: string;
  pillar: LifePillar;
  targetHorizon: string;
  anchorWhy: string;
  subtasks: Subtask[];
  connectedIntention: boolean;
  plantedAt: string;
  status: 'nurturing' | 'blooming' | 'completed';
}

export interface ImpulseLog {
  minute: number;
  text: string;
  timestamp: string;
}

export interface FocusSession {
  id: string;
  goalId: string;
  goalTitle: string;
  parentHorizon: string;
  durationMinutes: number;
  completedAt: string;
  progressNote: string;
  selectedChips: string[];
  recordedImpulses: ImpulseLog[];
  sanctuaryObservation: string;
  nextStep: string;
  addedToEvidence: boolean;
}

export interface WeeklyReflectionData {
  weekNumber: number;
  year: number;
  month: string;
  theme: string;
  groundingStatus: {
    pillarsTended: number;
    cadence: string;
  };
  growthItems: Array<{
    id: string;
    title: string;
    sessions: string;
    milestoneBadge: string;
    progressPercent: number;
    summary: string;
    icon: string;
    colorClass: string;
  }>;
  fallowObservation: {
    title: string;
    description: string;
    actionPrompt: string;
    sown: boolean;
  };
  distractionUrges: {
    description: string;
    breakdown: Array<{
      label: string;
      subtext: string;
      percentage: number;
      color: string;
    }>;
  };
  compassMirror: {
    type: string;
    quote: string;
    source: string;
    validity: string;
  };
  systemCalibration: {
    week: number;
    intervention: string;
    adopted: boolean;
  };
}

export type TabKey = 'focus' | 'goals' | 'reflections' | 'companion';
