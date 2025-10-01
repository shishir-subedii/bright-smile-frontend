'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { doctors, holidays } from '@/lib/data';
import { DoctorLeave } from '@/types';

const ScheduleManagement = () => {
    const [leaveData, setLeaveData] = useState<Partial<DoctorLeave>>({ type: 'full' });
    const [holidayDate, setHolidayDate] = useState('');

    const handleAddHoliday = () => {
        if (holidayDate) {
            toast.success('Holiday added successfully');
            setHolidayDate('');
        }
    };

    const handleRemoveHoliday = (id: number) => {
        toast.success('Holiday removed successfully');
    };

    const handleSubmitLeave = (e: React.FormEvent) => {
        e.preventDefault();
        if (leaveData.doctorName && leaveData.date) {
            toast.success(`Leave added for ${leaveData.doctorName}`);
            setLeaveData({ type: 'full' });
        }
    };

    const handleSubmitGlobalLeave = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Leave applied to all doctors');
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Schedule & Leave Management</h2>

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
                        <Button onClick={handleAddHoliday}>Add Holiday</Button>
                    </div>
                    <div className="mt-4 space-y-2">
                        {holidays.map((holiday) => (
                            <div key={holiday.id} className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded">
                                <span>{holiday.date} - {holiday.description}</span>
                                <Button variant="ghost" className="text-red-400" onClick={() => handleRemoveHoliday(holiday.id)}>
                                    Remove
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

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
                                    value={leaveData.doctorName || ''}
                                    onValueChange={(value) => setLeaveData({ ...leaveData, doctorName: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Doctor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {doctors.map((doctor) => (
                                            <SelectItem key={doctor.id} value={doctor.name}>
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
                            <Button variant="outline" onClick={() => setLeaveData({ type: 'full' })}>
                                Cancel
                            </Button>
                            <Button type="submit">Save Leave</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
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
                            <Button variant="outline">Cancel</Button>
                            <Button type="submit">Apply to All</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ScheduleManagement;