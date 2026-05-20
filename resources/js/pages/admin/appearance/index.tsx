import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Palette, Save, Upload, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AppearanceIndexProps {
    settings: {
        hero_badge?: string;
        hero_title?: string;
        hero_subtitle?: string;
        hero_image?: string;
        hero_cta_text?: string;
        hero_cta_secondary_text?: string;
        
        hero_stat_1_val?: string;
        hero_stat_1_lbl?: string;
        hero_stat_2_val?: string;
        hero_stat_2_lbl?: string;
        hero_stat_3_val?: string;
        hero_stat_3_lbl?: string;

        hero_featured_badge?: string;
        hero_featured_title?: string;
        hero_featured_subtitle?: string;
        
        hero_featured_spec_1_val?: string;
        hero_featured_spec_1_lbl?: string;
        hero_featured_spec_2_val?: string;
        hero_featured_spec_2_lbl?: string;
        hero_featured_spec_3_val?: string;
        hero_featured_spec_3_lbl?: string;

        hero_featured_price?: string;
        hero_featured_availability?: string;
        hero_featured_car_id?: string;
        hero_bg_image?: string;
        hero_bg_overlay?: string;
    };
    colors: {
        color_primary?: string;
        color_secondary?: string;
        color_accent?: string;
    };
    cars: Array<{
        id: number;
        make: string;
        model: string;
        year: number;
        price: number;
        ref_number: string;
    }>;
}

