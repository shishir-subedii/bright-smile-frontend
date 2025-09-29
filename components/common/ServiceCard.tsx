'use client';

import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

interface ServiceCardProps {
    image: string;
    title: string;
    description: string;
}

export default function ServiceCard({ image, title, description }: ServiceCardProps) {
    return (
        <Card className="bg-white hover:shadow-md transition transform hover:-translate-y-1">
            <CardContent className="p-6">
                <Image src={image} alt={title} width={640} height={360} className="w-full h-48 object-cover rounded-lg mb-4" />
                <CardHeader>
                    <CardTitle className="text-xl text-gray-800">{title}</CardTitle>
                </CardHeader>
                <p className="text-gray-600 mb-4">{description}</p>
                <Link href="#" className="text-cyan-600 hover:text-cyan-700 font-medium flex items-center">
                    Learn more <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
            </CardContent>
        </Card>
    );
}