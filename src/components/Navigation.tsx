import React from 'react';
import { TabKey } from '../types';

interface NavigationProps {
  currentTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onSelectTab }) => {
  const tabs: Array<{ id: TabKey; label: string; icon: string }> = [
    { id: 'focus', label: 'Focus', icon: 'timelapse' },
    { id: 'goals', label: 'Goals', icon: 'flag' },
    { id: 'reflections', label: 'Reflections', icon: 'auto_stories' },
    { id: 'companion', label: 'Companion', icon: 'spa' },
  ];

  return (
    <nav
      className="fixed bottom-0 w-full z-40 pb-safe bg-surface/95 backdrop-blur-xl shadow-[0_-4px_20px_rgba(30,58,95,0.06)] border-t border-surface-variant/60"
      aria-label="Sanctuary Navigation"
    >
      <div className="h-16 px-space-sm flex items-center justify-around max-w-xl mx-auto">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`min-w-[60px] h-12 flex flex-col items-center justify-center gap-1 transition-all rounded-2xl px-2 cursor-pointer ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-primary opacity-80 hover:opacity-100'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[22px] transition-transform"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1, 'wght' 600" : "'FILL' 0, 'wght' 400" }}
                >
                  {tab.icon}
                </span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </div>
              <span className={`text-[11px] leading-none ${isActive ? 'font-bold text-primary' : 'text-on-surface-variant'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
