"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children, currentPath = '' }: { children: React.ReactNode, currentPath?: string }) {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const savedRole = localStorage.getItem('atomquest_role');
    
    
    const cookies = document.cookie.split(';');
    const nameCookie = cookies.find(c => c.trim().startsWith('atomquest_name='));
    if (nameCookie) {
        setName(decodeURIComponent(nameCookie.split('=')[1]));
    } else {
        setName('User');
    }

    if (savedRole) {
      setRole(savedRole);
    } else {
      router.push('/login');
    }
  }, [router]);

  const getInitials = (fullName: string) => {
    if (!fullName) return 'U';
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return fullName.substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem('atomquest_role');
    router.push('/login');
  };

  const allNavLinks = [
    { name: 'My Goals', path: '/employee/goals', icon: 'flag', roles: ['employee', 'manager'] },
    { name: 'Check-ins', path: '/employee/checkin', icon: 'fact_check', roles: ['employee', 'manager'] },
    { name: 'Team Dashboard', path: '/manager/dashboard', icon: 'groups', roles: ['manager'] },
    { name: 'Admin Reports', path: '/admin/dashboard', icon: 'bar_chart', roles: ['admin'] },
    { name: 'System Audit', path: '/admin/audit', icon: 'policy', roles: ['admin'] },
  ];

  const navLinks = allNavLinks.filter(link => role ? link.roles.includes(role) : false);

  if (!role) {
    return <div className="h-screen w-screen bg-brand-bg flex items-center justify-center">Loading...</div>; 
  }

  return (
    <div className="flex h-screen w-full bg-brand-bg overflow-hidden">
      
      <aside className="w-64 bg-brand-sidebar text-white flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-sm">hub</span>
          </div>
          <span className="font-bold text-lg tracking-tight">AtomQuest</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = currentPath.startsWith(link.path);
            return (
              <Link 
                key={link.name} 
                href={link.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${isActive ? 'bg-brand-primary text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
              >
                <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-xs font-bold text-white shadow-sm border border-indigo-500">
                {getInitials(name)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">{name || 'Loading...'}</span>
                <span className="text-xs text-slate-400 capitalize">{role}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors" title="Log out">
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        </div>
      </aside>

      
      <div className="flex-1 flex flex-col min-w-0">
        
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center max-w-md w-full relative">
            <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[20px]">search</span>
            <input 
              type="text" 
              placeholder="Search goals, team members..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-slate-900"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative text-slate-400 hover:text-slate-600">
              <span className="material-symbols-outlined text-[24px]">notifications</span>
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-xs font-bold text-white shadow-sm border border-indigo-500 cursor-pointer">
               {getInitials(name)}
            </div>
          </div>
        </header>

        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
