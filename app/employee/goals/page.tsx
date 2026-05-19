import MyGoals from '@/components/MyGoals';
import DashboardLayout from '@/components/DashboardLayout';

export default function EmployeeGoalsPage() {
    return (
        <DashboardLayout currentPath="/employee/goals">
            <MyGoals />
        </DashboardLayout>
    );
}
