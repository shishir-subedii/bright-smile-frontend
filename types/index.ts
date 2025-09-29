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