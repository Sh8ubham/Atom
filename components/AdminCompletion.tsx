"use client";
import React, { useState, useEffect } from 'react';

export default function AdminCompletion() {
  const [goals, setGoals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleExport = () => {
    
    window.location.href = '/api/export';
  };

  const getStatusChip = (status: string) => {
    switch(status) {
      case 'approved':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 uppercase tracking-wide">Approved</span>;
      case 'returned':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 uppercase tracking-wide">Returned</span>;
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 uppercase tracking-wide">Pending</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 uppercase tracking-wide">{status}</span>;
    }
  };

  
  const totalGoals = goals.length;
  const approvedGoals = goals.filter(g => g.status === 'approved').length;
  const completionRate = totalGoals ? Math.round((approvedGoals / totalGoals) * 100) : 0;
  
  
  const achievedGoals = goals.filter(g => g.target && g.actual && g.actual >= g.target).length;
  const achievedRate = totalGoals ? Math.round((achievedGoals / totalGoals) * 100) : 0;

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Completion Dashboard</h1>
          <p className="text-slate-500 mt-1">Company-wide objective tracking and performance metrics.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 flex items-center gap-2">
          <span className="material-symbols-outlined">error</span>
          {error}
        </div>
      )}

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <p className="text-slate-500 text-sm font-medium mb-2">Total Company Goals</p>
          <div className="flex items-end gap-3">
            <h2 className="text-4xl font-bold text-slate-900">{totalGoals}</h2>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <p className="text-slate-500 text-sm font-medium mb-2">Goal Approval Rate</p>
          <div className="flex items-end gap-3">
            <h2 className="text-4xl font-bold text-slate-900">{completionRate}%</h2>
            <span className="text-sm font-medium text-green-600 mb-1 flex items-center">
              <span className="material-symbols-outlined text-[16px]">trending_up</span> Good
            </span>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <p className="text-slate-500 text-sm font-medium mb-2">Goals Met (100% Target)</p>
          <div className="flex items-end gap-3">
            <h2 className="text-4xl font-bold text-slate-900">{achievedRate}%</h2>
            <span className="text-sm font-medium text-brand-primary mb-1 flex items-center">
              <span className="material-symbols-outlined text-[16px]">verified</span> Complete
            </span>
          </div>
        </div>
      </div>

      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">All Employee Goals</h2>
          <button 
            onClick={handleExport}
            className="text-sm font-medium bg-brand-primary text-white hover:bg-brand-primaryHover px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">download</span> Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <span className="material-symbols-outlined text-brand-primary animate-spin text-4xl">progress_activity</span>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-100">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Employee ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Goal Title</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Area</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {goals.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      No goals found in the system.
                    </td>
                  </tr>
                ) : (
                  goals.map((goal) => {
                    const progressPct = goal.target && goal.actual ? Math.min(100, Math.round((goal.actual / goal.target) * 100)) : 0;
                    
                    return (
                      <tr key={goal.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-slate-900">{goal.employee_id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-900 font-medium block truncate max-w-[250px]" title={goal.title}>{goal.title}</span>
                          <span className="text-xs text-slate-500">Wt: {goal.weightage}%</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600">{goal.thrust_area}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-full bg-slate-100 rounded-full h-2 max-w-[100px]">
                              <div 
                                className="bg-brand-primary h-2 rounded-full" 
                                style={{ width: `${progressPct}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-slate-500 font-medium">{progressPct}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusChip(goal.status)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
