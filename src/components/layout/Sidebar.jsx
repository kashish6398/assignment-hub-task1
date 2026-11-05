import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  ClipboardList,
  Moon,
  Sun,
  LogOut,
  RotateCcw,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Sidebar = ({ activeTab, setActiveTab, isMobileOpen, setIsMobileOpen }) => {
  const {
    currentRole,
    currentUser,
    logout,
    isDarkMode,
    toggleDarkMode,
    resetToDefaultData
  } = useApp();

  // Navigation items strictly adhering to required scope
  const studentNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assignments', label: 'My Assignments', icon: BookOpen },
  ];

  const adminNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'manage-assignments', label: 'Manage Assignments', icon: Layers },
    { id: 'submissions', label: 'Student Submissions', icon: ClipboardList },
  ];

  const navItems = currentRole === 'admin' ? adminNavItems : studentNavItems;

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-sidebar-navy dark:bg-sidebar-navyDark text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top: Simple Text-Based Brand Identity */}
        <div>
          <div className="h-18 py-4 px-6 border-b border-slate-800/80 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="font-extrabold text-white tracking-tight text-base truncate">
                Assignment Hub
              </h1>
              <p className="text-[11px] text-slate-400 font-medium truncate">
                Assignment & Review Dashboard
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {currentRole === 'admin' ? 'Instructor Portal' : 'Student Workspace'}
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Theme Toggle, User Profile & Actions */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          {/* Dark Mode Switcher */}
          <div className="bg-slate-800/50 p-2 rounded-xl flex items-center justify-between border border-slate-700/50">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-2">
              {isDarkMode ? <Moon className="w-3.5 h-3.5 text-blue-400" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
            <button
              onClick={toggleDarkMode}
              type="button"
              className="relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-slate-700 dark:bg-blue-600"
              role="switch"
              aria-checked={isDarkMode}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  isDarkMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Current User Card */}
          {currentUser && (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/40">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {currentUser.avatar || 'U'}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white truncate">
                    {currentUser.name}
                  </p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1">
                    {currentRole === 'admin' ? (
                      <span className="text-amber-400 flex items-center gap-0.5">
                        <ShieldCheck className="w-3 h-3" /> Professor
                      </span>
                    ) : (
                      <span className="text-blue-400 flex items-center gap-0.5">
                        <GraduationCap className="w-3 h-3" /> Student
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons: Reset & Exit */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={resetToDefaultData}
              title="Reset mock data to initial demo state"
              className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors border border-slate-700/40"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={logout}
              title="Logout to Role Selection Portal"
              className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors border border-rose-500/20"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
