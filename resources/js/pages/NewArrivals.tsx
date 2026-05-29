import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Clock, Calendar, ShieldCheck, HelpCircle } from 'lucide-react';
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

interface NewArrivalsProps {
    cars: {
        data: CarData[];
        links: any[];
    };
}

export default function NewArrivals({ cars }: NewArrivalsProps) {
    return (
        <PublicLayout title="New Arrivals">
            {/* Top Premium Hero Section */}
            <div className="relative bg-gradient-to-br from-slate-900 via-neutral-950 to-slate-900 text-white py-16 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(237,28,36,0.15),transparent_60%)] pointer-events-none" />
                <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-[#ED1C24]/10 border border-[#ED1C24]/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#ff5e62] uppercase tracking-widest mb-6 animate-pulse">
                            <Sparkles className="h-3.5 w-3.5" />
                            Fresh Stock from Japan
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-6">
                            NEW <span className="bg-gradient-to-r from-[#ED1C24] to-[#ff5e62] bg-clip-text text-transparent">ARRIVALS</span> TODAY
                        </h1>
                        <p className="text-base md:text-lg text-neutral-300 max-w-xl leading-relaxed">
                            Explore the latest high-quality additions to our Dar es Salaam inventory. Freshly imported, 100% inspected, and prepared for your adventure.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="py-16 bg-neutral-50 dark:bg-neutral-950 min-h-screen">
                <div className="container mx-auto px-4">
                    
                    {/* Filter bar / Section Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-neutral-200 dark:border-neutral-800 pb-6 mb-10 gap-4">
                        <div>
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <Clock className="h-5 w-5 text-[#ED1C24]" />
                                Recently Added Vehicles
                            </h2>
                            <p className="text-xs text-neutral-500 mt-1">Showing the latest available cars uploaded within the last 14 days</p>
                        </div>
                        <div className="bg-white dark:bg-neutral-900 border dark:border-neutral-800 px-4 py-2 rounded-xl text-xs font-bold shadow-sm flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-ping" />
                            <span className="text-neutral-600 dark:text-neutral-300">Live Inventory Counter:</span>
                            <span className="text-[#ED1C24] font-extrabold">{cars.data.length} New Results</span>
                        </div>
                    </div>

                    {cars.data.length === 0 ? (
                        /* Empty State */
                        <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-3xl border border-dashed border-neutral-200 dark:border-neutral-800 max-w-xl mx-auto shadow-sm">
                            <HelpCircle className="h-16 w-16 text-neutral-300 dark:text-neutral-700 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">No New Arrivals Today</h3>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-xs mx-auto mb-6">
                                We update our stock every morning. In the meantime, check out our full range of vehicles.
                            </p>
                            <Button asChild style={{ background: 'linear-gradient(135deg, #1B3462, #ED1C24)' }} className="text-white font-bold cursor-pointer">
                                <Link href={route('cars.index')}>
                                    Browse Full Stock List
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        /* Cars Grid */
                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                                {cars.data.map((car) => (
                                    <Link 
                                        href={route('cars.show', car.id)} 
                                        key={car.id} 
                                        className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between"
                                    >
                                        <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden">
                                            <img
                                                src={car.image}
                                                alt={car.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute top-3 left-3 text-white text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded shadow-md uppercase" style={{ background: 'linear-gradient(135deg, #1B3462, #ED1C24)' }}>
                                                {car.badge || 'New Arrival'}
                                            </div>
                                            <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded">
                                                Ref: {car.ref}
                                            </div>
                                        </div>
                                        <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                                            <div>
                                                <h3 className="font-extrabold text-base leading-snug line-clamp-1 group-hover:text-[#ED1C24] transition-colors">{car.name}</h3>
                                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">{car.details}</p>
                                            </div>
                                            <div className="border-t border-neutral-100 dark:border-neutral-800 pt-4 flex items-center justify-between">
                                                <div>
                                                    <span className="text-[9px] uppercase font-bold tracking-wider text-neutral-400 block">FOB Price</span>
                                                    <span className="text-lg font-black text-[#ED1C24]">{car.price}</span>
                                                </div>
                                                <Button size="sm" variant="outline" className="text-xs font-bold border-2 rounded-lg cursor-pointer transition-colors group-hover:bg-[#ED1C24] group-hover:text-white group-hover:border-[#ED1C24]">
                                                    View Car
                                                </Button>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination Placeholder or links if provided */}
                            {cars.links && cars.links.length > 3 && (
                                <div className="flex justify-center gap-1.5">
                                    {cars.links.map((link, idx) => {
                                        if (!link.url) return null;
                                        return (
                                            <Link
                                                key={idx}
                                                href={link.url}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                className={`px-3.5 py-2 rounded-lg text-xs font-bold border transition-all ${link.active ? 'bg-[#ED1C24] border-[#ED1C24] text-white' : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-[#ED1C24]'}`}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Safe Buying Promise Section */}
            <div className="py-16 bg-white dark:bg-neutral-900 border-t border-neutral-150 dark:border-neutral-800">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <ShieldCheck className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-4">The Kenase Japan Safe Buying Guarantee</h2>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
                        Every vehicle listed on our portal undergoes a strict 150-point inspection prior to loading. We verify the engine status, chassis number, transmission reliability, and digital control panels to guarantee you peace of mind.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                        <div className="bg-neutral-50 dark:bg-neutral-950 p-5 rounded-2xl border dark:border-neutral-800">
                            <span className="text-lg font-bold text-neutral-800 dark:text-white">1. Verified Mileage</span>
                            <p className="text-xs text-neutral-500 mt-2">Guaranteed original odometer readings verified against Japanese export certificates.</p>
                        </div>
                        <div className="bg-neutral-50 dark:bg-neutral-950 p-5 rounded-2xl border dark:border-neutral-800">
                            <span className="text-lg font-bold text-neutral-800 dark:text-white">2. Photographic Proof</span>
                            <p className="text-xs text-neutral-500 mt-2">High-definition interior, exterior, engine, and undercarriage photos provided for every car.</p>
                        </div>
                        <div className="bg-neutral-50 dark:bg-neutral-950 p-5 rounded-2xl border dark:border-neutral-800">
                            <span className="text-lg font-bold text-neutral-800 dark:text-white">3. Clear Ownership</span>
                            <p className="text-xs text-neutral-500 mt-2">All custom clearance documents and bills of lading processed securely in 1-2 days.</p>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
