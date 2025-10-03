import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="text-center space-y-6">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700">Page Not Found</h2>
                <p className="text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
                <Link href="/">
                    <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                        <Home className="h-5 w-5 mr-2 cursor-pointer" />
                        Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}