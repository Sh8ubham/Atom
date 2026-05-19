"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const role = formData.get('role') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      
      localStorage.setItem('atomquest_role', role);

      
      if (role === 'employee') {
        router.push('/employee/goals');
      } else if (role === 'manager') {
        router.push('/manager/dashboard');
      } else if (role === 'admin') {
        router.push('/admin/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      
      <div className="hidden lg:flex w-1/2 bg-brand-sidebar relative overflow-hidden flex-col justify-center px-16">
        
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-primary/20 to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-primary/30 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-32 right-16 w-64 h-64 border border-white/5 rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 text-white">
          
          <div className="mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-primary/20 text-brand-primary border border-brand-primary/30 uppercase tracking-wide">
              FY 2025-26 Performance Cycle
            </span>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-white text-2xl">hub</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">AtomQuest</h1>
          </div>
          <h2 className="text-5xl font-extrabold leading-tight mb-6">
            Track goals.<br />Drive performance.
          </h2>
          <p className="text-slate-400 text-lg max-w-md mb-10">
            Align your workforce, monitor real-time progress, and achieve strategic milestones with our premium HR dashboard.
          </p>

          <ul className="space-y-4 text-slate-300">
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-brand-primary text-[14px] font-bold">check</span>
              </div>
              <span className="text-sm font-medium">Role-based goal tracking</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-brand-primary text-[14px] font-bold">check</span>
              </div>
              <span className="text-sm font-medium">Quarterly performance check-ins</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-brand-primary text-[14px] font-bold">check</span>
              </div>
              <span className="text-sm font-medium">Real-time analytics dashboard</span>
            </li>
          </ul>
        </div>
      </div>

      
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-brand-bg px-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-100 p-8 sm:p-10">
          <div className="text-center mb-8 lg:hidden">
            <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4">
              <span className="material-symbols-outlined text-white text-2xl">hub</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">AtomQuest</h1>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome back</h2>
          <p className="text-slate-500 text-sm mb-8">Please enter your details to sign in.</p>

          <form className="space-y-5" onSubmit={handleSignIn}>
            <div className="space-y-2">
              <label htmlFor="role" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Organizational Role</label>
              <div className="relative">
                <select id="role" name="role" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none appearance-none cursor-pointer">
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDownIcon className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Corporate Email</label>
              <div className="relative">
                <input id="email" name="email" type="email" placeholder="name@atomquest.com" className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-11 pr-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none placeholder:text-slate-400" />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Password</label>
                <a href="#" className="text-xs text-brand-primary hover:text-brand-primaryHover font-medium">Forgot password?</a>
              </div>
              <div className="relative">
                <input id="password" name="password" type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-11 pr-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none placeholder:text-slate-400" />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-brand-primary hover:bg-brand-primaryHover text-white text-sm font-semibold py-3 rounded-lg shadow-sm shadow-brand-primary/20 transition-all active:scale-[0.98] mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400">
            <span className="text-xs uppercase font-medium tracking-wider">Secured by</span>
            <span className="material-symbols-outlined text-[16px]">security</span>
          </div>
        </div>
      </div>
    </div>
  );
}
