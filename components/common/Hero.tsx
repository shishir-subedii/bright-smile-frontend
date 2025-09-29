'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
    return (
        <section id="home" className="py-20 bg-gradient-to-r from-cyan-50 to-green-50">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-10 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
                        Your Healthier, Brighter Smile Starts Here
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Effortless online booking for top-rated dental care. Experience comfort and quality in every visit.
                    </p>
                    <Link href="/book-appointment" className="bg-[#8BC34A] hover:bg-[#7CB342] text-white px-8 py-3 text-base md:text-lg rounded-full transition transform hover:scale-105 shadow-lg font-medium whitespace-nowrap">
                        Book Appointment Now
                    </Link>
                </div>
                <div className="md:w-1/2">
                    <Image src="http://static.photos/medical/1024x576/1" alt="Happy patient" width={1024} height={576} className="rounded-lg shadow-xl" />
                </div>
            </div>
        </section>
    );
}