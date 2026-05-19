# AtomQuest

## Description
AtomQuest is an Enterprise Goal Setting and Tracking Portal designed to align teams, track key performance indicators, and monitor quarterly progress. The application provides role-based access for Employees, Managers, and Admins to manage objectives seamlessly.

## Tech Stack
- Next.js (App Router)
- React
- Tailwind CSS
- Supabase (PostgreSQL backend & Authentication)
- Recharts (Data Visualization)

## Prerequisites
Ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn

## Environment Variables
Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## How to Run Locally

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Features
- **Role-based Dashboards:** Dedicated views for Employees, Managers, and Admins.
- **Check-In System:** Regular updates on active goals.
- **Analytics:** Data visualization for team and company-wide progress.
- **Audit Logs:** Track all modifications and system activities.
