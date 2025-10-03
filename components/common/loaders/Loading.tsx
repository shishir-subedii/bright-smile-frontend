"use client";

import { Loader2 } from "lucide-react";

interface LoadingProps {
    text?: string;
    size?: "sm" | "md" | "lg";
}

export default function Loading({ text = "Loading...", size = "md" }: LoadingProps) {
    const sizeClasses = {
        sm: "h-4 w-4",
        md: "h-6 w-6",
        lg: "h-8 w-8",
    };

    return (
        <div className="flex items-center justify-center gap-2 text-gray-600">
            <Loader2 className={`animate-spin ${sizeClasses[size]} text-[#00BCD4]`} />
            <span className="text-sm font-medium">{text}</span>
        </div>
    );
}
