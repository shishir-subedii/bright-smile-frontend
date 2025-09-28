"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
    id: string;
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordInput({
    id,
    name,
    label,
    value,
    onChange,
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="relative">
            <Label htmlFor={id} className="mb-1">
                {label}
            </Label>
            <Input
                id={id}
                name={name}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={value}
                required
                onChange={onChange}
                className="w-full pr-10"
            />
            <button
                type="button"
                className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={togglePassword}
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
    );
}