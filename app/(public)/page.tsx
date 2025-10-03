import { Calendar, UserPlus, Cpu, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/common/FeatureCard';
import ServiceCard from '@/components/common/ServiceCard';
import TestimonialCard from '@/components/common/TestimonialCard';
import Hero from '@/components/common/Hero';
import Link from 'next/link';

export default function Home() {
  const features = [
    { icon: Calendar, title: 'Easy Online Booking', description: 'Schedule appointments anytime, anywhere with our simple online system.' },
    { icon: UserPlus, title: 'Experienced Dentists', description: 'Our team of dental professionals has years of experience and training.' },
    { icon: Cpu, title: 'Modern Technology', description: 'We use the latest dental equipment for precise, comfortable treatments.' },
    { icon: Heart, title: 'Personalized Care', description: 'Every patient receives customized treatment plans tailored to their needs.' },
  ];

  const services = [
    {
      image: 'http://static.photos/medical/640x360/2',
      title: 'General Dentistry',
      description: 'Routine checkups, cleanings, and preventive care to maintain optimal oral health.',
    },
    {
      image: 'http://static.photos/medical/640x360/3',
      title: 'Cosmetic Dentistry',
      description: 'Enhance your smile with teeth whitening, veneers, and other cosmetic treatments.',
    },
    {
      image: 'http://static.photos/medical/640x360/4',
      title: 'Emergency Care',
      description: 'Immediate attention for dental emergencies to relieve pain and prevent complications.',
    },
  ];

  const testimonials = [
    {
      quote: 'The entire staff was welcoming and professional. My cleaning was thorough yet gentle, and the dentist took time to explain everything.',
      name: 'Sarah J.',
      role: 'Patient for 3 years',
      image: 'http://static.photos/people/200x200/1',
    },
    {
      quote: 'I was nervous about getting a root canal, but the dentist made me feel completely at ease. The procedure was painless!',
      name: 'Michael T.',
      role: 'New patient',
      image: 'http://static.photos/people/200x200/2',
    },
    {
      quote: 'The online booking system saved me so much time. I was able to get an appointment the same day for my toothache.',
      name: 'Emily R.',
      role: 'Patient for 1 year',
      image: 'http://static.photos/people/200x200/3',
    },
  ];

  return (
    <>
      <Hero />
      <section id="why-us" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Bright Smile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Dental Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-full font-medium transition cursor-pointer">
              View All Services
            </Button>
          </div>
        </div>
      </section>
      <section id="testimonials" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Patients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-cyan-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for a Brighter Smile?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Schedule your appointment today and experience exceptional dental care.</p>
          <Link href="/book-appointment" className="bg-white text-cyan-600 hover:bg-gray-100 px-8 py-3 rounded-full font-bold text-lg transition transform hover:scale-105 shadow-lg whitespace-nowrap">
            Book Your Visit Now
          </Link>
        </div>
      </section>
    </>
  );
}