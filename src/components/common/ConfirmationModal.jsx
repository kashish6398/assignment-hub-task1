import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  CheckCircle2,
  FileCheck2,
  AlertCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const ConfirmationModal = ({
  isOpen,
  onClose,
  assignment,
  student
}) => {
  const { acknowledgeSubmission } = useApp();
  const [step, setStep] = useState(1); // Step 1: "Yes, I have submitted" / Step 2: Final Confirmation
  const [hasOpenedLink, setHasOpenedLink] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setHasOpenedLink(false);
      setSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen || !assignment || !student) return null;

  const handleOpenLink = () => {
    window.open(assignment.driveUrl, '_blank', 'noopener,noreferrer');
    setHasOpenedLink(true);
  };

  const handleProceedToStep2 = () => {
    setStep(2);
  };

  const handleFinalConfirm = () => {
    setSubmitting(true);
    setTimeout(() => {
      acknowledgeSubmission(assignment.id, student.id);
      setSubmitting(false);
      onClose();
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden transform transition-all"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/15 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Submit Assignment
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Two-Step Submission Confirmation • Step {step} of 2
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          {/* Assignment Summary Banner */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
              <span>{assignment.course}</span>
              <span className="text-slate-500 dark:text-slate-400">
                Due: {assignment.dueDate}
              </span>
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {assignment.title}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              {assignment.description}
            </p>
          </div>

          {step === 1 ? (
            /* STEP 1: Check Drive Link & "Yes, I have submitted" */
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs flex items-center justify-center font-bold">
                      1
                    </span>
                    External Submission Link
                  </span>
                  {hasOpenedLink && (
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Link Opened
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Please verify that your solution files or documents have been uploaded to the specified Google Drive folder:
                </p>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={assignment.driveUrl}
                    className="w-full text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 truncate"
                  />
                  <button
                    type="button"
                    onClick={handleOpenLink}
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/25 transition-colors border border-blue-200/80 dark:border-blue-800/40"
                  >
                    Open Drive <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Confirming submission will record your completion timestamp for {student.name}. Make sure your upload is complete.
                </span>
              </div>
            </div>
          ) : (
            /* STEP 2: Final Confirmation Dialog */
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                  Final Submission Confirmation
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Are you sure you want to mark <strong>{assignment.title}</strong> as submitted? This will record your submission in the professor's dashboard.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          {step === 1 ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleProceedToStep2}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
              >
                <span>Yes, I have submitted</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={handleFinalConfirm}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
              >
                {submitting ? (
                  <>Recording submission...</>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Confirm & Submit
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
