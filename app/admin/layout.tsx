"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [role, setRole] = useState<string | null>(null);
    const [name, setName] = useState<string>('');

    useEffect(() => {
        const savedRole = localStorage.getItem('atomquest_role') || 'admin'; 
        setRole(savedRole);
        
        
        const cookies = document.cookie.split(';');
        const nameCookie = cookies.find(c => c.trim().startsWith('atomquest_name='));
        if (nameCookie) {
            setName(decodeURIComponent(nameCookie.split('=')[1]));
        } else {
            setName('Admin User');
        }

        if (savedRole !== 'admin') {
            router.push('/login');
        }
    }, [router]);

    if (role !== 'admin') {
        return null; 
    }

    const getInitials = (fullName: string) => {
        if (!fullName) return 'AU';
        const parts = fullName.trim().split(' ');
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        return fullName.substring(0, 2).toUpperCase();
    };

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            
            <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 shrink-0">
                <div className="flex flex-col h-full py-6 px-4">
                    <div className="flex items-center gap-3 px-2 mb-10">
                        <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-lg">rocket_launch</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-white leading-none tracking-tight">AtomQuest</span>
                            <span className="text-[10px] text-indigo-400 font-semibold uppercase tracking-widest mt-1">ADMIN CONSOLE</span>
                        </div>
                    </div>
                    <nav className="flex-1 space-y-1">
                        <Link href="/admin/dashboard" className={`flex items-center gap-3 px-3 py-2 transition-all duration-150 rounded-lg group ${pathname === '/admin/dashboard' ? 'text-white bg-indigo-600 shadow-md shadow-indigo-600/20' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}>
                            <span className="material-symbols-outlined text-[20px]">dashboard</span>
                            <span className="text-sm font-medium uppercase tracking-wide">Dashboard</span>
                        </Link>
                        <Link href="/admin/analytics" className={`flex items-center gap-3 px-3 py-2 transition-all duration-150 rounded-lg group ${pathname === '/admin/analytics' ? 'text-white bg-indigo-600 shadow-md shadow-indigo-600/20' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}>
                            <span className="material-symbols-outlined text-[20px]">analytics</span>
                            <span className="text-sm font-medium uppercase tracking-wide">Analytics</span>
                        </Link>
                        <Link href="/admin/audit" className={`flex items-center gap-3 px-3 py-2 transition-all duration-150 rounded-lg group mt-2 ${pathname === '/admin/audit' ? 'text-white bg-indigo-600 shadow-md shadow-indigo-600/20' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}>
                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
                            <span className="text-sm font-medium uppercase tracking-wide">Audit Log</span>
                        </Link>
                    </nav>
                    <div className="pt-6 mt-6 border-t border-slate-800 flex flex-col gap-1">
                        <a className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white transition-colors duration-150 rounded-lg cursor-pointer" onClick={() => {
                            localStorage.removeItem('atomquest_role');
                            document.cookie = 'atomquest_role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                            router.push('/login');
                        }}>
                            <span className="material-symbols-outlined text-[20px]">logout</span>
                            <span className="text-sm font-medium uppercase tracking-wide">Log Out</span>
                        </a>
                    </div>
                </div>
            </aside>

            
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="flex justify-between items-center h-16 px-6 sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
                    <div className="flex items-center gap-6 flex-1">
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-500 hover:text-slate-900 transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <button className="p-2 text-slate-500 hover:text-slate-900 transition-colors">
                            <span className="material-symbols-outlined">apps</span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-sm border border-indigo-500 cursor-pointer">
                            {getInitials(name)}
                        </div>
                    </div>
                </header>
                
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
