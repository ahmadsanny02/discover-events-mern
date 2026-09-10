import DashboardLayout from "@/components/layouts/DashboardLayout";
import Event from "@/components/views/Admin/Event";

const AdminEventPage = () => {
    return (
        <DashboardLayout
            title="Event"
            description="List of all events, create new event, and manage existing events."
            type="admin"
        >
            <Event />
        </DashboardLayout>
    );
};

export default AdminEventPage;
