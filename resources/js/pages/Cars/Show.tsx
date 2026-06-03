import PublicLayout from '@/layouts/public-layout';
import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Calendar,
    Gauge,
    Fuel,
    Settings,
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
    ChevronLeft,
    CircleDollarSign,
    ShieldCheck,
    Truck,
    CheckCircle,
    X as XIcon,
    Copy,
    Check,
    Anchor,
    FileText,
    Award,
    Sparkles,
    ShieldAlert,
    ExternalLink
} from 'lucide-react';
import { useState, useEffect } from 'react';

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

// Interactive shipping ports database
const PORTS = [
    { name: 'Mombasa (Kenya)', country: 'Kenya', freight: 1350, transit: '25-30 days', inspection: 'QISJ Mandatory', inspectionFee: 250 },
    { name: 'Dar es Salaam (Tanzania)', country: 'Tanzania', freight: 1400, transit: '28-33 days', inspection: 'JEVIC Mandatory', inspectionFee: 250 },
    { name: 'Durban (South Africa)', country: 'South Africa', freight: 1200, transit: '20-25 days', inspection: 'Not Required', inspectionFee: 0 },
    { name: 'Kingston (Jamaica)', country: 'Jamaica', freight: 1900, transit: '35-40 days', inspection: 'JEVIC Mandatory', inspectionFee: 250 },
    { name: 'Iquique (Chile)', country: 'Chile', freight: 1650, transit: '30-35 days', inspection: 'Not Required', inspectionFee: 0 },
    { name: 'Auckland (New Zealand)', country: 'New Zealand', freight: 1100, transit: '18-22 days', inspection: 'Biosecurity Mandatory', inspectionFee: 150 },
    { name: 'Dublin (Ireland)', country: 'Ireland', freight: 1850, transit: '38-44 days', inspection: 'Not Required', inspectionFee: 0 },
];

