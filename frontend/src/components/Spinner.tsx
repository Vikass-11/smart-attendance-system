import React from 'react';

interface SpinnerProps {
  label?: string;
  className?: string;
  size?: 'sm' | 'md';
  inline?: boolean;
  variant?: 'default' | 'light';
}

export const Spinner: React.FC<SpinnerProps> = ({
  label,
  className = '',
  size = 'md',
  inline = false,
  variant = 'default',
}) => {
  const sizeClass = size === 'sm' ? 'h-5 w-5' : 'h-8 w-8';
  const colorClass =
    variant === 'light'
      ? 'border-white/30 border-t-white'
      : 'border-slate-200 border-t-slate-900 dark:border-slate-800 dark:border-t-white';

  const ring = (
    <div className={`animate-spin rounded-full border-2 ${colorClass} ${sizeClass}`} />
  );

  if (inline) {
    return (
      <span className={`inline-flex items-center gap-2 ${className}`}>
        {ring}
        {label && <span className="text-xs font-medium tracking-wide">{label}</span>}
      </span>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {ring}
      {label && <span className="text-xs text-slate-400 mt-3 font-medium tracking-wide">{label}</span>}
    </div>
  );
};

export default Spinner;
