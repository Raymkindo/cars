import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    Palette, 
    Save, 
    ExternalLink,
    RefreshCw,
    Search,
    DollarSign,
    Sparkles,
    ArrowRight,
    Tag,
    Zap,
    Globe,
    Clock,
    Eye
} from 'lucide-react';
import React, { useState } from 'react';

interface AppearanceIndexProps {
    colors: {
        color_primary?: string;
        color_secondary?: string;
        color_accent?: string;
    };
}

export default function AppearanceIndex({ colors }: AppearanceIndexProps) {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        color_primary: colors?.color_primary || '#1B3462', 
        color_secondary: colors?.color_secondary || '#ED1C24', 
        color_accent: colors?.color_accent || '#b01018', 
    });

    const [activeSearchTab, setActiveSearchTab] = useState<'quick' | 'budget' | 'deals'>('quick');

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.appearance.update'), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Appearance Settings" />

            <div className="space-y-6 max-w-[1400px] mx-auto select-none">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5">
                    <div>
                        <div className="flex items-center gap-2">
                            <Palette className="h-6 w-6 text-wp-accent" />
                            <h1 className="text-2xl font-bold tracking-tight">Brand Identity Settings</h1>
                        </div>
                        <p className="text-sm text-neutral-500 mt-1">
                            Configure your platform's core identity colors. Changes apply dynamically across the public website and layout banners.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" asChild className="cursor-pointer">
                            <Link href="/">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View Live Site
                            </Link>
                        </Button>
                        <Button 
                            onClick={submit} 
                            disabled={processing} 
                            size="sm"
                            className="bg-wp-accent hover:bg-wp-accent-hover text-white cursor-pointer font-semibold shadow-sm"
                        >
                            {processing ? (
                                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                                <Save className="h-4 w-4 mr-2" />
                            )}
                            Save Changes
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Color Inputs Card */}
                    <div className="col-span-12 lg:col-span-5 space-y-6">
                        <Card className="border border-neutral-200 dark:border-neutral-800 shadow-xs bg-white dark:bg-neutral-900">
                            <CardHeader>
                                <CardTitle className="text-base font-semibold leading-none flex items-center gap-2">
                                    <Palette className="h-4 w-4 text-wp-accent" />
                                    Brand Colors Customizer
                                </CardTitle>
                                <CardDescription className="text-xs mt-1.5 leading-relaxed">
                                    Define the core visual identity. The system dynamically overrides CSS variable mappings globally.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <form onSubmit={submit} className="space-y-5">
                                    {/* Primary Color Picker */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <Label htmlFor="color_primary" className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Primary (Navy)</Label>
                                            <span className="text-[10px] text-neutral-400 italic">Controls navbars, main headers, search panel headers</span>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="relative w-10 h-10 rounded-lg shadow-sm overflow-hidden border border-neutral-300 dark:border-neutral-700 flex-shrink-0">
                                                <input
                                                    type="color"
                                                    id="color_primary"
                                                    className="absolute -top-2 -left-2 w-14 h-14 cursor-pointer border-0 p-0"
                                                    value={data.color_primary}
                                                    onChange={(e) => setData('color_primary', e.target.value)}
                                                />
                                            </div>
                                            <Input 
                                                value={data.color_primary} 
                                                onChange={(e) => setData('color_primary', e.target.value)} 
                                                className="font-mono uppercase text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Secondary Color Picker */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <Label htmlFor="color_secondary" className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Secondary (Red)</Label>
                                            <span className="text-[10px] text-neutral-400 italic">Controls active badges, pricing texts, heading highlights</span>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="relative w-10 h-10 rounded-lg shadow-sm overflow-hidden border border-neutral-300 dark:border-neutral-700 flex-shrink-0">
                                                <input
                                                    type="color"
                                                    id="color_secondary"
                                                    className="absolute -top-2 -left-2 w-14 h-14 cursor-pointer border-0 p-0"
                                                    value={data.color_secondary}
                                                    onChange={(e) => setData('color_secondary', e.target.value)}
                                                />
                                            </div>
                                            <Input 
                                                value={data.color_secondary} 
                                                onChange={(e) => setData('color_secondary', e.target.value)} 
                                                className="font-mono uppercase text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Accent Color Picker */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <Label htmlFor="color_accent" className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Accent (Hover Highlight)</Label>
                                            <span className="text-[10px] text-neutral-400 italic">Controls secondary visual highlights, action hover offsets</span>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="relative w-10 h-10 rounded-lg shadow-sm overflow-hidden border border-neutral-300 dark:border-neutral-700 flex-shrink-0">
                                                <input
                                                    type="color"
                                                    id="color_accent"
                                                    className="absolute -top-2 -left-2 w-14 h-14 cursor-pointer border-0 p-0"
                                                    value={data.color_accent}
                                                    onChange={(e) => setData('color_accent', e.target.value)}
                                                />
                                            </div>
                                            <Input 
                                                value={data.color_accent} 
                                                onChange={(e) => setData('color_accent', e.target.value)} 
                                                className="font-mono uppercase text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                                        <div className="h-5">
                                            {recentlySuccessful && (
                                                <span className="text-xs text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
                                                    Colors saved successfully!
                                                </span>
                                            )}
                                        </div>
                                        <Button 
                                            type="submit"
                                            disabled={processing}
                                            className="bg-wp-accent hover:bg-wp-accent-hover text-white cursor-pointer font-semibold shadow-xs text-xs px-4 h-9"
                                        >
                                            {processing ? 'Saving...' : 'Save Settings'}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: High-fidelity Live Preview of the NEW Homepage Layout */}
                    <div className="col-span-12 lg:col-span-7 sticky top-16 flex flex-col gap-3">
                        <div className="flex items-center justify-between text-xs text-neutral-400 px-1 font-semibold uppercase tracking-wider">
                            <span className="flex items-center gap-1.5 text-neutral-500">
                                <Eye className="h-3.5 w-3.5" />
                                Live Homepage Mockup Preview
                            </span>
                            <span className="text-[10px] text-wp-accent bg-wp-accent/10 px-2 py-0.5 rounded font-bold">
                                Real-time colors
                            </span>
                        </div>

                        {/* Browser mockup container */}
                        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-lg overflow-hidden bg-neutral-900 flex flex-col w-full text-white">
                            
                            {/* Browser Address Bar */}
                            <div className="h-8 bg-neutral-950 flex items-center px-4 gap-2 select-none border-b border-neutral-800/80">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                </div>
                                <div className="h-5 flex-1 max-w-sm mx-auto rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-500 flex items-center justify-center font-mono truncate px-4">
                                    carswift.co.tz/home
                                </div>
                            </div>

                            {/* Simulated Homepage Canvas */}
                            <div className="aspect-[16/11.5] w-full relative overflow-hidden bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans select-none">
                                
                                {/* ── Slim Top Portal mock section ── */}
                                <div className="relative bg-gradient-to-br from-neutral-100 via-slate-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-900/40 p-4 border-b border-neutral-200 dark:border-neutral-850 flex-shrink-0">
                                    
                                    {/* Web Navigation Mockup */}
                                    <div className="flex justify-between items-center pb-3 border-b border-neutral-200/50 dark:border-neutral-800/50 mb-3 text-[9px] select-none">
                                        <span className="font-black tracking-widest text-[9px]" style={{ color: data.color_secondary }}>
                                            ★ CARSWIFT
                                        </span>
                                        <div className="flex gap-3 text-neutral-500 font-semibold">
                                            <span>Inventory</span>
                                            <span>How to Buy</span>
                                            <span>BF Supporters</span>
                                        </div>
                                        <span 
                                            className="px-2 py-0.5 rounded-[3px] text-[8px] font-bold text-white shadow-xs"
                                            style={{ backgroundColor: data.color_primary }}
                                        >
                                            Login Portal
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        {/* Left search block (col-span-7) */}
                                        <div className="col-span-7 space-y-3">
                                            <div className="space-y-0.5">
                                                <h2 className="text-[14px] md:text-[16px] font-extrabold uppercase tracking-tight leading-none text-neutral-900 dark:text-white">
                                                    Drive <span className="bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${data.color_secondary}, ${data.color_accent})` }}>your story</span> forward
                                                </h2>
                                                <p className="text-[8px] font-semibold text-neutral-400 leading-none">
                                                    Tanzania's premier high-density automotive exporter portal.
                                                </p>
                                            </div>

                                            {/* Search widget mockup */}
                                            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-2.5 shadow-xs flex flex-col justify-between h-[100px]">
                                                {/* Tab navigation */}
                                                <div className="flex border-b border-neutral-100 dark:border-neutral-800 pb-1.5 gap-2 text-[8px] font-bold text-neutral-400 flex-shrink-0">
                                                    <span className="flex items-center gap-1 border-b pb-0.5" style={{ color: data.color_secondary, borderBottomColor: data.color_secondary }}>
                                                        <Search className="h-2.5 w-2.5" />
                                                        Quick Finder
                                                    </span>
                                                    <span className="flex items-center gap-1 hover:text-neutral-600">
                                                        <DollarSign className="h-2.5 w-2.5" />
                                                        By Budget
                                                    </span>
                                                    <span className="flex items-center gap-1 hover:text-neutral-600">
                                                        <Sparkles className="h-2.5 w-2.5" />
                                                        Hot Specials
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-3 gap-1 pt-1.5 flex-1">
                                                    <div className="bg-neutral-50 dark:bg-neutral-950 border rounded text-[7px] text-neutral-400 p-1 flex items-center justify-between">
                                                        <span>Select Make</span>
                                                        <span className="text-[6px]">▼</span>
                                                    </div>
                                                    <div className="bg-neutral-50 dark:bg-neutral-950 border rounded text-[7px] text-neutral-400 p-1 flex items-center justify-between">
                                                        <span>Select Model</span>
                                                        <span className="text-[6px]">▼</span>
                                                    </div>
                                                    <div 
                                                        className="rounded text-white text-[7px] font-bold flex items-center justify-center gap-1 shadow-xs"
                                                        style={{ 
                                                            background: `linear-gradient(135deg, ${data.color_primary}, ${data.color_secondary})` 
                                                        }}
                                                    >
                                                        <Search className="h-2.5 w-2.5" />
                                                        <span>Search</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right quick budget mock columns (col-span-5) */}
                                        <div className="col-span-5 space-y-1.5">
                                            <p className="text-[7px] font-extrabold uppercase tracking-widest text-neutral-400">Search Specials</p>
                                            <div className="grid grid-cols-1 gap-1">
                                                {[
                                                    { label: 'Price Drop Deals', icon: <Tag className="h-2.5 w-2.5 text-red-500" /> },
                                                    { label: 'Selling Fast Options', icon: <Zap className="h-2.5 w-2.5 text-amber-500" /> },
                                                    { label: 'Low Mileage Options', icon: <Clock className="h-2.5 w-2.5 text-blue-500" /> }
                                                ].map((d, i) => (
                                                    <div key={i} className="flex justify-between items-center bg-white/70 dark:bg-neutral-900/60 hover:bg-white border rounded p-1.5 text-[8px] font-bold">
                                                        <span className="flex items-center gap-1">{d.icon} {d.label}</span>
                                                        <ArrowRight className="h-2.5 w-2.5 text-neutral-400" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ── Latest Premium Arrivals Section ── */}
                                <div className="p-4 flex-1 flex flex-col justify-between space-y-2 select-none bg-white dark:bg-neutral-950">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <span className="inline-block w-0.5 h-3 rounded-full" style={{ backgroundColor: data.color_secondary }} />
                                            <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: data.color_secondary }}>
                                                Latest Premium Arrivals
                                            </span>
                                        </div>
                                        <span className="text-[7px] font-bold text-neutral-400 bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800 px-1.5 py-0.5 rounded leading-none">
                                            Live Stock
                                        </span>
                                    </div>

                                    {/* 3 cards row mockup */}
                                    <div className="grid grid-cols-3 gap-2.5 flex-1 items-stretch">
                                        {[
                                            { id: 1, name: 'Toyota Harrier', year: '2022 Series', price: '$15,400', ref: 'Ref: KM-2490', image: 'bg-indigo-500/10' },
                                            { id: 2, name: 'Toyota Land Cruiser', year: '2023 Series', price: '$34,900', ref: 'Ref: LC-9031', image: 'bg-emerald-500/10' },
                                            { id: 3, name: 'BMW M3 Competition', year: '2022 Series', price: '$42,500', ref: 'Ref: BM-1250', image: 'bg-amber-500/10' }
                                        ].map(car => (
                                            <div key={car.id} className="bg-white dark:bg-neutral-900 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-850 shadow-xs flex flex-col justify-between">
                                                {/* Simulated thumbnail */}
                                                <div className={`aspect-[4/3] ${car.image} relative border-b border-neutral-150/45 dark:border-neutral-850 overflow-hidden flex items-center justify-center`}>
                                                    <span className="text-[6px] text-neutral-400 font-bold uppercase tracking-widest">Premium Car</span>
                                                    <span className="absolute bottom-1 right-1 bg-black/70 px-1 py-0.5 rounded text-[6px] text-white leading-none">
                                                        {car.ref}
                                                    </span>
                                                </div>

                                                <div className="p-1.5 space-y-1">
                                                    <div>
                                                        <h4 className="font-extrabold text-[8px] text-neutral-800 dark:text-white leading-tight truncate">{car.name}</h4>
                                                        <p className="text-[6px] text-neutral-400 mt-0.5 leading-none">{car.year}</p>
                                                    </div>

                                                    <div className="pt-1.5 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center leading-none">
                                                        <span className="text-[5px] uppercase font-bold text-neutral-400">FOB price</span>
                                                        <span className="text-[8px] font-black" style={{ color: data.color_secondary }}>{car.price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

// Helper to format currency number
function numberFormat(val: number) {
    return new Intl.NumberFormat('en-US').format(val);
}
