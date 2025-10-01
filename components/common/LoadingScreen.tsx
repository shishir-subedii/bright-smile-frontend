// components/common/LoadingScreen.tsx
'use client';

import { Loader2 } from 'lucide-react';

export default function LoadingScreen() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-gray-400">
                <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
                <p className="text-sm">Loading, please wait...</p>
            </div>
        </div>
    );
}
