import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { appointments, users } from "@/lib/data";
import { Appointment, User } from "@/types";
import AdminFooter from "@/components/admin/AdminFooter";
import ProfileContent from "@/components/common/ProfileContent";
import LogoutButton from "@/components/auth/LogoutButton"; 

export default function ProfilePage() {
    // Simulate logged-in user (replace with auth logic)
    const user: User = users.find((u) => u.id === "USR001") || {
        id: "USR001",
        name: "John Smith",
        email: "john.smith@example.com",
    };

    const userAppointments: Appointment[] = appointments.filter(
        (appt) => appt.userId === user.id
    );

    return (
        <div className="bg-[#F9FAFB] min-h-screen flex flex-col">
            <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Suspense fallback={<div>Loading...</div>}>
                    {/* User Profile Card */}
                    <Card className="mb-8">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-[#1F2937] mb-1">
                                        {user.name}
                                    </h1>
                                    <p className="text-gray-600">{user.email}</p>
                                </div>

                                {/* Client Component for Logout */}
                                <LogoutButton />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Appointments Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-[#1F2937]">
                                Your Appointments
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ProfileContent appointments={userAppointments} />
                        </CardContent>
                    </Card>
                </Suspense>
            </main>
            <AdminFooter />
        </div>
    );
}