export default function Show({ car }: { car: Car }) {
    // Media / Gallery States
    const primaryImageObj = car.images.find(img => img.is_primary) || car.images[0];
    const initialMainImage = primaryImageObj ? primaryImageObj.image_path : '';
    
    const [mainImage, setMainImage] = useState(initialMainImage);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    // Dynamic Navigation Tab State
    const [activeTab, setActiveTab] = useState<'overview' | 'specifications' | 'export_process' | 'trust_guarantee'>('overview');

    // Calculator States
    const [selectedPortIndex, setSelectedPortIndex] = useState(0);
    const [includeInsurance, setIncludeInsurance] = useState(true);
    const [includeInspection, setIncludeInspection] = useState(true);

    const { auth } = usePage<any>().props;

    // Inquiry Dialog Form States
    const [inquiryOpen, setInquiryOpen] = useState(false);
    const { data, setData, post, errors, reset } = useForm({
        name: auth?.user?.name || '',
        email: auth?.user?.email || '',
        phone: auth?.user?.phone || '',
        inquiry_type: 'Sales & Inventory',
        car_of_interest: '',
        message: ''
    });
    const [country, setCountry] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Autofill when auth updates
    useEffect(() => {
        if (auth?.user) {
            setData(prev => ({
                ...prev,
                name: prev.name || auth.user.name || '',
                email: prev.email || auth.user.email || '',
                phone: prev.phone || auth.user.phone || ''
            }));
        }
    }, [auth?.user]);

    // Toast Alerts State
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

    // Favorite Storage States
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(`favorite_car_${car.id}`);
            setIsFavorite(saved === 'true');
        } catch (e) {
            console.error('Local storage not supported', e);
        }
    }, [car.id]);

    // Handle toast alert timer
    const triggerToast = (message: string, type: 'success' | 'info' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Toggle favorite state
    const toggleFavorite = () => {
        try {
            const nextState = !isFavorite;
            localStorage.setItem(`favorite_car_${car.id}`, nextState ? 'true' : 'false');
            setIsFavorite(nextState);
            if (nextState) {
                triggerToast('Vehicle added to your favorites!', 'success');
            } else {
                triggerToast('Vehicle removed from favorites.', 'info');
            }
        } catch (e) {
            triggerToast('Could not save to favorites', 'info');
        }
    };

    // Copy link to clipboard
    const copyShareLink = () => {
        try {
            navigator.clipboard.writeText(window.location.href);
            triggerToast('Listing link copied to clipboard!', 'success');
        } catch (e) {
            triggerToast('Failed to copy link', 'info');
        }
    };

    const getImageUrl = (imagePath: string) => {
        if (!imagePath) return '/images/default-car.png';
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('/')) {
            return imagePath;
        }
        return `/storage/${imagePath}`;
    };

    // CIF Pricing Calculation
    const fobPrice = car.price;
    const selectedPort = PORTS[selectedPortIndex];
    const freightCost = selectedPort.freight;
    const inspectionCost = includeInspection ? selectedPort.inspectionFee : 0;
    const insuranceCost = includeInsurance ? 120 : 0;
    const cifTotal = Math.ceil(fobPrice + freightCost + inspectionCost + insuranceCost);

    // Handle inquiry submittal
    const handleInquirySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const finalMessage = country 
            ? `${data.message}\n\n[Country of Import: ${country}]` 
            : data.message;

        router.post(route('contact.store'), {
            ...data,
            car_id: car.id,
            message: finalMessage
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsSubmitting(false);
                setSubmitSuccess(true);
                reset();
                setCountry('');
            },
            onError: () => {
                setIsSubmitting(false);
            }
        });
    };

    // Prepare dynamic quote message
    const openQuoteRequest = () => {
        const quoteMessage = `Hello! I would like to request a formal quote for the ${car.year} ${car.make} ${car.model} (Ref: ${car.ref_number}).\n\nEstimated CIF Details:\n- Destination Port: ${selectedPort.name}\n- Freight Rate: $${freightCost.toLocaleString()}\n- Marine Insurance: ${includeInsurance ? 'Included ($120)' : 'Excluded'}\n- Export Inspection: ${includeInspection && selectedPort.inspectionFee > 0 ? `Included ($${selectedPort.inspectionFee})` : 'Excluded'}\n- Calculated CIF Total: $${cifTotal.toLocaleString()}\n\nPlease verify shipping availability and send a proforma invoice.`;
        
        setData(prev => ({
            ...prev,
            car_of_interest: `${car.year} ${car.make} ${car.model} (Ref: ${car.ref_number})`,
            message: quoteMessage
        }));
        setSubmitSuccess(false);
        setInquiryOpen(true);
    };

    // Lightbox navigation functions
    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const handlePrevImage = () => {
        setLightboxIndex(prev => (prev === 0 ? car.images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setLightboxIndex(prev => (prev === car.images.length - 1 ? 0 : prev + 1));
    };

    // Watch keypresses in lightbox
    useEffect(() => {
        if (!lightboxOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') handlePrevImage();
            if (e.key === 'ArrowRight') handleNextImage();
            if (e.key === 'Escape') setLightboxOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, lightboxIndex]);

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
            <div className="bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 min-h-screen pb-24 relative transition-colors duration-300">
                
                {/* Visual Toast Alerts */}
                {toast && (
                    <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-5 duration-300">
                        <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl backdrop-blur-md border ${
                            toast.type === 'success' 
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' 
                                : 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400'
                        }`}>
                            {toast.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <Info className="h-5 w-5" />}
                            <span className="text-sm font-semibold tracking-wide">{toast.message}</span>
                        </div>
                    </div>
                )}

                {/* Lightbox / Immersive Fullscreen Image Viewer */}
                {lightboxOpen && car.images.length > 0 && (
                    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 animate-in fade-in duration-300">
                        {/* Lightbox Header */}
                        <div className="flex justify-between items-center text-white py-4 px-6">
                            <div className="flex flex-col">
                                <span className="text-xs uppercase font-semibold text-neutral-500 tracking-widest">Gallery Preview</span>
                                <h4 className="text-sm font-bold text-neutral-200">
                                    {lightboxIndex + 1} of {car.images.length} • {car.year} {car.make} {car.model}
                                </h4>
                            </div>
                            <button
                                onClick={() => setLightboxOpen(false)}
                                className="p-3 rounded-full bg-neutral-900/60 hover:bg-neutral-800 hover:scale-105 transition-all text-white border border-neutral-800 cursor-pointer"
                            >
                                <XIcon className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Slide View */}
                        <div className="relative flex-1 flex items-center justify-center max-h-[75vh]">
                            <button
                                onClick={handlePrevImage}
                                className="absolute left-4 p-4 rounded-full bg-neutral-900/60 hover:bg-neutral-800 hover:scale-110 active:scale-95 transition-all text-white border border-neutral-800 cursor-pointer z-10"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>

                            <img
                                src={getImageUrl(car.images[lightboxIndex]?.image_path)}
                                alt={`${car.make} ${car.model} - view ${lightboxIndex + 1}`}
                                className="max-w-full max-h-full object-contain rounded-2xl select-none transition-all duration-300 shadow-2xl border border-neutral-900"
                            />

                            <button
                                onClick={handleNextImage}
                                className="absolute right-4 p-4 rounded-full bg-neutral-900/60 hover:bg-neutral-800 hover:scale-110 active:scale-95 transition-all text-white border border-neutral-800 cursor-pointer z-10"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Lightbox Thumbnails Strip */}
                        <div className="py-6 overflow-x-auto">
                            <div className="flex justify-center gap-3 px-4 min-w-max mx-auto">
                                {car.images.map((img, idx) => (
                                    <button
                                        key={img.id}
                                        onClick={() => setLightboxIndex(idx)}
                                        className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                                            lightboxIndex === idx
                                                ? 'border-primary ring-4 ring-primary/30 scale-105 opacity-100'
                                                : 'border-transparent opacity-40 hover:opacity-100 hover:scale-105'
                                        }`}
                                    >
                                        <img
                                            src={getImageUrl(img.image_path)}
                                            alt={`Thumbnail ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Elegant Breadcrumb Header */}
                <div className="border-b border-neutral-200/60 dark:border-neutral-800/60 bg-white/40 dark:bg-neutral-900/20 backdrop-blur-md">
                    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-5">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-xs md:text-sm text-neutral-500 font-medium">
                                <Link href={route('cars.index')} className="hover:text-primary transition-colors">
                                    Inventory
                                </Link>
                                <ChevronRight className="h-3 w-3 text-neutral-400" />
                                <span className="text-neutral-400 dark:text-neutral-600">{car.make}</span>
                                <ChevronRight className="h-3 w-3 text-neutral-400" />
                                <span className="text-neutral-900 dark:text-white font-semibold truncate">
                                    {car.year} {car.make} {car.model}
                                </span>
                            </div>
                            <Link
                                href={route('cars.index')}
                                className="inline-flex items-center text-xs md:text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary-foreground/90 transition-all gap-1.5 self-start md:self-auto cursor-pointer"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Inventory
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Premium Hero Title Block */}
                <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-8 pb-4">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge className="bg-primary/10 border-primary/30 text-primary dark:bg-primary/20 dark:text-primary-foreground/90 py-1 px-3 text-xs font-semibold rounded-full border">
                                    Certified Stock
                                </Badge>
                                <Badge variant="outline" className="py-1 px-3 text-xs font-semibold rounded-full border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400">
                                    Ref ID: {car.ref_number}
                                </Badge>
                                <Badge className="bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 py-1 px-3 text-xs font-semibold rounded-full border">
                                    {car.condition}
                                </Badge>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
                                {car.year} {car.make} {car.model}
                            </h1>
                            <div className="flex items-center gap-4 text-xs md:text-sm text-neutral-500 dark:text-neutral-400">
                                <span className="flex items-center gap-1 font-medium">
                                    <MapPin className="h-4 w-4 text-neutral-400" /> Tokyo Port, Japan (Ready for Export)
                                </span>
                                <span>•</span>
                                <span className="font-medium">Chassis: {car.vin || 'ASK FOR CHASSIS'}</span>
                            </div>
                        </div>

                        {/* Top Line Price Panel for Desktop */}
                        <div className="flex items-baseline lg:flex-col lg:items-end gap-3 bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200/60 dark:border-neutral-800/60 shadow-xs">
                            <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider">FOB Price</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl md:text-5xl font-black text-blue-600 dark:text-blue-400 tracking-tight">
                                    ${car.price.toLocaleString()}
                                </span>
                                <span className="text-sm font-extrabold text-neutral-400 tracking-widest uppercase">USD</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Specs strip right under title */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
                        {specs.slice(0, 4).map((spec, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-white dark:bg-neutral-900 px-5 py-4 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xs">
                                <div className="p-2.5 rounded-xl bg-primary/5 dark:bg-primary/10 text-primary">
                                    <spec.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider leading-none mb-1">
                                        {spec.label}
                                    </span>
                                    <span className="font-bold text-sm md:text-base text-neutral-950 dark:text-white">
                                        {spec.value}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Body Grid */}
                <div className="container mx-auto px-4 md:px-6 lg:px-8 mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* LEFT COLUMN: Media & Dynamic Tabs */}
                        <div className="lg:col-span-2 space-y-8">
                            
                            {/* Media Showcase Gallery */}
                            <div className="space-y-4">
                                <div className="aspect-[16/10] bg-neutral-200 dark:bg-neutral-900 rounded-3xl overflow-hidden relative group border border-neutral-200/60 dark:border-neutral-800/60 shadow-2xl transition-all duration-300">
                                    <img
                                        src={getImageUrl(mainImage || initialMainImage)}
                                        alt={`${car.make} ${car.model}`}
                                        className="w-full h-full object-cover select-none transition-transform duration-700 hover:scale-105 cursor-pointer"
                                        onClick={() => openLightbox(car.images.findIndex(img => img.image_path === mainImage) >= 0 ? car.images.findIndex(img => img.image_path === mainImage) : 0)}
                                    />
                                    
                                    {/* Action Buttons overlay */}
                                    <div className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            onClick={() => openLightbox(car.images.findIndex(img => img.image_path === mainImage) >= 0 ? car.images.findIndex(img => img.image_path === mainImage) : 0)}
                                            className="rounded-full bg-white/90 hover:bg-white dark:bg-neutral-900/90 dark:hover:bg-neutral-800 backdrop-blur-md border border-neutral-200/40 dark:border-neutral-800/40 shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all text-neutral-800 dark:text-neutral-200"
                                        >
                                            <Maximize2 className="h-4.5 w-4.5" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            onClick={copyShareLink}
                                            className="rounded-full bg-white/90 hover:bg-white dark:bg-neutral-900/90 dark:hover:bg-neutral-800 backdrop-blur-md border border-neutral-200/40 dark:border-neutral-800/40 shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all text-neutral-800 dark:text-neutral-200"
                                        >
                                            <Share2 className="h-4.5 w-4.5" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            onClick={toggleFavorite}
                                            className={`rounded-full bg-white/90 hover:bg-white dark:bg-neutral-900/90 dark:hover:bg-neutral-800 backdrop-blur-md border border-neutral-200/40 dark:border-neutral-800/40 shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all ${
                                                isFavorite ? 'text-red-500' : 'text-neutral-800 dark:text-neutral-200'
                                            }`}
                                        >
                                            <Heart className={`h-4.5 w-4.5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                                        </Button>
                                    </div>

                                    {/* Left and Right inline arrows */}
                                    {car.images.length > 1 && (
                                        <>
                                            <button
                                                onClick={() => {
                                                    const idx = car.images.findIndex(img => img.image_path === mainImage);
                                                    const prevIdx = idx <= 0 ? car.images.length - 1 : idx - 1;
                                                    setMainImage(car.images[prevIdx].image_path);
                                                }}
                                                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs border border-white/10 opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer active:scale-95 transition-all"
                                            >
                                                <ChevronLeft className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    const idx = car.images.findIndex(img => img.image_path === mainImage);
                                                    const nextIdx = idx === car.images.length - 1 ? 0 : idx + 1;
                                                    setMainImage(car.images[nextIdx].image_path);
                                                }}
                                                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs border border-white/10 opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer active:scale-95 transition-all"
                                            >
                                                <ChevronRight className="h-5 w-5" />
                                            </button>
                                        </>
                                    )}

                                    <div className="absolute bottom-6 left-6 bg-neutral-950/70 border border-neutral-800/30 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider">
                                        Ref: {car.ref_number}
                                    </div>
                                </div>

                                {/* Horizontal Thumbnails Scroll list */}
                                {car.images.length > 1 && (
                                    <div className="flex gap-3 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-neutral-200">
                                        {car.images.map((img, idx) => (
                                            <button
                                                key={img.id}
                                                onClick={() => setMainImage(img.image_path)}
                                                className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer hover:scale-102 ${
                                                    mainImage === img.image_path
                                                        ? 'border-primary ring-4 ring-primary/20 scale-102 opacity-100'
                                                        : 'border-transparent opacity-65 hover:opacity-100'
                                                }`}
                                            >
                                                <img
                                                    src={getImageUrl(img.image_path)}
                                                    alt={`Car thumbnail ${idx + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Detailed Tabbed Dashboard Section */}
                            <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200/60 dark:border-neutral-800/60 shadow-lg overflow-hidden transition-all duration-300">
                                
                                {/* Navigation bar for tabs */}
                                <div className="flex overflow-x-auto border-b border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/50 px-4 md:px-8 py-2 gap-2">
                                    {[
                                        { id: 'overview', label: 'Overview & Details', icon: Info },
                                        { id: 'specifications', label: 'Specifications', icon: FileText },
                                        { id: 'export_process', label: 'Export Guide', icon: Truck },
                                        { id: 'trust_guarantee', label: 'Safety & Trust', icon: ShieldCheck }
                                    ].map((t) => {
                                        const IconComponent = t.icon;
                                        const active = activeTab === t.id;
                                        return (
                                            <button
                                                key={t.id}
                                                onClick={() => setActiveTab(t.id as any)}
                                                className={`flex items-center gap-2 py-4 px-4 font-bold text-xs md:text-sm border-b-2 rounded-t-xl transition-all cursor-pointer whitespace-nowrap ${
                                                    active
                                                        ? 'border-primary text-primary font-black bg-white dark:bg-neutral-900'
                                                        : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                                                }`}
                                            >
                                                <IconComponent className="h-4.5 w-4.5" />
                                                {t.label}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Tab Contents Panel */}
                                <div className="p-8">
                                    
                                    {/* TAB 1: OVERVIEW */}
                                    {activeTab === 'overview' && (
                                        <div className="space-y-6 animate-in fade-in duration-300">
                                            <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                                                <Sparkles className="h-5 w-5 text-amber-500" />
                                                Seller Description & Comments
                                            </h3>
                                            <div className="prose dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm md:text-base border-l-4 border-primary/20 pl-5">
                                                {car.description ? (
                                                    <p className="whitespace-pre-wrap">{car.description}</p>
                                                ) : (
                                                    <p className="italic text-neutral-400">No additional details have been provided by the dealer yet. Please feel free to request special specifications.</p>
                                                )}
                                            </div>

                                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <Card className="p-5 bg-neutral-50/50 dark:bg-neutral-950/20 border-neutral-200/60 dark:border-neutral-800/60 rounded-2xl">
                                                    <h4 className="font-extrabold text-sm uppercase tracking-wider text-primary mb-3">Key Highlights</h4>
                                                    <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                                                        <li className="flex items-center gap-2">
                                                            <CheckCircle className="h-4 w-4 text-emerald-500" /> Verified Low Mileage and Clean interior.
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <CheckCircle className="h-4 w-4 text-emerald-500" /> Rigorous 150-Point Pre-Export inspection.
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <CheckCircle className="h-4 w-4 text-emerald-500" /> Fully serviced engine and new fluid changes.
                                                        </li>
                                                    </ul>
                                                </Card>

                                                <Card className="p-5 bg-neutral-50/50 dark:bg-neutral-950/20 border-neutral-200/60 dark:border-neutral-800/60 rounded-2xl">
                                                    <h4 className="font-extrabold text-sm uppercase tracking-wider text-primary mb-3">Safety & Compliance</h4>
                                                    <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                                                        <li className="flex items-center gap-2">
                                                            <CheckCircle className="h-4 w-4 text-emerald-500" /> Dual front Airbag system.
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <CheckCircle className="h-4 w-4 text-emerald-500" /> ABS Brakes + Electronic Stability Control.
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <CheckCircle className="h-4 w-4 text-emerald-500" /> Air conditioner and cabin climate control.
                                                        </li>
                                                    </ul>
                                                </Card>
                                            </div>
                                        </div>
                                    )}

                                    {/* TAB 2: DETAILED SPECIFICATIONS */}
                                    {activeTab === 'specifications' && (
                                        <div className="animate-in fade-in duration-300">
                                            <h3 className="text-xl font-bold mb-6">Complete Specification Report</h3>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                                {[
                                                    { label: 'Make / Manufacturer', value: car.make },
                                                    { label: 'Model Series', value: car.model },
                                                    { label: 'Manufacture Year', value: car.year },
                                                    { label: 'Condition State', value: car.condition },
                                                    { label: 'Chassis No (VIN)', value: car.vin || 'Not Provided' },
                                                    { label: 'Odometer (Mileage)', value: `${car.mileage.toLocaleString()} km` },
                                                    { label: 'Transmission System', value: car.transmission },
                                                    { label: 'Fuel Supply Type', value: car.fuel_type },
                                                    { label: 'Drive Drivetrain', value: car.drive_type },
                                                    { label: 'Exterior Color', value: car.color },
                                                    { label: 'Body Category', value: car.body_type },
                                                    { label: 'Inventory Reference', value: car.ref_number },
                                                    { label: 'Stock Status', value: car.status },
                                                    { label: 'Import Duty Status', value: 'Ex-Tax / CIF Export Basis' }
                                                ].map((spec, idx) => (
                                                    <div key={idx} className="flex justify-between items-center py-3.5 border-b border-neutral-100 dark:border-neutral-800 text-sm font-medium">
                                                        <span className="text-neutral-500">{spec.label}</span>
                                                        <span className="font-bold text-neutral-900 dark:text-white text-right">{spec.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* TAB 3: EXPORT PROCESS TIMELINE */}
                                    {activeTab === 'export_process' && (
                                        <div className="space-y-6 animate-in fade-in duration-300">
                                            <h3 className="text-xl font-bold mb-2">International Buy & Export Procedure</h3>
                                            <p className="text-sm text-neutral-500 mb-8">
                                                Our streamlined vehicle export operations ensure your car reaches your port safely and smoothly.
                                            </p>

                                            <div className="relative pl-6 border-l border-neutral-200 dark:border-neutral-800 space-y-8">
                                                {[
                                                    {
                                                        step: '01',
                                                        title: 'Select Destination & Get Quote',
                                                        desc: 'Choose your closest shipping port in the calculator. Add insurance and inspection packages. Click Request Quote to get a custom Proforma Invoice (PI).'
                                                    },
                                                    {
                                                        step: '02',
                                                        title: 'Secure Telegraphic Transfer (T/T) Payment',
                                                        desc: 'Send payment via bank wire to our verified account in Tokyo, Japan. Upload or email your bank transfer slip within 3 business days to secure your vehicle reservation.'
                                                    },
                                                    {
                                                        step: '03',
                                                        title: 'Pre-Shipment Inspections',
                                                        desc: 'We manage full JEVIC, QISJ, or EAA checks depending on your national regulatory prerequisites to guarantee your car is fully compliant.'
                                                    },
                                                    {
                                                        step: '04',
                                                        title: 'Ocean Cargo Booking & Departure',
                                                        desc: 'We arrange the fastest Roll-on/Roll-off (RORO) or Containerized marine vessel. You will receive ship name and ETA confirmation details.'
                                                    },
                                                    {
                                                        step: '05',
                                                        title: 'Courier Shipping Documents',
                                                        desc: 'Once the ship departs, all physical documents (Original Bill of Lading B/L, Export Certificate, Commercial Invoice) are sent via DHL/FedEx.'
                                                    },
                                                    {
                                                        step: '06',
                                                        title: 'Port Arrival & Customs Clearance',
                                                        desc: 'Use a local customs agent with our mailed paperwork to pay local duties, clear customs at the port, and drive your car home!'
                                                    }
                                                ].map((item, idx) => (
                                                    <div key={idx} className="relative group">
                                                        {/* Step Bullet */}
                                                        <div className="absolute -left-[2.05rem] top-0.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all rounded-full h-7 w-7 flex items-center justify-center text-xs font-black">
                                                            {item.step}
                                                        </div>
                                                        <div className="space-y-1">
                                                            <h4 className="font-extrabold text-neutral-900 dark:text-white text-base group-hover:text-primary transition-colors">
                                                                {item.title}
                                                            </h4>
                                                            <p className="text-xs md:text-sm text-neutral-500 leading-relaxed font-medium">
                                                                {item.desc}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* TAB 4: SAFETY, PAYMENT & TRUST PROTOCOLS */}
                                    {activeTab === 'trust_guarantee' && (
                                        <div className="space-y-6 animate-in fade-in duration-300">
                                            <h3 className="text-xl font-bold mb-2">Security, Warranties & Protection</h3>
                                            <p className="text-sm text-neutral-500 mb-6">
                                                We prioritize transactional integrity. Shop confidently with industry-leading buyer protection standards.
                                            </p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {[
                                                    {
                                                        icon: ShieldCheck,
                                                        title: 'Verified Global Exporter',
                                                        desc: 'Every seller profile is backed by thorough registration audits and a corporate history of international car sales.',
                                                        color: 'text-emerald-500 bg-emerald-500/10'
                                                    },
                                                    {
                                                        icon: Anchor,
                                                        title: 'Marine Cargo Insurance Policy',
                                                        desc: 'Our optional full-loss marine insurance covers absolute cargo protection against fire, damage, or container losses during transit.',
                                                        color: 'text-blue-500 bg-blue-500/10'
                                                    },
                                                    {
                                                        icon: CircleDollarSign,
                                                        title: '100% Refundable Guarantee',
                                                        desc: 'If the physical car details significantly differ from the pre-shipment report findings, we promise replacement or a complete transaction refund.',
                                                        color: 'text-amber-500 bg-amber-500/10'
                                                    },
                                                    {
                                                        icon: Award,
                                                        title: 'Compliance Approved Documents',
                                                        desc: 'All custom invoice records are properly formatted for international clearance, guaranteeing zero administrative border hold-ups.',
                                                        color: 'text-purple-500 bg-purple-500/10'
                                                    }
                                                ].map((t, idx) => {
                                                    const IconComp = t.icon;
                                                    return (
                                                        <Card key={idx} className="p-5 border-neutral-200/60 dark:border-neutral-800/60 rounded-2xl flex gap-4">
                                                            <div className={`p-3 rounded-xl ${t.color} self-start flex-shrink-0`}>
                                                                <IconComp className="h-6 w-6" />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <h4 className="font-extrabold text-sm md:text-base text-neutral-900 dark:text-white">{t.title}</h4>
                                                                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">{t.desc}</p>
                                                            </div>
                                                        </Card>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDEBAR COLUMN: CIF Calculator & Action Widget */}
                        <div className="space-y-6">
                            
                            {/* Interactive CIF Calculator Widget Card */}
                            <Card className="p-6 md:p-8 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden relative">
                                <div className="absolute top-0 right-0 left-0 h-2.5 bg-linear-to-r from-blue-600 to-primary" />
                                
                                <h3 className="font-black text-xl mb-2 flex items-center gap-2">
                                    <Truck className="h-6 w-6 text-blue-600" />
                                    CIF Shipping Calculator
                                </h3>
                                <p className="text-xs text-neutral-400 font-medium mb-6">
                                    Estimate full shipping, insurance & inspection costs dynamically.
                                </p>

                                <div className="space-y-5">
                                    {/* Destination Port Selection */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                                            Destination Port
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={selectedPortIndex}
                                                onChange={(e) => setSelectedPortIndex(Number(e.target.value))}
                                                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm font-bold text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer appearance-none"
                                            >
                                                {PORTS.map((port, idx) => (
                                                    <option key={idx} value={idx}>
                                                        {port.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-400">
                                                <ChevronRight className="h-4 w-4 rotate-90" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Transit Time Indicator Banner */}
                                    <div className="flex items-center gap-2.5 bg-blue-50/50 dark:bg-blue-900/10 p-3.5 rounded-xl border border-blue-100 dark:border-blue-900/30">
                                        <Calendar className="h-4.5 w-4.5 text-blue-600" />
                                        <div className="text-xs">
                                            <span className="text-neutral-500 font-medium">Est. Shipping Time: </span>
                                            <span className="font-extrabold text-blue-600 dark:text-blue-400">{selectedPort.transit}</span>
                                        </div>
                                    </div>

                                    {/* Additional Service Checkbox List */}
                                    <div className="space-y-3 pt-2">
                                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                                            Additional Services
                                        </span>
                                        
                                        {/* Marine Insurance */}
                                        <label className="flex items-center justify-between p-3.5 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 transition-colors cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={includeInsurance}
                                                    onChange={(e) => setIncludeInsurance(e.target.checked)}
                                                    className="h-4.5 w-4.5 rounded-xs border-neutral-300 text-primary focus:ring-primary cursor-pointer accent-blue-600"
                                                />
                                                <div className="text-left">
                                                    <span className="text-xs font-bold text-neutral-900 dark:text-white block leading-none mb-0.5">Marine Cargo Insurance</span>
                                                    <span className="text-[10px] text-neutral-400 font-medium">Full loss coverage standard protection</span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-extrabold text-neutral-600 dark:text-neutral-400">$120</span>
                                        </label>

                                        {/* Mandatory / Optional Export Inspection */}
                                        <label className="flex items-center justify-between p-3.5 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 transition-colors cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={includeInspection}
                                                    disabled={selectedPort.inspectionFee > 0 && (selectedPort.name.includes('Mandatory') || selectedPort.inspection.includes('Mandatory'))}
                                                    onChange={(e) => setIncludeInspection(e.target.checked)}
                                                    className="h-4.5 w-4.5 rounded-xs border-neutral-300 text-primary focus:ring-primary cursor-pointer accent-blue-600 disabled:opacity-50"
                                                />
                                                <div className="text-left">
                                                    <span className="text-xs font-bold text-neutral-900 dark:text-white block leading-none mb-0.5">Export Inspection Certificate</span>
                                                    <span className="text-[10px] text-neutral-400 font-medium">{selectedPort.inspection}</span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-extrabold text-neutral-600 dark:text-neutral-400">
                                                {selectedPort.inspectionFee > 0 ? `$${selectedPort.inspectionFee}` : 'Free'}
                                            </span>
                                        </label>
                                    </div>

                                    <Separator className="my-2 bg-neutral-200 dark:bg-neutral-800" />

                                    {/* Cost Breakdown Accordion List */}
                                    <div className="space-y-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                        <div className="flex justify-between">
                                            <span>FOB Car Price</span>
                                            <span className="font-bold text-neutral-700 dark:text-neutral-300">${fobPrice.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Ocean Freight Cost</span>
                                            <span className="font-bold text-neutral-700 dark:text-neutral-300">${freightCost.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Marine Insurance Charge</span>
                                            <span className="font-bold text-neutral-700 dark:text-neutral-300">{includeInsurance ? '$120' : '$0'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Inspection Fee</span>
                                            <span className="font-bold text-neutral-700 dark:text-neutral-300">${inspectionCost.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Calculated Total Box */}
                                    <div className="p-5 bg-linear-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-center space-y-1.5 shadow-2xs">
                                        <span className="text-xs uppercase font-extrabold text-neutral-400 tracking-wider">Estimated Total CIF Price</span>
                                        <div className="flex items-baseline justify-center gap-1.5">
                                            <span className="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 tracking-tight">
                                                ${cifTotal.toLocaleString()}
                                            </span>
                                            <span className="text-xs font-extrabold text-neutral-400 uppercase">USD</span>
                                        </div>
                                        <p className="text-[10px] text-neutral-400 leading-none">Includes vehicle, freight & selected insurance packages.</p>
                                    </div>

                                    {/* Action CTA Buttons */}
                                    <div className="space-y-3 pt-2">
                                        <Button
                                            size="lg"
                                            onClick={openQuoteRequest}
                                            className="w-full text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 shadow-xl shadow-blue-600/15 cursor-pointer transition-all hover:scale-101 duration-300"
                                        >
                                            <Mail className="mr-2 h-4 w-4" />
                                            Request Official Quote
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            onClick={openQuoteRequest}
                                            className="w-full text-sm font-bold rounded-xl py-6 hover:bg-neutral-50 dark:hover:bg-neutral-800 border-neutral-200 dark:border-neutral-800 cursor-pointer transition-all hover:scale-101"
                                        >
                                            <Phone className="mr-2 h-4 w-4 text-neutral-500" />
                                            Ask for Dealer Advice
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                            {/* Verification & Seller Information Card */}
                            <Card className="p-6 md:p-8 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-lg">
                                <h3 className="font-extrabold text-lg mb-5 flex items-center gap-2">
                                    <ShieldCheck className="h-5 w-5 text-emerald-500" />
                                    Security Verification
                                </h3>
                                
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-primary to-blue-800 flex items-center justify-center font-black text-white shadow-lg text-lg">
                                        {car.user?.name ? car.user.name.charAt(0) : 'E'}
                                    </div>
                                    <div className="text-left">
                                        <div className="font-black text-sm md:text-base text-neutral-900 dark:text-white leading-tight">
                                            {car.user?.name || 'Authorized Exporter'}
                                        </div>
                                        <Badge className="bg-emerald-500/15 border-emerald-500/30 text-emerald-500 dark:text-emerald-400 mt-1 py-0.5 px-2 text-[10px] font-bold uppercase rounded-md border">
                                            Verified Dealer
                                        </Badge>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { label: 'Dealer License verified in Japan' },
                                        { label: 'Secure Bank Transfer (SWIFT T/T)' },
                                        { label: 'Complete document courier guaranteed' }
                                    ].map((badge, idx) => (
                                        <div key={idx} className="flex items-center gap-2.5 text-xs text-neutral-600 dark:text-neutral-400 font-semibold">
                                            <CheckCircle className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0" />
                                            <span>{badge.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Radix / Shadcn Dialog for Request Quote Inquiry */}
                <Dialog open={inquiryOpen} onOpenChange={setInquiryOpen}>
                    <DialogContent className="max-w-lg rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl overflow-hidden">
                        
                        {/* Success Modal View */}
                        {submitSuccess ? (
                            <div className="py-8 text-center space-y-5 animate-in zoom-in-95 duration-300">
                                <div className="mx-auto h-16 w-16 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                                    <Check className="h-8 w-8" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-neutral-900 dark:text-white">Inquiry Sent Successfully!</h3>
                                    <p className="text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed font-medium">
                                        Thank you, <span className="font-bold text-neutral-900 dark:text-white">{data.name}</span>. A detailed Proforma Invoice (PI) with custom shipping quotes has been dispatched to your email <span className="font-bold text-neutral-900 dark:text-white">({data.email})</span>.
                                    </p>
                                </div>
                                <div className="p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl border border-neutral-100 dark:border-neutral-800 text-xs font-semibold text-neutral-400 text-center max-w-xs mx-auto">
                                    Expected response: Within 12-24 hours
                                </div>
                                <Button 
                                    onClick={() => setInquiryOpen(false)}
                                    className="w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-950 text-white rounded-xl py-5 cursor-pointer font-bold transition-all"
                                >
                                    Close Window
                                </Button>
                            </div>
                        ) : (
                            /* Inquiry Form View */
                            <div className="space-y-6 animate-in duration-200">
                                <DialogHeader className="text-left">
                                    <DialogTitle className="text-2xl font-black flex items-center gap-2">
                                        <Mail className="h-6 w-6 text-blue-600" />
                                        Request Proforma Invoice
                                    </DialogTitle>
                                    <DialogDescription className="text-xs text-neutral-400 font-medium">
                                        Complete the invoice request for {car.year} {car.make} {car.model} (Ref: {car.ref_number})
                                    </DialogDescription>
                                </DialogHeader>

                                <form onSubmit={handleInquirySubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Your Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. John Doe"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            />
                                            <InputError message={errors.name} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                placeholder="e.g. name@domain.com"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            />
                                            <InputError message={errors.email} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Mobile Phone</label>
                                            <input
                                                type="tel"
                                                placeholder="e.g. +254 700 000000"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                className="w-full bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            />
                                            <InputError message={errors.phone} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Country of Import</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Kenya"
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                                className="w-full bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Inquiry Message</label>
                                        <textarea
                                            rows={4}
                                            required
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className="w-full bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-xs leading-relaxed text-neutral-700 dark:text-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                        />
                                        <InputError message={errors.message} />
                                    </div>

                                    <div className="flex gap-2 p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/20 text-[10px] font-semibold text-neutral-500 leading-relaxed">
                                        <ShieldAlert className="h-4 w-4 text-blue-600 flex-shrink-0" />
                                        <span>Submitting this inquiry reserves this stock unit for 24 hours under your email, during which our sales desk will finalize your PI.</span>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-2">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => setInquiryOpen(false)}
                                            className="rounded-xl px-5 cursor-pointer font-bold border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="rounded-xl px-6 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer font-bold transition-all shadow-lg"
                                        >
                                            {isSubmitting ? 'Sending Request...' : 'Send Inquiry Request'}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </PublicLayout>
    );
}
