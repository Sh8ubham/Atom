"use client";
import React, { useState, useEffect } from 'react';

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export default function MyGoals() {
  const [goals, setGoals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('/api/goals', { credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch goals');
      setGoals(data.goals || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddGoal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      title: formData.get('title'),
      thrust_area: formData.get('thrust_area'),
      uom_type: formData.get('uom_type'),
      target: formData.get('target') ? Number(formData.get('target')) : null,
      deadline: formData.get('deadline'),
      weightage: Number(formData.get('weightage')),
    };

    try {
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create goal');

      setIsModalOpen(false);
      fetchGoals(); 
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const approvedGoals = goals.filter(g => g.status === 'approved').length;
  const pendingGoals = goals.filter(g => g.status === 'pending').length;
  const returnedGoals = goals.filter(g => g.status === 'returned').length;

  return (
    <div className="space-y-6 relative">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Goals</h1>
          <p className="text-slate-500 mt-1">Manage and track your individual performance objectives.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primaryHover text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Goal
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 flex items-center gap-2">
          <span className="material-symbols-outlined">error</span>
          {error}
        </div>
      )}

      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">target</span>
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Total Goals</p>
            <p className="text-2xl font-bold text-slate-900">{goals.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">verified</span>
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Approved</p>
            <p className="text-2xl font-bold text-slate-900">{approvedGoals}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">pending_actions</span>
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Pending Review</p>
            <p className="text-2xl font-bold text-slate-900">{pendingGoals}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">assignment_return</span>
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Returned</p>
            <p className="text-2xl font-bold text-slate-900">{returnedGoals}</p>
          </div>
        </div>
      </div>

      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">Current Objectives</h2>
        </div>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center p-12">
              <span className="material-symbols-outlined text-brand-primary animate-spin text-4xl">progress_activity</span>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-100">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Goal Title</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Type / Target</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {goals.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      No goals found. Click 'Add Goal' to create one.
                    </td>
                  </tr>
                ) : (
                  goals.map((goal) => {
                    const progressVal = goal.target && goal.actual ? Math.min(100, Math.round((goal.actual / goal.target) * 100)) : 0;
                    return (
                      <tr key={goal.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-slate-900">{goal.title}</span>
                          <p className="text-xs text-slate-500 mt-1">{goal.thrust_area} • Wt: {goal.weightage}%</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-900 block">{goal.uom_type}</span>
                          <span className="text-xs text-slate-500">Target: {goal.target || 'N/A'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-full bg-slate-100 rounded-full h-2 max-w-[120px]">
                              <div 
                                className="bg-brand-primary h-2 rounded-full" 
                                style={{ width: `${progressVal}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-slate-500 font-medium">{progressVal}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${goal.status === 'approved' ? 'bg-green-50 text-green-700' : 
                              goal.status === 'pending' ? 'bg-amber-50 text-amber-700' : 
                              'bg-red-50 text-red-700'}`}>
                            {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                          </span>
                          {goal.return_reason && (
                            <p className="text-xs text-red-500 mt-1 max-w-[150px] truncate" title={goal.return_reason}>
                              {goal.return_reason}
                            </p>
                          )}
                          {goal.status === 'approved' && (
                            <a href={`/employee/checkin?goalId=${goal.id}`} className="inline-flex items-center gap-1 text-xs text-brand-primary hover:text-brand-primaryHover mt-2 font-medium bg-indigo-50 px-2 py-1 rounded">
                              <span className="material-symbols-outlined text-[14px]">edit_
                              Check In
                            </a>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-500">{goal.deadline || 'N/A'}</span>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">Create New Goal</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleAddGoal} className="p-6 space-y-6">
              {formError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-100 flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined">error</span>
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Thrust Area *</label>
                  <div className="relative">
                    <select name="thrust_area" required className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary outline-none appearance-none cursor-pointer">
                      <option value="">Select Area...</option>
                      <option value="Growth">Growth</option>
                      <option value="Product">Product</option>
                      <option value="Operations">Operations</option>
                      <option value="Team">Team</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDownIcon className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">UoM Type *</label>
                  <div className="relative">
                    <select name="uom_type" required className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary outline-none appearance-none cursor-pointer">
                      <option value="">Select Type...</option>
                      <option value="Maximize">Maximize</option>
                      <option value="Minimize">Minimize</option>
                      <option value="Timeline">Timeline</option>
                      <option value="Zero Incident">Zero Incident</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDownIcon className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Goal Title *</label>
                <input name="title" required type="text" placeholder="Enter objective title..." className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Target</label>
                  <input name="target" type="number" placeholder="e.g. 100" className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Deadline</label>
                  <input name="deadline" type="date" className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Weightage % *</label>
                  <input name="weightage" required type="number" min="10" max="100" placeholder="Min 10%" className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-lg bg-brand-primary text-white text-sm font-semibold hover:bg-brand-primaryHover disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm shadow-brand-primary/20 transition-all"
                >
                  {isSubmitting ? (
                    <><span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span> Saving...</>
                  ) : 'Save Goal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
