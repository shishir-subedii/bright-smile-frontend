'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { authRepo } from '@/lib/repos/authRepo';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    isVerified: boolean;
    createdAt: string;
}

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const fetchUsers = (pageNumber: number) => {
        setLoading(true);
        authRepo.getAllUsers({
            page: pageNumber,
            limit,
            onSuccess: (data: any) => {
                setUsers(data.paginatedData || []);
                setTotalPages(data.meta?.totalPages || 1);
                setLoading(false);
            },
            onError: (message: string) => {
                toast.error(message);
                setLoading(false);
            },
        });
    };

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-700">User List</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Verified</TableHead>
                                <TableHead>Created At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : users.length > 0 ? (
                                users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>{user.isVerified ? 'Yes' : 'No'}</TableCell>
                                        <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">
                                        No users found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-500">
                            Page {page} of {totalPages}
                        </span>
                        <div className="flex space-x-2">
                            <Button
                                variant="outline"
                                disabled={page <= 1}
                                onClick={() => setPage((prev) => prev - 1)}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                disabled={page >= totalPages}
                                onClick={() => setPage((prev) => prev + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserManagement;
