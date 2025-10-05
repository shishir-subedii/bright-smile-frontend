export interface RegisterFormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export enum paymentMethod{
    CASH = "CASH",
    STRIPE = "STRIPE",
    ESEWA = "ESEWA"
}
export interface appointmentFormData {
    date: string;
    time: string;
    age: number;
    pay: paymentMethod;
    gender: string;
    phoneNumber: string;
    doctorId: string;
}

export enum DoctorIDType {
    LICENSE = "LICENSE",
    PASSPORT = "PASSPORT",
    CITIZENSHIP = "CITIZENSHIP",
}

export interface Doctor {
    id: string;
    name: string;
    specialization: string;
    maxAppointmentsPerDay: number;
    idType: DoctorIDType;
    idNumber: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Appointment {
    id: number;
    userId: string;
    userName: string;
    doctorId: number;
    doctorName: string;
    date: string;
    time: string;
    status: 'Pending' | 'Completed' | 'Canceled';
}

export interface Holiday {
    id: number;
    date: string;
    description: string;
}

export interface DoctorLeave {
    id: number;
    doctorId: number;
    doctorName: string;
    date: string;
    type: 'full' | 'partial';
    fromTime?: string | null;
    toTime?: string | null;
    isGlobal?: boolean;
}

export interface GlobalLeave {
    id: number;
    date: string;
    fromTime: string | null;
    toTime: string | null;
    reason: string;
}