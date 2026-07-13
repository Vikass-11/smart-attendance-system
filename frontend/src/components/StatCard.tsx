import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  gradient?: string;
}

const StatCard = ({ label, value, icon: Icon, gradient = 'from-indigo-500 to-cyan-400' }: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 relative overflow-hidden group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="text-3xl font-bold mt-1 text-slate-900">{value}</p>
        </div>
        {Icon && (
          <div className="bg-slate-50 p-2 rounded-lg group-hover:bg-indigo-50 transition-colors">
            <Icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;