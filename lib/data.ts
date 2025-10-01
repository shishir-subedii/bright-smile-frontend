import { Doctor, User, Appointment, Holiday, DoctorLeave, GlobalLeave } from '@/types';

export const doctors: Doctor[] = [
    { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Orthodontics', maxAppointments: 15, idType: 'Medical License', idNumber: 'MD12345' },
    { id: 2, name: 'Dr. Michael Chen', specialization: 'Periodontics', maxAppointments: 12, idType: 'Medical License', idNumber: 'MD67890' },
    { id: 3, name: 'Dr. Emma Wilson', specialization: 'Pedodontics', maxAppointments: 10, idType: 'Medical License', idNumber: 'MD54321' },
];

export const users: User[] = [
    { id: 'USR001', name: 'John Smith', email: 'john.smith@example.com' },
    { id: 'USR002', name: 'Lisa Wong', email: 'lisa.wong@example.com' },
    { id: 'USR003', name: 'Robert Garcia', email: 'robert.g@example.com' },
    { id: 'USR004', name: 'Emily Chen', email: 'emily.c@example.com' },
    { id: 'USR005', name: 'David Kim', email: 'david.kim@example.com' },
];

export const appointments: Appointment[] = [
    { id: 1, userId: 'USR001', userName: 'John Smith', doctorId: 1, doctorName: 'Dr. Sarah Johnson', date: '2023-06-15', time: '10:00', status: 'Pending' },
    { id: 2, userId: 'USR002', userName: 'Lisa Wong', doctorId: 2, doctorName: 'Dr. Michael Chen', date: '2023-06-15', time: '11:30', status: 'Completed' },
    { id: 3, userId: 'USR003', userName: 'Robert Garcia', doctorId: 3, doctorName: 'Dr. Emma Wilson', date: '2023-06-16', time: '09:00', status: 'Pending' },
    { id: 4, userId: 'USR004', userName: 'Emily Chen', doctorId: 1, doctorName: 'Dr. Sarah Johnson', date: '2023-06-16', time: '14:15', status: 'Canceled' },
    { id: 5, userId: 'USR005', userName: 'David Kim', doctorId: 2, doctorName: 'Dr. Michael Chen', date: '2023-06-17', time: '10:45', status: 'Pending' },
];

export const holidays: Holiday[] = [
    { id: 1, date: '2023-07-04', description: 'Independence Day' },
    { id: 2, date: '2023-09-04', description: 'Labor Day' },
];

export const doctorLeaves: DoctorLeave[] = [];
export const globalLeaves: GlobalLeave[] = [];