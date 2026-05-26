import { useState } from 'react';
import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Car, CheckCircle, Globe, Package, Shield, Ship, Truck, Tag, Zap, Clock, Percent, Search, Sparkles, DollarSign, ShieldCheck, Lock, Send, Award } from 'lucide-react';

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

interface BodyType {
    name: string;
    count: number;
}

interface WelcomeProps {
    canRegister: boolean;
    featuredCars: CarListing[];
    popularBrands: Brand[];
    popularBodyTypes: BodyType[];
    popularCars: CarListing[];
    heroSettings?: Record<string, string>;
    hotDeals: HotDeal[];
}

export default function Welcome({ canRegister, featuredCars, popularBrands, popularBodyTypes, popularCars, heroSettings, hotDeals }: WelcomeProps) {
    const [activeSearchTab, setActiveSearchTab] = useState<'quick' | 'budget' | 'deals'>('quick');
    const top10Brands = [...popularBrands]
        .sort((a, b) => b.count - a.count)
        .slice(0, 9);
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
            {/* ── Slim Unified Top Portal Section ──────────────── */}
            <div className="relative bg-gradient-to-br from-neutral-50 via-slate-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 overflow-hidden py-8 border-b border-neutral-200/50 dark:border-neutral-800">
                
                {/* Subtle premium dots background pattern */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, rgb(0,0,0) 1px, transparent 0)',
                        backgroundSize: '24px 24px'
                    }} />
                </div>

                <div className="relative w-full px-4 md:px-6 xl:px-8 z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                        
                        {/* Left Column (lg:col-span-6): Title & Tabbed Search Widget */}
                        <div className="lg:col-span-6 flex flex-col justify-between gap-4">
                            
                            {/* Shortened Brand Intro */}
                            <div className="space-y-1">
                                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-none text-neutral-900 dark:text-white">
                                    Drive <span className="bg-gradient-to-r from-[#ED1C24] to-[#ff5e62] bg-clip-text text-transparent">your story</span> forward
                                </h1>
                                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                    Tanzania's premier high-density automotive exporter portal.
                                </p>
                            </div>

                            {/* Embedded Compact Search Widget */}
                            <div className="bg-white/95 dark:bg-neutral-800/95 backdrop-blur-md rounded-xl shadow-lg p-5 border border-neutral-200 dark:border-neutral-700 flex-1 flex flex-col justify-between">
                                {/* Tab Navigation */}
                                <div className="flex border-b border-neutral-100 dark:border-neutral-700 mb-4 gap-1 flex-shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setActiveSearchTab('quick')}
                                        className={`flex items-center gap-1.5 pb-2 px-3 font-bold text-xs border-b-2 transition-all duration-200 cursor-pointer ${activeSearchTab === 'quick' ? 'border-[#ED1C24] text-[#ED1C24] dark:text-[#ff5e62]' : 'border-transparent text-neutral-400 hover:text-neutral-700 dark:hover:text-white'}`}
                                    >
                                        <Search className="h-3.5 w-3.5" />
                                        Quick Finder
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveSearchTab('budget')}
                                        className={`flex items-center gap-1.5 pb-2 px-3 font-bold text-xs border-b-2 transition-all duration-200 cursor-pointer ${activeSearchTab === 'budget' ? 'border-[#ED1C24] text-[#ED1C24] dark:text-[#ff5e62]' : 'border-transparent text-neutral-400 hover:text-neutral-700 dark:hover:text-white'}`}
                                    >
                                        <DollarSign className="h-3.5 w-3.5" />
                                        By Budget
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveSearchTab('deals')}
                                        className={`flex items-center gap-1.5 pb-2 px-3 font-bold text-xs border-b-2 transition-all duration-200 cursor-pointer ${activeSearchTab === 'deals' ? 'border-[#ED1C24] text-[#ED1C24] dark:text-[#ff5e62]' : 'border-transparent text-neutral-400 hover:text-neutral-700 dark:hover:text-white'}`}
                                    >
                                        <Sparkles className="h-3.5 w-3.5" />
                                        Hot Specials
                                    </button>
                                </div>

                                {/* Form Panels */}
                                <div className="flex-1 flex flex-col justify-center min-h-[110px]">
                                    {activeSearchTab === 'quick' && (
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
                                            className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs"
                                        >
                                            <select name="make" className="flex h-9 w-full items-center justify-between rounded bg-background px-2.5 py-1 text-xs border border-neutral-200 dark:border-neutral-700 hover:border-primary transition-colors focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent">
                                                <option>Select Make</option>
                                                <option value="Toyota">Toyota</option>
                                                <option value="Nissan">Nissan</option>
                                                <option value="Honda">Honda</option>
                                                <option value="Mazda">Mazda</option>
                                                <option value="BMW">BMW</option>
                                                <option value="Mercedes-Benz">Mercedes-Benz</option>
                                            </select>
                                            <select name="model" className="flex h-9 w-full items-center justify-between rounded bg-background px-2.5 py-1 text-xs border border-neutral-200 dark:border-neutral-700 hover:border-primary transition-colors focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent">
                                                <option>Select Model</option>
                                                <option value="Harrier">Harrier</option>
                                                <option value="X-Trail">X-Trail</option>
                                                <option value="CR-V">CR-V</option>
                                                <option value="CX-5">CX-5</option>
                                            </select>
                                            <select name="year_from" className="flex h-9 w-full items-center justify-between rounded bg-background px-2.5 py-1 text-xs border border-neutral-200 dark:border-neutral-700 hover:border-primary transition-colors focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent">
                                                <option>Year From</option>
                                                <option value="2024">2024</option>
                                                <option value="2023">2023</option>
                                                <option value="2022">2022</option>
                                                <option value="2021">2021</option>
                                                <option value="2020">2020</option>
                                            </select>
                                            <select name="body_type" className="flex h-9 w-full items-center justify-between rounded bg-background px-2.5 py-1 text-xs border border-neutral-200 dark:border-neutral-700 hover:border-primary transition-colors focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent">
                                                <option>Body Type</option>
                                                <option value="SUV">SUV</option>
                                                <option value="Sedan">Sedan</option>
                                                <option value="Truck">Truck</option>
                                                <option value="Hatchback">Hatchback</option>
                                                <option value="Van">Van</option>
                                            </select>
                                            <select name="price_max" className="flex h-9 w-full items-center justify-between rounded bg-background px-2.5 py-1 text-xs border border-neutral-200 dark:border-neutral-700 hover:border-primary transition-colors focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent">
                                                <option>Price Range</option>
                                                <option value="10000">Under $10,000</option>
                                                <option value="20000">Under $20,000</option>
                                                <option value="30000">Under $30,000</option>
                                                <option value="50000">Under $50,000</option>
                                            </select>
                                            <Button type="submit" className="w-full h-9 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer rounded animate-pulse" style={{ background: 'linear-gradient(135deg, #1B3462, #ED1C24)' }}>
                                                <Search className="h-3.5 w-3.5" />
                                                Search
                                            </Button>
                                        </form>
                                    )}

                                    {activeSearchTab === 'budget' && (
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            {[
                                                { title: 'Under $5,000', priceMax: '5000', color: 'from-blue-50/40 to-indigo-50/40 dark:from-neutral-900/30 dark:to-neutral-800/30' },
                                                { title: '$5,000 – $10,000', priceMax: '10000', color: 'from-emerald-50/40 to-teal-50/40 dark:from-neutral-900/30 dark:to-neutral-800/30' },
                                                { title: '$10,000 – $20,000', priceMax: '20000', color: 'from-amber-50/40 to-orange-50/40 dark:from-neutral-900/30 dark:to-neutral-800/30' },
                                                { title: 'Over $20,000', priceMin: '20000', color: 'from-rose-50/40 to-red-50/40 dark:from-neutral-900/30 dark:to-neutral-800/30' }
                                            ].map((tier, idx) => (
                                                <Link
                                                    key={idx}
                                                    href={route('cars.index', tier.priceMax ? { price_max: tier.priceMax } : { price_min: tier.priceMin })}
                                                    className={`flex items-center justify-between rounded px-3 py-2 bg-gradient-to-br ${tier.color} border border-neutral-100 dark:border-neutral-800 hover:border-[#ED1C24]/30 transition-all cursor-pointer`}
                                                >
                                                    <span className="font-bold text-[10px] text-neutral-800 dark:text-white leading-tight">{tier.title}</span>
                                                    <ArrowRight className="h-3 w-3 text-neutral-400" />
                                                </Link>
                                            ))}
                                        </div>
                                    )}

                                    {activeSearchTab === 'deals' && (
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            {[
                                                { title: 'Price Drop', icon: <Tag className="h-3.5 w-3.5 text-red-500" />, param: { clearance: '1' } },
                                                { title: 'Selling Fast', icon: <Zap className="h-3.5 w-3.5 text-amber-500" />, param: { fast_selling: '1' } },
                                                { title: 'Eco Friendly', icon: <Globe className="h-3.5 w-3.5 text-emerald-500" />, param: { hybrid: '1' } },
                                                { title: 'New Today', icon: <Clock className="h-3.5 w-3.5 text-blue-500" />, param: { sortkey: 'n' } }
                                            ].map((deal, idx) => (
                                                <Link
                                                    key={idx}
                                                    href={route('cars.index', deal.param)}
                                                    className="flex items-center gap-2 rounded px-3 py-2 bg-neutral-100/50 dark:bg-neutral-900/30 border border-neutral-150 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700 transition-all cursor-pointer"
                                                >
                                                    {deal.icon}
                                                    <span className="font-bold text-[10px] text-neutral-800 dark:text-white leading-tight">{deal.title}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column (lg:col-span-6): Unified Top Row Car Listings */}
                        <div className="lg:col-span-6 flex flex-col justify-between gap-3">
                            <div className="flex items-center justify-between flex-shrink-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="inline-block w-1 h-3.5 rounded-full bg-[#ED1C24]" />
                                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#ED1C24]">
                                        Latest Premium Arrivals
                                    </span>
                                </div>
                                <span className="text-[9px] font-extrabold text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded border dark:border-neutral-700">
                                    Live Stock
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 items-stretch">
                                {featuredCars.slice(0, 3).map((car) => (
                                    <div key={car.id} className="group bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-250/60 dark:border-neutral-800 flex flex-col justify-between">
                                        <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden flex-shrink-0">
                                            <Link href={route('cars.show', car.id)} className="cursor-pointer">
                                                <img
                                                    src={car.image}
                                                    alt={car.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </Link>
                                            {car.badge && (
                                                <div className="absolute top-2 left-2 text-white text-[8px] font-extrabold tracking-wider px-2 py-0.5 rounded shadow-sm uppercase bg-[#ED1C24]">
                                                    {car.badge}
                                                </div>
                                            )}
                                            <div className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-sm text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                                                {car.ref}
                                            </div>
                                        </div>
                                        <div className="p-3 flex-1 flex flex-col justify-between gap-1.5">
                                            <div>
                                                <Link href={route('cars.show', car.id)} className="block group-hover:text-[#ED1C24] transition-colors cursor-pointer">
                                                    <h3 className="font-extrabold text-xs leading-tight line-clamp-1">{car.name}</h3>
                                                </Link>
                                                <p className="text-[9px] text-neutral-400 mt-0.5 line-clamp-1">{car.details}</p>
                                            </div>
                                            <div className="border-t border-neutral-100 dark:border-neutral-800 pt-1.5 flex items-center justify-between mt-auto">
                                                <span className="text-[8px] uppercase font-bold text-neutral-400">FOB Price</span>
                                                <span className="text-xs font-black text-[#ED1C24]">{car.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>



            {/* Featured Vehicles Section with 3-Column Grid Layout */}
            <div className="py-12 bg-white dark:bg-neutral-950">
                <div className="w-full px-4 md:px-6 xl:px-8">
                    {/* <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Vehicles</h2>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
                            Hand-picked premium cars inspected and ready for export.
                        </p>
                    </div> */}

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

                        {/* ── Left Sidebar (col-span-2): Filtering lists ── */}
                        <div className="lg:col-span-2 flex flex-col h-full gap-6">
                            {/* Shop By Make */}
                            <div className="flex-1 flex flex-col justify-between rounded-xl shadow-sm p-5 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-neutral-900/30 dark:to-neutral-800/30 border border-neutral-100 dark:border-neutral-800 overflow-hidden">
                                <div className="bg-[#1B3462] text-white px-4 py-2.5 rounded-t-xl -mx-5 -mt-5 mb-4 flex items-center gap-2 font-bold text-xs uppercase tracking-wider flex-shrink-0">
                                    <Car className="h-4 w-4" />
                                    Shop By Make
                                </div>
                                <ul className="space-y-1 py-1 flex-1 flex flex-col justify-center">
                                    {top10Brands.map((brand) => {
                                        const make = brand.name;
                                        const count = brand.count;
                                        const countStr = count > 0 ? ` ( ${count}+ Cars )` : ' ( Coming Soon )';
                                        return (
                                            <li key={make}>
                                                <Link href={route('cars.index', { make })} className="flex items-center justify-between px-3 py-1 rounded-lg text-sm text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800 hover:text-[#ED1C24] dark:hover:text-[#ff5e62] transition-all group cursor-pointer">
                                                    <span className="font-medium">
                                                        {make}
                                                        <span className="text-[11px] text-neutral-400 dark:text-neutral-500 group-hover:text-inherit font-normal ml-1">
                                                            {countStr}
                                                        </span>
                                                    </span>
                                                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <Link href={route('cars.index')} className="mt-2 p-0 h-auto text-xs font-bold text-[#1B3462] dark:text-slate-300 flex items-center hover:underline cursor-pointer flex-shrink-0">
                                    View All Makes <ArrowRight className="ml-1 h-3 w-3" />
                                </Link>
                            </div>

                            {/* Shop By Body Type */}
                            <div className="flex-1 flex flex-col justify-between rounded-xl shadow-sm p-5 bg-gradient-to-br from-rose-50/50 to-red-50/50 dark:from-neutral-900/30 dark:to-neutral-800/30 border border-neutral-100 dark:border-neutral-800 overflow-hidden">
                                <div className="bg-[#ED1C24] text-white px-4 py-2.5 rounded-t-xl -mx-5 -mt-5 mb-4 flex items-center gap-2 font-bold text-xs uppercase tracking-wider flex-shrink-0">
                                    <Package className="h-4 w-4" />
                                    Shop By Body Type
                                </div>
                                <ul className="space-y-1 py-1 flex-1 flex flex-col justify-center">
                                    {popularBodyTypes.slice(0, 9).map((bodyType) => {
                                        const typeName = bodyType.name;
                                        const count = bodyType.count;
                                        const countStr = count > 0 ? ` ( ${count}+ Cars )` : ' ( Coming Soon )';
                                        return (
                                            <li key={typeName}>
                                                <Link href={route('cars.index', { body_type: typeName })} className="flex items-center justify-between px-3 py-1 rounded-lg text-sm text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800 hover:text-[#ED1C24] dark:hover:text-[#ff5e62] transition-all group cursor-pointer">
                                                    <span className="font-medium">{typeName}</span>
                                                    <span className="text-[11px] text-neutral-400 dark:text-neutral-500 group-hover:text-inherit font-normal ml-1">
                                                        {countStr}
                                                    </span>
                                                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <Link href={route('cars.index')} className="mt-2 p-0 h-auto text-xs font-bold text-[#ED1C24] dark:text-slate-300 flex items-center hover:underline cursor-pointer flex-shrink-0">
                                    View All Types <ArrowRight className="ml-1 h-3 w-3" />
                                </Link>
                            </div>

                            {/* Quick Filters */}
                            <div className="flex-1 flex flex-col justify-between rounded-xl shadow-sm p-5 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-neutral-900/30 dark:to-neutral-800/30 border border-neutral-100 dark:border-neutral-800 overflow-hidden">
                                <div className="bg-amber-600 text-white px-4 py-2.5 rounded-t-xl -mx-5 -mt-5 mb-4 flex items-center gap-2 font-bold text-xs uppercase tracking-wider flex-shrink-0" style={{ background: 'linear-gradient(135deg, #1B3462, #ED1C24)' }}>
                                    <Tag className="h-4 w-4" />
                                    Quick Filters
                                </div>
                                <ul className="space-y-1.5 py-1 flex-1 flex flex-col justify-center">
                                    {[
                                        { label: 'Hybrid & Electric', param: { hybrid: '1' } },
                                        { label: 'Under $10,000 Deals', param: { price_max: '10000' } },
                                        { label: 'Low Mileage Options', param: { sortkey: 'mileage_low' } },
                                        { label: 'New Arrivals Today', param: { sortkey: 'n' } },
                                        { label: 'Fuel-Efficient SUVs', param: { body_type: 'SUV', sortkey: 'fuel_low' } },
                                    ].map((filter, idx) => (
                                        <li key={idx}>
                                            <Link href={route('cars.index', filter.param)} className="flex items-center justify-between px-3 py-1 rounded-lg text-sm text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800 hover:text-[#ED1C24] dark:hover:text-[#ff5e62] transition-all group cursor-pointer">
                                                <span className="font-medium">{filter.label}</span>
                                                <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <Link href={route('cars.index')} className="mt-2 p-0 h-auto text-xs font-bold text-neutral-800 dark:text-slate-300 flex items-center hover:underline cursor-pointer flex-shrink-0">
                                    Show All Inventory <ArrowRight className="ml-1 h-3 w-3" />
                                </Link>
                            </div>
                        </div>

                        {/* ── Middle Core Content (col-span-7): Featured dynamic car cards ── */}
                        <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                                {featuredCars.slice(0, 16).map((car) => (
                                    <div key={car.id} className="group bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">
                                        <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden">
                                            <Link href={route('cars.show', car.id)} className="cursor-pointer">
                                                <img
                                                    src={car.image}
                                                    alt={car.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </Link>
                                            {car.badge && (
                                                <div className="absolute top-3 left-3 text-white text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded shadow-sm uppercase" style={{ background: 'linear-gradient(135deg, #1B3462, #ED1C24)' }}>
                                                    {car.badge}
                                                </div>
                                            )}
                                            <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded">
                                                Ref: {car.ref}
                                            </div>
                                        </div>
                                        <div className="p-4 space-y-2.5">
                                            <div>
                                                <Link href={route('cars.show', car.id)} className="block group-hover:text-[#ED1C24] transition-colors cursor-pointer">
                                                    <h3 className="font-bold text-sm leading-snug line-clamp-1">{car.name}</h3>
                                                </Link>
                                                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1">{car.details}</p>
                                            </div>
                                            <div className="border-t border-neutral-100 dark:border-neutral-800 pt-2.5 flex items-center justify-between">
                                                <span className="text-[9px] uppercase font-bold tracking-wider text-neutral-400">FOB Price</span>
                                                <span className="text-base font-black text-[#ED1C24]">{car.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center pt-4 flex-shrink-0">
                                <Button variant="outline" className="text-sm px-6 h-10 border-2 font-bold cursor-pointer rounded-lg" asChild>
                                    <Link href={route('cars.index')}>
                                        View Full Stock
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* ── Right Sidebar (col-span-3): Inquiries & Support Panel ── */}
                        <div className="lg:col-span-3 flex flex-col h-full gap-6">

                            {/* Easy Inquiry / Support Card */}
                            <div className="flex-1 flex flex-col justify-between rounded-xl shadow-sm p-5 bg-neutral-50 dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800">
                                <div className="flex items-center gap-2.5 pb-2.5 border-b border-neutral-100 dark:border-neutral-800 flex-shrink-0">
                                    <div className="h-8 w-8 rounded-lg bg-[#1B3462] flex items-center justify-center text-white">
                                        <Globe className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xs text-neutral-800 dark:text-white leading-tight">Easy Inquiry</h3>
                                        <p className="text-[9px] text-neutral-400">Response within 2 hours</p>
                                    </div>
                                </div>

                                <div className="space-y-1.5 text-xs flex-1 flex flex-col justify-center py-2.5">
                                    <div className="flex justify-between items-center bg-white dark:bg-neutral-800 p-2 rounded border dark:border-neutral-700">
                                        <span className="text-neutral-500 font-semibold text-[10px]">Toll-Free:</span>
                                        <span className="font-bold text-neutral-800 dark:text-white text-[10px]">+255 22 211 00</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white dark:bg-neutral-800 p-2 rounded border dark:border-neutral-700">
                                        <span className="text-neutral-500 font-semibold text-[10px]">WhatsApp:</span>
                                        <span className="font-bold text-emerald-600 dark:text-emerald-400 text-[10px]">+255 754 000 000</span>
                                    </div>
                                </div>

                                <Button className="w-full text-white text-[10px] h-8 cursor-pointer rounded-lg hover:opacity-95 shadow-sm flex-shrink-0" style={{ background: '#1B3462' }} asChild>
                                    <Link href={route('about')}>
                                        Contact Support
                                    </Link>
                                </Button>
                            </div>

                            {/* BE FORWARD Supporters Rewards Points Card */}
                            <div className="flex-1 flex flex-col justify-between rounded-xl shadow-[0_4px_20px_-4px_rgba(245,158,11,0.12)] hover:shadow-[0_4px_25px_-2px_rgba(245,158,11,0.22)] hover:border-amber-400 dark:hover:border-amber-500/50 p-5 bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-orange-600/15 border border-amber-500/25 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-amber-500/10 blur-xl pointer-events-none" />
                                <div className="absolute -left-6 -top-6 w-16 h-16 rounded-full bg-orange-500/5 blur-lg pointer-events-none" />
                                
                                <div className="flex items-center gap-2 flex-shrink-0 z-10">
                                    <Award className="h-4 w-4 text-amber-500 animate-pulse" />
                                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">BF Supporters</span>
                                </div>
                                <div className="space-y-2 flex-1 flex flex-col justify-center py-3.5 z-10">
                                    <div>
                                        <h4 className="font-extrabold text-xs text-neutral-800 dark:text-white leading-tight">Earn Points & Buy Cars</h4>
                                        <p className="text-[10px] text-neutral-500 dark:text-neutral-400 leading-snug mt-1">
                                            Earn reward points on every purchase. Redeem for up to <strong className="text-[#ED1C24]">$300 off</strong> your next order.
                                        </p>
                                    </div>
                                    
                                    {/* Simulated Rewards Tracker Bar */}
                                    <div className="bg-neutral-100 dark:bg-white/5 rounded-lg p-2 border border-neutral-200/40 dark:border-white/5 space-y-1">
                                        <div className="flex justify-between text-[9px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                                            <span>Current rate</span>
                                            <span>1 Point = $1</span>
                                        </div>
                                        <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                                            <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-1.5 rounded-full" style={{ width: '75%' }} />
                                        </div>
                                    </div>
                                </div>
                                <Link href={route('dashboard')} className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer flex-shrink-0 z-10 group-hover:text-amber-500">
                                    Join & Start Earning <ArrowRight className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5" />
                                </Link>
                            </div>

                            {/* Port Shipping Card (NEW CARD) */}
                            <div className="flex-1 flex flex-col justify-between rounded-xl shadow-sm p-5 bg-neutral-50 dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800">
                                <div className="flex items-center gap-2.5 pb-2.5 border-b border-neutral-100 dark:border-neutral-800 flex-shrink-0">
                                    <div className="h-8 w-8 rounded-lg bg-[#ED1C24] flex items-center justify-center text-white">
                                        <Ship className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xs text-neutral-800 dark:text-white leading-tight">Port Shipping</h3>
                                        <p className="text-[9px] text-neutral-400">Dar es Salaam Port schedules</p>
                                    </div>
                                </div>

                                <div className="space-y-1.5 text-xs flex-1 flex flex-col justify-center py-2.5">
                                    <div className="flex justify-between items-center bg-white dark:bg-neutral-800 p-2 rounded border dark:border-neutral-700">
                                        <span className="text-neutral-500 font-semibold text-[10px]">Transit Time:</span>
                                        <span className="font-bold text-neutral-800 dark:text-white text-[10px]">15 - 25 Days</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white dark:bg-neutral-800 p-2 rounded border dark:border-neutral-700">
                                        <span className="text-neutral-500 font-semibold text-[10px]">ETA Schedule:</span>
                                        <span className="font-bold text-neutral-800 dark:text-white text-[10px]">Weekly Departures</span>
                                    </div>
                                </div>

                                <Button className="w-full text-white text-[10px] h-8 cursor-pointer rounded-lg hover:opacity-95 shadow-sm flex-shrink-0" style={{ background: '#ED1C24' }} asChild>
                                    <Link href={route('cars.index')}>
                                        Shipping Matrix
                                    </Link>
                                </Button>
                            </div>

                            {/* Why Choose Us Card (NEW CARD) */}
                            <div className="flex-1 flex flex-col justify-between rounded-xl shadow-[0_4px_20px_-4px_rgba(59,130,246,0.12)] hover:shadow-[0_4px_25px_-2px_rgba(59,130,246,0.22)] hover:border-blue-400 dark:hover:border-blue-500/50 p-5 bg-gradient-to-br from-indigo-500/10 via-slate-500/5 to-blue-600/15 border border-blue-500/25 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-blue-500/10 blur-xl pointer-events-none" />
                                <div className="absolute -left-6 -top-6 w-16 h-16 rounded-full bg-indigo-500/5 blur-lg pointer-events-none" />

                                <div className="flex items-center gap-2 flex-shrink-0 z-10">
                                    <Shield className="h-4 w-4 text-blue-500" />
                                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">Why Choose Us</span>
                                </div>
                                
                                <div className="flex-1 flex flex-col justify-center py-3.5 space-y-2 z-10">
                                    <div className="flex items-start gap-2">
                                        <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0 mt-0.5">
                                            <ShieldCheck className="h-3 w-3" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-neutral-800 dark:text-white leading-tight">100% Inspected Stock</span>
                                            <span className="text-[8px] text-neutral-400 leading-normal">Thorough pre-shipment checks</span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0 mt-0.5">
                                            <Lock className="h-3 w-3" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-neutral-800 dark:text-white leading-tight">Escrow Payment Security</span>
                                            <span className="text-[8px] text-neutral-400 leading-normal">Your funds are completely safe</span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0 mt-0.5">
                                            <Send className="h-3 w-3" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-neutral-800 dark:text-white leading-tight">DHL Express Courier</span>
                                            <span className="text-[8px] text-neutral-400 leading-normal">Fast dispatch of title documents</span>
                                        </div>
                                    </div>
                                </div>

                                <Link href={route('about')} className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex-shrink-0 z-10 group-hover:text-blue-500">
                                    Learn More About Us <ArrowRight className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5" />
                                </Link>
                            </div>

                            {/* Featured Showcase Card on Sidebar */}
                            <div className="flex-1 flex flex-col justify-between w-full bg-neutral-50 dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 shadow-sm rounded-xl overflow-hidden group hover:border-[#ED1C24]/30 hover:shadow-[#ED1C24]/5 transition-all duration-500 transform hover:-translate-y-1">

                                {/* Image & Badges */}
                                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-950 flex-shrink-0">
                                    <img
                                        src={settings.hero_image}
                                        alt={settings.hero_featured_title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-85" />

                                    <div className="absolute top-3 left-3">
                                        <span className="bg-[#ED1C24] text-white text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
                                            {settings.hero_featured_badge}
                                        </span>
                                    </div>

                                    <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded border border-white/10">
                                        {settings.hero_featured_availability}
                                    </div>

                                    {/* Quick Spec Bottom Overlay */}
                                    <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-0.5 z-10">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff5e62]">
                                            {settings.hero_featured_subtitle}
                                        </span>
                                        <h3 className="text-base font-black uppercase text-white tracking-tight leading-none">
                                            {settings.hero_featured_title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Spec Details Panel */}
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div className="grid grid-cols-3 gap-1.5 text-center my-auto py-2">
                                        {[
                                            { val: settings.hero_featured_spec_1_val, lbl: settings.hero_featured_spec_1_lbl },
                                            { val: settings.hero_featured_spec_2_val, lbl: settings.hero_featured_spec_2_lbl },
                                            { val: settings.hero_featured_spec_3_val, lbl: settings.hero_featured_spec_3_lbl },
                                        ].map((spec, idx) => (
                                            <div key={idx} className="bg-neutral-100 dark:bg-white/5 border border-neutral-200/50 dark:border-white/5 rounded-lg py-1.5">
                                                <div className="text-[11px] font-extrabold text-neutral-800 dark:text-white">{spec.val}</div>
                                                <div className="text-[8px] font-semibold text-neutral-400 uppercase tracking-widest mt-0.5">{spec.lbl}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between pt-2.5 border-t border-neutral-200 dark:border-white/10 mt-auto">
                                        <div className="flex flex-col">
                                            <span className="text-[8px] uppercase font-bold tracking-widest text-neutral-400">Estimated Price</span>
                                            <span className="text-base font-black text-[#ED1C24] dark:text-[#ff5e62] tracking-tight">{settings.hero_featured_price}</span>
                                        </div>
                                        <Button
                                            size="sm"
                                            className="bg-[#1B3462] text-white font-extrabold hover:opacity-90 cursor-pointer rounded-lg text-[10px] px-3 h-8 shadow-sm"
                                            asChild
                                        >
                                            <Link href={route('cars.index')}>
                                                Inquire
                                            </Link>
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Replaced Popular Brands Section with Popular Choice Vehicles in Two Rows */}
            <div className="py-16 dark:from-neutral-900 dark:to-neutral-950 bg-gradient-to-br from-neutral-50 via-slate-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 border-t border-b border-neutral-200/50 dark:border-neutral-800">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-neutral-900 dark:text-white uppercase tracking-tight">
                            Popular Choice Vehicles
                        </h2>
                        <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto text-sm font-medium">
                            Explore our most popular and highly demanded vehicles in stock
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {popularCars.map((car) => (
                            <div key={car.id} className="group bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">
                                <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden">
                                    <Link href={route('cars.show', car.id)} className="cursor-pointer">
                                        <img
                                            src={car.image}
                                            alt={car.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </Link>
                                    {car.badge && (
                                        <div className="absolute top-3 left-3 text-white text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded shadow-sm uppercase bg-[#ED1C24]">
                                            {car.badge}
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded">
                                        Ref: {car.ref}
                                    </div>
                                </div>
                                <div className="p-4 space-y-2.5">
                                    <div>
                                        <Link href={route('cars.show', car.id)} className="block group-hover:text-[#ED1C24] transition-colors cursor-pointer">
                                            <h3 className="font-bold text-sm leading-snug line-clamp-1">{car.name}</h3>
                                        </Link>
                                        <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1">{car.details}</p>
                                    </div>
                                    <div className="border-t border-neutral-100 dark:border-neutral-800 pt-2.5 flex items-center justify-between">
                                        <span className="text-[9px] uppercase font-bold tracking-wider text-neutral-400">FOB Price</span>
                                        <span className="text-base font-black text-[#ED1C24]">{car.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link href={route('cars.index')} className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-lg text-white transition-all duration-200 bg-[#1B3462] hover:opacity-95 shadow-md">
                            View All Available Stock <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── Hot Deals & Special Offers ─────────────────────────────────── */}
            <div className="py-16 bg-white dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-800">
                <div className="w-full px-4 md:px-6 xl:px-8">

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
                            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg border-2 transition-all duration-200 hover:text-white hover:border-transparent flex-shrink-0 cursor-pointer"
                            style={{ color: '#1B3462', borderColor: '#1B3462' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1B3462'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                            View All Deals <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Deal cards */}
                    {hotDeals.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {hotDeals.map((deal) => (
                                <div
                                    key={deal.id}
                                    className="group bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                                        <Link href={route('cars.show', deal.id)} className="cursor-pointer">
                                            <img
                                                src={deal.image}
                                                alt={deal.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </Link>
                                        {/* Badges container */}
                                        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                                            {deal.discount && (
                                                <div className="flex items-center gap-1 rounded px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-white shadow-sm"
                                                    style={{ background: '#ED1C24' }}>
                                                    <Percent className="h-3 w-3" />
                                                    {deal.discount} OFF
                                                </div>
                                            )}
                                            {deal.badge && (
                                                <div className="text-white text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded shadow-sm uppercase" style={{ background: '#1B3462' }}>
                                                    {deal.badge}
                                                </div>
                                            )}
                                        </div>
                                        {/* Time left */}
                                        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded bg-[#1B3462]/95 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 shadow-sm">
                                            <Clock className="h-3 w-3 text-amber-400" />
                                            {deal.timeLeft}
                                        </div>
                                        {/* Ref Number */}
                                        <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded">
                                            Ref: {deal.ref}
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="p-4 space-y-2.5">
                                        <div>
                                            <Link href={route('cars.show', deal.id)} className="block group-hover:text-[#ED1C24] transition-colors cursor-pointer">
                                                <h3 className="font-bold text-sm leading-snug line-clamp-1">{deal.name}</h3>
                                            </Link>
                                            <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1">{deal.details}</p>
                                        </div>
                                        <div className="border-t border-neutral-100 dark:border-neutral-800 pt-2.5 flex items-center justify-between">
                                            <div>
                                                <span className="text-[9px] line-through text-neutral-400 block leading-none mb-0.5">{deal.originalPrice}</span>
                                                <span className="text-[9px] uppercase font-bold tracking-wider text-neutral-500">Sale FOB</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[9px] text-[#ED1C24] font-bold block leading-none mb-0.5">Save {deal.savings}</span>
                                                <span className="text-base font-black text-[#ED1C24]">{deal.salePrice}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
