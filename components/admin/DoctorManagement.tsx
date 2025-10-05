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
import { Doctor, DoctorIDType } from '@/types';
import { doctorRepo } from '@/lib/repos/doctorRepo';

const DoctorManagement = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [formData, setFormData] = useState<Partial<Doctor>>({});
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Fetch all doctors when the component mounts
    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = () => {
        doctorRepo.getAllDoctors({
            onSuccess: (data) => setDoctors(data),
            onError: (message) => toast.error(message),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.specialization || !formData.idType || !formData.idNumber) {
            toast.error('Please fill all required fields');
            return;
        }

        setLoading(true);

        // Build payload safely — exclude system-managed fields
        const sanitizedPayload: Partial<Doctor> = {
            name: formData.name,
            specialization: formData.specialization,
            maxAppointmentsPerDay: formData.maxAppointmentsPerDay,
            idType: formData.idType,
            idNumber: formData.idNumber,
        };

        if (editingId) {
            await doctorRepo.updateDoctor({
                id: editingId,
                payload: sanitizedPayload,
                onSuccess: (updated) => {
                    setDoctors((prev) =>
                        prev.map((d) => (d.id === updated.id ? updated : d))
                    );
                    toast.success('Doctor updated successfully');
                    resetForm();
                },
                onError: (message) => toast.error(message),
            });
        } else {
            await doctorRepo.addDoctor({
                payload: sanitizedPayload,
                onSuccess: (newDoctor) => {
                    setDoctors((prev) => [newDoctor, ...prev]);
                    toast.success('Doctor added successfully');
                    resetForm();
                },
                onError: (message) => toast.error(message),
            });
        }

        setLoading(false);
    };

    const handleEdit = (doctor: Doctor) => {
        setFormData(doctor);
        setEditingId(doctor.id);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this doctor?')) return;

        await doctorRepo.deleteDoctor({
            id,
            onSuccess: (message) => {
                setDoctors((prev) => prev.filter((d) => d.id !== id));
                toast.success(message);
            },
            onError: (message) => toast.error(message),
        });
    };

    const resetForm = () => {
        setFormData({});
        setEditingId(null);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Doctor Management</h2>

            {/* Form Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-700">
                        {editingId ? 'Edit Doctor' : 'Add Doctor'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <Input
                                    value={formData.name || ''}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Specialization
                                </label>
                                <Input
                                    value={formData.specialization || ''}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            specialization: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Max Appointments/Day
                                </label>
                                <Input
                                    type="number"
                                    value={formData.maxAppointmentsPerDay || ''}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            maxAppointmentsPerDay: parseInt(e.target.value),
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    ID Type
                                </label>
                                <Select
                                    value={formData.idType || ""}
                                    onValueChange={(value) =>
                                        setFormData({ ...formData, idType: value as DoctorIDType })
                                    }
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select ID Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="LICENSE">Medical License</SelectItem>
                                        <SelectItem value="CITIZENSHIP">Citizenship</SelectItem>
                                        <SelectItem value="PASSPORT">Passport</SelectItem>
                                    </SelectContent>
                                </Select>

                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    ID Number
                                </label>
                                <Input
                                    value={formData.idNumber || ''}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            idNumber: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 cursor-pointer">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={resetForm}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading} className='cursor-pointer'>
                                {editingId ? 'Update Doctor' : 'Save Doctor'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Table Section */}
            <Card>
                <CardHeader className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold text-gray-700">
                        Doctor List
                    </CardTitle>
                    <Button onClick={resetForm}>Add Doctor</Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Specialization</TableHead>
                                <TableHead>Max Appointments</TableHead>
                                <TableHead>ID Type</TableHead>
                                <TableHead>ID Number</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {doctors.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-gray-500">
                                        No doctors found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                doctors.map((doctor) => (
                                    <TableRow key={doctor.id}>
                                        <TableCell className="font-medium">
                                            {doctor.name}
                                        </TableCell>
                                        <TableCell>{doctor.specialization}</TableCell>
                                        <TableCell>
                                            {doctor.maxAppointmentsPerDay}
                                        </TableCell>
                                        <TableCell>{doctor.idType}</TableCell>
                                        <TableCell>{doctor.idNumber}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button
                                                variant="ghost"
                                                className="text-cyan-500"
                                                onClick={() => handleEdit(doctor)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                className="text-red-400"
                                                onClick={() => handleDelete(doctor.id)}
                                            >
                                                Remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default DoctorManagement;
