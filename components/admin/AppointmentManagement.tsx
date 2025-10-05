'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { appointmentRepo } from '@/lib/repos/appointmentRepo';
import { doctorRepo } from '@/lib/repos/doctorRepo';

const AppointmentManagement = () => {
    const [filters, setFilters] = useState({
        doctor: 'All Doctors',
        status: 'All Statuses',
        date: '',
    });

    const [appointments, setAppointments] = useState<any[]>([]);
    const [doctors, setDoctors] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // pagination state
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [meta, setMeta] = useState<any>({
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
    });

    useEffect(() => {
        fetchDoctors();
    }, []);

    useEffect(() => {
        fetchAppointments();
    }, [page]);

    const fetchAppointments = async () => {
        setLoading(true);
        await appointmentRepo.getAllAppointmentsAdmin({
            limit,
            page,
            onSuccess: (res: any) => {
                const data = res?.paginatedData || [];
                const metaData = res?.meta || {};

                const mapped = data.map((appt: any) => ({
                    id: appt.id,
                    userName: appt.user?.name || 'N/A',
                    doctorName: appt.doctor?.name || 'N/A',
                    date: appt.date,
                    time: appt.time,
                    status: appt.status,
                    paymentStatus: appt.paymentStatus,
                    paymentMethod: appt.paymentMethod,
                }));

                setAppointments(mapped);
                setMeta(metaData);
                setLoading(false);
            },
            onError: (msg: string) => {
                toast.error(msg || 'Failed to load appointments');
                setLoading(false);
            },
        });
    };

    const fetchDoctors = async () => {
        await doctorRepo.getAllDoctors({
            onSuccess: (data) => setDoctors(data),
            onError: (message) => toast.error(message),
        });
    };

    const handleComplete = async (id: string) => {
        await appointmentRepo.markAppointmentCompleted(id, {
            onSuccess: () => {
                setAppointments((prev) =>
                    prev.map((a) =>
                        a.id === id ? { ...a, status: 'COMPLETED' } : a
                    )
                );
                toast.success('Appointment marked as completed');
            },
            onError: (msg: string) => toast.error(msg),
        });
    };

    const handleCancel = async (id: string) => {
        await appointmentRepo.markAppointmentCancelled(id, {
            onSuccess: () => {
                setAppointments((prev) =>
                    prev.map((a) =>
                        a.id === id ? { ...a, status: 'CANCELLED' } : a
                    )
                );
                toast.success('Appointment cancelled');
            },
            onError: (msg: string) => toast.error(msg),
        });
    };

    const filteredAppointments = appointments.filter((appt) => {
        return (
            (filters.doctor === 'All Doctors' ||
                appt.doctorName === filters.doctor) &&
            (filters.status === 'All Statuses' ||
                appt.status.toUpperCase() === filters.status.toUpperCase()) &&
            (filters.date === '' || appt.date === filters.date)
        );
    });

    const handlePrevPage = () => {
        if (meta.hasPrevPage) setPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (meta.hasNextPage) setPage((prev) => prev + 1);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
                Appointment Management
            </h2>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-700">
                        Filter Appointments
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Doctor
                            </label>
                            <Select
                                value={filters.doctor}
                                onValueChange={(value) =>
                                    setFilters({ ...filters, doctor: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All Doctors" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All Doctors">
                                        All Doctors
                                    </SelectItem>
                                    {doctors.map((doctor) => (
                                        <SelectItem
                                            key={doctor.id}
                                            value={doctor.name}
                                        >
                                            {doctor.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <Select
                                value={filters.status}
                                onValueChange={(value) =>
                                    setFilters({ ...filters, status: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All Statuses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All Statuses">
                                        All Statuses
                                    </SelectItem>
                                    <SelectItem value="BOOKED">Booked</SelectItem>
                                    <SelectItem value="COMPLETED">
                                        Completed
                                    </SelectItem>
                                    <SelectItem value="CANCELLED">
                                        Cancelled
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date
                            </label>
                            <Input
                                type="date"
                                value={filters.date}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        date: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Table */}
            <Card>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-6 text-gray-500">
                            Loading appointments...
                        </div>
                    ) : filteredAppointments.length === 0 ? (
                        <div className="text-center py-6 text-gray-500">
                            No appointments found
                        </div>
                    ) : (
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Doctor</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Time</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Payment</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredAppointments.map((appt) => (
                                        <TableRow key={appt.id}>
                                            <TableCell className="font-medium">
                                                {appt.userName}
                                            </TableCell>
                                            <TableCell>{appt.doctorName}</TableCell>
                                            <TableCell>{appt.date}</TableCell>
                                            <TableCell>{appt.time}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${appt.status === 'BOOKED'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : appt.status === 'COMPLETED'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-red-100 text-red-800'
                                                        }`}
                                                >
                                                    {appt.status}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${appt.paymentStatus === 'PAID'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                        }`}
                                                >
                                                    {appt.paymentStatus}
                                                </span>{' '}
                                                ({appt.paymentMethod})
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Button
                                                    variant="ghost"
                                                    className="text-green-500"
                                                    disabled={appt.status !== 'BOOKED'}
                                                    onClick={() => handleComplete(appt.id)}
                                                >
                                                    Mark Complete
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    className="text-red-400"
                                                    disabled={appt.status !== 'BOOKED'}
                                                    onClick={() => handleCancel(appt.id)}
                                                >
                                                    Cancel
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/* Pagination Controls */}
                            <div className="flex items-center justify-between mt-4">
                                <p className="text-sm text-gray-500">
                                    Page {meta.page || page} of {meta.totalPages || 1} (
                                    Total: {meta.total || 0})
                                </p>
                                <div className="space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={!meta.hasPrevPage}
                                        onClick={handlePrevPage}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={!meta.hasNextPage}
                                        onClick={handleNextPage}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AppointmentManagement;
