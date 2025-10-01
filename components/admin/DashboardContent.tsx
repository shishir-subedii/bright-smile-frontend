'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { appointments, doctors } from '@/lib/data';

const DashboardContent = () => {
    const [greeting, setGreeting] = useState('Morning');
    const [dateTime, setDateTime] = useState('');

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const hours = now.getHours();
            const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            const dateString = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            setGreeting(hours >= 12 && hours < 17 ? 'Afternoon' : hours >= 17 || hours < 4 ? 'Evening' : 'Morning');
            setDateTime(`${dateString} • ${timeString}`);
        };
        updateDateTime();
        const interval = setInterval(updateDateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Good <span>{greeting}</span>, Admin
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">{dateTime}</p>
                </div>
                {/* <Button className="mt-4 md:mt-0 bg-green-500 hover:bg-green-600">Book New Appointment</Button> */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-l-4 border-cyan-500">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-500">Appointments Today</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-cyan-500">12</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-500">New Users This Week</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-gray-800">5</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-500">Total Doctors</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-gray-800">4</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-yellow-400">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-500">Pending Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-yellow-600">3</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-700">Recent Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Doctor</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {appointments.slice(0, 3).map((appt) => (
                                    <TableRow key={appt.id}>
                                        <TableCell>{appt.time}</TableCell>
                                        <TableCell className="font-medium">{appt.userName}</TableCell>
                                        <TableCell>{appt.doctorName}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-2 py-1 text-xs font-semibold rounded-full ${appt.status === 'Pending'
                                                        ? 'bg-cyan-100 text-cyan-800'
                                                        : appt.status === 'Completed'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}
                                            >
                                                {appt.status}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-700">Doctor Availability</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {doctors.map((doctor) => (
                                <div key={doctor.id} className="flex items-center">
                                    <div
                                        className={`h-3 w-3 rounded-full mr-3 ${doctor.id === 2 ? 'bg-red-400' : 'bg-green-500'
                                            }`}
                                    ></div>
                                    <span className="text-sm font-medium">
                                        {doctor.name}: {doctor.id === 2 ? 'On Leave' : 'Available'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardContent;