import React from 'react';

interface TopHeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  onOpenOrientation?: () => void;
  onOpenChat?: () => void;
  brandSublabel?: string;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  title,
  showBack = false,
  onBack,
  onOpenOrientation,
  onOpenChat,
  brandSublabel,
}) => {
  return (
    <header className="fixed top-0 w-full z-40 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(30,58,95,0.05)] pt-safe transition-all border-b border-surface-variant/60">
      <div className="h-16 px-gutter-mobile flex items-center justify-between max-w-xl mx-auto">
        <div className="flex items-center gap-space-sm">
          {showBack ? (
            <button
              type="button"
              aria-label="Go back"
              onClick={onBack}
              className="min-w-[44px] min-h-[44px] -ml-space-xs flex items-center justify-center text-on-surface hover:text-primary transition-colors cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
          ) : null}

          <div
            onClick={onOpenOrientation}
            className="flex items-center gap-space-xs cursor-pointer group"
            title="Open Compass Sanctuary Guide"
          >
            <img
              alt="Compass Logo"
              className="h-7 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1VNs7dHhcxYV7NBmShYuS1tapAbEfPHhQr3wmjft5wArtWqt0OZlIAnF6UtaLLfJZZgJHbgSKUZufxlGyAuA9AIeMR6LoRC75aWdgr0EZKMiV-sP0MmMuC6zr0TH9VFWsB_QAlXPynl5WM8jtnniO4JUW5YfGlhG4zJ-nF9JCf_43jVGLSm402gjPdOhEIX0dSj4Q5_9c1-Ud8y9cSqLJ32n3mDaNCYSljUo6g0tt7EuyfhwFFoMpe4vA"
            />
            {!showBack && (
              <span className="font-title-lg tracking-tight text-primary font-headline-sm">
                Compass
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-space-sm text-center">
          <span className="font-title-md text-title-md text-on-surface truncate max-w-[180px]">
            {title}
          </span>
          {brandSublabel && (
            <span className="text-xs font-medium text-secondary bg-secondary-container/60 px-2 py-0.5 rounded-full">
              {brandSublabel}
            </span>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 min-w-[44px] min-h-[44px]">
          {onOpenChat && (
            <button
              type="button"
              onClick={onOpenChat}
              className="w-9 h-9 rounded-full bg-secondary-container/70 text-primary flex items-center justify-center hover:bg-secondary-container transition-all active:scale-95 cursor-pointer shadow-xs"
              title="Talk with Sanctuary Companion (Feeling low?)"
            >
              <span className="material-symbols-outlined text-[19px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                spa
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenOrientation}
            className="group relative rounded-full p-0.5 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
            title="View Orientation Sanctuary"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-primary/20 transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1UeQ_yVpW_OzDSe-QsCi59jAx6gn_KCnKJOyXV3GZnBskkPFJQ_toJRq55TTnrKYRA8V7OZDLjhrl467PYCtvSLdz8Quw8EF_V-tDyi4X_kPyqeimSwcwUX2wlfjzMs9r4BVGgyCxUsZT873cE__3R9zdO_Xy5MEH9t752LKD4Sl1ttbhgNkFtA3rZvu8SrOc3_4UJHvNw3rrYu0Nd0yI7YBLjnP1KhdlHoAjsGv00-mjSBh0_ATEgZBA"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary rounded-full ring-2 ring-surface"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