export default function AppearanceIndex({ settings, colors, cars }: AppearanceIndexProps) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        hero_badge: settings.hero_badge || "Dar es Salaam's Finest",
        hero_title: settings.hero_title || 'DRIVE <br /> <span style="font-style: italic; font-weight: 300; background: linear-gradient(90deg, #ffffff, #c5d3ec); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">your story</span> <br /> <span style="background: linear-gradient(90deg, #ED1C24, #ff5e62); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">FORWARD</span>',
        hero_subtitle: settings.hero_subtitle || "Tanzania's most trusted name in premium automobiles. From city cruisers to rugged off-road legends — find the vehicle that defines you.",
        hero_cta_text: settings.hero_cta_text || 'Explore Inventory',
        hero_cta_secondary_text: settings.hero_cta_secondary_text || 'Watch Tour',
        hero_image: null as File | null,

        hero_stat_1_val: settings.hero_stat_1_val || '500+',
        hero_stat_1_lbl: settings.hero_stat_1_lbl || 'Vehicles',
        hero_stat_2_val: settings.hero_stat_2_val || '12yr',
        hero_stat_2_lbl: settings.hero_stat_2_lbl || 'Experience',
        hero_stat_3_val: settings.hero_stat_3_val || '98%',
        hero_stat_3_lbl: settings.hero_stat_3_lbl || 'Satisfaction',

        hero_featured_badge: settings.hero_featured_badge || '★ Premium Pick',
        hero_featured_title: settings.hero_featured_title || 'LAND CRUISER 300',
        hero_featured_subtitle: settings.hero_featured_subtitle || 'Toyota · 2024 Series',
        
        hero_featured_spec_1_val: settings.hero_featured_spec_1_val || '3.3L',
        hero_featured_spec_1_lbl: settings.hero_featured_spec_1_lbl || 'Engine',
        hero_featured_spec_2_val: settings.hero_featured_spec_2_val || '309',
        hero_featured_spec_2_lbl: settings.hero_featured_spec_2_lbl || 'HP',
        hero_featured_spec_3_val: settings.hero_featured_spec_3_val || '4WD',
        hero_featured_spec_3_lbl: settings.hero_featured_spec_3_lbl || 'Drive',

        hero_featured_price: settings.hero_featured_price || 'TZS 45M',
        hero_featured_availability: settings.hero_featured_availability || 'IN STOCK',
        hero_featured_car_id: settings.hero_featured_car_id || '',
        
        hero_bg_image: null as File | null,
        hero_bg_overlay: settings.hero_bg_overlay || 'linear-gradient(135deg, rgba(10, 18, 36, 0.94) 0%, rgba(27, 52, 98, 0.91) 50%, rgba(8, 15, 29, 0.96) 100%)',

        color_primary: colors?.color_primary || '#1B3462', 
        color_secondary: colors?.color_secondary || '#ED1C24', 
        color_accent: colors?.color_accent || '#b01018', 
    });

    const [previewImage, setPreviewImage] = useState<string | null>(
        settings.hero_image || '/images/hero-port-cars-v3.png'
    );

    const [previewBgImage, setPreviewBgImage] = useState<string | null>(
        settings.hero_bg_image || '/images/hero-bg-dealership.png'
    );

    // Auto-generated gradients state based on the 3 base colors
    const [generatedGradients, setGeneratedGradients] = useState<Record<string, string>>({});

    useEffect(() => {
        // Automatically generate appealing gradients from the 3 main colors chosen
        setGeneratedGradients({
            heroGradient: `linear-gradient(135deg, ${data.color_primary}, ${data.color_secondary})`,
            cardGradient: `linear-gradient(to bottom right, ${data.color_secondary}20, ${data.color_accent}20)`,
            buttonGradient: `linear-gradient(90deg, ${data.color_primary}, ${data.color_accent})`,
            accentGlow: `${data.color_accent}40`,
        });
    }, [data.color_primary, data.color_secondary, data.color_accent]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('hero_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBgImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('hero_bg_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewBgImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

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

            <div className="space-y-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-2">
                    <Palette className="h-6 w-6 text-primary" />
                    <h1 className="text-3xl font-bold">Appearance Settings</h1>
                </div>

                <form onSubmit={submit} className="space-y-8">
                    
                    {/* Brand Colors Section */}
                    <Card className="border border-neutral-200 dark:border-neutral-800">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-amber-500" />
                                Custom Brand Colors
                            </CardTitle>
                            <CardDescription>
                                Pick your core brand colors. Tanzania's dealership primary theme (#1B3462 and #ED1C24).
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Primary Color Picker */}
                                <div className="space-y-3">
                                    <Label htmlFor="color_primary">Primary (Navy)</Label>
                                    <div className="flex gap-3">
                                        <div className="relative w-12 h-12 rounded-lg shadow-sm overflow-hidden border">
                                            <input
                                                type="color"
                                                id="color_primary"
                                                className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer"
                                                value={data.color_primary}
                                                onChange={(e) => setData('color_primary', e.target.value)}
                                            />
                                        </div>
                                        <Input 
                                            value={data.color_primary} 
                                            onChange={(e) => setData('color_primary', e.target.value)} 
                                            className="font-mono uppercase flex-1"
                                        />
                                    </div>
                                </div>

                                {/* Secondary Color Picker */}
                                <div className="space-y-3">
                                    <Label htmlFor="color_secondary">Secondary (Red)</Label>
                                    <div className="flex gap-3">
                                        <div className="relative w-12 h-12 rounded-lg shadow-sm overflow-hidden border">
                                            <input
                                                type="color"
                                                id="color_secondary"
                                                className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer"
                                                value={data.color_secondary}
                                                onChange={(e) => setData('color_secondary', e.target.value)}
                                            />
                                        </div>
                                        <Input 
                                            value={data.color_secondary} 
                                            onChange={(e) => setData('color_secondary', e.target.value)} 
                                            className="font-mono uppercase flex-1"
                                        />
                                    </div>
                                </div>

                                {/* Accent Color Picker */}
                                <div className="space-y-3">
                                    <Label htmlFor="color_accent">Accent (Dark Red)</Label>
                                    <div className="flex gap-3">
                                        <div className="relative w-12 h-12 rounded-lg shadow-sm overflow-hidden border">
                                            <input
                                                type="color"
                                                id="color_accent"
                                                className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer"
                                                value={data.color_accent}
                                                onChange={(e) => setData('color_accent', e.target.value)}
                                            />
                                        </div>
                                        <Input 
                                            value={data.color_accent} 
                                            onChange={(e) => setData('color_accent', e.target.value)} 
                                            className="font-mono uppercase flex-1"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Hero Section Settings */}
                    <Card className="border border-neutral-200 dark:border-neutral-800">
                        <CardHeader>
                            <CardTitle>Hero Section Content</CardTitle>
                            <CardDescription>
                                Customize the landing area elements (badges, titles, buttons, description).
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="hero_badge">Hero Badge Label</Label>
                                <Input
                                    id="hero_badge"
                                    value={data.hero_badge}
                                    onChange={(e) => setData('hero_badge', e.target.value)}
                                    placeholder="Dar es Salaam's Finest"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="hero_title">Hero Title</Label>
                                <Input
                                    id="hero_title"
                                    value={data.hero_title}
                                    onChange={(e) => setData('hero_title', e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">HTML formatting allowed.</p>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="hero_subtitle">Hero Description</Label>
                                <Textarea
                                    id="hero_subtitle"
                                    value={data.hero_subtitle}
                                    onChange={(e) => setData('hero_subtitle', e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="hero_cta_text">Primary Button Text</Label>
                                    <Input
                                        id="hero_cta_text"
                                        value={data.hero_cta_text}
                                        onChange={(e) => setData('hero_cta_text', e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="hero_cta_secondary_text">Secondary Button Text</Label>
                                    <Input
                                        id="hero_cta_secondary_text"
                                        value={data.hero_cta_secondary_text}
                                        onChange={(e) => setData('hero_cta_secondary_text', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label>Hero Background Showcase Image</Label>
                                <div className="flex items-start gap-4">
                                    <div className="relative w-64 aspect-video rounded-lg overflow-hidden border bg-neutral-100 dark:bg-neutral-900">
                                        {previewImage ? (
                                            <img src={previewImage} alt="Hero Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">No image</div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="hero_image_upload" className="cursor-pointer">
                                            <div className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-accent transition-colors w-fit">
                                                <Upload className="h-4 w-4" />
                                                <span>Upload Image</span>
                                            </div>
                                            <input
                                                id="hero_image_upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                        <p className="text-xs text-muted-foreground mt-2">Max size: 5MB.</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Hero Section Wallpaper */}
                    <Card className="border border-neutral-200 dark:border-neutral-800">
                        <CardHeader>
                            <CardTitle>Hero Background Wallpaper</CardTitle>
                            <CardDescription>
                                Upload a premium background image for the main hero section container, and set a custom dark blend overlay to match your brand style.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-2">
                                <Label>Hero Container Background Wallpaper</Label>
                                <div className="flex items-start gap-4">
                                    <div className="relative w-64 aspect-video rounded-lg overflow-hidden border bg-neutral-100 dark:bg-neutral-900">
                                        {previewBgImage ? (
                                            <img src={previewBgImage} alt="Wallpaper Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">No image</div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="hero_bg_image_upload" className="cursor-pointer">
                                            <div className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-accent transition-colors w-fit">
                                                <Upload className="h-4 w-4" />
                                                <span>Upload Wallpaper</span>
                                            </div>
                                            <input
                                                id="hero_bg_image_upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleBgImageChange}
                                            />
                                        </label>
                                        <p className="text-xs text-muted-foreground mt-2">Max size: 5MB. A dark luxury car showroom or modern cityscape background works best.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="hero_bg_overlay">Manual Blend Overlay (CSS Value)</Label>
                                <Input
                                    id="hero_bg_overlay"
                                    value={data.hero_bg_overlay}
                                    onChange={(e) => setData('hero_bg_overlay', e.target.value)}
                                    placeholder="e.g. linear-gradient(135deg, rgba(10, 18, 36, 0.95), rgba(27, 52, 98, 0.92))"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Define the color/gradient overlay to blend on top of your wallpaper. Use <code>rgba()</code> with high opacity (e.g. 0.9 - 0.95) to ensure maximum contrast and clear, readable white headings.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Trust Counter Metrics */}
                    <Card className="border border-neutral-200 dark:border-neutral-800">
                        <CardHeader>
                            <CardTitle>Credibility Stats Counters</CardTitle>
                            <CardDescription>
                                Set the credibility counters shown below the CTA buttons in the hero section.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-3">
                                <Label>Stat 1 (e.g. 500+)</Label>
                                <Input value={data.hero_stat_1_val} onChange={e => setData('hero_stat_1_val', e.target.value)} placeholder="500+" />
                                <Label className="text-xs text-muted-foreground">Label</Label>
                                <Input value={data.hero_stat_1_lbl} onChange={e => setData('hero_stat_1_lbl', e.target.value)} placeholder="Vehicles" />
                            </div>
                            <div className="space-y-3">
                                <Label>Stat 2 (e.g. 12yr)</Label>
                                <Input value={data.hero_stat_2_val} onChange={e => setData('hero_stat_2_val', e.target.value)} placeholder="12yr" />
                                <Label className="text-xs text-muted-foreground">Label</Label>
                                <Input value={data.hero_stat_2_lbl} onChange={e => setData('hero_stat_2_lbl', e.target.value)} placeholder="Experience" />
                            </div>
                            <div className="space-y-3">
                                <Label>Stat 3 (e.g. 98%)</Label>
                                <Input value={data.hero_stat_3_val} onChange={e => setData('hero_stat_3_val', e.target.value)} placeholder="98%" />
                                <Label className="text-xs text-muted-foreground">Label</Label>
                                <Input value={data.hero_stat_3_lbl} onChange={e => setData('hero_stat_3_lbl', e.target.value)} placeholder="Satisfaction" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Featured Showcase Specs Card */}
                    <Card className="border border-neutral-200 dark:border-neutral-800">
                        <CardHeader>
                            <CardTitle>Featured Showcase Vehicle</CardTitle>
                            <CardDescription>
                                Select a live vehicle from your inventory database to feature in the hero section, or manually override the specs below.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Inventory Selection Dropdown */}
                            <div className="grid gap-2 border-b pb-6 mb-4">
                                <Label htmlFor="hero_featured_car_id" className="text-base font-semibold text-[#1B3462] dark:text-slate-200">
                                    Link to Live Inventory Vehicle
                                </Label>
                                <select
                                    id="hero_featured_car_id"
                                    value={data.hero_featured_car_id}
                                    onChange={e => setData('hero_featured_car_id', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">-- [Manual Override / Custom Fields Below] --</option>
                                    {cars && cars.map(car => (
                                        <option key={car.id} value={car.id}>
                                            {car.make} {car.model} ({car.year}) - ${numberFormat(car.price)} [{car.ref_number}]
                                        </option>
                                    ))}
                                </select>
                                <p className="text-xs text-slate-500">
                                    If a live vehicle is selected, the hero visual will automatically pull its real model name, year, specs (Engine size, Transmission, Drive type), price, and primary image from the database!
                                </p>
                            </div>

                            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b pb-2 mb-4">
                                Manual Fallback / Override Specs
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="hero_featured_badge">Showcase Badge</Label>
                                    <Input id="hero_featured_badge" value={data.hero_featured_badge} onChange={e => setData('hero_featured_badge', e.target.value)} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="hero_featured_title">Vehicle Name</Label>
                                    <Input id="hero_featured_title" value={data.hero_featured_title} onChange={e => setData('hero_featured_title', e.target.value)} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="hero_featured_subtitle">Series / Make</Label>
                                    <Input id="hero_featured_subtitle" value={data.hero_featured_subtitle} onChange={e => setData('hero_featured_subtitle', e.target.value)} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2 border p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900">
                                    <Label>Spec 1 Value</Label>
                                    <Input value={data.hero_featured_spec_1_val} onChange={e => setData('hero_featured_spec_1_val', e.target.value)} />
                                    <Label className="text-xs">Label</Label>
                                    <Input value={data.hero_featured_spec_1_lbl} onChange={e => setData('hero_featured_spec_1_lbl', e.target.value)} />
                                </div>
                                <div className="space-y-2 border p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900">
                                    <Label>Spec 2 Value</Label>
                                    <Input value={data.hero_featured_spec_2_val} onChange={e => setData('hero_featured_spec_2_val', e.target.value)} />
                                    <Label className="text-xs">Label</Label>
                                    <Input value={data.hero_featured_spec_2_lbl} onChange={e => setData('hero_featured_spec_2_lbl', e.target.value)} />
                                </div>
                                <div className="space-y-2 border p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900">
                                    <Label>Spec 3 Value</Label>
                                    <Input value={data.hero_featured_spec_3_val} onChange={e => setData('hero_featured_spec_3_val', e.target.value)} />
                                    <Label className="text-xs">Label</Label>
                                    <Input value={data.hero_featured_spec_3_lbl} onChange={e => setData('hero_featured_spec_3_lbl', e.target.value)} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="hero_featured_price">Estimated Price</Label>
                                    <Input id="hero_featured_price" value={data.hero_featured_price} onChange={e => setData('hero_featured_price', e.target.value)} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="hero_featured_availability">Stock Status</Label>
                                    <Input id="hero_featured_availability" value={data.hero_featured_availability} onChange={e => setData('hero_featured_availability', e.target.value)} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center justify-end gap-4 pb-12">
                        {recentlySuccessful && (
                            <span className="text-sm text-green-600 font-medium">Appearance updated successfully!</span>
                        )}
                        <Button type="submit" size="lg" disabled={processing}>
                            {processing ? 'Saving...' : <><Save className="mr-2 h-4 w-4" /> Save All Settings</>}
                        </Button>
                    </div>

                </form>
            </div>
        </AdminLayout>
    );
}

// Helper to format currency number
function numberFormat(val: number) {
    return new Intl.NumberFormat('en-US').format(val);
}
