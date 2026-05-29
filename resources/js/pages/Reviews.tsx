import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';
import { Star, Quote, Award, CheckCircle2, MessageSquare, ShieldCheck, Heart } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';

interface Review {
    id: number;
    name: string;
    location: string;
    carPurchased: string;
    rating: number;
    date: string;
    comment: string;
    avatar: string;
}

const SAMPLE_REVIEWS: Review[] = [
    {
        id: 1,
        name: "Abubakar Mtemi",
        location: "Dar es Salaam, Tanzania",
        carPurchased: "Toyota Harrier (2018 Model)",
        rating: 5,
        date: "May 12, 2026",
        comment: "Excellent experience dealing with Kenase Japan. The sales representatives walked me through the auction sheet details, cleared the container at Dar es Salaam port promptly, and the vehicle arrived in immaculate condition. Highly recommended!",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    },
    {
        id: 2,
        name: "Clara Mwangi",
        location: "Nairobi, Kenya",
        carPurchased: "Nissan X-Trail (2017 Model)",
        rating: 5,
        date: "April 28, 2026",
        comment: "I was hesitant at first about importing a car, but Kenase Japan made it completely worry-free. They provided high-definition video inspections and transparent shipping schedules. The car is fuel-efficient and performs perfectly on our roads.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    },
    {
        id: 3,
        name: "John Phiri",
        location: "Lusaka, Zambia",
        carPurchased: "Toyota Land Cruiser Prado (2016)",
        rating: 5,
        date: "March 15, 2026",
        comment: "Kenase is the definition of professionalism. From auction to shipment to final hand-over, they delivered exceptional service. The vehicle chassis was super clean, with no rust as promised. I will be ordering my next family vehicle here as well.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
    },
    {
        id: 4,
        name: "Grace Namubiru",
        location: "Kampala, Uganda",
        carPurchased: "Honda CR-V (2019 Hybrid)",
        rating: 5,
        date: "April 02, 2026",
        comment: "Amazing communication! Whenever I had a question about the transit status or bills of lading, the support team answered on WhatsApp within minutes. Exceptional service and very friendly team.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
    },
    {
        id: 5,
        name: "Hamisi Juma",
        location: "Arusha, Tanzania",
        carPurchased: "Mercedes-Benz C-Class (2017)",
        rating: 4,
        date: "May 20, 2026",
        comment: "Very good condition car. The engine runs smooth and quiet. Shipping took 5 days longer than initial estimate due to port congestion, but the staff kept me updated the entire time. Very reliable company.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
    },
    {
        id: 6,
        name: "Amina Abdallah",
        location: "Zanzibar",
        carPurchased: "Suzuki Swift (2020 Model)",
        rating: 5,
        date: "May 24, 2026",
        comment: "Imported this lovely compact car for my daily commute. The mileage is exceptionally low and the car smells brand new inside! The tax clearance and customs papers were all handled without stress. Thank you Kenase!",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop"
    }
];

export default function Reviews() {
    return (
        <PublicLayout title="Customer Reviews">
            {/* Top Impact Hero Section */}
            <div className="relative bg-gradient-to-br from-neutral-900 via-[#1B3462] to-neutral-950 text-white py-16 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(237,28,36,0.12),transparent_50%)] pointer-events-none" />
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-400 uppercase tracking-widest mb-6">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            Over 1,200+ Happy Drivers
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none mb-6">
                            WHAT OUR <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-[#ED1C24] bg-clip-text text-transparent">CUSTOMERS SAY</span>
                        </h1>
                        <p className="text-base md:text-lg text-neutral-300 max-w-xl mx-auto leading-relaxed">
                            Discover stories of real buyers who imported their dream cars through Kenase Japan. We build relationships based on trust, quality, and commitment.
                        </p>
                    </div>
                </div>
            </div>

            {/* Ratings Statistics Hub */}
            <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 py-10 shadow-sm relative z-20 -mt-6 rounded-t-3xl max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-neutral-100 dark:divide-neutral-850">
                    
                    {/* Stat 1 */}
                    <div className="flex flex-col items-center justify-center p-4">
                        <span className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white">4.9<span className="text-lg text-neutral-400">/5</span></span>
                        <div className="flex gap-0.5 mt-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                            ))}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 mt-2">Customer Score</span>
                    </div>

                    {/* Stat 2 */}
                    <div className="flex flex-col items-center justify-center p-4">
                        <span className="text-4xl md:text-5xl font-black text-[#ED1C24]">98.7%</span>
                        <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 mt-2">Highly Recommended</span>
                        <span className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">By verified customers</span>
                    </div>

                    {/* Stat 3 */}
                    <div className="flex flex-col items-center justify-center p-4">
                        <span className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white">1,240+</span>
                        <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 mt-2">Cars Exported</span>
                        <span className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">To East & Central Africa</span>
                    </div>

                    {/* Stat 4 */}
                    <div className="flex flex-col items-center justify-center p-4">
                        <span className="text-4xl md:text-5xl font-black text-emerald-600 dark:text-emerald-400">100%</span>
                        <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 mt-2">Inspected Units</span>
                        <span className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">Zero major engine faults</span>
                    </div>

                </div>
            </div>

            {/* Testimonials Grid Section */}
            <div className="py-16 bg-neutral-50 dark:bg-neutral-950">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SAMPLE_REVIEWS.map((review) => (
                            <div 
                                key={review.id}
                                className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                            >
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-0.5">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star key={i} className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
                                            ))}
                                            {review.rating < 5 && (
                                                <Star className="h-4.5 w-4.5 text-neutral-300 dark:text-neutral-700" />
                                            )}
                                        </div>
                                        <div className="inline-flex items-center gap-1 bg-green-500/10 border border-green-500/30 px-2 py-0.5 rounded-full text-[9px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">
                                            <CheckCircle2 className="h-2.5 w-2.5" />
                                            Verified Buyer
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <Quote className="absolute -top-3 -left-3 h-8 w-8 text-neutral-100 dark:text-neutral-850 z-0 pointer-events-none" />
                                        <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed relative z-10 italic">
                                            "{review.comment}"
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 border-t border-neutral-100 dark:border-neutral-800 pt-4 mt-6">
                                    <img 
                                        src={review.avatar} 
                                        alt={review.name}
                                        className="h-10 w-10 rounded-full object-cover border-2 border-neutral-200 dark:border-neutral-700"
                                    />
                                    <div>
                                        <h4 className="font-extrabold text-xs text-neutral-900 dark:text-white leading-tight">{review.name}</h4>
                                        <p className="text-[10px] text-neutral-450 mt-0.5">{review.location}</p>
                                        <p className="text-[9px] font-extrabold text-[#1B3462] dark:text-slate-350 mt-1 uppercase tracking-wider">{review.carPurchased}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Share Your Experience / Trust Banner */}
            <div className="bg-white dark:bg-neutral-900 py-16 border-t border-neutral-150 dark:border-neutral-800">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <Heart className="h-10 w-10 text-[#ED1C24] mx-auto mb-4 animate-pulse" />
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Happy with your Kenase purchase?</h2>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-xl mx-auto mb-6">
                        We thrive on our community reviews. Share your delivery photo and review with us on WhatsApp or social media to receive <strong className="text-amber-500">$50 in reward points</strong>!
                    </p>
                    <div className="flex justify-center gap-3 flex-wrap">
                        <Button style={{ background: '#1B3462' }} className="text-white font-bold cursor-pointer rounded-lg text-xs" asChild>
                            <Link href={route('contact')}>
                                Write A Review
                            </Link>
                        </Button>
                        <Button variant="outline" className="font-bold border-2 rounded-lg text-xs cursor-pointer" asChild>
                            <Link href={route('cars.index')}>
                                Browse Available Inventory
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
