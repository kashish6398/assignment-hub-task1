import React, { useState, useEffect } from 'react';
import {
  X,
  FilePlus,
  Edit3,
  Users,
  User,
  Calendar,
  Link,
  BookOpen,
  Sparkles,
  CheckSquare,
  Square
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const CreateAssignmentModal = ({
  isOpen,
  onClose,
  initialData = null // If provided, modal acts in EDIT mode
}) => {
  const { students, createAssignment, updateAssignment } = useApp();

  const isEditMode = Boolean(initialData);

  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('CS-401 Frontend Development');
  const [category, setCategory] = useState('React');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('2026-11-12');
  const [driveUrl, setDriveUrl] = useState('https://drive.google.com/drive/folders/new-assignment-demo');
  const [assignedTo, setAssignedTo] = useState('ALL'); // 'ALL' | 'SELECTED'
  const [selectedStudentIds, setSelectedStudentIds] = useState(students.map(s => s.id));
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title || '');
        setCourse(initialData.course || '');
        setCategory(initialData.category || 'React');
        setDescription(initialData.description || '');
        setDueDate(initialData.dueDate || '2026-11-12');
        setDriveUrl(initialData.driveUrl || '');
        setAssignedTo(initialData.assignedTo || 'ALL');
        setSelectedStudentIds(initialData.assignedStudentIds || students.map(s => s.id));
      } else {
        setTitle('');
        setCourse('CS-401 Frontend Development');
        setCategory('React');
        setDescription('');
        setDueDate('2026-11-12');
        setDriveUrl('https://drive.google.com/drive/folders/new-assignment-demo');
        setAssignedTo('ALL');
        setSelectedStudentIds(students.map(s => s.id));
      }
      setError('');
    }
  }, [isOpen, initialData, students]);

  if (!isOpen) return null;

  const toggleStudentSelection = (stId) => {
    setSelectedStudentIds(prev => {
      if (prev.includes(stId)) {
        if (prev.length === 1) return prev; // Keep at least one student
        return prev.filter(id => id !== stId);
      } else {
        return [...prev, stId];
      }
    });
  };

  const handleSelectAllStudents = () => {
    setSelectedStudentIds(students.map(s => s.id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !course.trim() || !description.trim() || !dueDate || !driveUrl.trim()) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    if (!driveUrl.startsWith('http://') && !driveUrl.startsWith('https://')) {
      setError('Please provide a valid URL starting with http:// or https://');
      return;
    }

    if (assignedTo === 'SELECTED' && selectedStudentIds.length === 0) {
      setError('Please select at least one student.');
      return;
    }

    setError('');

    const payload = {
      title: title.trim(),
      course: course.trim(),
      category,
      description: description.trim(),
      dueDate,
      driveUrl: driveUrl.trim(),
      assignedTo,
      assignedStudentIds: assignedTo === 'ALL' ? students.map(s => s.id) : selectedStudentIds
    };

    if (isEditMode) {
      updateAssignment(initialData.id, payload);
    } else {
      createAssignment(payload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden transform transition-all"
        role="dialog"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              {isEditMode ? <Edit3 className="w-5 h-5" /> : <FilePlus className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {isEditMode ? 'Edit Assignment' : 'Create New Assignment'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isEditMode 
                  ? 'Update assignment details, due date, and student allocation'
                  : 'Publish assignment specifications and set student allocation'}
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 font-medium">
              {error}
            </div>
          )}

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Assignment Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Next.js App Router & Server Actions"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Course & Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Course / Subject <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="e.g. CS-401 Frontend Development"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Category Track
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="React">React & Components</option>
                <option value="UI/UX">UI/UX & Design Systems</option>
                <option value="Testing">Software Testing & TDD</option>
                <option value="Cloud">Cloud & Microservices</option>
                <option value="API">REST & Web APIs</option>
                <option value="Presentation">Capstone Presentation</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Description & Instructions <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline specific objectives, evaluation criteria, and guidelines..."
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Due Date & Drive Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Due Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Google Drive Link <span className="text-rose-500">*</span>
              </label>
              <input
                type="url"
                required
                value={driveUrl}
                onChange={(e) => setDriveUrl(e.target.value)}
                placeholder="https://drive.google.com/..."
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Student Allocation (PDF Requirement: Assign to all students or to selected students) */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Student Allocation <span className="text-rose-500">*</span>
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-2.5 ${
                  assignedTo === 'ALL'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="assignedTo"
                  value="ALL"
                  checked={assignedTo === 'ALL'}
                  onChange={() => setAssignedTo('ALL')}
                  className="mt-0.5 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    All Students (5)
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Allocates assignment to the entire cohort.
                  </span>
                </div>
              </label>

              <label
                className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-2.5 ${
                  assignedTo === 'SELECTED'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="assignedTo"
                  value="SELECTED"
                  checked={assignedTo === 'SELECTED'}
                  onChange={() => setAssignedTo('SELECTED')}
                  className="mt-0.5 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    Selected Students
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Choose specific students for this task.
                  </span>
                </div>
              </label>
            </div>

            {/* Checkbox List for Selected Students */}
            {assignedTo === 'SELECTED' && (
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2.5 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-1 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Select Students ({selectedStudentIds.length} of {students.length} selected):
                  </span>
                  <button
                    type="button"
                    onClick={handleSelectAllStudents}
                    className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Select All
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {students.map(st => {
                    const isSelected = selectedStudentIds.includes(st.id);
                    return (
                      <label
                        key={st.id}
                        className={`p-2 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-slate-900 dark:text-white'
                            : 'bg-white dark:bg-gray-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleStudentSelection(st.id)}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-xs font-semibold truncate">
                          {st.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 hover:shadow-lg transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isEditMode ? 'Save Changes' : 'Publish Assignment'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignmentModal;
