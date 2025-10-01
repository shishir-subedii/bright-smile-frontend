'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { doctors } from '@/lib/data';
import { Doctor } from '@/types';

const DoctorManagement = () => {
    const [formData, setFormData] = useState<Partial<Doctor>>({});
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success(editingId ? 'Doctor updated successfully' : 'Doctor added successfully');
        setFormData({});
        setEditingId(null);
    };

    const handleEdit = (doctor: Doctor) => {
        setFormData(doctor);
        setEditingId(doctor.id);
    };

    const handleDelete = (id: number) => {
        toast.success('Doctor removed successfully');
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Doctor Management</h2>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-700">Add/Edit Doctor</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <Input
                                    value={formData.name || ''}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                                <Input
                                    value={formData.specialization || ''}
                                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Max Appointments/Day</label>
                                <Input
                                    type="number"
                                    value={formData.maxAppointments || ''}
                                    onChange={(e) => setFormData({ ...formData, maxAppointments: parseInt(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ID Type</label>
                                <Select
                                    value={formData.idType || ''}
                                    onValueChange={(value) => setFormData({ ...formData, idType: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select ID Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Medical License">Medical License</SelectItem>
                                        <SelectItem value="National ID">National ID</SelectItem>
                                        <SelectItem value="Passport">Passport</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                                <Input
                                    value={formData.idNumber || ''}
                                    onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <Button variant="outline" onClick={() => setFormData({})}>Cancel</Button>
                            <Button type="submit">{editingId ? 'Update Doctor' : 'Save Doctor'}</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold text-gray-700">Doctor List</CardTitle>
                    <Button>Add Doctor</Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Specialization</TableHead>
                                <TableHead>Max Appointments</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {doctors.map((doctor) => (
                                <TableRow key={doctor.id}>
                                    <TableCell className="font-medium">{doctor.name}</TableCell>
                                    <TableCell>{doctor.specialization}</TableCell>
                                    <TableCell>{doctor.maxAppointments}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" className="text-cyan-500" onClick={() => handleEdit(doctor)}>
                                            Edit
                                        </Button>
                                        <Button variant="ghost" className="text-red-400" onClick={() => handleDelete(doctor.id)}>
                                            Remove
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

export default DoctorManagement;