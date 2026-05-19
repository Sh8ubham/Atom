"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export default function AdminAuditLog() {
    const [searchTerm, setSearchTerm] = useState('');
    const [auditLogs, setAuditLogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAuditLogs = async () => {
        try {
            const res = await fetch('/api/audit', { credentials: 'include' });
            if (res.ok) {
                const data = await res.json();
                
                
                const mappedLogs = (data.auditLog || []).map((log: any) => {
                    const user = (data.users || []).find((u: any) => u.id === log.changed_by);
                    const name = user ? user.name : 'System';
                    const role = user ? user.role : 'System';
                    
                    
                    const getInitials = (n: string) => {
                        const parts = n.split(' ');
                        return parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : n.substring(0, 2).toUpperCase();
                    };

                    const d = new Date(log.timestamp);
                    const date = d.toISOString().split('T')[0];
                    const time = d.toTimeString().split(' ')[0];

                    let actionLabel = log.action;
                    let icon = 'history';
                    let iconBg = 'bg-slate-100';
                    let iconText = 'text-slate-600';
                    let stripeColor = 'border-l-slate-300';
                    let opacity = '';

                    switch(log.action) {
                        case 'APPROVED':
                            actionLabel = 'Goal Approved';
                            icon = 'verified';
                            iconBg = 'bg-green-100';
                            iconText = 'text-green-600';
                            stripeColor = 'border-l-green-500';
                            break;
                        case 'RETURNED':
                            actionLabel = 'Goal Returned';
                            icon = 'block';
                            iconBg = 'bg-red-100';
                            iconText = 'text-red-600';
                            stripeColor = 'border-l-red-500';
                            opacity = 'opacity-80';
                            break;
                        case 'CHECKED_IN':
                            actionLabel = 'Checked-in';
                            icon = 'history_edu';
                            iconBg = 'bg-blue-100';
                            iconText = 'text-blue-600';
                            stripeColor = 'border-l-blue-500';
                            break;
                    }

                    return {
                        id: log.id,
                        date, time,
                        initials: getInitials(name),
                        name,
                        role: role.charAt(0).toUpperCase() + role.slice(1),
                        action: actionLabel,
                        icon, iconBg, iconText, stripeColor, opacity,
                        details: log.details || `Entity ID: ${log.entity_id}`
                    };
                });
                setAuditLogs(mappedLogs);
            }
        } catch (error) {
            console.error("Failed to fetch audit log", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAuditLogs();
        const interval = setInterval(() => {
            fetchAuditLogs();
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    const filteredLogs = auditLogs.filter(log =>
        Object.values(log).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const getRoleAvatarStyle = (role: string) => {
        switch(role) {
            case 'Manager': return 'bg-indigo-100 text-indigo-700';
            case 'Employee': return 'bg-emerald-100 text-emerald-700';
            case 'Admin': return 'bg-amber-100 text-amber-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    const getRolePillStyle = (role: string) => {
        switch(role) {
            case 'Manager': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
            case 'Employee': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'Admin': return 'bg-amber-50 text-amber-700 border-amber-200';
            default: return 'bg-slate-50 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="p-6 lg:p-10 max-w-[1400px] mx-auto w-full space-y-8">
            <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 text-sm font-medium mb-4 transition-colors">
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Back to Dashboard
            </Link>

            
            <div className="rounded-2xl bg-gradient-to-r from-slate-800 to-indigo-900 p-8 shadow-lg flex items-center justify-between text-white animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-2">System Audit Log</h2>
                    <p className="text-indigo-200">Track all platform actions and goal modifications across the enterprise.</p>
                </div>
                <div className="bg-white/10 border border-white/20 px-4 py-3 rounded-xl flex items-center gap-3 backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-indigo-200 uppercase tracking-wider">Live Entries</span>
                        <span className="text-xl font-bold">{auditLogs.length} Records</span>
                    </div>
                </div>
            </div>

            
            <div className="grid grid-cols-1 md:flex items-center gap-4">
                <div className="relative flex-1 group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">search</span>
                    <input
                        type="text"
                        placeholder="Search audit log..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all outline-none shadow-sm"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <select className="appearance-none bg-white border border-slate-200 rounded-full py-2.5 pl-5 pr-10 text-sm font-medium text-slate-700 focus:border-indigo-500 outline-none cursor-pointer shadow-sm">
                            <option>All Roles</option>
                            <option>Admin</option>
                            <option>Manager</option>
                            <option>Employee</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <ChevronDownIcon className="w-4 h-4 text-slate-400" />
                        </div>
                    </div>
                    <button className="flex items-center gap-2 bg-white border border-slate-200 rounded-full py-2.5 px-5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                        <span>Last 7 Days</span>
                    </button>
                    <button className="bg-indigo-600 text-white p-2.5 rounded-full hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20">
                        <span className="material-symbols-outlined text-[20px]">filter_list</span>
                    </button>
                </div>
            </div>

            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-500 font-semibold">Timestamp</th>
                                <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-500 font-semibold">User</th>
                                <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-500 font-semibold">Role</th>
                                <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-500 font-semibold">Action</th>
                                <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-500 font-semibold">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading && auditLogs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        <span className="material-symbols-outlined animate-spin text-4xl mb-4">progress_activity</span>
                                        <p>Loading audit logs...</p>
                                    </td>
                                </tr>
                            ) : filteredLogs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        No audit records found.
                                    </td>
                                </tr>
                            ) : (
                                filteredLogs.map((log) => (
                                    <tr key={log.id} className={`hover:bg-slate-50 transition-colors group ${log.opacity}`}>
                                        <td className={`px-6 py-5 whitespace-nowrap border-l-4 ${log.stripeColor} border-transparent`}>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-slate-900">{log.date}</span>
                                                <span className="text-xs text-slate-500">{log.time}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${getRoleAvatarStyle(log.role)}`}>
                                                    {log.initials}
                                                </div>
                                                <span className="text-sm font-semibold text-slate-900">{log.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getRolePillStyle(log.role)}`}>
                                                {log.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${log.iconBg} ${log.iconText}`}>
                                                    <span className="material-symbols-outlined text-[16px]">{log.icon}</span>
                                                </div>
                                                <span className="text-sm font-bold text-slate-700">{log.action}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{log.details}</span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-sm text-slate-500 font-medium">Showing {filteredLogs.length > 0 ? 1 : 0} to {filteredLogs.length} of {auditLogs.length} logs</span>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all text-sm font-medium">Previous</button>
                        <button className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-sm font-medium shadow-md transition-all">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
