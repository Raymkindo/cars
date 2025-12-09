import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Car, Package } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';

interface CarData {
    id: number;
    name: string;
    price: string;
    details: string;
    ref: string;
    image: string;
    badge?: string;
}

interface IndexProps {
    cars: {
        data: CarData[];
        links: any[];
    };
    filters: any;
}

export default function Index({ cars, filters }: IndexProps) {
    return (
        <PublicLayout title="Browse Cars">
            <div className="bg-neutral-50 dark:bg-neutral-900 min-h-screen py-12">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold">Available Cars</h1>
                        <p className="text-neutral-500">{cars.data.length} results found</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cars.data.map((car) => (
                            <Link href={route('cars.show', car.id)} key={car.id} className="group bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700">
                                <div className="aspect-[4/3] bg-neutral-200 dark:bg-neutral-700 relative overflow-hidden">
                                    <img
                                        src={car.image}
                                        alt={car.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {car.badge && (
                                        <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                            {car.badge}
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                                        Ref: {car.ref}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{car.name}</h3>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">{car.details}</p>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{car.price}</div>
                                            <div className="text-xs text-neutral-400">FOB Price</div>
                                        </div>
                                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
