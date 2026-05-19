import React from 'react';

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export default function GoalForm() {
    return (
        <>
            

<aside className="fixed left-0 top-0 h-full flex flex-col justify-between py-margin border-r border-border bg-surface-dim w-64 z-50">
<div className="flex flex-col gap-8">

<div className="px-6 flex items-center gap-3">
<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined text-on-primary text-body-lg">rocket_launch</span>
</div>
<div className="flex flex-col">
<span className="text-headline-md font-headline-md text-primary leading-tight">AtomQuest</span>
<span className="text-label-caps font-label-caps text-text-secondary">Corporate Portal</span>
</div>
</div>

<nav className="flex flex-col gap-1">
<a className="text-text-secondary flex items-center gap-3 px-4 py-3 mx-2 rounded-lg hover:bg-surface-container-high hover:text-on-surface transition-colors duration-150" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label-caps text-label-caps">Dashboard</span>
</a>
<a className="bg-secondary-container/20 text-primary border-r-2 border-primary flex items-center gap-3 px-4 py-3 mx-2 rounded-l-lg" href="#">
<span className="material-symbols-outlined">target</span>
<span className="font-label-caps text-label-caps">Active Goals</span>
</a>
<a className="text-text-secondary flex items-center gap-3 px-4 py-3 mx-2 rounded-lg hover:bg-surface-container-high hover:text-on-surface transition-colors duration-150" href="#">
<span className="material-symbols-outlined">group</span>
<span className="font-label-caps text-label-caps">Team Progress</span>
</a>
<a className="text-text-secondary flex items-center gap-3 px-4 py-3 mx-2 rounded-lg hover:bg-surface-container-high hover:text-on-surface transition-colors duration-150" href="#">
<span className="material-symbols-outlined">flag</span>
<span className="font-label-caps text-label-caps">Milestones</span>
</a>
<a className="text-text-secondary flex items-center gap-3 px-4 py-3 mx-2 rounded-lg hover:bg-surface-container-high hover:text-on-surface transition-colors duration-150" href="#">
<span className="material-symbols-outlined">insights</span>
<span className="font-label-caps text-label-caps">Analytics</span>
</a>
</nav>
</div>
<div className="flex flex-col gap-1">
<button className="mx-4 mb-6 py-2 px-4 bg-primary-container text-on-primary-container rounded-lg font-label-caps text-label-caps flex items-center justify-center gap-2 active:scale-95 transition-transform">
<span className="material-symbols-outlined text-sm">add</span>
                New Goal
            </button>
<a className="text-text-secondary flex items-center gap-3 px-4 py-3 mx-2 rounded-lg hover:bg-surface-container-high hover:text-on-surface transition-colors duration-150" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-label-caps text-label-caps">Settings</span>
</a>
<a className="text-text-secondary flex items-center gap-3 px-4 py-3 mx-2 rounded-lg hover:bg-surface-container-high hover:text-on-surface transition-colors duration-150" href="#">
<span className="material-symbols-outlined text-danger">logout</span>
<span className="font-label-caps text-label-caps text-danger">Logout</span>
</a>
</div>
</aside>

<main className="flex-1 ml-64 flex flex-col h-screen overflow-y-auto">

<header className="flex justify-between items-center w-full px-gutter h-16 sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-border">
<div className="flex items-center gap-6">
<div className="flex items-center gap-3">
<span className="text-headline-md font-headline-md font-bold text-on-surface tracking-tight">AtomQuest</span>
</div>
<div className="h-4 w-px bg-border"></div>
<div className="flex items-center gap-4">
<span className="text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md">Create New Goal</span>
</div>
</div>
<div className="flex items-center gap-4">
<button className="material-symbols-outlined text-text-secondary hover:text-on-surface transition-all duration-150">notifications</button>
<button className="material-symbols-outlined text-text-secondary hover:text-on-surface transition-all duration-150">settings</button>
<button className="material-symbols-outlined text-text-secondary hover:text-on-surface transition-all duration-150">help</button>
<div className="w-8 h-8 rounded-full overflow-hidden border border-border">
<img alt="User profile" className="w-full h-full object-cover" data-alt="A professional portrait of a senior executive in a modern tech environment, featuring soft, cinematic lighting and a neutral background that reflects a high-end corporate SaaS aesthetic. The individual has a focused yet approachable expression, symbolizing leadership and precision within a high-performance digital workspace. The overall color palette is muted and sophisticated." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdb2xoHVSzOZFKnwrUOzC08selWO79WY1cHMnI8JfOWgrLwBJ82s8zkYKDa39qOvUGFrDoJ78FzjSvtylI0MMSXXAdur45hfhvqJKXzHepubbqRhjnOu7XU_MEAZznkKVc1TgSj7sOY3lHFowksvY2xgWuxy4eM6BAZLq0_V-GEKLWrH7PHAu8i9N8S0h1wHV6td1ezB_hLUbaromEObqYxV4YkXi1vdPIsJ87kjXWytpbvDGDRgizDBhyJJ29NB20QLJxzSIqh042"/>
</div>
</div>
</header>

<div className="flex-1 flex flex-col items-center justify-center p-margin relative">

<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

<div className="glass-card w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">

<div className="p-8 border-b border-border">
<h1 className="font-headline-lg text-headline-lg text-text-primary mb-2">Create New Goal</h1>
<p className="font-body-md text-body-md text-text-secondary">Define objectives and metrics for this quarter.</p>
</div>

<div className="p-8 space-y-6">
<div className="grid grid-cols-2 gap-6">

<div className="space-y-2">
<label className="font-label-caps text-label-caps text-text-secondary uppercase">Thrust Area</label>
<div className="relative">
<select className="appearance-none w-full bg-[#0E1015] border border-border rounded-lg px-4 py-3 text-text-primary font-body-md focus:ring-2 focus:ring-primary-container outline-none transition-all cursor-pointer">
<option>Growth</option>
<option>Product</option>
<option>Ops</option>
<option>Team</option>
</select>
<div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
<ChevronDownIcon className="w-4 h-4 text-slate-400" />
</div>
</div>
</div>

<div className="space-y-2">
<label className="font-label-caps text-label-caps text-text-secondary uppercase">UoM Type</label>
<div className="relative">
<select className="appearance-none w-full bg-[#0E1015] border border-border rounded-lg px-4 py-3 text-text-primary font-body-md focus:ring-2 focus:ring-primary-container outline-none transition-all cursor-pointer">
<option>Maximize</option>
<option>Minimize</option>
<option>Timeline</option>
<option>Zero Incident</option>
</select>
<div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
<ChevronDownIcon className="w-4 h-4 text-slate-400" />
</div>
</div>
</div>
</div>

<div className="space-y-2">
<label className="font-label-caps text-label-caps text-text-secondary uppercase">Goal Title</label>
<input className="w-full bg-[#0E1015] border border-border rounded-lg px-4 py-3 text-text-primary font-body-md focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-text-secondary/50" placeholder="Enter objective title..." type="text"/>
</div>
<div className="grid grid-cols-2 gap-6">

<div className="space-y-2">
<label className="font-label-caps text-label-caps text-text-secondary uppercase">Target</label>
<input className="w-full bg-[#0E1015] border border-border rounded-lg px-4 py-3 text-text-primary font-body-md focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-text-secondary/50" placeholder="e.g., $1.2M" type="text"/>
</div>

<div className="space-y-2">
<label className="font-label-caps text-label-caps text-text-secondary uppercase">Weightage %</label>
<div className="relative">
<input className="w-full bg-[#0E1015] border border-border rounded-lg px-4 py-3 text-text-primary font-body-md focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-text-secondary/50" placeholder="e.g., 25" type="number"/>
<span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary font-body-md">%</span>
</div>
</div>
</div>
</div>

<div className="px-8 py-6 bg-surface-container-high/30 border-t border-border flex items-center justify-between">
<div>
<span className="font-body-sm text-body-sm text-text-secondary">Running Weightage Total: </span>
<span className="font-body-sm text-body-sm font-bold text-success">65% / 100%</span>
</div>
<div className="flex items-center gap-3">
<button className="px-6 py-2.5 rounded-lg border border-border text-text-primary font-label-caps text-label-caps hover:bg-surface-bright active:scale-95 transition-all">
                            Cancel
                        </button>
<button className="px-6 py-2.5 rounded-lg bg-primary-container text-white font-label-caps text-label-caps hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary-container/20">
                            Save Goal
                        </button>
</div>
</div>
</div>

<div className="mt-8 flex items-center gap-4 text-text-secondary/60">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px]">info</span>
<span className="font-body-sm text-body-sm">Goals are tracked per fiscal quarter.</span>
</div>
<div className="w-1 h-1 rounded-full bg-border"></div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px]">visibility</span>
<span className="font-body-sm text-body-sm">Visible to Team Leadership</span>
</div>
</div>
</div>
</main>

        </>
    );
}
