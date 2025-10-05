'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { availabilityRepo } from '@/lib/repos/availabilityRepo';
import { apiClient } from '@/lib/api/client/apiClient';
import { DoctorLeave } from '@/types';

const ScheduleManagement = () => {
    const [leaveData, setLeaveData] = useState<Partial<DoctorLeave>>({ type: 'full' });
    const [holidayDate, setHolidayDate] = useState('');
    const [holidays, setHolidays] = useState<any[]>([]);
    const [doctors, setDoctors] = useState<any[]>([]);

    const [loadingAddHoliday, setLoadingAddHoliday] = useState(false);
    const [loadingRemoveHolidayIds, setLoadingRemoveHolidayIds] = useState<string[]>([]);
    const [loadingSubmitLeave, setLoadingSubmitLeave] = useState(false);
    const [loadingGlobalLeave, setLoadingGlobalLeave] = useState(false);

    useEffect(() => {
        fetchDoctors();
        fetchHolidays();
    }, []);

    const fetchDoctors = async () => {
        try {
            const { success, data } = await apiClient.get('/doctors');
            if (success && data) {
                setDoctors(data);
            } else {
                toast.error('Failed to load doctors');
            }
        } catch {
            toast.error('Error fetching doctors');
        }
    };

    const fetchHolidays = () => {
        availabilityRepo.getHolidays({
            onSuccess: (data) => setHolidays(data),
            onError: (message) => toast.error(message),
        });
    };

    const handleAddHoliday = async () => {
        if (!holidayDate) return;
        setLoadingAddHoliday(true);
        await availabilityRepo.addHoliday({
            payloadData: { date: holidayDate, reason: 'Clinic holiday' },
            onSuccess: (message) => {
                toast.success(message);
                setHolidayDate('');
                fetchHolidays();
            },
            onError: (message) => toast.error(message),
        });
        setLoadingAddHoliday(false);
    };

    const handleRemoveHoliday = async (id: string) => {
        setLoadingRemoveHolidayIds((prev) => [...prev, id]);
        await availabilityRepo.removeHoliday({
            id,
            onSuccess: (message) => {
                toast.success(message);
                fetchHolidays();
            },
            onError: (message) => toast.error(message),
        });
        setLoadingRemoveHolidayIds((prev) => prev.filter((hid) => hid !== id));
    };

    const handleSubmitLeave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!leaveData.doctorId || !leaveData.date) {
            toast.error('Please select doctor and date');
            return;
        }

        setLoadingSubmitLeave(true);
        await availabilityRepo.addDoctorAbsence({
            payloadData: {
                doctorId: leaveData.doctorId,
                date: leaveData.date,
                fromTime: leaveData.fromTime || '00:00',
                toTime: leaveData.toTime || '23:59',
                reason: leaveData.reason || 'Leave',
            },
            onSuccess: (message) => {
                toast.success(message);
                setLeaveData({ type: 'full' });
            },
            onError: (message) => toast.error(message),
        });
        setLoadingSubmitLeave(false);
    };

    const handleSubmitGlobalLeave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingGlobalLeave(true);
        try {
            await apiClient.post('/availability/global-leave', {
                // backend fields
            });
            toast.success('Leave applied to all doctors');
        } catch {
            toast.error('Failed to apply global leave');
        }
        setLoadingGlobalLeave(false);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Schedule & Leave Management</h2>

            {/* Clinic Holidays */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-700">Clinic Holidays</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-4">
                        <Input
                            type="date"
                            value={holidayDate}
                            onChange={(e) => setHolidayDate(e.target.value)}
                        />
                        <Button onClick={handleAddHoliday} disabled={loadingAddHoliday}>
                            {loadingAddHoliday ? 'Saving...' : 'Add Holiday'}
                        </Button>
                    </div>
                    <div className="mt-4 space-y-2">
                        {holidays.length > 0 ? (
                            holidays.map((holiday) => (
                                <div
                                    key={holiday.id}
                                    className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded"
                                >
                                    <span>{holiday.date} - {holiday.reason}</span>
                                    <Button
                                        variant="ghost"
                                        className="text-red-400"
                                        onClick={() => handleRemoveHoliday(holiday.id)}
                                        disabled={loadingRemoveHolidayIds.includes(holiday.id)}
                                    >
                                        {loadingRemoveHolidayIds.includes(holiday.id) ? 'Removing...' : 'Remove'}
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No holidays found.</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Doctor Leave */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-700">Doctor Leave Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmitLeave} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                                <Select
                                    value={leaveData.doctorId || ''}
                                    onValueChange={(value) => setLeaveData({ ...leaveData, doctorId: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Doctor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {doctors.map((doctor) => (
                                            <SelectItem key={doctor.id} value={doctor.id}>
                                                {doctor.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                                <RadioGroup
                                    value={leaveData.type}
                                    onValueChange={(value) => setLeaveData({ ...leaveData, type: value as 'full' | 'partial' })}
                                    className="flex space-x-4"
                                >
                                    <div className="flex items-center">
                                        <RadioGroupItem value="full" id="full" />
                                        <Label htmlFor="full" className="ml-2">Full Day</Label>
                                    </div>
                                    <div className="flex items-center">
                                        <RadioGroupItem value="partial" id="partial" />
                                        <Label htmlFor="partial" className="ml-2">Partial Day</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Date</label>
                                <Input
                                    type="date"
                                    value={leaveData.date || ''}
                                    onChange={(e) => setLeaveData({ ...leaveData, date: e.target.value })}
                                />
                            </div>
                            {leaveData.type === 'partial' && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">From Time</label>
                                        <Input
                                            type="time"
                                            value={leaveData.fromTime || ''}
                                            onChange={(e) => setLeaveData({ ...leaveData, fromTime: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">To Time</label>
                                        <Input
                                            type="time"
                                            value={leaveData.toTime || ''}
                                            onChange={(e) => setLeaveData({ ...leaveData, toTime: e.target.value })}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end space-x-3">
                            <Button variant="outline" type="button" onClick={() => setLeaveData({ type: 'full' })}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loadingSubmitLeave}>
                                {loadingSubmitLeave ? 'Saving...' : 'Save Leave'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Global Leave */}
            {/* <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-700">Global Leave (All Doctors)</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmitGlobalLeave} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Date</label>
                                <Input type="date" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                                <Input type="text" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">From Time</label>
                                <Input type="time" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">To Time</label>
                                <Input type="time" />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <Button variant="outline" type="button">Cancel</Button>
                            <Button type="submit" disabled={loadingGlobalLeave}>
                                {loadingGlobalLeave ? 'Applying...' : 'Apply to All'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card> */}
        </div>
    );
};

export default ScheduleManagement;
