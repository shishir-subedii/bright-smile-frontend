'use client';

import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface TestimonialCardProps {
    quote: string;
    name: string;
    role: string;
    image: string;
}

export default function TestimonialCard({ quote, name, role, image }: TestimonialCardProps) {
    return (
        <Card className="bg-gray-50">
            <CardContent className="p-6">
                <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="text-yellow-400 w-5 h-5 fill-current" />
                    ))}
                </div>
                <p className="text-gray-600 italic mb-6">{quote}</p>
                <div className="flex items-center">
                    <Image src={image} alt={name} width={48} height={48} className="w-12 h-12 rounded-full object-cover mr-4" />
                    <div>
                        <h4 className="font-medium text-gray-800">{name}</h4>
                        <p className="text-sm text-gray-500">{role}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}