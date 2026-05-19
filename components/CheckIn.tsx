"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function CheckIn() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const goalId = searchParams.get('goalId');
  
  const [goal, setGoal] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newValue, setNewValue] = useState<string>('');

  useEffect(() => {
    if (!goalId) {
      setError("No goal specified. Please return to your goals dashboard.");
      setIsLoading(false);
      return;
    }

    const fetchGoal = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/goals', { credentials: 'include' });
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || 'Failed to fetch goals');
        
        const foundGoal = data.goals?.find((g: any) => g.id === goalId);
        if (!foundGoal) {
          throw new Error("Goal not found or you don't have permission to view it.");
        }
        
        if (foundGoal.status !== 'approved') {
          throw new Error("Cannot check-in. This goal is not approved yet.");
        }
        
        setGoal(foundGoal);
        setNewValue(foundGoal.actual?.toString() || '0');
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGoal();
  }, [goalId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newValue || isNaN(Number(newValue))) {
      alert("Please enter a valid number");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/checkins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          goal_id: goalId,
          actual_value: Number(newValue)
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit check-in');
      
      
      router.push('/employee/goals');
    } catch (err: any) {
      alert(err.message);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center h-[calc(100vh-100px)]">
        <span className="material-symbols-outlined text-brand-primary animate-spin text-5xl">progress_activity</span>
      </div>
    );
  }

  if (error || !goal) {
    return (
      <div className="p-8 max-w-5xl mx-auto w-full">
        <div className="bg-red-50 border border-red-100 rounded-xl p-8 flex flex-col items-center justify-center text-center">
          <span className="material-symbols-outlined text-red-500 text-5xl mb-4">error</span>
          <h2 className="text-xl font-bold text-red-700 mb-2">Check-in Unavailable</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button 
            onClick={() => router.push('/employee/goals')}
            className="px-6 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors"
          >
            Return to Goals
          </button>
        </div>
      </div>
    );
  }

  const progressPct = goal.target && goal.actual ? Math.min(100, Math.round((goal.actual / goal.target) * 100)) : 0;

  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <nav className="flex items-center gap-2 text-slate-500 mb-6 text-sm">
        <span className="font-medium uppercase tracking-widest cursor-pointer hover:text-brand-primary" onClick={() => router.push('/employee/goals')}>Active Goals</span>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="font-medium uppercase tracking-widest text-slate-900">{goal.title}</span>
      </nav>

      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Update Progress: {goal.title}</h2>
        <p className="text-slate-500">Provide a quantitative update and context for the current target.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-xl flex flex-col justify-between h-32 relative overflow-hidden shadow-sm">
            <div className="z-10">
              <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">TARGET VALUE</p>
              <h3 className="text-3xl font-bold text-slate-900">{goal.target || 'N/A'}</h3>
            </div>
            <span className="material-symbols-outlined absolute -right-2 -bottom-2 text-6xl text-slate-100 pointer-events-none">flag</span>
          </div>
          
          <div className="bg-white border border-slate-200 p-6 rounded-xl flex flex-col justify-between h-32 relative overflow-hidden shadow-sm">
            <div className="z-10">
              <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">CURRENT VALUE</p>
              <h3 className="text-3xl font-bold text-brand-primary">{goal.actual || '0'}</h3>
            </div>
            <span className="material-symbols-outlined absolute -right-2 -bottom-2 text-6xl text-indigo-50 pointer-events-none">trending_up</span>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <p className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-wider">COMPLETION PROGRESS</p>
            <div className="w-full bg-slate-100 h-2 rounded-full mb-2 overflow-hidden">
              <div className="bg-brand-primary h-full rounded-full transition-all duration-1000" style={{ width: `${progressPct}%` }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">{progressPct}% reached</span>
              {progressPct >= 50 && (
                <span className="text-sm text-green-600 flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-xs">arrow_upward</span>
                  On Track
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider" htmlFor="new_value">NEW VALUE (Actual)</label>
                <div className="relative">
                  <input 
                    id="new_value" 
                    type="number" 
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-4 px-4 text-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all"
                    placeholder="Enter new actual value..." 
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider" htmlFor="comments">UPDATE NOTE (Optional)</label>
                <textarea 
                  id="comments" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-slate-900 resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all" 
                  placeholder="Share context on these numbers... what changed since the last update?" 
                  rows={4}
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-4 mt-4 pt-8 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => router.push('/employee/goals')}
                  className="px-8 py-3 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-lg bg-brand-primary text-white font-medium hover:bg-brand-primaryHover shadow-lg shadow-brand-primary/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <><span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span> Submitting...</>
                  ) : 'Submit Check-in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
