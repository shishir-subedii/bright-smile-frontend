'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Check, X, CreditCard } from 'lucide-react';
import { Appointment } from '@/types';
import { toast } from 'sonner';

// interface ProfileContentProps {
//     appointments: Appointment[];
// }

export default function ProfileContent({ appointments }: any) {
    // Pagination state
    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(appointments.length / itemsPerPage);
    const paginatedAppointments = appointments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePayNow = (appointmentId: number) => {
        toast.success(`Processing payment for appointment ${appointmentId}`);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-xs font-medium text-gray-500 uppercase">
                                Doctor
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-500 uppercase">
                                Date & Time
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-500 uppercase">
                                Status
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-500 uppercase">
                                Payment
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-500 uppercase text-right">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedAppointments.map((appt: any) => (
                            <TableRow key={appt.id}>
                                <TableCell className="font-medium text-gray-900">
                                    {appt.doctorName}
                                </TableCell>
                                <TableCell className="text-gray-500">
                                    {appt.date}
                                    <br />
                                    {appt.time}
                                </TableCell>
                                <TableCell
                                    className={
                                        appt.status === 'Completed'
                                            ? 'text-green-600'
                                            : appt.status === 'Pending'
                                                ? 'text-blue-600'
                                                : 'text-red-600'
                                    }
                                >
                                    <div className="flex items-center">
                                        {appt.status === 'Completed' ? (
                                            <Check className="w-4 h-4 mr-1" />
                                        ) : appt.status === 'Pending' ? (
                                            <Calendar className="w-4 h-4 mr-1" />
                                        ) : (
                                            <X className="w-4 h-4 mr-1" />
                                        )}
                                        {appt.status}
                                    </div>
                                </TableCell>
                                <TableCell
                                    className={
                                        appt.paymentStatus === 'Paid'
                                            ? 'text-green-600'
                                            : appt.paymentStatus === 'Unpaid'
                                                ? 'text-yellow-600'
                                                : 'text-gray-600'
                                    }
                                >
                                    <div className="flex items-center">
                                        <CreditCard className="w-4 h-4 mr-1" />
                                        {appt.paymentStatus || (appt.status === 'Canceled' ? 'Refunded' : 'Paid')}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    {appt.paymentStatus === 'Unpaid' && appt.status !== 'Canceled' && (
                                        <Button
                                            className="bg-[#8BC34A] hover:bg-[#7CB342] text-white text-sm"
                                            onClick={() => handlePayNow(appt.id)}
                                        >
                                            Pay Now
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
                <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <div className="flex space-x-2">
                    {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map((page) => (
                        <Button
                            key={page}
                            variant="ghost"
                            className={`px-3 py-1 ${currentPage === page
                                    ? 'bg-[#00BCD4] text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </Button>
                    ))}
                    {totalPages > 3 && (
                        <>
                            <span className="flex items-center px-2">...</span>
                            <Button
                                variant="ghost"
                                className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                                onClick={() => handlePageChange(totalPages)}
                            >
                                {totalPages}
                            </Button>
                        </>
                    )}
                </div>
                <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
        </>
    );
}