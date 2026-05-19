"use client";
import React, { useState, useEffect } from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

export default function AdminAnalytics() {
    const [goals, setGoals] = useState<any[]>([]);
    const [checkins, setCheckins] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [goalsRes, checkinsRes] = await Promise.all([
                    fetch('/api/goals', { credentials: 'include' }),
                    fetch('/api/checkins', { credentials: 'include' })
                ]);

                if (goalsRes.ok && checkinsRes.ok) {
                    const gData = await goalsRes.json();
                    const cData = await checkinsRes.json();

                    setGoals(gData.goals || []);
                    setUsers(gData.users || []);
                    setCheckins(cData.checkins || []);
                }
            } catch (error) {
                console.error("Failed to fetch analytics data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    
    const totalGoals = goals.length;
    const checkinsCompleted = checkins.length;
    const pendingCheckins = goals.filter(g => g.status === 'approved' && checkins.filter(c => c.goal_id === g.id).length === 0).length;
    const avgScore = checkins.length > 0 ? Math.round(checkins.reduce((sum, c) => sum + (Number(c.score) || 0), 0) / checkins.length) : 0;

    
    const employeeScoresMap = new Map();
    checkins.forEach(c => {
        if (!employeeScoresMap.has(c.employee_id)) {
            employeeScoresMap.set(c.employee_id, { total: 0, count: 0 });
        }
        const s = employeeScoresMap.get(c.employee_id);
        s.total += Number(c.score) || 0;
        s.count += 1;
    });

    const barData = Array.from(employeeScoresMap.entries()).map(([empId, stats]) => {
        const user = users.find(u => u.id === empId);
        return {
            name: user ? user.name.split(' ')[0] : empId,
            avgScore: Math.round(stats.total / stats.count)
        };
    });

    
    const uomMap = new Map();
    goals.forEach(g => {
        const type = g.uom_type || 'Unknown';
        uomMap.set(type, (uomMap.get(type) || 0) + 1);
    });

    const pieData = Array.from(uomMap.entries()).map(([name, value]) => ({ name, value }));
    const pieColors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

    
    
    const qMap = new Map([['Q1', { total: 0, count: 0 }], ['Q2', { total: 0, count: 0 }], ['Q3', { total: 0, count: 0 }], ['Q4', { total: 0, count: 0 }]]);
    
    checkins.forEach(c => {
        const date = new Date(c.timestamp);
        const month = date.getMonth(); 
        let q = 'Q1';
        if (month >= 3 && month <= 5) q = 'Q2';
        else if (month >= 6 && month <= 8) q = 'Q3';
        else if (month >= 9) q = 'Q4';

        const s = qMap.get(q);
        if (s) {
            s.total += Number(c.score) || 0;
            s.count += 1;
        }
    });

    const lineData = ['Q1', 'Q2', 'Q3', 'Q4'].map(q => {
        const stats = qMap.get(q)!;
        return {
            quarter: q,
            score: stats.count > 0 ? Math.round(stats.total / stats.count) : null 
        };
    });

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <span className="material-symbols-outlined animate-spin text-4xl text-indigo-600">progress_activity</span>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Analytics Dashboard</h1>
                <p className="text-slate-500 mt-1">Enterprise-wide performance and goal tracking analytics.</p>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Goals</p>
                    <h2 className="text-4xl font-bold text-slate-900">{totalGoals}</h2>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Avg Score</p>
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-4xl font-bold text-slate-900">{avgScore}</h2>
                        <span className="text-slate-400 font-medium">/ 100</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Check-ins Completed</p>
                    <h2 className="text-4xl font-bold text-indigo-600">{checkinsCompleted}</h2>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Pending Check-ins</p>
                    <h2 className="text-4xl font-bold text-amber-500">{pendingCheckins}</h2>
                </div>
            </div>

            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Average Score by Employee</h3>
                    <div className="h-80 w-full">
                        {barData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                                    <Tooltip 
                                        cursor={{fill: '#f8fafc'}}
                                        contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                                    />
                                    <Bar dataKey="avgScore" name="Avg Score" fill="#4F46E5" radius={[4, 4, 0, 0]} maxBarSize={50} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-slate-400">No score data available</div>
                        )}
                    </div>
                </div>

                
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Goal Distribution by Type</h3>
                    <div className="h-80 w-full flex items-center justify-center">
                        {pieData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={110}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-slate-400">No goal data available</div>
                        )}
                    </div>
                </div>
            </div>

            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Company Score Trend (QoQ)</h3>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={lineData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="quarter" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                            <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                            <Tooltip 
                                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                            />
                            <Line type="monotone" dataKey="score" name="Avg Score" stroke="#10B981" strokeWidth={3} dot={{r: 6, fill: '#10B981', strokeWidth: 0}} activeDot={{r: 8, strokeWidth: 0}} connectNulls={true} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
