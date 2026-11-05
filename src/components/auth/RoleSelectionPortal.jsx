import React, { useState } from 'react';
import {
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileCheck2,
  Layers,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const RoleSelectionPortal = () => {
  const { loginAs, students, admins, isDarkMode, toggleDarkMode } = useApp();

  const handleRoleSelect = (role) => {
    if (role === 'admin') {
      loginAs('admin', admins[0]); // Professor Sharma
    } else {
      loginAs('student', students[0]); // Kashish Gupta
    }
  };

  const handleQuickStudentLogin = (studentId) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      loginAs('student', student);
    }
  };

  const handleQuickAdminLogin = (adminId) => {
    const admin = admins.find(a => a.id === adminId);
    if (admin) {
      loginAs('admin', admin);
    }
  };

  return (
    <div className="min-h-screen bg-canvas-light dark:bg-canvas-dark text-slate-800 dark:text-slate-100 flex flex-col justify-between transition-colors">
      {/* Top Header */}
      <header className="px-6 sm:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
              Assignment Hub
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Assignment & Review Dashboard
            </p>
          </div>
        </div>

        <button
          onClick={toggleDarkMode}
          className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
        >
          {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </header>

      {/* Main Split-Screen Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Platform Overview */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200/80 dark:border-blue-500/20 text-xs font-semibold text-blue-700 dark:text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Assignment Management</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Assignment Hub <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-2xl sm:text-3xl lg:text-4xl">
              Assignment & Review Dashboard
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
            A unified system for students and professors to publish coursework, track submissions with two-step verification, and monitor real-time class progress.
          </p>

          {/* Core Feature Highlights */}
          <div className="bg-white dark:bg-gray-900/90 rounded-2xl p-5 border border-slate-200/80 dark:border-white/10 shadow-soft-card space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                System Highlights
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Operational
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                <span>Role-Based User Dashboards</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                <span>Targeted Student Allocation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                <span>Two-Step Submission Flow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                <span>Client-Side Persistence</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Role Card & Demo Accounts */}
        <div className="lg:col-span-6">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-elevated border border-slate-200/80 dark:border-white/10 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Welcome Back!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Choose your role or select a demo account to continue
              </p>
            </div>

            {/* Role Options */}
            <div className="space-y-3">
              {/* Student Role Card */}
              <button
                type="button"
                onClick={() => handleRoleSelect('student')}
                className="w-full text-left p-4 rounded-2xl border-2 border-blue-600/40 bg-blue-50/40 dark:bg-blue-900/10 hover:border-blue-600 dark:hover:border-blue-500 transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Student
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      View your coursework, due dates, and submit assignments
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

              {/* Admin / Professor Role Card */}
              <button
                type="button"
                onClick={() => handleRoleSelect('admin')}
                className="w-full text-left p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:border-amber-500 dark:hover:border-amber-500 transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      Admin (Professor)
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Create, edit, allocate, and monitor student submissions
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>

            {/* Quick Demo Credentials Box */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  ⚡ Quick Demo Accounts
                </span>
                <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                  Click to log in
                </span>
              </div>

              {/* Admin Accounts (2) */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block">
                  Professors (2 Admins):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickAdminLogin('admin-1')}
                    className="p-2.5 rounded-xl text-left bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
                  >
                    <p className="text-xs font-bold text-amber-900 dark:text-amber-200 truncate">
                      Professor Sharma
                    </p>
                    <p className="text-[10px] text-amber-700 dark:text-amber-400 truncate">
                      Computer Science
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickAdminLogin('admin-2')}
                    className="p-2.5 rounded-xl text-left bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
                  >
                    <p className="text-xs font-bold text-amber-900 dark:text-amber-200 truncate">
                      Professor Mehta
                    </p>
                    <p className="text-[10px] text-amber-700 dark:text-amber-400 truncate">
                      Software Engineering
                    </p>
                  </button>
                </div>
              </div>

              {/* Student Accounts (5) */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block">
                  Students (5 Seeded Accounts):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {students.map(st => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => handleQuickStudentLogin(st.id)}
                      className={`p-2 rounded-xl text-left border transition-colors ${
                        st.id === 'student-1'
                          ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/40 hover:bg-blue-100'
                          : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                        {st.name}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {st.id === 'student-1' ? 'Default Student' : 'Student'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-slate-200/80 dark:border-white/10 text-center text-xs text-slate-500 dark:text-slate-400">
        Assignment Hub • Assignment & Review Dashboard
      </footer>
    </div>
  );
};

export default RoleSelectionPortal;
