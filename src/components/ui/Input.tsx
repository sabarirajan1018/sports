import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  suffix?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, suffix, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors ${icon ? 'pl-10' : ''} ${suffix ? 'pr-12' : ''} ${error ? 'border-red-500' : ''} ${className}`}
            {...props}
          />
          {suffix && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
              {suffix}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
