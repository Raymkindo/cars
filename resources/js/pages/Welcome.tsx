import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Car, CheckCircle, Globe, Package, Shield, Ship, Truck, Tag, Zap, Clock, Percent } from 'lucide-react';

interface CarListing {
    id: number;
    name: string;
    price: string;
    details: string;
    ref: string;
    image: string;
    badge?: string;
}

interface Brand {
    name: string;
    color: string;
    count: number;
}

interface HotDeal {
    id: number;
    name: string;
    originalPrice: string;
    salePrice: string;
    discount: string;
    details: string;
    ref: string;
    image: string;
    badge: string;
    timeLeft: string;
    savings: string;
}

interface WelcomeProps {
    canRegister: boolean;
    featuredCars: CarListing[];
    popularBrands: Brand[];
    heroSettings?: Record<string, string>;
    hotDeals: HotDeal[];
}

export default function Welcome({ canRegister, featuredCars, popularBrands, heroSettings, hotDeals }: WelcomeProps) {
    const defaultSettings = {
        hero_badge: "Dar es Salaam's Finest",
        hero_title: 'DRIVE <br /> <span style="font-style: italic; font-weight: 300; background: linear-gradient(90deg, #ffffff, #c5d3ec); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">your story</span> <br /> <span style="background: linear-gradient(90deg, #ED1C24, #ff5e62); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">FORWARD</span>',
        hero_subtitle: "Tanzania's most trusted name in premium automobiles. From city cruisers to rugged off-road legends — find the vehicle that defines you.",
        hero_image: '/images/hero-port-cars-v3.png',
        hero_cta_text: 'Explore Inventory',
        hero_cta_secondary_text: 'Watch Tour',
        
        // Counter Stats
        hero_stat_1_val: '500+',
        hero_stat_1_lbl: 'Vehicles',
        hero_stat_2_val: '12yr',
        hero_stat_2_lbl: 'Experience',
        hero_stat_3_val: '98%',
        hero_stat_3_lbl: 'Satisfaction',

        // Featured showcase specs
        hero_featured_badge: '★ Premium Pick',
        hero_featured_title: 'LAND CRUISER 300',
        hero_featured_subtitle: 'Toyota · 2024 Series',
        
        hero_featured_spec_1_val: '3.3L',
        hero_featured_spec_1_lbl: 'Engine',
        hero_featured_spec_2_val: '309',
        hero_featured_spec_2_lbl: 'HP',
        hero_featured_spec_3_val: '4WD',
        hero_featured_spec_3_lbl: 'Drive',

        hero_featured_price: 'TZS 45M',
        hero_featured_availability: 'IN STOCK',

        hero_bg_image: '/images/hero-bg-dealership.png',
        hero_bg_overlay: 'linear-gradient(135deg, rgba(10, 18, 36, 0.94) 0%, rgba(27, 52, 98, 0.91) 50%, rgba(8, 15, 29, 0.96) 100%)',
    };

    const settings = { ...defaultSettings, ...heroSettings };

    return (
        <PublicLayout title="Home">
            {/* ── Tanzanian Premium Flagship Hero Section ────────────────────────────── */}
            <div className="relative text-white overflow-hidden bg-slate-950 min-h-[550px] flex items-center">
                
                {/* Full Premium Background Image Wallpaper */}
                {settings.hero_bg_image && (
                    <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
                        style={{ backgroundImage: `url(${settings.hero_bg_image})` }}
                    />
                )}

                {/* Adjustable Manual Color Overlay */}
                {settings.hero_bg_overlay && (
                    <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: settings.hero_bg_overlay }}
                    />
                )}
                
                {/* Clean premium micro-dot background pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, rgba(255,255,255,0.2) 1px, transparent 0)',
                        backgroundSize: '24px 24px'
                    }} />
                </div>

                {/* Warm energetic glow directly behind the showcase car panel */}
                <div className="pointer-events-none absolute right-[-5%] top-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full opacity-25 blur-[120px]"
                    style={{ background: 'radial-gradient(circle, #ED1C24 0%, transparent 70%)' }} />

                <div className="relative container mx-auto px-4 py-16 lg:py-24 z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        
                        {/* ── Left Side: Impact Copy & Metrics ── */}
                        <div className="lg:col-span-7 space-y-6">
                            
                            {/* Premium Localized Badge */}
                            {settings.hero_badge && (
                                <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4.5 py-2 shadow-lg">
                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ED1C24] animate-ping" />
                                    <span className="text-xs font-bold tracking-widest uppercase text-slate-300">{settings.hero_badge}</span>
                                </div>
                            )}

                            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight text-white flex flex-col uppercase"
                                dangerouslySetInnerHTML={{ __html: settings.hero_title }}
                            />

                            <p className="text-lg text-slate-300 leading-relaxed max-w-xl"
                                dangerouslySetInnerHTML={{ __html: settings.hero_subtitle }}
                            />

                            {/* Luxury Buttons */}
                            <div className="flex flex-wrap gap-4 pt-2">
                                <Link href={route('cars.index')} className="inline-flex items-center justify-center gap-2 text-sm font-bold px-8 py-4.5 text-white border-0 shadow-xl hover:opacity-95 transition-all rounded-xl" style={{ background: 'linear-gradient(135deg, #ED1C24, #b01018)' }}>
                                    {settings.hero_cta_text}
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <button className="inline-flex items-center justify-center gap-2 text-sm font-bold px-8 py-4.5 bg-white/5 border border-white/20 hover:bg-white/10 text-white backdrop-blur-md rounded-xl transition-colors">
                                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/15 text-white mr-1">▶</span>
                                    {settings.hero_cta_secondary_text}
                                </button>
                            </div>

                            {/* Trust Pillar Micro-Badges */}
                            <div className="flex flex-wrap gap-2.5 pt-3">
                                {['Certified Pre-Owned', '0% Finance Available', 'Nationwide Delivery', '3-Year Warranty', '500+ Vehicles in Stock'].map((pillar, i) => (
                                    <span key={i} className="text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 backdrop-blur-sm">
                                        ✓ {pillar}
                                    </span>
                                ))}
                            </div>

                            {/* Trust Metrics Bar */}
                            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 mt-8">
                                <div>
                                    <div className="text-3xl md:text-4xl font-black text-white">{settings.hero_stat_1_val}</div>
                                    <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{settings.hero_stat_1_lbl}</div>
                                </div>
                                <div>
                                    <div className="text-3xl md:text-4xl font-black" style={{ color: '#ED1C24' }}>{settings.hero_stat_2_val}</div>
                                    <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{settings.hero_stat_2_lbl}</div>
                                </div>
                                <div>
                                    <div className="text-3xl md:text-4xl font-black text-white">{settings.hero_stat_3_val}</div>
                                    <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{settings.hero_stat_3_lbl}</div>
                                </div>
                            </div>
                        </div>

                        {/* ── Right Side: Land Cruiser 300 Showcase Card ── */}
                        <div className="lg:col-span-5 relative mt-8 lg:mt-0">
                            
                            {/* Glassmorphic Container Panel */}
                            <div className="relative rounded-3xl p-4 bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                                
                                {/* Label header */}
                                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                                    <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400">Featured Showcase</span>
                                    <span className="inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-[10px] font-black text-white uppercase"
                                        style={{ background: '#ED1C24' }}>
                                        {settings.hero_featured_badge}
                                    </span>
                                </div>

                                {/* Vehicle Image with dynamic bottom shadow */}
                                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-950 mb-4">
                                    <img
                                        src={settings.hero_image}
                                        alt={settings.hero_featured_title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />
                                </div>

                                {/* Vehicle Header */}
                                <div className="mb-4">
                                    <h3 className="text-2xl font-black text-white leading-tight uppercase tracking-tight">
                                        {settings.hero_featured_title}
                                    </h3>
                                    <p className="text-xs text-slate-400 mt-0.5">{settings.hero_featured_subtitle}</p>
                                </div>

                                {/* Core Engine & Drive Stats Sheet */}
                                <div className="grid grid-cols-3 gap-2 py-3.5 border-y border-white/5 mb-4">
                                    <div className="text-center">
                                        <div className="text-sm font-bold text-white">{settings.hero_featured_spec_1_val}</div>
                                        <div className="text-[10px] text-slate-400 uppercase mt-0.5">{settings.hero_featured_spec_1_lbl}</div>
                                    </div>
                                    <div className="text-center border-x border-white/5">
                                        <div className="text-sm font-bold text-white">{settings.hero_featured_spec_2_val}</div>
                                        <div className="text-[10px] text-slate-400 uppercase mt-0.5">{settings.hero_featured_spec_2_lbl}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm font-bold text-white">{settings.hero_featured_spec_3_val}</div>
                                        <div className="text-[10px] text-slate-400 uppercase mt-0.5">{settings.hero_featured_spec_3_lbl}</div>
                                    </div>
                                </div>

                                {/* Pricing and Stock availability Info Grid */}
                                <div className="flex items-center justify-between mt-1">
                                    <div>
                                        <div className="text-[10px] uppercase text-slate-400">Est. Price</div>
                                        <div className="text-xl font-black" style={{ color: '#ED1C24' }}>{settings.hero_featured_price}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] uppercase text-slate-400">Availability</div>
                                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-green-400 mt-0.5">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            {settings.hero_featured_availability}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                {/* Curved wave transition divider to next section */}
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                    <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                        <path d="M0,80 C240,60 480,20 720,20 C960,20 1200,60 1440,80 L1440,80 L0,80 Z" fill="currentColor" className="text-neutral-50 dark:text-neutral-900" />
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
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const params = new URLSearchParams();
                            formData.forEach((value, key) => {
                                if (value && value !== 'Select Make' && value !== 'Select Model' && value !== 'Year From' && value !== 'Body Type' && value !== 'Price Range') {
                                    params.append(key, value as string);
                                }
                            });
                            window.location.href = route('cars.index', params.toString());
                        }}
                        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4"
                    >
                        <select name="make" className="flex h-11 w-full items-center justify-between rounded-lg border-2 border-neutral-200 dark:border-neutral-700 bg-background px-4 py-2 text-sm font-medium hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                            <option>Select Make</option>
                            <option value="Toyota">Toyota</option>
                            <option value="Nissan">Nissan</option>
                            <option value="Honda">Honda</option>
                            <option value="Mazda">Mazda</option>
                            <option value="BMW">BMW</option>
                            <option value="Mercedes-Benz">Mercedes-Benz</option>
                        </select>
                        <select name="model" className="flex h-11 w-full items-center justify-between rounded-lg border-2 border-neutral-200 dark:border-neutral-700 bg-background px-4 py-2 text-sm font-medium hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                            <option>Select Model</option>
                            <option value="Harrier">Harrier</option>
                            <option value="X-Trail">X-Trail</option>
                            <option value="CR-V">CR-V</option>
                            <option value="CX-5">CX-5</option>
                        </select>
                        <select name="year_from" className="flex h-11 w-full items-center justify-between rounded-lg border-2 border-neutral-200 dark:border-neutral-700 bg-background px-4 py-2 text-sm font-medium hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                            <option>Year From</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                        </select>
                        <select name="body_type" className="flex h-11 w-full items-center justify-between rounded-lg border-2 border-neutral-200 dark:border-neutral-700 bg-background px-4 py-2 text-sm font-medium hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                            <option>Body Type</option>
                            <option value="SUV">SUV</option>
                            <option value="Sedan">Sedan</option>
                            <option value="Truck">Truck</option>
                            <option value="Hatchback">Hatchback</option>
                            <option value="Van">Van</option>
                        </select>
                        <select name="price_max" className="flex h-11 w-full items-center justify-between rounded-lg border-2 border-neutral-200 dark:border-neutral-700 bg-background px-4 py-2 text-sm font-medium hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                            <option>Price Range</option>
                            <option value="10000">Under $10,000</option>
                            <option value="20000">Under $20,000</option>
                            <option value="30000">Under $30,000</option>
                            <option value="50000">Under $50,000</option>
                        </select>
                        <Button type="submit" className="w-full h-11 text-white font-semibold shadow-lg hover:opacity-90 transition-opacity" style={{ background: 'linear-gradient(135deg, #1B3462, #ED1C24)' }}>
                            Search Now
                        </Button>
                    </form>
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
                            <div className="rounded-2xl shadow-lg p-6 dark:from-neutral-900 dark:to-neutral-800 border dark:border-neutral-700" style={{ background: 'linear-gradient(135deg, #eef1f8 0%, #f5e8e8 100%)', borderColor: 'rgba(27,52,98,0.15)' }}>
                                <h3 className="font-bold text-xl mb-4 flex items-center gap-2" style={{ color: '#1B3462' }}>
                                    <Car className="h-5 w-5" />
                                    Shop By Make
                                </h3>
                                <ul className="space-y-2">
                                    {['Toyota', 'Nissan', 'Honda', 'Mazda', 'BMW'].map((make) => (
                                        <li key={make}>
                                            <Link href={route('cars.index', { make })} className="flex items-center justify-between px-3 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800 hover:text-primary transition-all group">
                                                <span className="font-medium">{make}</span>
                                                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <Link href={route('cars.index')} className="mt-4 p-0 h-auto text-primary font-semibold flex items-center hover:underline">
                                    View All Makes <ArrowRight className="ml-1 h-3 w-3" />
                                </Link>
                            </div>

                            {/* Shop By Body Type */}
                            <div className="rounded-2xl shadow-lg p-6 dark:from-neutral-900 dark:to-neutral-800 border dark:border-neutral-700" style={{ background: 'linear-gradient(135deg, #f5e8e8 0%, #eef1f8 100%)', borderColor: 'rgba(237,28,36,0.15)' }}>
                                <h3 className="font-bold text-xl mb-4 flex items-center gap-2" style={{ color: '#1B3462' }}>
                                    <Package className="h-5 w-5" />
                                    Shop By Body Type
                                </h3>
                                <ul className="space-y-2">
                                    {['SUV', 'Sedan', 'Hatchback', 'Truck', 'Van'].map((bodyType) => (
                                        <li key={bodyType}>
                                            <Link href={route('cars.index', { body_type: bodyType })} className="flex items-center justify-between px-3 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800 hover:text-primary transition-all group">
                                                <span className="font-medium">{bodyType}</span>
                                                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <Link href={route('cars.index')} className="mt-4 p-0 h-auto text-primary font-semibold flex items-center hover:underline">
                                    View All Types <ArrowRight className="ml-1 h-3 w-3" />
                                </Link>
                            </div>
                        </div>

                        {/* Featured Vehicles Grid */}
                        <div className="lg:col-span-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {featuredCars.map((car) => (
                                    <div key={car.id} className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-neutral-800">
                                        <div className="aspect-[4/3] bg-neutral-200 dark:bg-neutral-800 relative overflow-hidden">
                                            <Link href={route('cars.show', car.id)}>
                                                <img
                                                    src={car.image}
                                                    alt={car.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </Link>
                                            {car.badge && (
                                                <div className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg" style={{ background: 'linear-gradient(135deg, #1B3462, #ED1C24)' }}>
                                                    {car.badge}
                                                </div>
                                            )}
                                            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                                                Ref: {car.ref}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <Link href={route('cars.show', car.id)} className="block">
                                                <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{car.name}</h3>
                                            </Link>
                                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">{car.details}</p>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #1B3462, #ED1C24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{car.price}</div>
                                                    <div className="text-xs text-neutral-400">FOB Price</div>
                                                </div>
                                                <Button size="sm" className="text-white hover:opacity-90 transition-opacity" style={{ background: 'linear-gradient(135deg, #1B3462, #ED1C24)' }} asChild>
                                                    <Link href={route('cars.show', car.id)}>
                                                        View Details
                                                    </Link>
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
            <div className="py-16 dark:from-neutral-900 dark:to-neutral-950" style={{ background: 'linear-gradient(135deg, #f0f3f8 0%, #fdf0f0 100%)' }}>
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
                        {popularBrands.map((brand, index) => (
                            <Link
                                key={index}
                                href={route('cars.index', { make: brand.name })}
                                className="group relative bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 hover:border-transparent cursor-pointer overflow-hidden block"
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
                                        <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 group-hover:text-white/90 transition-colors">
                                            {brand.count > 0 ? `${brand.count}+ Cars` : 'Coming Soon'}
                                        </p>
                                    </div>
                                </div>

                                {/* Arrow Icon */}
                                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight className="h-5 w-5 text-white" />
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Link href={route('cars.index')} className="text-primary font-semibold hover:underline flex items-center justify-center">
                            View All Brands <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── Hot Deals & Special Offers ─────────────────────────────────── */}
            <div className="py-16 bg-white dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-800">
                <div className="container mx-auto px-4">

                    {/* Header row */}
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="inline-block w-1 h-5 rounded-full" style={{ background: '#ED1C24' }} />
                                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#ED1C24' }}>
                                    Limited Time
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
                                Hot Deals &amp; Special Offers
                            </h2>
                            <p className="text-neutral-500 dark:text-neutral-400 mt-1 text-sm">
                                Grab these deals before they expire — limited stock available.
                            </p>
                        </div>
                        <Link href={route('cars.index')}
                            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg border-2 transition-all duration-200 hover:text-white hover:border-transparent flex-shrink-0"
                            style={{ color: '#1B3462', borderColor: '#1B3462' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1B3462'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                            View All Deals <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Deal cards */}
                    {hotDeals.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {hotDeals.map((deal) => (
                                <Link
                                    key={deal.id}
                                    href={route('cars.show', deal.id)}
                                    className="group flex flex-col bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-lg transition-all duration-300"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                                        <img
                                            src={deal.image}
                                            alt={deal.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        {/* Discount badge */}
                                        <div className="absolute top-3 left-3 flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold text-white"
                                            style={{ background: '#ED1C24' }}>
                                            <Percent className="h-3 w-3" />
                                            {deal.discount} OFF
                                        </div>
                                        {/* Time left */}
                                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-white"
                                            style={{ background: 'rgba(27,52,98,0.9)' }}>
                                            <Clock className="h-3 w-3" />
                                            {deal.timeLeft}
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="flex flex-col flex-1 p-4 gap-2">
                                        {/* Badge + ref */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-bold uppercase tracking-wider rounded px-1.5 py-0.5 text-white"
                                                style={{ background: '#1B3462' }}>
                                                {deal.badge}
                                            </span>
                                            <span className="text-[11px] text-neutral-400">#{deal.ref}</span>
                                        </div>

                                        {/* Name */}
                                        <h3 className="font-semibold text-neutral-900 dark:text-white text-sm leading-snug line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                                            {deal.name}
                                        </h3>

                                        {/* Specs */}
                                        <p className="text-neutral-400 text-xs line-clamp-1">{deal.details}</p>

                                        {/* Divider */}
                                        <div className="border-t border-neutral-100 dark:border-neutral-800 mt-auto pt-3 flex items-center justify-between">
                                            <div>
                                                <div className="text-neutral-400 line-through text-xs">{deal.originalPrice}</div>
                                                <div className="text-lg font-bold" style={{ color: '#ED1C24' }}>
                                                    {deal.salePrice}
                                                </div>
                                                <div className="text-[10px] text-neutral-400">FOB • Save {deal.savings}</div>
                                            </div>
                                            <div className="text-xs font-semibold px-3 py-2 rounded-lg text-white transition-opacity group-hover:opacity-90"
                                                style={{ background: '#1B3462' }}>
                                                View Deal
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 text-neutral-400 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
                            <Tag className="h-8 w-8 mx-auto mb-3 opacity-30" />
                            <p className="text-sm">No active deals right now. Check back soon!</p>
                        </div>
                    )}

                </div>
            </div>

            <style>{`
                @keyframes marquee {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 28s linear infinite;
                    will-change: transform;
                }
            `}</style>
        </PublicLayout>
    );
}
