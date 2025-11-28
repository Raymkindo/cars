import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';
import { Car, Shield, Truck, Users, Award, Globe } from 'lucide-react';

export default function AboutUs() {
    return (
        <PublicLayout title="About Us">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
                        <p className="text-lg md:text-xl text-white/90">
                            Your trusted partner in importing high-quality vehicles from Japan to the world
                        </p>
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="py-20 bg-white dark:bg-neutral-950">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            We provide a safe and reliable way to import cars from Japan to your country.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900 text-center">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                <Car className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Huge Inventory</h3>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                Access to over 10,000 vehicles updated daily from trusted dealers.
                            </p>
                        </div>
                        <div className="p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900 text-center">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Safe & Secure</h3>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                All vehicles are inspected and verified before shipment.
                            </p>
                        </div>
                        <div className="p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900 text-center">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                <Truck className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                Reliable shipping partners ensuring your car arrives on time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Story Section */}
            <div className="py-20 bg-neutral-50 dark:bg-neutral-900">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
                        <div className="prose dark:prose-invert max-w-none">
                            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
                                Founded with a passion for connecting car enthusiasts worldwide with Japan's finest vehicles,
                                we have grown to become a trusted name in the automotive export industry.
                            </p>
                            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
                                Our team of experienced professionals works tirelessly to ensure every vehicle meets our
                                strict quality standards. From initial inspection to final delivery, we handle every step
                                of the process with care and attention to detail.
                            </p>
                            <p className="text-lg text-neutral-600 dark:text-neutral-400">
                                With years of experience in the industry, we understand the importance of transparency,
                                reliability, and customer satisfaction. That's why we've built our business on these core values.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Features */}
            <div className="py-20 bg-white dark:bg-neutral-950">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center">What Sets Us Apart</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200 dark:border-neutral-800">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                                <Users className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Expert Team</h3>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                Our knowledgeable staff provides personalized assistance throughout your buying journey.
                            </p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200 dark:border-neutral-800">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                                <Award className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Quality Assurance</h3>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                Every vehicle undergoes rigorous inspection to ensure it meets international standards.
                            </p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200 dark:border-neutral-800">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                                <Globe className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Global Reach</h3>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                We ship to over 100 countries worldwide with trusted logistics partners.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 bg-primary text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Car?</h2>
                    <p className="text-lg mb-8 text-white/90">
                        Browse our extensive inventory and let us help you import your perfect vehicle.
                    </p>
                    <Button size="lg" variant="secondary" className="text-lg px-8">
                        Browse Our Stock
                    </Button>
                </div>
            </div>
        </PublicLayout>
    );
}
