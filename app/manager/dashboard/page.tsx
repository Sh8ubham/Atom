import TeamDashboard from '@/components/TeamDashboard';
import DashboardLayout from '@/components/DashboardLayout';

export default function ManagerDashboardPage() {
    return (
        <DashboardLayout currentPath="/manager/dashboard">
            <TeamDashboard />
        </DashboardLayout>
    );
}
