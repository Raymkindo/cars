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
        hero_title?: string;
        hero_subtitle?: string;
        hero_image?: string;
        hero_cta_text?: string;
    };
    colors: {
        color_primary?: string;
        color_secondary?: string;
        color_accent?: string;
    };
}

export default function AppearanceIndex({ settings, colors }: AppearanceIndexProps) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        hero_title: settings.hero_title || '',
        hero_subtitle: settings.hero_subtitle || '',
        hero_cta_text: settings.hero_cta_text || '',
        hero_image: null as File | null,
        
        color_primary: colors?.color_primary || '#2563eb', // Blue 600
        color_secondary: colors?.color_secondary || '#4f46e5', // Indigo 600
        color_accent: colors?.color_accent || '#f59e0b', // Amber 500
    });

    const [previewImage, setPreviewImage] = useState<string | null>(
        settings.hero_image || null
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
                    
                    {/* Brand Colors Section (New Feature) */}
                    <Card className="border-2 border-primary/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-amber-500" />
                                Smart Brand Colors
                            </CardTitle>
                            <CardDescription>
                                Pick your 3 main brand colors. The system will automatically generate all necessary gradients and accent effects for the frontend.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Primary Color Picker */}
                                <div className="space-y-3">
                                    <Label htmlFor="color_primary">Primary Color</Label>
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
                                    <p className="text-xs text-muted-foreground">Used for main buttons and primary highlights.</p>
                                    {errors.color_primary && <p className="text-sm text-red-500">{errors.color_primary}</p>}
                                </div>

                                {/* Secondary Color Picker */}
                                <div className="space-y-3">
                                    <Label htmlFor="color_secondary">Secondary Color</Label>
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
                                    <p className="text-xs text-muted-foreground">Used alongside primary to create depth and main gradients.</p>
                                </div>

                                {/* Accent Color Picker */}
                                <div className="space-y-3">
                                    <Label htmlFor="color_accent">Accent Color</Label>
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
                                    <p className="text-xs text-muted-foreground">Used for badges, badges, and "pop" elements.</p>
                                </div>
                            </div>

                            {/* Live Gradient Previews */}
                            <div className="mt-8 pt-6 border-t border-dashed">
                                <Label className="text-md mb-4 block">Auto-Generated Gradients Preview</Label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="rounded-xl p-6 text-white font-semibold flex items-center justify-center shadow-lg"
                                         style={{ background: generatedGradients.heroGradient }}>
                                        Hero Gradient
                                    </div>
                                    <div className="rounded-xl p-6 font-semibold flex items-center justify-center border shadow-sm"
                                         style={{ background: generatedGradients.cardGradient, color: data.color_primary }}>
                                        Card Highlight
                                    </div>
                                    <div className="rounded-xl p-6 text-white font-semibold flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                                         style={{ 
                                             background: generatedGradients.buttonGradient,
                                             boxShadow: `0 10px 25px -5px ${generatedGradients.accentGlow}` 
                                         }}>
                                        Call to Action Button
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Hero Section Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Section Content</CardTitle>
                            <CardDescription>
                                Customize the main landing area of your home page.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="hero_title">Hero Title</Label>
                                <Input
                                    id="hero_title"
                                    value={data.hero_title}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('hero_title', e.target.value)}
                                    placeholder="Find Your Dream Car From Japan"
                                />
                                <p className="text-sm text-muted-foreground">
                                    HTML is allowed for formatting (e.g. &lt;br /&gt;, &lt;span&gt;).
                                </p>
                                {errors.hero_title && (
                                    <p className="text-sm text-red-500">{errors.hero_title}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="hero_subtitle">Subtitle</Label>
                                <Textarea
                                    id="hero_subtitle"
                                    value={data.hero_subtitle}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('hero_subtitle', e.target.value)}
                                    placeholder="Premium quality used cars with global shipping..."
                                />
                                {errors.hero_subtitle && (
                                    <p className="text-sm text-red-500">{errors.hero_subtitle}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="hero_cta_text">Call to Action Text</Label>
                                <Input
                                    id="hero_cta_text"
                                    value={data.hero_cta_text}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('hero_cta_text', e.target.value)}
                                    placeholder="Browse Stock"
                                />
                                {errors.hero_cta_text && (
                                    <p className="text-sm text-red-500">{errors.hero_cta_text}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label>Hero Background Image</Label>
                                <div className="flex items-start gap-4">
                                    <div className="relative w-64 aspect-video rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
                                        {previewImage ? (
                                            <img
                                                src={previewImage}
                                                alt="Hero Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                                                No image selected
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="hero_image_upload" className="cursor-pointer">
                                            <div className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent hover:text-accent-foreground transition-colors w-fit">
                                                <Upload className="h-4 w-4" />
                                                <span>Upload New Image</span>
                                            </div>
                                            <input
                                                id="hero_image_upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                        <p className="text-sm text-muted-foreground mt-2">
                                            Recommended size: 1920x1080px. Max: 5MB.
                                        </p>
                                        {errors.hero_image && (
                                            <p className="text-sm text-red-500 mt-1">{errors.hero_image}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center justify-end gap-4 pb-12">
                        {recentlySuccessful && (
                            <span className="text-sm text-green-600 font-medium">Appearance updated successfully!</span>
                        )}
                        <Button type="submit" size="lg" disabled={processing}>
                            {processing ? 'Saving...' : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
                        </Button>
                    </div>

                </form>
            </div>
        </AdminLayout>
    );
}
