"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function GoogleSignInButton() {
    const handleGoogleSignIn = () => {
        window.open(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/google`, "_blank");

    };

    return (
        <Button
        type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2 cursor-pointer"
            onClick={handleGoogleSignIn}
        >
            <Image src="/google-icon.png" alt="Google" width={20} height={20} />
            Sign in with Google
        </Button>
    );
}