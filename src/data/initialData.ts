import { LifeGoal, WeeklyReflectionData, FocusSession } from '../types';

export const INITIAL_GOALS: LifeGoal[] = [
  {
    id: 'goal-1',
    title: 'Become Highly Skilled in Distributed Systems',
    pillar: 'Vocation & Craft',
    targetHorizon: 'End of 2026',
    anchorWhy: 'To architect fault-tolerant systems with calm mastery and lead impactful technical initiatives.',
    connectedIntention: true,
    plantedAt: 'March 2026',
    status: 'nurturing',
    subtasks: [
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
    ],
  },
  {
    id: 'goal-2',
    title: 'Cultivate Somatic Strength & Spine Health',
    pillar: 'Physical Vessel',
    targetHorizon: 'End of 2026',
    anchorWhy: 'Physical vitality sustains cognitive presence and emotional equanimity throughout long contemplative seasons.',
    connectedIntention: true,
    plantedAt: 'January 2026',
    status: 'nurturing',
    subtasks: [
      { id: 'st-21', title: 'Complete 3 strength sessions per week without strain', completed: true },
      { id: 'st-22', title: 'Daily 10-minute floor mobility and hip opener ritual', completed: true },
      { id: 'st-23', title: 'Weekend 8km unhurried nature walk', completed: false },
    ],
  },
  {
    id: 'goal-3',
    title: 'Quiet Stoic Philosophy & Classical Reading',
    pillar: 'Exploration & Soul',
    targetHorizon: 'Mid 2026',
    anchorWhy: 'Anchors the mind against the restless winds of constant urgency and reactive communication.',
    connectedIntention: false,
    plantedAt: 'February 2026',
    status: 'nurturing',
    subtasks: [
      { id: 'st-31', title: 'Read Seneca Letters from a Stoic (4 letters weekly)', completed: true },
      { id: 'st-32', title: 'Keep handwritten evening marginalia journal', completed: false },
    ],
  },
];

export const INITIAL_WEEKLY_REFLECTION: WeeklyReflectionData = {
  weekNumber: 11,
  year: 2026,
  month: 'March',
  theme: 'Self-awareness over productivity points.',
  groundingStatus: {
    pillarsTended: 3,
    cadence: 'Calm cadence',
  },
  growthItems: [
    {
      id: 'growth-1',
      title: 'Backend Engineering',
      sessions: '5 focused sessions • 4h 15m invested',
      milestoneBadge: '2 Milestones',
      progressPercent: 82,
      summary: 'Nurtured cache hydration & event orchestration',
      icon: 'terminal',
      colorClass: 'bg-primary',
    },
    {
      id: 'growth-2',
      title: 'Physical Vessel',
      sessions: 'Health & somatic balance',
      milestoneBadge: '3 Sessions',
      progressPercent: 100,
      summary: 'Consistent strength workouts completed without strain',
      icon: 'self_improvement',
      colorClass: 'bg-secondary',
    },
    {
      id: 'growth-3',
      title: 'Exploration & Soul',
      sessions: 'Foundational philosophy',
      milestoneBadge: '4 Chapters',
      progressPercent: 65,
      summary: 'Reflected on quiet stoic agency and voluntary simplicity',
      icon: 'auto_stories',
      colorClass: 'bg-tertiary',
    },
  ],
  fallowObservation: {
    title: 'Kerala travel planning',
    description: 'received no dedicated focus blocks this week. That’s completely okay — season changes dictate rhythm.',
    actionPrompt: 'When ready, schedule an unhurried 30-min block',
    sown: false,
  },
  distractionUrges: {
    description: 'Not moral failing — simply moments where your working memory reached saturation.',
    breakdown: [
      {
        label: 'Ambiguous / Dense Technical Concepts',
        subtext: 'Friction trigger during distributed systems design',
        percentage: 65,
        color: '#1e3a5f', // dark blue
      },
      {
        label: 'Low Afternoon Energy Dip',
        subtext: 'Circadian dip between 2:30 PM – 3:45 PM',
        percentage: 20,
        color: '#93c5fd', // light shade of dark blue
      },
      {
        label: 'Phone Notifications',
        subtext: 'External pings & message check reflexes',
        percentage: 15,
        color: '#cbd5e1', // soft slate
      },
    ],
  },
  compassMirror: {
    type: 'COGNITIVE RELIEF PATTERN',
    quote: '“You tend to reach for your phone when a concept isn’t immediately obvious, not because you lack discipline. Your mind seeks fast cognitive relief from friction.”',
    source: 'Synthesized from 12 task-switch logs',
    validity: 'High Validity',
  },
  systemCalibration: {
    week: 12,
    intervention: 'Before starting complex backend sessions, write down one specific sub-question on tactile paper first. Clarity dissolves friction.',
    adopted: true,
  },
};

export const INITIAL_LATEST_SESSION: FocusSession = {
  id: 'session-prev',
  goalId: 'goal-1',
  goalTitle: 'Learn Spring Boot dependency injection',
  parentHorizon: 'Become highly skilled in backend engineering (2026 Horizon)',
  durationMinutes: 45,
  completedAt: 'Just now',
  progressNote: 'Understood constructor injection vs @Autowired. Still need to practice bean lifecycles.',
  selectedChips: ['Clear mental breakthrough'],
  recordedImpulses: [
    {
      minute: 26,
      text: 'Felt stuck on bean scope ambiguity.',
      timestamp: 'Minute 26',
    },
  ],
  sanctuaryObservation: 'You chose to pause and give it 10 more minutes instead of checking Instagram. That conscious decision nurtured inner resilience.',
  nextStep: 'Write 3 unit tests with mock dependencies to solidify constructor injection.',
  addedToEvidence: false,
};
