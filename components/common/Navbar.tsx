import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib/actions/auth";
import { getCookie } from "@/utils/cookieHelper";

export default async function Navbar() {
    const token = await getCookie("token");

    return (
        <nav className="bg-white shadow-md p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-gray-800">
                    Bright Smile
                </Link>
                <div className="space-x-4">
                    {token ? (
                        <form action={logoutAction}>
                            <Button type="submit" variant="outline">
                                Logout
                            </Button>
                        </form>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link href="/register">
                                <Button>Signup</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}