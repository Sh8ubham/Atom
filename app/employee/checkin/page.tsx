import CheckIn from '@/components/CheckIn';
import DashboardLayout from '@/components/DashboardLayout';

export default function EmployeeCheckinPage() {
    return (
        <DashboardLayout currentPath="/employee/checkin">
            <CheckIn />
        </DashboardLayout>
    );
}
