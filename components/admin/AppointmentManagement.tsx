'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { appointments, doctors } from '@/lib/data';
import { Appointment } from '@/types';

const AppointmentManagement = () => {
    const [filters, setFilters] = useState({ doctor: 'All Doctors', status: 'All Statuses', date: '' });

    const filteredAppointments = appointments.filter((appt) => {
        return (
            (filters.doctor === 'All Doctors' || appt.doctorName === filters.doctor) &&
            (filters.status === 'All Statuses' || appt.status === filters.status) &&
            (filters.date === '' || appt.date === filters.date)
        );
    });

    const handleComplete = (id: number) => {
        toast.success('Appointment marked as completed');
    };

    const handleCancel = (id: number) => {
        toast.success('Appointment canceled');
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Appointment Management</h2>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-700">Filter Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                            <Select
                                value={filters.doctor}
                                onValueChange={(value) => setFilters({ ...filters, doctor: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All Doctors" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All Doctors">All Doctors</SelectItem>
                                    {doctors.map((doctor) => (
                                        <SelectItem key={doctor.id} value={doctor.name}>
                                            {doctor.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <Select
                                value={filters.status}
                                onValueChange={(value) => setFilters({ ...filters, status: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All Statuses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All Statuses">All Statuses</SelectItem>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                    <SelectItem value="Canceled">Canceled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <Input
                                type="date"
                                value={filters.date}
                                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Doctor</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAppointments.map((appt) => (
                                <TableRow key={appt.id}>
                                    <TableCell className="font-medium">{appt.userName}</TableCell>
                                    <TableCell>{appt.doctorName}</TableCell>
                                    <TableCell>{appt.date}</TableCell>
                                    <TableCell>{appt.time}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 text-xs font-semibold rounded-full ${appt.status === 'Pending'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : appt.status === 'Completed'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {appt.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            className="text-green-500"
                                            disabled={appt.status !== 'Pending'}
                                            onClick={() => handleComplete(appt.id)}
                                        >
                                            Mark Complete
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="text-red-400"
                                            disabled={appt.status !== 'Pending'}
                                            onClick={() => handleCancel(appt.id)}
                                        >
                                            Cancel
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default AppointmentManagement;