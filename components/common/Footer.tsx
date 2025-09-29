'use client';

import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Clock } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer id="contact" className="py-12 bg-gray-800 text-gray-300">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-white text-xl font-bold mb-4">Bright Smile</h3>
                        <p className="mb-4">Providing exceptional dental care with a personal touch for over 15 years.</p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-300 hover:text-white">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-gray-300 hover:text-white">
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-gray-300 hover:text-white">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-gray-300 hover:text-white">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {['home', 'services', 'why-us', 'testimonials', 'contact'].map((link) => (
                                <li key={link}>
                                    <Link href={`#${link}`} className="hover:text-white transition">
                                        {link.charAt(0).toUpperCase() + link.slice(1)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Services</h4>
                        <ul className="space-y-2">
                            {['General Dentistry', 'Cosmetic Dentistry', 'Emergency Care', 'Teeth Whitening', 'Dental Implants'].map((service) => (
                                <li key={service}>
                                    <Link href="#" className="hover:text-white transition">{service}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-2">
                            <li className="flex items-start">
                                <MapPin className="mr-2 mt-1 w-4 h-4" />
                                <span>123 Dental Ave, Suite 400<br />San Francisco, CA 94102</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="mr-2 w-4 h-4" />
                                <span>(555) 123-4567</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="mr-2 w-4 h-4" />
                                <span>hello@brightsmile.com</span>
                            </li>
                            <li className="flex items-center">
                                <Clock className="mr-2 w-4 h-4" />
                                <span>Mon-Fri: 8am-6pm<br />Sat: 9am-3pm</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-12 pt-8 text-center">
                    <p>&copy; 2023 Bright Smile Dental. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}