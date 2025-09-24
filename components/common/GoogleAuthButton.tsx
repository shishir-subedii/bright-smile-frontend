import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function GoogleAuthButton() {
    const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:3002";

    return (
        <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center"
            asChild
        >
            <Link href={`${apiBaseUrl}/auth/google`}>
                <Image
                    src="https://www.svgrepo.com/show/355037/google.svg"
                    alt="Google logo"
                    width={20}
                    height={20}
                    className="mr-2"
                />
                Sign in with Google
            </Link>
        </Button>
    );
}