import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  UserCheck,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const TopHeader = ({ onMobileToggle }) => {
  const {
    currentRole,
    currentUser,
    students,
    admins,
    searchQuery,
    setSearchQuery,
    switchStudentPersona,
    switchAdminPersona,
    activities
  } = useApp();

  const [isPersonaOpen, setIsPersonaOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const personaRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (personaRef.current && !personaRef.current.contains(event.target)) {
        setIsPersonaOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter activities relevant to the current user
  const relevantActivities = activities.filter(act => {
    if (currentRole === 'admin') {
      return act.adminId === currentUser?.id;
    }
    return true;
  });

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 px-4 sm:px-6 flex items-center justify-between gap-4 transition-colors">
      {/* Left: Mobile Toggle & Pill Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onMobileToggle}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Pill Search Input */}
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assignments by title, course..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-full text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Right: Quick Role Switcher, Persona Switcher & Notifications */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Role Toggle */}
        {currentRole === 'student' ? (
          <button
            onClick={() => switchAdminPersona('admin-1')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all shadow-sm"
            title="Switch directly to Professor Sharma"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Professor Mode</span>
          </button>
        ) : (
          <button
            onClick={() => switchStudentPersona('student-1')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all shadow-sm"
            title="Switch directly to Kashish Gupta"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student Mode</span>
          </button>
        )}

        {/* Persona Switcher Dropdown (Supports all 2 Admins and 5 Students) */}
        <div className="relative" ref={personaRef}>
          <button
            onClick={() => setIsPersonaOpen(!isPersonaOpen)}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/60 text-xs font-medium text-slate-700 dark:text-slate-200 transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
              {currentUser?.avatar || 'U'}
            </div>
            <div className="text-left hidden md:block">
              <span className="font-semibold block leading-tight">
                {currentUser?.name}
              </span>
              <span className="text-[10px] text-slate-400 block leading-tight capitalize">
                {currentRole === 'admin' ? 'Instructor' : 'Student'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Persona Menu */}
          {isPersonaOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Switch Account
                </p>
                <p className="text-[11px] text-slate-400">
                  Select any Admin or Student profile
                </p>
              </div>

              {/* Admin Accounts Section */}
              <div className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Admin Accounts (2)
              </div>
              <div className="space-y-1">
                {admins.map(admin => {
                  const isCurrent = currentRole === 'admin' && currentUser?.id === admin.id;
                  return (
                    <button
                      key={admin.id}
                      onClick={() => {
                        switchAdminPersona(admin.id);
                        setIsPersonaOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                        isCurrent
                          ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-semibold'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold">
                        {admin.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{admin.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{admin.department}</p>
                      </div>
                      {isCurrent && <UserCheck className="w-4 h-4 text-amber-600" />}
                    </button>
                  );
                })}
              </div>

              {/* Student Accounts Section */}
              <div className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-t border-slate-100 dark:border-slate-800 mt-1">
                Student Accounts (5)
              </div>
              <div className="space-y-1 max-h-56 overflow-y-auto">
                {students.map(st => {
                  const isCurrent = currentRole === 'student' && currentUser?.id === st.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => {
                        switchStudentPersona(st.id);
                        setIsPersonaOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                        isCurrent
                          ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-semibold'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold">
                        {st.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{st.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{st.email}</p>
                      </div>
                      {isCurrent && <UserCheck className="w-4 h-4 text-blue-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-gray-900" />
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-2 py-1.5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 mb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Recent Activity
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-semibold">
                  {relevantActivities.length} Events
                </span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {relevantActivities.length > 0 ? (
                  relevantActivities.slice(0, 4).map(act => (
                    <div
                      key={act.id}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs"
                    >
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {act.title}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {act.description}
                      </p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                        {act.timestamp}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 py-3 text-center">
                    No recent events
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
