import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Car, CheckCircle, Shield, Truck } from 'lucide-react';

export default function Welcome() {
    return (
        <PublicLayout title="Home">
            {/* Hero Section */}
            <div className="relative bg-neutral-900 text-white">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2800&auto=format&fit=crop"
                        alt="Hero background"
                        className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                </div>

                <div className="relative container mx-auto px-4 py-24 md:py-32">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Find Your Dream Car <br />
                            <span className="text-primary">At The Best Price</span>
                        </h1>
                        <p className="text-lg md:text-xl text-neutral-300 mb-8">
                            Thousands of high-quality used cars from Japan and around the world. Trusted export service with global shipping.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" className="text-lg px-8">
                                Browse Stock
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white/20 hover:bg-white/20 text-white">
                                How to Buy
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Widget Section (Mock) */}
            <div className="container mx-auto px-4 -mt-16 relative z-10">
                <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl p-6 md:p-8">
                    <h2 className="text-xl font-bold mb-6">Search for your car</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <option>Select Make</option>
                            <option>Toyota</option>
                            <option>Nissan</option>
                            <option>Honda</option>
                        </select>
                        <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <option>Select Model</option>
                        </select>
                        <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <option>Year From</option>
                        </select>
                        <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <option>Body Type</option>
                            <option>SUV</option>
                            <option>Truck</option>
                            <option>Sedan</option>
                            <option>Hatchback</option>
                            <option>Coupe</option>
                            <option>Van</option>
                        </select>
                        <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <option>Price Range</option>
                            <option>Under $5,000</option>
                            <option>Under $10,000</option>
                            <option>Under $20,000</option>
                            <option>Under $30,000</option>
                        </select>
                        <Button className="w-full">Search</Button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="py-20 bg-neutral-50 dark:bg-neutral-900">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar - Shop By Make */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6">
                                <h3 className="font-bold text-lg mb-4 border-b pb-2">Shop By Make</h3>
                                <ul className="space-y-2">
                                    {['Toyota', 'Nissan', 'Honda', 'Mazda', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Subaru', 'Mitsubishi'].map((make) => (
                                        <li key={make}>
                                            <a href="#" className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors">
                                                <span>{make}</span>
                                                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <Button variant="link" className="mt-4 p-0 h-auto text-primary">View All Makes</Button>
                            </div>

                            {/* Shop By Body Type - Hidden on Mobile */}
                            <div className="hidden lg:block bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 mt-6">
                                <h3 className="font-bold text-lg mb-4 border-b pb-2">Shop By Body Type</h3>
                                <ul className="space-y-2">
                                    {['SUV', 'Sedan', 'Hatchback', 'Truck', 'Van', 'Coupe', 'Wagon', 'Convertible'].map((bodyType) => (
                                        <li key={bodyType}>
                                            <a href="#" className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors">
                                                <span>{bodyType}</span>
                                                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <Button variant="link" className="mt-4 p-0 h-auto text-primary">View All Types</Button>
                            </div>
                        </div>

                        {/* Featured Vehicles */}
                        <div className="lg:col-span-3">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold">Featured Vehicles</h2>
                                <Button variant="link" className="text-primary">View All Stock</Button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    {
                                        id: 1,
                                        name: 'Toyota Harrier 2020',
                                        price: '$24,500',
                                        details: '2.0L Petrol • Automatic • 45,000 km',
                                        ref: 'BF12345',
                                        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800&auto=format&fit=crop'
                                    },
                                    {
                                        id: 2,
                                        name: 'Nissan X-Trail 2019',
                                        price: '$18,200',
                                        details: '2.5L Petrol • CVT • 52,000 km',
                                        ref: 'BF67890',
                                        image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=800&auto=format&fit=crop'
                                    },
                                    {
                                        id: 3,
                                        name: 'Honda CR-V 2021',
                                        price: '$26,900',
                                        details: '1.5L Turbo • Automatic • 30,000 km',
                                        ref: 'BF11223',
                                        image: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?q=80&w=800&auto=format&fit=crop'
                                    },
                                    {
                                        id: 4,
                                        name: 'Mazda CX-5 2022',
                                        price: '$28,500',
                                        details: '2.2L Diesel • Automatic • 15,000 km',
                                        ref: 'BF44556',
                                        image: 'https://images.unsplash.com/photo-1570375231770-53b4553320f0?q=80&w=800&auto=format&fit=crop'
                                    },
                                    {
                                        id: 5,
                                        name: 'Subaru Forester 2021',
                                        price: '$25,800',
                                        details: '2.5L Petrol • CVT • 28,000 km',
                                        ref: 'BF77889',
                                        image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop'
                                    },
                                    {
                                        id: 6,
                                        name: 'Mitsubishi Outlander 2022',
                                        price: '$29,500',
                                        details: '2.4L Hybrid • Automatic • 12,000 km',
                                        ref: 'BF99001',
                                        image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=800&auto=format&fit=crop'
                                    }
                                ].map((car) => (
                                    <div key={car.id} className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                                        <div className="aspect-[4/3] bg-neutral-200 dark:bg-neutral-700 relative overflow-hidden">
                                            <img
                                                src={car.image}
                                                alt={car.name}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                                Ref: {car.ref}
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{car.name}</h3>
                                            <p className="text-sm text-neutral-500 mb-3">{car.details}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xl font-bold text-primary">{car.price}</span>
                                                <span className="text-xs text-neutral-400">FOB Price</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Most Viewed Cars Section */}
            <div className="py-20 bg-white dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-800">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Most Viewed Cars</h2>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                Popular choices among our customers
                            </p>
                        </div>
                        <Button variant="link" className="text-primary">View All</Button>
                    </div>

                    <div className="relative">
                        <div className="overflow-x-auto scrollbar-hide">
                            <div className="flex gap-6 pb-4">
                                {[
                                    {
                                        id: 1,
                                        name: 'Toyota Land Cruiser 2021',
                                        price: '$45,900',
                                        details: '4.5L V8 • Automatic • 35,000 km',
                                        ref: 'BF88990',
                                        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=800&auto=format&fit=crop',
                                        views: '2.5k'
                                    },
                                    {
                                        id: 2,
                                        name: 'Toyota Alphard 2022',
                                        price: '$52,800',
                                        details: '2.5L Hybrid • CVT • 18,000 km',
                                        ref: 'BF77665',
                                        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop',
                                        views: '2.1k'
                                    },
                                    {
                                        id: 3,
                                        name: 'Nissan GT-R 2020',
                                        price: '$68,500',
                                        details: '3.8L V6 Twin Turbo • Automatic • 22,000 km',
                                        ref: 'BF55443',
                                        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop',
                                        views: '1.9k'
                                    },
                                    {
                                        id: 4,
                                        name: 'Honda Odyssey 2021',
                                        price: '$32,900',
                                        details: '2.4L Petrol • CVT • 28,000 km',
                                        ref: 'BF33221',
                                        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800&auto=format&fit=crop',
                                        views: '1.7k'
                                    },
                                    {
                                        id: 5,
                                        name: 'Toyota Prius 2022',
                                        price: '$28,500',
                                        details: '1.8L Hybrid • CVT • 15,000 km',
                                        ref: 'BF99887',
                                        image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop',
                                        views: '1.5k'
                                    },
                                    {
                                        id: 6,
                                        name: 'Lexus RX 2021',
                                        price: '$48,900',
                                        details: '3.5L V6 • Automatic • 25,000 km',
                                        ref: 'BF66554',
                                        image: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?q=80&w=800&auto=format&fit=crop',
                                        views: '1.4k'
                                    }
                                ].map((car) => (
                                    <div key={car.id} className="flex-none w-80 bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                                        <div className="aspect-[4/3] bg-neutral-200 dark:bg-neutral-700 relative overflow-hidden">
                                            <img
                                                src={car.image}
                                                alt={car.name}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                                Ref: {car.ref}
                                            </div>
                                            <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                                                <span>👁</span> {car.views} views
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{car.name}</h3>
                                            <p className="text-sm text-neutral-500 mb-3">{car.details}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xl font-bold text-primary">{car.price}</span>
                                                <span className="text-xs text-neutral-400">FOB Price</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
