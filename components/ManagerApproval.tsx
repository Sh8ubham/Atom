import React from 'react';

export default function ManagerApproval() {
    return (
        <>
            

<aside className="flex flex-col h-screen sticky left-0 top-0 py-margin bg-surface-container-low dark:bg-surface-container-low border-r border-border dark:border-border docked left-0 h-full w-64 z-50">
<div className="px-6 mb-10">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
<span className="material-symbols-outlined text-white text-[20px]">bolt</span>
</div>
<div>
<h1 className="font-headline-md text-headline-md font-bold text-primary">AtomQuest</h1>
<p className="font-label-caps text-label-caps text-on-surface-variant opacity-60">Management Portal</p>
</div>
</div>
</div>
<nav className="flex-1 space-y-1 px-4">
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all duration-150 active:scale-[0.98] font-label-caps text-label-caps" href="#">
<span className="material-symbols-outlined">dashboard</span>
                Dashboard
            </a>
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all duration-150 active:scale-[0.98] font-label-caps text-label-caps" href="#">
<span className="material-symbols-outlined">group</span>
                Team Progress
            </a>

<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-primary bg-secondary-container/10 border-r-2 border-primary transition-all duration-150 active:scale-[0.98] font-label-caps text-label-caps" href="#">
<span className="material-symbols-outlined">fact_check</span>
                Approvals
            </a>
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all duration-150 active:scale-[0.98] font-label-caps text-label-caps" href="#">
<span className="material-symbols-outlined">assignment</span>
                Projects
            </a>
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all duration-150 active:scale-[0.98] font-label-caps text-label-caps" href="#">
<span className="material-symbols-outlined">bar_chart</span>
                Reports
            </a>
</nav>
<div className="mt-auto px-4 space-y-1">
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all duration-150 active:scale-[0.98] font-label-caps text-label-caps" href="#">
<span className="material-symbols-outlined">help</span>
                Support
            </a>
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all duration-150 active:scale-[0.98] font-label-caps text-label-caps" href="#">
<span className="material-symbols-outlined">settings</span>
                Settings
            </a>
</div>
</aside>
<div className="flex-1 flex flex-col min-w-0">

<header className="flex justify-between items-center w-full px-margin h-16 sticky top-0 z-40 bg-surface dark:bg-surface border-b border-border dark:border-border docked full-width top-0 flat no shadows">
<div className="flex items-center gap-4">
<span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary">AtomQuest</span>
<div className="h-6 w-[1px] bg-border mx-2"></div>
<nav className="hidden md:flex gap-6">
<a className="font-body-md text-body-md text-primary font-bold border-b-2 border-primary transition-colors duration-150" href="#">Approvals</a>
<a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-150" href="#">Overview</a>
<a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-150" href="#">Analytics</a>
</nav>
</div>
<div className="flex items-center gap-4">
<div className="relative hidden sm:block">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
<input className="bg-surface-container-lowest border border-border rounded-lg pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-container w-64 text-on-surface" placeholder="Search tasks..." type="text"/>
</div>
<button className="text-on-surface-variant hover:text-primary transition-opacity active:opacity-80">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="text-on-surface-variant hover:text-primary transition-opacity active:opacity-80">
<span className="material-symbols-outlined">settings</span>
</button>
<img alt="Manager Profile" className="w-8 h-8 rounded-full border border-border" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgU5lnEVtFk3jUoWTR5Yc1m5XgchIhFKYRxHoz4uh3UoQ87WyYyJ722zNdyeT1TZFhh0-pAIfyTCs2AUAsdhY2urCaW9eGPS57aCtl0bF8Y668CiA20ixrfWQs1HZUNXg1-jgtF3T4NxkcOs7oK7nZEhufVIRl0GRJhjh6AVggZvdZtyW9IYfuVVHywgfn3jPyuhx1fTCp4Z15DsB0oi40ppcgVgvhGxRgVVxQ-dF_1n0OPBnri_jtMsPwHWJNGo7JSl5QLMwCcGof"/>
</div>
</header>

<main className="p-margin max-w-container-max mx-auto w-full">

<div className="mb-10">
<div className="flex items-end justify-between mb-2">
<div>
<h2 className="font-headline-lg text-headline-lg text-text-primary tracking-tight">Review Pending Approvals</h2>
<p className="font-body-lg text-body-lg text-text-secondary mt-1">You have <span className="text-primary font-semibold">2 pending requests</span> that require immediate action.</p>
</div>
<div className="hidden lg:block">
<div className="flex -space-x-3">
<img className="w-10 h-10 rounded-full border-2 border-background" data-alt="A professional studio portrait of a male employee in his 30s with a focused and confident expression. The lighting is cinematic and high-contrast, typical of a premium tech company headshot. He is wearing a dark, minimal turtleneck against a blurred, deep charcoal gray background that matches the sleek UI design system." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9Q9jhw7TXkZQlOjhyTIabxLzYqrSH8Vadp9teHfKb16Q-Ei0OwM9jb3Sb-GveCyA0Y3Pe7o-srDZx-ljSHz3F1PCw-2z7nvWEGIKTo8GUr_-U4f1CmN7w45HqCd51RlMygJnj7nfdNv7pbmiQRCldHyljWgPYK1Kx4kDmZ5xVcgjtpCyoJ_I6Q3LFtfuSPL7BupcDez4UqycvPkqURVciESr-hl2JXR0jsKVWP6-jVE47bOfgk5Kgtkv8ftTVa1Lpk-ZbXjE_hS6S"/>
<img className="w-10 h-10 rounded-full border-2 border-background" data-alt="A professional close-up portrait of a woman in her late 20s with a friendly yet professional demeanor. She has short, styled hair and is positioned against a modern, glass-walled office background with soft bokeh lighting. The overall aesthetic is clean, professional, and reflects a high-performance corporate environment with cool, muted tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDejakXGmBrJ8rsaIjyQ8v1otmH4OxVNvrqySADDSTTt67J7OKtjOpqKUkeFqBh8QkWb2nQ-ZefJWynKnq12Zqat4uIfwNfpipasZFTzLcQ1p5Oz5iWoYRTtzvdz52NiXFKatC-nOydPPWGsXMP5EA_E_HQaIc3SgCRPlif9gk2RQhgcB-34JdpJl8r7xLxTcpmKAWBsDpbiafgoqFH9_OEtdLrFDpYirXHSJbtx4E7W-HN6f2plK1J7kzOMUfhKwOPasBkVguEm5xl"/>
</div>
</div>
</div>
<div className="h-[1px] w-full bg-gradient-to-r from-primary-container/40 to-transparent mt-6"></div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

<div className="lg:col-span-12 glass-card rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
<div className="flex items-start gap-5">
<div className="relative">
<img className="w-16 h-16 rounded-xl object-cover border border-border" data-alt="A professional corporate headshot of a mid-30s man with a subtle, confident smile. He is framed against a minimalist architectural background with clean lines and soft ambient lighting. The color palette is composed of deep navies and cool grays, aligning with the high-end SaaS aesthetic of the management dashboard." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJEOu7psAcPAdiXBAEBkevU5sDOtQaizgnzBoO6ZFZV8vHIz0YScQs5hVOnMzvJW6bHz_efI3xxeSE4m2gJHicaLs34l3Yx1Ds98mzMHTuvaNn5CA62Pbc2dbRf8fFGK0XG-WB7BfR1yNaoc3NwutbDU05drBzU92P7-iQxkR9cNr_PfK6nvTpedBqj-nHKkBb8rX7vHhjzw9vqp_k6oi4D9ozGT9jy0tQQ54tbcpzgEdnvDYlm0_YtfximTRClJDQTsp90KkxsH76"/>
<span className="absolute -bottom-1 -right-1 w-5 h-5 bg-warning rounded-full border-4 border-surface flex items-center justify-center">
<span className="material-symbols-outlined text-[10px] text-black font-bold">priority_high</span>
</span>
</div>
<div>
<div className="flex items-center gap-2 mb-1">
<h3 className="font-headline-md text-[18px] text-text-primary">John Doe</h3>
<span className="font-label-caps text-label-caps bg-secondary-container/20 text-secondary px-2 py-0.5 rounded border border-secondary-container/30">Sales Dept</span>
</div>
<p className="font-body-md text-body-md text-text-primary font-medium mb-1">Increase Q2 Sales</p>
<p className="font-body-sm text-body-sm text-text-secondary max-w-md">Target increased to 1.2M. The adjustment accounts for the new enterprise accounts acquired in the late Q1 transition period.</p>
</div>
</div>

<div className="flex flex-col md:items-end gap-4 shrink-0">
<div className="flex items-center gap-8">
<div className="text-right">
<p className="font-label-caps text-label-caps text-text-secondary mb-1">WEIGHTAGE</p>
<p className="font-headline-md text-headline-md text-primary">40%</p>
</div>
<div className="text-right">
<p className="font-label-caps text-label-caps text-text-secondary mb-1">PRIORITY</p>
<div className="flex items-center gap-1 text-warning">
<span className="material-symbols-outlined text-sm">bolt</span>
<span className="font-label-caps text-label-caps">HIGH</span>
</div>
</div>
</div>
<div className="flex items-center gap-3">
<button className="px-6 py-2 rounded-lg border border-danger text-danger font-label-caps text-label-caps hover:bg-danger/10 transition-colors active:scale-95">
                                    Reject
                                </button>
<button className="px-6 py-2 rounded-lg bg-primary-container text-white font-label-caps text-label-caps hover:bg-opacity-90 shadow-lg shadow-primary-container/20 transition-all active:scale-95">
                                    Approve
                                </button>
</div>
</div>
</div>
</div>

<div className="lg:col-span-12 glass-card rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
<div className="flex items-start gap-5">
<div className="relative">
<img className="w-16 h-16 rounded-xl object-cover border border-border" data-alt="A portrait of a young professional woman with a bright, engaged expression. She is in a modern office setting with glass partitions and soft overhead lighting that emphasizes a clean, professional aesthetic. The image uses a cool-toned color profile featuring blues and dark grays to match the dashboard's design." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGXYSx1EL-yXBtNwLtVaUa9fk6R2VWlZqWZFtTqI3ChFSfpcJopVFDOB2rb5xzGiVSlHAEK5z1vqWxtJm8sHl7E8jxNDSfT1hKhrFRhjYIE2-qcY-1UqhFqcCTW6jC9xXU1kC0TvXPmZpcoSgQxgRcjEmvVl2KnhruIZq6XVYydRw1c_2kdpGmiwK-hmwPUh09WYoaSnBs4peXd-LUIV580ig1ra_gHzEtVju0xXYQ37l-p6kmemEbvVcrNwElFaPEzXkrPgRzwEI-"/>
<span className="absolute -bottom-1 -right-1 w-5 h-5 bg-tertiary rounded-full border-4 border-surface flex items-center justify-center">
<span className="material-symbols-outlined text-[10px] text-black font-bold">new_releases</span>
</span>
</div>
<div>
<div className="flex items-center gap-2 mb-1">
<h3 className="font-headline-md text-[18px] text-text-primary">Sarah Connor</h3>
<span className="font-label-caps text-label-caps bg-surface-container-highest text-on-surface-variant px-2 py-0.5 rounded border border-border">HR &amp; Ops</span>
</div>
<p className="font-body-md text-body-md text-text-primary font-medium mb-1">Mentorship Program</p>
<p className="font-body-sm text-body-sm text-text-secondary max-w-md">New goal proposed. Focuses on cross-departmental training for junior developers to improve knowledge sharing and culture.</p>
</div>
</div>

<div className="flex flex-col md:items-end gap-4 shrink-0">
<div className="flex items-center gap-8">
<div className="text-right">
<p className="font-label-caps text-label-caps text-text-secondary mb-1">WEIGHTAGE</p>
<p className="font-headline-md text-headline-md text-primary">15%</p>
</div>
<div className="text-right">
<p className="font-label-caps text-label-caps text-text-secondary mb-1">PRIORITY</p>
<div className="flex items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined text-sm">schedule</span>
<span className="font-label-caps text-label-caps">MEDIUM</span>
</div>
</div>
</div>
<div className="flex items-center gap-3">
<button className="px-6 py-2 rounded-lg border border-danger text-danger font-label-caps text-label-caps hover:bg-danger/10 transition-colors active:scale-95">
                                    Reject
                                </button>
<button className="px-6 py-2 rounded-lg bg-primary-container text-white font-label-caps text-label-caps hover:bg-opacity-90 shadow-lg shadow-primary-container/20 transition-all active:scale-95">
                                    Approve
                                </button>
</div>
</div>
</div>
</div>

<div className="lg:col-span-8 glass-card rounded-xl p-8 border-dashed flex flex-col items-center justify-center text-center opacity-40">
<span className="material-symbols-outlined text-4xl mb-3">auto_awesome</span>
<h4 className="font-headline-md text-headline-md mb-2">Queue Clearing Up</h4>
<p className="font-body-md text-body-md max-w-sm">Once these are reviewed, your approval queue for this week will be empty.</p>
</div>
<div className="lg:col-span-4 flex flex-col gap-gutter">
<div className="glass-card rounded-xl p-6 bg-primary-container/5 border-primary/20">
<h4 className="font-label-caps text-label-caps text-primary mb-4">MANAGER INSIGHTS</h4>
<div className="space-y-4">
<div className="flex justify-between items-center">
<span className="text-sm text-text-secondary">Avg. Response Time</span>
<span className="text-sm font-semibold text-text-primary">2.4h</span>
</div>
<div className="flex justify-between items-center">
<span className="text-sm text-text-secondary">Approval Rate</span>
<span className="text-sm font-semibold text-text-primary">88%</span>
</div>
<div className="w-full bg-surface-container-highest h-1.5 rounded-full mt-2 overflow-hidden">
<div className="bg-primary h-full w-[88%]"></div>
</div>
</div>
</div>
<div className="glass-card rounded-xl p-6">
<h4 className="font-label-caps text-label-caps text-text-secondary mb-4">RECENTLY APPROVED</h4>
<div className="flex items-center gap-3 mb-4 last:mb-0">
<div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
<span className="material-symbols-outlined text-success text-sm">check</span>
</div>
<div>
<p className="text-sm font-medium text-text-primary">Updated Q1 KPIs</p>
<p className="text-[11px] text-text-secondary">Approved 2h ago</p>
</div>
</div>
</div>
</div>
</div>
</main>
</div>

        </>
    );
}
