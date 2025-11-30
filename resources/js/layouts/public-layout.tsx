import { PublicNavbar } from '@/components/public-navbar';
import { Head } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

interface PublicLayoutProps extends PropsWithChildren {
    title?: string;
}

export default function PublicLayout({ children, title }: PublicLayoutProps) {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans">
            <Head title={title} />

            <PublicNavbar />

            <main>
                {children}
            </main>

            <footer className="bg-neutral-900 text-white py-12 mt-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="font-bold text-lg mb-4">About Us</h3>
                            <p className="text-neutral-400 text-sm">
                                We are a leading car exporter providing high quality vehicles to customers worldwide.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-sm text-neutral-400">
                                <li><a href="#" className="hover:text-white">Stock List</a></li>
                                <li><a href="#" className="hover:text-white">How to Buy</a></li>
                                <li><a href="#" className="hover:text-white">Shipping Schedule</a></li>
                                <li><a href="#" className="hover:text-white">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-4">Contact</h3>
                            <ul className="space-y-2 text-sm text-neutral-400">
                                <li>Email: info@example.com</li>
                                <li>Phone: +1 234 567 890</li>
                                <li>Address: 123 Car Street, Auto City</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
                            <p className="text-neutral-400 text-sm mb-4">
                                Subscribe to get the latest updates and offers.
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="bg-neutral-800 border-none rounded px-3 py-2 text-sm w-full"
                                />
                                <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded text-sm font-medium">
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-neutral-500 text-sm">
                        &copy; {new Date().getFullYear()} Kenase Japan | All Rights Reserved
                    </div>
                </div>
            </footer>
        </div>
    );
}
