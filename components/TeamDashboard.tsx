"use client";
import React, { useState, useEffect } from 'react';

export default function TeamDashboard() {
  const [goals, setGoals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('/api/goals', { credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch team goals');
      
      setGoals(data.goals || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (goalId: string) => {
    try {
      setActionLoading(goalId);
      const res = await fetch(`/api/goals/${goalId}/approve`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to approve goal');
      
      
      setGoals(goals.map(g => g.id === goalId ? { ...g, status: 'approved' } : g));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReturn = async (goalId: string) => {
    const reason = prompt('Please enter a reason for returning this goal:');
    if (!reason) return; 

    try {
      setActionLoading(goalId);
      const res = await fetch(`/api/goals/${goalId}/return`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ return_reason: reason })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to return goal');
      
      
      setGoals(goals.map(g => g.id === goalId ? { ...g, status: 'returned', return_reason: reason } : g));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  
  const totalGoals = goals.length;
  const approvedGoals = goals.filter(g => g.status === 'approved').length;
  const pendingGoals = goals.filter(g => g.status === 'pending').length;
  const returnedGoals = goals.filter(g => g.status === 'returned').length;

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Team Dashboard</h1>
          <p className="text-slate-500 mt-1">Review and manage your team's goals and check-ins.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 flex items-center gap-2">
          <span className="material-symbols-outlined">error</span>
          {error}
        </div>
      )}

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <p className="text-slate-500 text-sm font-medium mb-1">Total Goals</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-slate-900">{totalGoals}</p>
            <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">target</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <p className="text-slate-500 text-sm font-medium mb-1">Approved</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-slate-900">{approvedGoals}</p>
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">task_alt</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <p className="text-slate-500 text-sm font-medium mb-1">Pending Review</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-slate-900">{pendingGoals}</p>
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">hourglass_empty</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <p className="text-slate-500 text-sm font-medium mb-1">Returned</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-slate-900">{returnedGoals}</p>
            <div className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">assignment_return</span>
            </div>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-12">
            <span className="material-symbols-outlined text-brand-primary animate-spin text-4xl">progress_activity</span>
          </div>
        ) : goals.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center text-slate-500">
            No goals submitted by your team yet.
          </div>
        ) : (
          goals.map((goal) => (
            <div key={goal.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col hover:border-brand-primary/30 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 text-brand-primary font-bold rounded-full flex items-center justify-center text-sm">
                    {goal.employee_id.substring(0,2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 truncate max-w-[200px]">{goal.title}</h3>
                    <p className="text-xs text-slate-500">Employee ID: {goal.employee_id}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-slate-600 mb-1"><span className="font-medium text-slate-900">Area:</span> {goal.thrust_area}</p>
                <p className="text-sm text-slate-600 mb-1"><span className="font-medium text-slate-900">UoM:</span> {goal.uom_type} (Target: {goal.target || 'N/A'})</p>
                <p className="text-sm text-slate-600"><span className="font-medium text-slate-900">Weightage:</span> {goal.weightage}%</p>
                {goal.return_reason && (
                  <p className="text-xs text-red-500 mt-2 p-2 bg-red-50 rounded">Returned: {goal.return_reason}</p>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${goal.status === 'approved' ? 'bg-green-50 text-green-700' : 
                    goal.status === 'pending' ? 'bg-amber-50 text-amber-700' : 
                    'bg-red-50 text-red-700'}`}>
                  {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                </span>
                
                {goal.status === 'pending' && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleReturn(goal.id)}
                      disabled={actionLoading === goal.id}
                      className="text-xs font-medium px-3 py-1.5 rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      Return
                    </button>
                    <button 
                      onClick={() => handleApprove(goal.id)}
                      disabled={actionLoading === goal.id}
                      className="text-xs font-medium bg-brand-primary text-white hover:bg-brand-primaryHover px-3 py-1.5 rounded-md transition-colors disabled:opacity-50 flex items-center gap-1"
                    >
                      {actionLoading === goal.id && <span className="material-symbols-outlined text-[14px] animate-spin">progress_activity</span>}
                      Approve
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
