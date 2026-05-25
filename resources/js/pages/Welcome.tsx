import { useState } from 'react';
import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Car, CheckCircle, Globe, Package, Shield, Ship, Truck, Tag, Zap, Clock, Percent, Search, Sparkles, DollarSign } from 'lucide-react';

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
    const [activeSearchTab, setActiveSearchTab] = useState<'quick' | 'budget' | 'deals'>('quick');
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
            {/* ── Compact Space-Saving Top Section (BE FORWARD Layout Philosophy) ──────────────── */}
            <div className="relative bg-gradient-to-br from-neutral-50 via-slate-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 overflow-hidden py-10 md:py-16 border-b border-neutral-200/50 dark:border-neutral-800">
                
                {/* Subtle premium dots background pattern */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, rgb(0,0,0) 1px, transparent 0)',
                        backgroundSize: '24px 24px'
                    }} />
                </div>

                <div className="relative w-full px-4 md:px-6 xl:px-8 z-10">

                    {/* Compact Title & Subtitle */}
                    <div className="max-w-3xl space-y-2">
                        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none text-neutral-900 dark:text-white">
                            Drive <span className="bg-gradient-to-r from-[#ED1C24] to-[#ff5e62] bg-clip-text text-transparent">your story</span> forward
                        </h1>
                        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-2xl">
                            {settings.hero_subtitle}
                        </p>
                    </div>

                </div>
            </div>

            {/* Search Widget Section */}
            <div className="w-full px-4 md:px-6 xl:px-8 -mt-8 relative z-10">
                <div className="bg-white/95 dark:bg-neutral-800/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 border border-neutral-200 dark:border-neutral-700">
                    
                    {/* Tab Navigation Headers */}
                    <div className="flex flex-wrap border-b border-neutral-100 dark:border-neutral-700 mb-6 gap-2">
                        <button
                            type="button"
                            onClick={() => setActiveSearchTab('quick')}
                            className={`flex items-center gap-2 pb-3.5 px-4 font-bold text-sm border-b-2 transition-all duration-200 cursor-pointer ${activeSearchTab === 'quick' ? 'border-[#ED1C24] text-[#ED1C24] dark:text-[#ff5e62]' : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
                        >
                            <Search className="h-4 w-4" />
                            Quick Finder
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveSearchTab('budget')}
                            className={`flex items-center gap-2 pb-3.5 px-4 font-bold text-sm border-b-2 transition-all duration-200 cursor-pointer ${activeSearchTab === 'budget' ? 'border-[#ED1C24] text-[#ED1C24] dark:text-[#ff5e62]' : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
                        >
                            <DollarSign className="h-4 w-4" />
                            Search by Budget
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveSearchTab('deals')}
                            className={`flex items-center gap-2 pb-3.5 px-4 font-bold text-sm border-b-2 transition-all duration-200 cursor-pointer ${activeSearchTab === 'deals' ? 'border-[#ED1C24] text-[#ED1C24] dark:text-[#ff5e62]' : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
                        >
                            <Sparkles className="h-4 w-4" />
                            Hot Deals & Specials
                        </button>
                    </div>

                    {/* Tab Content Panel */}
                    <div className="min-h-[60px] transition-all duration-300">
                        {/* Tab 1: Quick Finder Form */}
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
                                <Button type="submit" className="w-full h-11 text-white font-bold shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer rounded-lg" style={{ background: 'linear-gradient(135deg, #1B3462, #ED1C24)' }}>
                                    <Search className="h-4 w-4" />
                                    Search Now
                                </Button>
                            </form>
                        )}

                        {/* Tab 2: Search by Budget Cards */}
                        {activeSearchTab === 'budget' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
                                {[
                                    { title: 'Under $5,000', subtitle: 'Perfect starters & city runners', priceMax: '5000', color: 'from-blue-50/50 to-indigo-50/50 dark:from-neutral-900/40 dark:to-neutral-800/40' },
                                    { title: '$5,000 – $10,000', subtitle: 'Reliable family SUVs & sedans', priceMax: '10000', color: 'from-emerald-50/50 to-teal-50/50 dark:from-neutral-900/40 dark:to-neutral-800/40' },
                                    { title: '$10,000 – $20,000', subtitle: 'Premium cruisers & rugged 4WDs', priceMax: '20000', color: 'from-amber-50/50 to-orange-50/50 dark:from-neutral-900/40 dark:to-neutral-800/40' },
                                    { title: 'Over $20,000', subtitle: 'Flagship legends & luxury drives', priceMin: '20000', color: 'from-rose-50/50 to-red-50/50 dark:from-neutral-900/40 dark:to-neutral-800/40' }
                                ].map((tier, idx) => (
                                    <Link
                                        key={idx}
                                        href={route('cars.index', tier.priceMax ? { price_max: tier.priceMax } : { price_min: tier.priceMin })}
                                        className={`group flex items-center justify-between rounded-xl p-5 bg-gradient-to-br ${tier.color} border border-neutral-100 dark:border-neutral-700 hover:border-[#ED1C24]/30 hover:shadow-md transition-all duration-300 cursor-pointer`}
                                    >
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-base text-neutral-900 dark:text-white group-hover:text-[#ED1C24] transition-colors">{tier.title}</h4>
                                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">{tier.subtitle}</p>
                                        </div>
                                        <div className="h-9 w-9 rounded-full bg-white dark:bg-neutral-800 shadow-sm flex items-center justify-center text-neutral-500 dark:text-neutral-300 group-hover:bg-[#ED1C24] group-hover:text-white transition-all duration-200">
                                            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Tab 3: Hot Deals Quick Actions */}
                        {activeSearchTab === 'deals' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
                                {[
                                    { title: 'Dealer Price Drop', description: 'Recent price cuts by certified dealers', badge: 'Price Cut', icon: <Tag className="h-5 w-5 text-red-500" />, param: { clearance: '1' } },
                                    { title: 'Selling Fast', description: 'Vehicles under high buyer demand', badge: 'Popular', icon: <Zap className="h-5 w-5 text-amber-500" />, param: { fast_selling: '1' } },
                                    { title: 'Electric & Hybrid', description: 'Eco-friendly and fuel-efficient cars', badge: 'Green', icon: <Globe className="h-5 w-5 text-emerald-500" />, param: { hybrid: '1' } },
                                    { title: 'New Today', description: 'Fresh stock added in the last 24 hours', badge: 'Fresh', icon: <Clock className="h-5 w-5 text-blue-500" />, param: { sortkey: 'n' } }
                                ].map((deal, idx) => (
                                    <Link
                                        key={idx}
                                        href={route('cars.index', deal.param)}
                                        className="group flex flex-col justify-between rounded-xl p-5 bg-neutral-50/50 dark:bg-neutral-900/30 border border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700 hover:shadow-md transition-all duration-300 cursor-pointer"
                                    >
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="h-9 w-9 rounded-lg bg-white dark:bg-neutral-800 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                                                    {deal.icon}
                                                </div>
                                                <span className="text-[9px] font-extrabold uppercase tracking-wider bg-white dark:bg-neutral-800 px-2.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 group-hover:border-[#ED1C24]/30 group-hover:text-[#ED1C24] transition-colors">{deal.badge}</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-base text-neutral-900 dark:text-white group-hover:text-[#ED1C24] transition-colors">{deal.title}</h4>
                                                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">{deal.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-400 group-hover:text-[#ED1C24] mt-5 transition-colors">
                                            Explore Offers
                                            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>



            {/* Featured Vehicles Section with 3-Column Grid Layout */}
            <div className="py-12 bg-white dark:bg-neutral-950">
                <div className="w-full px-4 md:px-6 xl:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Vehicles</h2>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
                            Hand-picked premium cars inspected and ready for export.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        
                        {/* ── Left Sidebar (col-span-2): Filtering lists ── */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Shop By Make */}
                            <div className="rounded-xl shadow-sm p-5 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-neutral-900/30 dark:to-neutral-800/30 border border-neutral-100 dark:border-neutral-800 overflow-hidden">
                                <div className="bg-[#1B3462] text-white px-4 py-2.5 rounded-t-xl -mx-5 -mt-5 mb-4 flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                                    <Car className="h-4 w-4" />
                                    Shop By Make
                                </div>
                                <ul className="space-y-1.5">
                                    {['Toyota', 'Nissan', 'Honda', 'Mazda', 'BMW'].map((make) => (
                                        <li key={make}>
                                            <Link href={route('cars.index', { make })} className="flex items-center justify-between px-3 py-1.5 rounded-lg text-sm text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800 hover:text-[#ED1C24] dark:hover:text-[#ff5e62] transition-all group cursor-pointer">
                                                <span className="font-medium">{make}</span>
                                                <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <Link href={route('cars.index')} className="mt-4 p-0 h-auto text-xs font-bold text-[#1B3462] dark:text-slate-300 flex items-center hover:underline cursor-pointer">
                                    View All Makes <ArrowRight className="ml-1 h-3 w-3" />
                                </Link>
                            </div>

                            {/* Shop By Body Type */}
                            <div className="rounded-xl shadow-sm p-5 bg-gradient-to-br from-rose-50/50 to-red-50/50 dark:from-neutral-900/30 dark:to-neutral-800/30 border border-neutral-100 dark:border-neutral-800 overflow-hidden">
                                <div className="bg-[#ED1C24] text-white px-4 py-2.5 rounded-t-xl -mx-5 -mt-5 mb-4 flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                                    <Package className="h-4 w-4" />
                                    Shop By Body Type
                                </div>
                                <ul className="space-y-1.5">
                                    {['SUV', 'Sedan', 'Hatchback', 'Truck', 'Van'].map((bodyType) => (
                                        <li key={bodyType}>
                                            <Link href={route('cars.index', { body_type: bodyType })} className="flex items-center justify-between px-3 py-1.5 rounded-lg text-sm text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800 hover:text-[#ED1C24] dark:hover:text-[#ff5e62] transition-all group cursor-pointer">
                                                <span className="font-medium">{bodyType}</span>
                                                <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <Link href={route('cars.index')} className="mt-4 p-0 h-auto text-xs font-bold text-[#ED1C24] dark:text-slate-300 flex items-center hover:underline cursor-pointer">
                                    View All Types <ArrowRight className="ml-1 h-3 w-3" />
                                </Link>
                            </div>
                        </div>

                        {/* ── Middle Core Content (col-span-7): Featured dynamic car cards ── */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                                {featuredCars.slice(0, 8).map((car) => (
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

                            <div className="text-center pt-4">
                                <Button variant="outline" className="text-sm px-6 h-10 border-2 font-bold cursor-pointer rounded-lg" asChild>
                                    <Link href={route('cars.index')}>
                                        View Full Stock
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* ── Right Sidebar (col-span-3): Inquiries & Support Panel ── */}
                        <div className="lg:col-span-3 space-y-6">
                            
                            {/* Easy Inquiry / Support Card */}
                            <div className="rounded-xl shadow-sm p-5 bg-neutral-50 dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 space-y-4">
                                <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                                    <div className="h-9 w-9 rounded-lg bg-[#1B3462] flex items-center justify-center text-white">
                                        <Globe className="h-4.5 w-4.5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm text-neutral-800 dark:text-white leading-tight">Easy Inquiry</h3>
                                        <p className="text-[10px] text-neutral-400">Response within 2 hours</p>
                                    </div>
                                </div>
                                
                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between items-center bg-white dark:bg-neutral-800 p-2.5 rounded border dark:border-neutral-700">
                                        <span className="text-neutral-500 font-semibold">Toll-Free:</span>
                                        <span className="font-bold text-neutral-800 dark:text-white">+255 22 211 00</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white dark:bg-neutral-800 p-2.5 rounded border dark:border-neutral-700">
                                        <span className="text-neutral-500 font-semibold">WhatsApp:</span>
                                        <span className="font-bold text-emerald-600 dark:text-emerald-400">+255 754 000 000</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white dark:bg-neutral-800 p-2.5 rounded border dark:border-neutral-700">
                                        <span className="text-neutral-500 font-semibold">Open:</span>
                                        <span className="font-bold text-neutral-700 dark:text-slate-300">08:00 – 17:00</span>
                                    </div>
                                </div>

                                <Button className="w-full text-white text-xs h-9 cursor-pointer rounded-lg hover:opacity-95 shadow-sm" style={{ background: '#1B3462' }} asChild>
                                    <Link href={route('about')}>
                                        Contact Support
                                    </Link>
                                </Button>
                            </div>

                            {/* BE FORWARD Supporters Rewards Points Card */}
                            <div className="rounded-xl shadow-sm p-5 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 space-y-3.5">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="h-4.5 w-4.5 text-amber-500 animate-pulse" />
                                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">BF Supporters</span>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-extrabold text-sm text-neutral-800 dark:text-white leading-tight">Earn Points on Purchases</h4>
                                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal">
                                        Earn reward points on every vehicle or tuning part purchase. Redeem points for up to <strong className="text-[#ED1C24]">$300 off</strong> your next order.
                                    </p>
                                </div>
                                <Link href={route('dashboard')} className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer mt-1.5">
                                    Learn More &amp; Register <ArrowRight className="h-3 w-3" />
                                </Link>
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
