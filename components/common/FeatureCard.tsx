import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
    return (
        <Card className="bg-gray-50 hover:shadow-md transition cursor-pointer">
            <CardContent className="p-6">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
                    <Icon className="text-cyan-600 w-6 h-6" />
                </div>
                <CardHeader>
                    <CardTitle className="text-xl text-gray-800">{title}</CardTitle>
                </CardHeader>
                <p className="text-gray-600">{description}</p>
            </CardContent>
        </Card>
    );
}