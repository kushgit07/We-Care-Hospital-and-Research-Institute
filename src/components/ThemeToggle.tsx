import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Laptop, Check } from 'lucide-react';
import { useTheme, Theme } from '../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown' | 'segmented';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  variant = 'button', 
  className = '' 
}) => {
  const { theme, isDark, setTheme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  if (variant === 'segmented') {
    return (
      <div className={`inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 ${className}`}>
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            theme === 'light'
              ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          title="Light Theme"
        >
          <Sun className="w-3.5 h-3.5" />
          <span>Light</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            theme === 'dark'
              ? 'bg-slate-900 text-teal-300 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          title="Dark Theme"
        >
          <Moon className="w-3.5 h-3.5" />
          <span>Dark</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('system')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            theme === 'system'
              ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          title="System Sync"
        >
          <Laptop className="w-3.5 h-3.5" />
          <span>Auto</span>
        </button>
      </div>
    );
  }

  // Quick 1-click Toggle Button with click & long-click / hover tooltip
  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleTheme}
        onContextMenu={(e) => {
          e.preventDefault();
          setDropdownOpen(prev => !prev);
        }}
        className={`relative p-2 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 flex items-center justify-center ${
          isDark
            ? 'bg-slate-800 hover:bg-slate-750 text-amber-300 border-slate-700 hover:border-slate-600 shadow-sm shadow-amber-500/10'
            : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-200 hover:border-slate-300 shadow-sm'
        } ${className}`}
        aria-label={`Current theme: ${isDark ? 'Dark' : 'Light'}. Click to toggle theme`}
        title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode (Right click for Auto)`}
      >
        <span className="sr-only">Toggle Theme</span>
        {isDark ? (
          <Moon className="w-4 h-4 text-amber-300 transition-transform hover:rotate-12" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500 transition-transform hover:rotate-45" />
        )}
      </button>

      {/* Popover options menu if opened via right click or toggle */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">
            Appearance
          </div>
          <button
            onClick={() => { setTheme('light'); setDropdownOpen(false); }}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Light</span>
            </div>
            {theme === 'light' && <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />}
          </button>
          <button
            onClick={() => { setTheme('dark'); setDropdownOpen(false); }}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Moon className="w-3.5 h-3.5 text-amber-300" />
              <span>Dark</span>
            </div>
            {theme === 'dark' && <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />}
          </button>
          <button
            onClick={() => { setTheme('system'); setDropdownOpen(false); }}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Laptop className="w-3.5 h-3.5 text-slate-400" />
              <span>System</span>
            </div>
            {theme === 'system' && <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />}
          </button>
        </div>
      )}
    </div>
  );
};
