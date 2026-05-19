import React from 'react';

export default function AdminPushGoal() {
    return (
        <>
            

<aside className="hidden md:flex flex-col h-full w-64 bg-surface-container-low border-r border-border py-margin gap-unit transition-all duration-200">
<div className="px-6 mb-8">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-on-primary-container">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>atm</span>
</div>
<div>
<h1 className="text-headline-md font-headline-md font-bold text-text-primary tracking-tight">AtomQuest</h1>
<p className="text-label-caps font-label-caps text-text-secondary">Admin Portal</p>
</div>
</div>
</div>
<nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">

<a className="flex items-center gap-3 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-container-highest transition-colors duration-200 rounded-lg group" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="text-body-md font-body-md">Dashboard</span>
</a>

<a className="flex items-center gap-3 px-3 py-2 text-primary bg-primary-container/10 border-r-2 border-primary rounded-l-none transition-colors duration-200 group" href="#">
<span className="material-symbols-outlined" data-icon="ads_click" style={{"fontVariationSettings":"'FILL' 1"}}>ads_click</span>
<span className="text-body-md font-body-md font-bold">Global Goals</span>
</a>

<a className="flex items-center gap-3 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-container-highest transition-colors duration-200 rounded-lg group" href="#">
<span className="material-symbols-outlined" data-icon="group_work">group_work</span>
<span className="text-body-md font-body-md">Team Alignment</span>
</a>

<a className="flex items-center gap-3 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-container-highest transition-colors duration-200 rounded-lg group" href="#">
<span className="material-symbols-outlined" data-icon="insights">insights</span>
<span className="text-body-md font-body-md">Performance</span>
</a>

<a className="flex items-center gap-3 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-container-highest transition-colors duration-200 rounded-lg group" href="#">
<span className="material-symbols-outlined" data-icon="folder_shared">folder_shared</span>
<span className="text-body-md font-body-md">Directory</span>
</a>
</nav>
<div className="mt-auto px-4 space-y-1">
<a className="flex items-center gap-3 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-container-highest transition-colors duration-200 rounded-lg group" href="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span className="text-body-md font-body-md">Settings</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-container-highest transition-colors duration-200 rounded-lg group" href="#">
<span className="material-symbols-outlined" data-icon="contact_support">contact_support</span>
<span className="text-body-md font-body-md">Support</span>
</a>
</div>
</aside>

<main className="flex-1 flex flex-col h-full overflow-hidden relative">

<header className="bg-surface-container border-b border-border flex justify-between items-center w-full px-margin h-16 z-50">
<div className="flex items-center gap-4">
<button className="md:hidden text-text-primary">
<span className="material-symbols-outlined" data-icon="menu">menu</span>
</button>
<div className="hidden md:flex items-center gap-6">
<nav className="flex items-center gap-6">
<a className="text-text-secondary hover:text-text-primary transition-all duration-150 text-label-caps font-label-caps" href="#">ANALYTICS</a>
<a className="text-primary font-bold text-label-caps font-label-caps" href="#">GOALS</a>
<a className="text-text-secondary hover:text-text-primary transition-all duration-150 text-label-caps font-label-caps" href="#">TEAMS</a>
</nav>
</div>
</div>
<div className="flex items-center gap-4">
<div className="relative hidden sm:block">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-sm" data-icon="search">search</span>
<input className="bg-surface-container-lowest border border-border rounded-full py-1.5 pl-10 pr-4 text-body-sm focus:outline-none focus:border-primary-container w-64 transition-all" placeholder="Search objectives..." type="text"/>
</div>
<div className="flex items-center gap-2">
<button className="p-2 text-text-secondary hover:bg-surface-container-high transition-all rounded-full" title="Notifications">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button className="p-2 text-text-secondary hover:bg-surface-container-high transition-all rounded-full" title="Help">
<span className="material-symbols-outlined" data-icon="help">help</span>
</button>
<div className="w-8 h-8 rounded-full overflow-hidden border border-border ml-2 cursor-pointer scale-95 active:scale-90 transition-transform">
<img alt="Admin User Profile" className="w-full h-full object-cover" data-alt="A professional close-up headshot portrait of a high-level corporate administrator in a modern dark-themed tech office environment. The person has a focused and confident expression, styled with soft, cinematic rim lighting that highlights their silhouette against a blurred background of glowing server monitors and glass partitions. The overall aesthetic is sleek, premium, and sophisticated, consistent with a high-performance SaaS dashboard." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy7RKgM6Ze5V5FLPj4_5F93DAwTMxUJ2LmYjEeMe885QBXgmevxCwXyr0W9baia8kuKFE5ElnXCCumtCUqO2j6pE-97Q4V5F477FcTh8NSnvtdOevR2v0uK8AvFWL8Y80ARrwrwe6QRkFqwxYqk_JipufNnS5VA0KhTuF6iGq3px__v7uS9L6E6OzrTF4dvHgmyrgHnA8SXuvuJctViEM9Irp0A1uaMlJC3MMErX6fwFnuoE5iejBqhOh0sV60Il81z_xD7-aQCZcA"/>
</div>
</div>
</div>
</header>

<div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
<div className="max-w-4xl mx-auto px-margin py-12">

<header className="mb-10">
<div className="flex items-center gap-2 text-primary mb-2">
<span className="material-symbols-outlined text-xl" data-icon="rocket_launch">rocket_launch</span>
<span className="text-label-caps font-label-caps">STRATEGIC ALIGNMENT</span>
</div>
<h2 className="text-headline-lg font-headline-lg text-text-primary mb-2">Push Shared Goal</h2>
<p className="text-body-lg font-body-lg text-text-secondary">Distribute a company-wide objective to selected departments.</p>
</header>

<div className="glass-panel rounded-xl overflow-hidden shadow-2xl">
<div className="p-gutter space-y-8">

<div className="space-y-3">
<label className="text-label-caps font-label-caps text-text-secondary block">GOAL TITLE</label>
<input className="w-full bg-[#0E1015] border border-border text-text-primary px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-container/50 transition-all text-body-md placeholder:text-text-secondary/50" placeholder="e.g., Reduce Server Costs by 15%" type="text"/>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">

<div className="space-y-3">
<label className="text-label-caps font-label-caps text-text-secondary block">TARGET DEPARTMENTS</label>
<div className="relative">
<select className="w-full bg-[#0E1015] border border-border text-text-primary px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-container/50 transition-all text-body-md appearance-none custom-scrollbar" multiple size={5}>
<option className="py-2 px-2 hover:bg-primary-container/20 rounded" value="engineering">Engineering</option>
<option className="py-2 px-2 hover:bg-primary-container/20 rounded" value="sales">Sales</option>
<option className="py-2 px-2 hover:bg-primary-container/20 rounded" value="marketing">Marketing</option>
<option className="py-2 px-2 hover:bg-primary-container/20 rounded" value="hr">HR</option>
<option className="py-2 px-2 hover:bg-primary-container/20 rounded" value="product">Product</option>
</select>
<div className="mt-2 flex flex-wrap gap-2">
<span className="bg-primary-container/10 border border-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Engineering</span>
<span className="bg-primary-container/10 border border-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Product</span>
</div>
</div>
</div>

<div className="space-y-8">
<div className="space-y-3">
<label className="text-label-caps font-label-caps text-text-secondary block">WEIGHTAGE (%)</label>
<div className="relative">
<input className="w-full bg-[#0E1015] border border-border text-text-primary px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-container/50 transition-all text-body-md" type="number" value="20"/>
<span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary">%</span>
</div>
<p className="text-[11px] text-text-secondary italic">Influences overall performance score calculation.</p>
</div>
<div className="flex items-center justify-between p-4 bg-surface-container-low border border-border rounded-lg">
<div className="space-y-1">
<p className="text-body-md font-medium text-text-primary">Mandatory Goal</p>
<p className="text-body-sm text-text-secondary">Force-assign to all employees in department.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input defaultChecked className="sr-only peer" type="checkbox" value=""/>
<div className="w-11 h-6 bg-[#0E1015] border border-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-secondary after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container peer-checked:after:bg-white"></div>
</label>
</div>
</div>
</div>

<div className="p-4 bg-tertiary-container/5 border border-tertiary-container/20 rounded-lg flex gap-4">
<span className="material-symbols-outlined text-tertiary" data-icon="info">info</span>
<div className="space-y-1">
<h4 className="text-body-md font-bold text-tertiary">Shared Goal Impact</h4>
<p className="text-body-sm text-on-surface-variant">Pushing this goal will create 142 individual sub-tasks across the selected departments. Estimated alignment score increase: +8.4%.</p>
</div>
</div>
</div>

<footer className="bg-surface-container-high/50 p-gutter flex justify-end items-center gap-4 border-t border-border">
<button className="px-6 py-2.5 rounded-lg border border-border text-text-secondary font-medium text-body-md hover:bg-surface-container-highest hover:text-text-primary transition-all duration-150 active:scale-95">
                            Cancel
                        </button>
<button className="px-8 py-2.5 rounded-lg bg-primary-container text-white font-bold text-body-md hover:brightness-110 shadow-lg shadow-primary-container/20 transition-all duration-150 active:scale-95 flex items-center gap-2">
<span>Push Goal</span>
<span className="material-symbols-outlined text-sm" data-icon="send">send</span>
</button>
</footer>
</div>

<div className="mt-12 space-y-4">
<h3 className="text-label-caps font-label-caps text-text-secondary px-2">RECENTLY PUSHED OBJECTIVES</h3>
<div className="space-y-2">
<div className="flex items-center justify-between p-4 glass-panel rounded-lg group hover:border-primary/50 transition-colors">
<div className="flex items-center gap-4">
<div className="p-2 bg-success/10 rounded text-success">
<span className="material-symbols-outlined" data-icon="check_circle" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<div>
<p className="text-body-md font-medium text-text-primary">Migrate Q3 Legacy Systems</p>
<p className="text-body-sm text-text-secondary">Pushed to Engineering • 2 days ago</p>
</div>
</div>
<span className="material-symbols-outlined text-text-secondary group-hover:text-primary transition-colors" data-icon="chevron_right">chevron_right</span>
</div>
<div className="flex items-center justify-between p-4 glass-panel rounded-lg group hover:border-primary/50 transition-colors opacity-80">
<div className="flex items-center gap-4">
<div className="p-2 bg-warning/10 rounded text-warning">
<span className="material-symbols-outlined" data-icon="pending" style={{"fontVariationSettings":"'FILL' 1"}}>pending</span>
</div>
<div>
<p className="text-body-md font-medium text-text-primary">Improve NPS Score to 45+</p>
<p className="text-body-sm text-text-secondary">Pushed to Marketing, Product • 5 days ago</p>
</div>
</div>
<span className="material-symbols-outlined text-text-secondary group-hover:text-primary transition-colors" data-icon="chevron_right">chevron_right</span>
</div>
</div>
</div>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container border-t border-border flex justify-around items-center h-16 z-50">
<button className="flex flex-col items-center gap-1 text-text-secondary">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="text-[10px] font-label-caps">HOME</span>
</button>
<button className="flex flex-col items-center gap-1 text-primary">
<span className="material-symbols-outlined" data-icon="ads_click" style={{"fontVariationSettings":"'FILL' 1"}}>ads_click</span>
<span className="text-[10px] font-label-caps">GOALS</span>
</button>
<button className="flex flex-col items-center gap-1 text-text-secondary">
<span className="material-symbols-outlined" data-icon="group_work">group_work</span>
<span className="text-[10px] font-label-caps">TEAMS</span>
</button>
<button className="flex flex-col items-center gap-1 text-text-secondary">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span className="text-[10px] font-label-caps">SETTINGS</span>
</button>
</nav>

        </>
    );
}
