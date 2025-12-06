import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Car, CheckCircle, Globe, Package, Shield, Ship, Truck, Tag, Zap, Clock, Percent } from 'lucide-react';

export default function Welcome() {
    return (
        <PublicLayout title="Home">
            {/* Enhanced Hero Section with Gradient */}
            <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }} />
                </div>

                {/* Hero Car Image */}
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="/images/hero-cars.png"
                        alt="Premium Cars"
                        className="w-full h-full object-cover opacity-30 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/70 to-transparent" />
                </div>

                <div className="relative container mx-auto px-4 py-28 md:py-36">
                    <div className="max-w-3xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                            <Globe className="h-4 w-4 text-yellow-400" />
                            <span className="text-sm font-medium">Trusted Worldwide Car Exporter</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Find Your Dream Car
                            <br />
                            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
                                From Japan
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                            Premium quality used cars with global shipping.
                            <span className="text-yellow-400 font-semibold"> Over 10,000+ vehicles</span> in stock.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0 shadow-xl">
                                Browse Stock
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white/30 hover:bg-white/20 text-white backdrop-blur-sm">
                                How It Works
                            </Button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-white/20">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-400" />
                                <span className="text-sm">Quality Inspected</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-blue-400" />
                                <span className="text-sm">Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Ship className="h-5 w-5 text-yellow-400" />
                                <span className="text-sm">Global Shipping</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="currentColor" className="text-neutral-50 dark:text-neutral-900" />
                    </svg>
                </div>
            </div>

            {/* Search Widget Section */}
            <div className="container mx-auto px-4 -mt-20 relative z-10">
                <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl p-6 md:p-8 border border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Car className="h-6 w-6 text-primary" />
                        Search for Your Perfect Car
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <select className="flex h-11 w-full items-center justify-between rounded-lg border-2 border-neutral-200 dark:border-neutral-700 bg-background px-4 py-2 text-sm font-medium hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                            <option>Select Make</option>
                            <option>Toyota</option>
                            <option>Nissan</option>
                            <option>Honda</option>
                            <option>Mazda</option>
                            <option>BMW</option>
                            <option>Mercedes-Benz</option>
                        </select>
                        <select className="flex h-11 w-full items-center justify-between rounded-lg border-2 border-neutral-200 dark:border-neutral-700 bg-background px-4 py-2 text-sm font-medium hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                            <option>Select Model</option>
                        </select>
                        <select className="flex h-11 w-full items-center justify-between rounded-lg border-2 border-neutral-200 dark:border-neutral-700 bg-background px-4 py-2 text-sm font-medium hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                            <option>Year From</option>
                            <option>2024</option>
                            <option>2023</option>
                            <option>2022</option>
                            <option>2021</option>
                            <option>2020</option>
                        </select>
                        <select className="flex h-11 w-full items-center justify-between rounded-lg border-2 border-neutral-200 dark:border-neutral-700 bg-background px-4 py-2 text-sm font-medium hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                            <option>Body Type</option>
                            <option>SUV</option>
                            <option>Sedan</option>
                            <option>Truck</option>
                            <option>Hatchback</option>
                            <option>Van</option>
                        </select>
                        <select className="flex h-11 w-full items-center justify-between rounded-lg border-2 border-neutral-200 dark:border-neutral-700 bg-background px-4 py-2 text-sm font-medium hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                            <option>Price Range</option>
                            <option>Under $10,000</option>
                            <option>$10,000 - $20,000</option>
                            <option>$20,000 - $30,000</option>
                            <option>Above $30,000</option>
                        </select>
                        <Button className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg">
                            Search Now
                        </Button>
                    </div>
                </div>
            </div>



            {/* Featured Vehicles Section with Sidebar */}
            <div className="py-10 bg-white dark:bg-neutral-950">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">

                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Vehicles</h2>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                            Hand-picked premium cars ready for export. All vehicles inspected and verified.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Left Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Shop By Make */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-neutral-900 dark:to-neutral-800 rounded-2xl shadow-lg p-6 border border-blue-100 dark:border-neutral-700">
                                <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-blue-900 dark:text-blue-100">
                                    <Car className="h-5 w-5" />
                                    Shop By Make
                                </h3>
                                <ul className="space-y-2">
                                    {['Toyota', 'Nissan', 'Honda', 'Mazda', 'BMW'].map((make) => (
                                        <li key={make}>
                                            <a href="#" className="flex items-center justify-between px-3 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800 hover:text-primary transition-all group">
                                                <span className="font-medium">{make}</span>
                                                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <Button variant="link" className="mt-4 p-0 h-auto text-primary font-semibold">
                                    View All Makes →
                                </Button>
                            </div>

                            {/* Shop By Body Type */}
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-neutral-900 dark:to-neutral-800 rounded-2xl shadow-lg p-6 border border-purple-100 dark:border-neutral-700">
                                <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-purple-900 dark:text-purple-100">
                                    <Package className="h-5 w-5" />
                                    Shop By Body Type
                                </h3>
                                <ul className="space-y-2">
                                    {['SUV', 'Sedan', 'Hatchback', 'Truck', 'Van'].map((bodyType) => (
                                        <li key={bodyType}>
                                            <a href="#" className="flex items-center justify-between px-3 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800 hover:text-primary transition-all group">
                                                <span className="font-medium">{bodyType}</span>
                                                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <Button variant="link" className="mt-4 p-0 h-auto text-primary font-semibold">
                                    View All Types →
                                </Button>
                            </div>
                        </div>

                        {/* Featured Vehicles Grid */}
                        <div className="lg:col-span-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    {
                                        id: 1,
                                        name: 'Toyota Harrier 2020',
                                        price: '$24,500',
                                        details: '2.0L Petrol • Automatic • 45,000 km',
                                        ref: 'BF12345',
                                        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800&auto=format&fit=crop',
                                        badge: 'Popular'
                                    },
                                    {
                                        id: 2,
                                        name: 'Nissan X-Trail 2019',
                                        price: '$18,200',
                                        details: '2.5L Petrol • CVT • 52,000 km',
                                        ref: 'BF67890',
                                        image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=800&auto=format&fit=crop',
                                        badge: 'Best Value'
                                    },
                                    {
                                        id: 3,
                                        name: 'Honda CR-V 2021',
                                        price: '$26,900',
                                        details: '1.5L Turbo • Automatic • 30,000 km',
                                        ref: 'BF11223',
                                        image: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?q=80&w=800&auto=format&fit=crop',
                                        badge: 'New Arrival'
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
                                    },
                                    {
                                        id: 7,
                                        name: 'Toyota RAV4 2023',
                                        price: '$32,800',
                                        details: '2.5L Hybrid • Automatic • 8,000 km',
                                        ref: 'BF33445',
                                        image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=800&auto=format&fit=crop',
                                        badge: 'Eco-Friendly'
                                    },
                                    {
                                        id: 8,
                                        name: 'Lexus NX 2022',
                                        price: '$38,900',
                                        details: '2.0L Turbo • Automatic • 18,000 km',
                                        ref: 'BF55667',
                                        image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=800&auto=format&fit=crop',
                                        badge: 'Luxury'
                                    }
                                ].map((car) => (
                                    <div key={car.id} className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-neutral-800">
                                        <div className="aspect-[4/3] bg-neutral-200 dark:bg-neutral-800 relative overflow-hidden">
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
                                    </div>
                                ))}
                            </div>

                            <div className="text-center mt-12">
                                <Button size="lg" variant="outline" className="text-lg px-8 border-2">
                                    View All Stock
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popular Brands Section */}
            <div className="py-16 bg-gradient-to-br from-neutral-50 to-blue-50 dark:from-neutral-900 dark:to-neutral-950">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-neutral-900 dark:text-white">
                            Shop by Popular Brands
                        </h2>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            Browse our extensive collection from world-renowned manufacturers
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {[
                            { name: 'Toyota', count: '2,500+', color: 'from-red-500 to-red-600' },
                            { name: 'Nissan', count: '1,800+', color: 'from-blue-500 to-blue-600' },
                            { name: 'Honda', count: '1,600+', color: 'from-red-600 to-red-700' },
                            { name: 'Mazda', count: '1,200+', color: 'from-blue-600 to-indigo-600' },
                            { name: 'BMW', count: '800+', color: 'from-blue-700 to-blue-800' },
                            { name: 'Mercedes-Benz', count: '750+', color: 'from-neutral-700 to-neutral-800' },
                            { name: 'Audi', count: '650+', color: 'from-red-700 to-red-800' },
                            { name: 'Volkswagen', count: '600+', color: 'from-blue-500 to-cyan-500' },
                            { name: 'Subaru', count: '550+', color: 'from-blue-600 to-blue-700' },
                            { name: 'Mitsubishi', count: '500+', color: 'from-red-600 to-orange-600' },
                            { name: 'Lexus', count: '450+', color: 'from-neutral-800 to-neutral-900' },
                            { name: 'Porsche', count: '200+', color: 'from-yellow-600 to-orange-600' }
                        ].map((brand, index) => (
                            <div
                                key={index}
                                className="group relative bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 hover:border-transparent cursor-pointer overflow-hidden"
                            >
                                {/* Gradient Background on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="text-center">
                                        <Car className="h-8 w-8 mx-auto mb-3 text-neutral-400 group-hover:text-white transition-colors" />
                                        <h3 className="font-bold text-lg mb-1 text-neutral-900 dark:text-white group-hover:text-white transition-colors">
                                            {brand.name}
                                        </h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400 group-hover:text-white/90 transition-colors">
                                            {brand.count} cars
                                        </p>
                                    </div>
                                </div>

                                {/* Arrow Icon */}
                                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight className="h-5 w-5 text-white" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Button variant="link" className="text-primary font-semibold">
                            View All Brands →
                        </Button>
                    </div>
                </div>
            </div>

            {/* Special Deals/Hot Offers Section */}
            <div className="py-16 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-neutral-950 dark:via-red-950 dark:to-orange-950 relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full px-4 py-2 mb-4 animate-pulse">
                            <Zap className="h-4 w-4" />
                            <span className="text-sm font-semibold">Limited Time Offers</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 dark:from-red-400 dark:via-orange-400 dark:to-yellow-400 bg-clip-text text-transparent">
                            🔥 Hot Deals & Special Offers
                        </h2>
                        <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
                            Grab these amazing deals before they're gone! Limited stock available.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            {
                                id: 1,
                                name: 'Toyota Vitz 2018',
                                originalPrice: '$12,500',
                                salePrice: '$9,800',
                                discount: '22%',
                                details: '1.3L Petrol • Automatic • 68,000 km',
                                ref: 'BF88001',
                                image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop',
                                badge: 'Clearance',
                                timeLeft: '2 Days Left',
                                savings: '$2,700'
                            },
                            {
                                id: 2,
                                name: 'Nissan Note 2019',
                                originalPrice: '$11,200',
                                salePrice: '$8,900',
                                discount: '20%',
                                details: '1.2L Petrol • CVT • 55,000 km',
                                ref: 'BF88002',
                                image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=800&auto=format&fit=crop',
                                badge: 'Flash Sale',
                                timeLeft: '5 Days Left',
                                savings: '$2,300'
                            },
                            {
                                id: 3,
                                name: 'Honda Fit 2017',
                                originalPrice: '$10,800',
                                salePrice: '$7,999',
                                discount: '26%',
                                details: '1.5L Petrol • Automatic • 72,000 km',
                                ref: 'BF88003',
                                image: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?q=80&w=800&auto=format&fit=crop',
                                badge: 'Must Go',
                                timeLeft: '1 Day Left',
                                savings: '$2,801'
                            },
                            {
                                id: 4,
                                name: 'Mazda Demio 2018',
                                originalPrice: '$11,500',
                                salePrice: '$9,200',
                                discount: '20%',
                                details: '1.3L Petrol • Automatic • 60,000 km',
                                ref: 'BF88004',
                                image: 'https://images.unsplash.com/photo-1570375231770-53b4553320f0?q=80&w=800&auto=format&fit=crop',
                                badge: 'Hot Deal',
                                timeLeft: '3 Days Left',
                                savings: '$2,300'
                            }
                        ].map((deal) => (
                            <div key={deal.id} className="group relative">
                                <div className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-red-200 dark:border-red-900 hover:border-red-500 dark:hover:border-red-500 h-full">
                                    {/* Discount Badge */}
                                    <div className="absolute top-4 left-4 z-20">
                                        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full px-4 py-2 shadow-xl flex items-center gap-2 animate-bounce">
                                            <Percent className="h-4 w-4" />
                                            <span className="font-bold text-lg">{deal.discount} OFF</span>
                                        </div>
                                    </div>

                                    {/* Status Badge */}
                                    <div className="absolute top-4 right-4 z-20">
                                        <div className="bg-yellow-400 text-neutral-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                            {deal.badge}
                                        </div>
                                    </div>

                                    {/* Image */}
                                    <div className="aspect-[4/3] bg-neutral-200 dark:bg-neutral-800 relative overflow-hidden">
                                        <img
                                            src={deal.image}
                                            alt={deal.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                        {/* Time Left Indicator */}
                                        <div className="absolute bottom-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-2 rounded-lg shadow-lg flex items-center gap-2">
                                            <Clock className="h-4 w-4 animate-pulse" />
                                            {deal.timeLeft}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Ref: {deal.ref}</div>
                                        <h3 className="font-bold text-xl mb-2 text-neutral-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                                            {deal.name}
                                        </h3>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">{deal.details}</p>

                                        {/* Price Section */}
                                        <div className="mb-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-neutral-400 dark:text-neutral-500 line-through text-lg">{deal.originalPrice}</span>
                                                <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-bold px-2 py-1 rounded">
                                                    Save {deal.savings}
                                                </span>
                                            </div>
                                            <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                                                {deal.salePrice}
                                            </div>
                                            <div className="text-xs text-neutral-400">FOB Price</div>
                                        </div>

                                        <Button className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg group-hover:shadow-xl transition-all">
                                            <Tag className="mr-2 h-4 w-4" />
                                            Claim This Deal
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <div className="text-center bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-2xl border-2 border-red-200 dark:border-red-900">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Zap className="h-6 w-6 text-red-600 animate-pulse" />
                            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">Don't Miss Out!</h3>
                            <Zap className="h-6 w-6 text-red-600 animate-pulse" />
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-2xl mx-auto">
                            These special offers won't last long. Contact us now to secure your deal before it's too late!
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-xl text-lg px-8">
                                View All Deals
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button size="lg" variant="outline" className="border-2 border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 text-lg px-8">
                                Contact Sales Team
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
