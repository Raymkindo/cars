import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';

export default function Show({ car }: { car: any }) {
    return (
        <PublicLayout title={`${car.make} ${car.model}`}>
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-4">{car.make} {car.model} {car.year}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        {/* Image Gallery Placeholder */}
                        <div className="aspect-video bg-neutral-200 dark:bg-neutral-800 rounded-xl overflow-hidden">
                            {/* Use primary image or placeholder */}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="text-3xl font-bold text-primary">${car.price.toLocaleString()}</div>
                        <p className="text-neutral-600 dark:text-neutral-400">{car.description}</p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                                <span className="block text-sm text-neutral-500">Mileage</span>
                                <span className="font-semibold">{car.mileage.toLocaleString()} km</span>
                            </div>
                            <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                                <span className="block text-sm text-neutral-500">Transmission</span>
                                <span className="font-semibold">{car.transmission}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
