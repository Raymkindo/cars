import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    Calendar,
    Gauge,
    Fuel,
    Settings, // for Transmission
    Car as CarIcon,
    Palette,
    Info,
    MapPin,
    Phone,
    Mail,
    ArrowLeft,
    Share2,
    Heart,
    Maximize2,
    ChevronRight,
    CircleDollarSign,
    ShieldCheck,
    Truck
} from 'lucide-react';
import { useState } from 'react';

interface CarImage {
    id: number;
    image_path: string;
    is_primary: boolean;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Car {
    id: number;
    user_id: number;
    ref_number: string;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    vin: string;
    body_type: string;
    fuel_type: string;
    transmission: string;
    drive_type: string;
    color: string;
    condition: string;
    description: string;
    status: string;
    created_at: string;
    images: CarImage[];
    user: User;
    formatted_price: string;
}

export default function Show({ car }: { car: Car }) {
    // Find primary image or use the first one, or fallback
    const primaryImageObj = car.images.find(img => img.is_primary) || car.images[0];
    const initialMainImage = primaryImageObj ? `/storage/${primaryImageObj.image_path}` : '/images/placeholder-car.png';

    const [mainImage, setMainImage] = useState(initialMainImage);

    const specs = [
        { icon: Calendar, label: 'Year', value: car.year },
        { icon: Gauge, label: 'Mileage', value: `${car.mileage.toLocaleString()} km` },
        { icon: Fuel, label: 'Fuel Type', value: car.fuel_type },
        { icon: Settings, label: 'Transmission', value: car.transmission },
        { icon: CarIcon, label: 'Body Type', value: car.body_type },
        { icon: CircleDollarSign, label: 'Condition', value: car.condition },
        { icon: Palette, label: 'Color', value: car.color },
        { icon: Settings, label: 'Drive Type', value: car.drive_type },
    ];

    return (
        <PublicLayout title={`${car.year} ${car.make} ${car.model}`}>
            <div className="bg-neutral-50 dark:bg-neutral-950 min-h-screen pb-20">
                {/* Breadcrumb / Back Navigation */}
                <div className="container mx-auto px-4 py-6">
                    <Link
                        href={route('cars.index')}
                        className="inline-flex items-center text-sm text-neutral-500 hover:text-primary transition-colors mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back to Inventory
                    </Link>
                </div>

                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content (Left Column) */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Image Gallery */}
                            <div className="space-y-4">
                                <div className="aspect-[16/10] bg-neutral-200 dark:bg-neutral-900 rounded-3xl overflow-hidden relative group shadow-xl">
                                    <img
                                        src={mainImage}
                                        alt={`${car.make} ${car.model}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button size="icon" variant="secondary" className="rounded-full bg-white/80 backdrop-blur">
                                            <Share2 className="h-5 w-5 text-neutral-800" />
                                        </Button>
                                        <Button size="icon" variant="secondary" className="rounded-full bg-white/80 backdrop-blur">
                                            <Heart className="h-5 w-5 text-neutral-800" />
                                        </Button>
                                    </div>
                                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                                        Ref: {car.ref_number}
                                    </div>
                                </div>

                                {/* Thumbnails */}
                                {car.images.length > 1 && (
                                    <div className="grid grid-cols-5 md:grid-cols-6 gap-3">
                                        {car.images.map((img) => (
                                            <button
                                                key={img.id}
                                                onClick={() => setMainImage(`/storage/${img.image_path}`)}
                                                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${mainImage === `/storage/${img.image_path}`
                                                    ? 'border-primary ring-2 ring-primary/20'
                                                    : 'border-transparent opacity-70 hover:opacity-100'
                                                    }`}
                                            >
                                                <img
                                                    src={`/storage/${img.image_path}`}
                                                    alt="Thumbnail"
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Details Card for Mobile (Hidden on Desktop, shown via Flex order logic usually, but here duplicates for simplicity or just general info) */}
                            {/* NOTE: Price is usually critical, putting it in Sidebar for Desktop, but maybe Inline for Mobile. */}

                            {/* Description */}
                            <Card className="p-8 shadow-sm">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <Info className="h-6 w-6 text-primary" />
                                    Vehicle Description
                                </h2>
                                <div className="prose dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                    {car.description || "No description provided by the seller."}
                                </div>
                            </Card>

                            {/* Technical Specifications */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {specs.map((spec, index) => (
                                    <Card key={index} className="p-4 flex flex-col items-center text-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors border-neutral-200 dark:border-neutral-800">
                                        <spec.icon className="h-8 w-8 text-blue-600 mb-3 opacity-80" />
                                        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                                            {spec.label}
                                        </span>
                                        <span className="font-bold text-neutral-900 dark:text-white">
                                            {spec.value}
                                        </span>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar (Right Column) */}
                        <div className="space-y-6">
                            {/* Price & Title Card */}
                            <Card className="p-6 shadow-lg border-t-4 border-t-primary sticky top-6">
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge variant="outline" className="text-xs font-normal py-1 px-2 border-primary/30 text-primary bg-primary/5">
                                            {car.condition}
                                        </Badge>
                                        <Badge variant="secondary" className="text-xs font-normal py-1 px-2">
                                            Ref: {car.ref_number}
                                        </Badge>
                                    </div>
                                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2 leading-tight">
                                        {car.year} {car.make} {car.model}
                                    </h1>
                                    <p className="text-neutral-500 text-sm mb-6 flex items-center gap-1">
                                        <MapPin className="h-4 w-4" /> Available for Export
                                    </p>

                                    <Separator className="my-6" />

                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                                            ${car.price.toLocaleString()}
                                        </span>
                                        <span className="text-neutral-500 font-medium">FOB</span>
                                    </div>
                                    <p className="text-xs text-neutral-400 mb-6">
                                        Total price varies based on shipping destination.
                                    </p>

                                    <div className="space-y-3">
                                        <Button size="lg" className="w-full text-lg font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20">
                                            <Mail className="mr-2 h-5 w-5" />
                                            Request Quote
                                        </Button>
                                        <Button size="lg" variant="outline" className="w-full text-lg font-semibold">
                                            <Phone className="mr-2 h-5 w-5" />
                                            Contact Seller
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                            {/* Seller Info */}
                            <Card className="p-6">
                                <h3 className="font-bold text-lg mb-4 flex items-center">
                                    <ShieldCheck className="h-5 w-5 text-green-600 mr-2" />
                                    Seller Information
                                </h3>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-12 w-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-bold text-xl text-primary">
                                        {car.user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-neutral-900 dark:text-white">{car.user.name}</div>
                                        <div className="text-xs text-neutral-500">Verified Seller</div>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                    <p className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500" /> Identity Verified
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500" /> Payment Secure
                                    </p>
                                </div>
                            </Card>

                            {/* Shipping Estimate Widget (Placeholder) */}
                            <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900">
                                <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2 flex items-center">
                                    <Truck className="h-5 w-5 mr-2" />
                                    Shipping Estimator
                                </h3>
                                <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
                                    Get an estimated shipping cost to your nearest port.
                                </p>
                                <Button variant="link" className="p-0 h-auto text-blue-700 font-semibold">
                                    Calculate Shipping &rarr;
                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}

function CheckCircle({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="m9 11 3 3L22 4" />
        </svg>
    )
}
