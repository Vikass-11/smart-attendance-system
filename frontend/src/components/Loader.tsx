import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm transition-colors duration-200">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="h-12 w-12 rounded-full border-4 border-slate-200 dark:border-slate-700"></div>
        {/* Spinning Indicator */}
        <div className="absolute h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400 animate-pulse">
        Loading system assets...
      </p>
    </div>
  );
};
export default Loader;