'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LogoutButton from '@/components/auth/LogoutButton';
import ProfileContent from './ProfileContent';
import { authRepo } from '@/lib/repos/authRepo';
import { appointmentRepo } from '@/lib/repos/appointmentRepo';
import { toast } from 'sonner';

export default function ProfileClient() {
    const [user, setUser] = useState<any>(null);
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileAndAppointments = async () => {
            try {
                // Fetch user profile
                await new Promise<void>((resolve, reject) => {
                    authRepo.getUserProfile({
                        onSuccess: (data) => {
                            setUser(data);
                            resolve();
                        },
                        onError: (message) => {
                            toast.error(message);
                            reject(message);
                        },
                    });
                });

                // Fetch user appointments
                await new Promise<void>((resolve) => {
                    appointmentRepo.getUserAppointments({
                        page: 1,
                        limit: 50,
                        onSuccess: (data) => {
                            setAppointments(data?.paginatedData || []);
                            resolve();
                        },
                        onError: (message) => {
                            toast.error(message);
                            resolve();
                        },
                    });
                });
            } catch (error) {
                console.error('Error fetching profile or appointments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileAndAppointments();
    }, []);

    if (loading) {
        return <div className="text-center py-10">Loading profile...</div>;
    }

    return (
        <div className="bg-[#F9FAFB] min-h-screen flex flex-col">
            <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* User Profile Card */}
                <Card className="mb-8">
                    <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-[#1F2937] mb-1">
                                {user?.name || "User Name"}
                            </h1>
                            <p className="text-gray-600">{user?.email || "user@example.com"}</p>
                        </div>
                        <LogoutButton />
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
                        <ProfileContent appointments={appointments} />
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
