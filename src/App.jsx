import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import RoleSelectionPortal from './components/auth/RoleSelectionPortal';
import Sidebar from './components/layout/Sidebar';
import TopHeader from './components/layout/TopHeader';
import StudentDashboard from './components/student/StudentDashboard';
import MyAssignmentsView from './components/student/MyAssignmentsView';
import AdminDashboard from './components/professor/AdminDashboard';
import ManageAssignmentsView from './components/professor/ManageAssignmentsView';
import StudentSubmissionsView from './components/professor/StudentSubmissionsView';
import { CheckCircle2, Info } from 'lucide-react';

const DashboardShell = () => {
  const { currentUser, currentRole, toastMessage } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedSubmissionsAsgId, setSelectedSubmissionsAsgId] = useState(null);

  // If not logged in, render the Split-Screen Role Selection Portal
  if (!currentUser || !currentRole) {
    return <RoleSelectionPortal />;
  }

  // Render view based on role and selected navigation tab
  const renderViewContent = () => {
    if (currentRole === 'admin') {
      if (activeTab === 'manage-assignments') {
        return (
          <ManageAssignmentsView
            onNavigateToSubmissions={(asgId) => {
              setSelectedSubmissionsAsgId(asgId);
              setActiveTab('submissions');
            }}
          />
        );
      }
      if (activeTab === 'submissions') {
        return (
          <StudentSubmissionsView
            defaultAssignmentId={selectedSubmissionsAsgId}
          />
        );
      }
      return (
        <AdminDashboard
          onNavigateToManage={() => setActiveTab('manage-assignments')}
          onNavigateToSubmissions={(asgId) => {
            setSelectedSubmissionsAsgId(asgId);
            setActiveTab('submissions');
          }}
        />
      );
    } else {
      // Student role
      if (activeTab === 'assignments') {
        return <MyAssignmentsView />;
      }
      return (
        <StudentDashboard
          onNavigateToAssignments={() => setActiveTab('assignments')}
        />
      );
    }
  };

  return (
    <div className="min-h-screen bg-canvas-light dark:bg-canvas-dark text-slate-800 dark:text-slate-100 flex transition-colors font-sans antialiased">
      {/* 1. Persistent High-Contrast Navy Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* 2. Main Workspace Canvas */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Sticky Header */}
        <TopHeader onMobileToggle={() => setIsMobileOpen(true)} />

        {/* Scrollable Main Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderViewContent()}
        </main>
      </div>

      {/* 3. Floating Toast Notifications */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xl border border-slate-700/50 dark:border-slate-200 text-xs font-semibold animate-in slide-in-from-bottom-3 duration-200">
          {toastMessage.type === 'success' && (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
          )}
          {toastMessage.type === 'info' && (
            <Info className="w-4 h-4 text-blue-400 dark:text-blue-600 shrink-0" />
          )}
          <span>{toastMessage.message}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <DashboardShell />
    </AppProvider>
  );
}
