'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Check, X, CreditCard, Download } from 'lucide-react';
import { toast } from 'sonner';
import { paymentRepo } from '@/lib/repos/paymentRepo';

export default function ProfileContent({ appointments }: any) {
    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(appointments.length / itemsPerPage);
    const paginatedAppointments = appointments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePayNow = async (id: string, method: string, status: string) => {
        if (status !== 'PENDING') {
            toast.error("Payment is not required for this appointment.");
            return;
        }
        if (method === 'ESEWA') {
            await paymentRepo.initiateEsewaPayment({
                appointmentId: id,
                onSuccess: (paymentUrl: string) => {
                    window.open(paymentUrl, "_blank");
                },
                onError: (errorMsg: any) => {
                    toast.error(errorMsg);
                }
            })
        }
        if (method === 'STRIPE') {
            await paymentRepo.initiateStripePayment({
                appointmentId: id,
                onSuccess: (paymentUrl: string) => {
                    window.open(paymentUrl, "_blank");
                },
                onError: (errorMsg: any) => {
                    toast.error(errorMsg);
                }
            })
        }
    };

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Doctor</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedAppointments.map((appt: any) => (
                            <TableRow key={appt.id}>
                                <TableCell>{appt.doctor?.name}</TableCell>
                                <TableCell>{appt.date}<br />{appt.time}</TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        {appt.status === 'COMPLETED' && <Check className="w-4 h-4 mr-1 text-green-600" />}
                                        {appt.status === 'PENDING' && <Calendar className="w-4 h-4 mr-1 text-blue-600" />}
                                        {appt.status === 'CANCELED' && <X className="w-4 h-4 mr-1 text-red-600" />}
                                        {appt.status}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        <CreditCard className="w-4 h-4 mr-1" />
                                        {appt.paymentStatus || (appt.status === 'CANCELED' ? 'Refunded' : 'Paid')}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right flex justify-end gap-2">
                                    {/* Pay Now Button */}
                                    {appt.status !== 'BOOKED' && appt.payment?.checkoutUrl && (
                                        <Button
                                            className="bg-[#8BC34A] hover:bg-[#7CB342] text-white text-sm"
                                            onClick={() => handlePayNow(appt.id, appt.paymentMethod, appt.status)}
                                        >
                                            Pay Now
                                        </Button>
                                    )}
                                    {/* Download Button */}
                                    {appt.status !== 'PENDING' && appt.fileUrl && (
                                        <Button
                                            className="bg-[#00BCD4] hover:bg-[#00acc1] text-white text-sm"
                                            onClick={() => window.open(appt.fileUrl, "_blank")}
                                        >
                                            <Download className="w-4 h-4 mr-1" />
                                            Download
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
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <div className="flex items-center space-x-2">
                    <span>Page {currentPage} of {totalPages}</span>
                </div>
                <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
        </>
    );
}
