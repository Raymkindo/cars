import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Palette, Save, Upload } from 'lucide-react';
import { useState } from 'react';

interface AppearanceIndexProps {
    settings: {
        hero_title?: string;
        hero_subtitle?: string;
        hero_image?: string;
        hero_cta_text?: string;
    };
}

export default function AppearanceIndex({ settings }: AppearanceIndexProps) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        hero_title: settings.hero_title || '',
        hero_subtitle: settings.hero_subtitle || '',
        hero_cta_text: settings.hero_cta_text || '',
        hero_image: null as File | null,
    });

    const [previewImage, setPreviewImage] = useState<string | null>(
        settings.hero_image || null
    );

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
                    {/* Hero Section Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Section</CardTitle>
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

                    <div className="flex justify-end">
                        <Button type="submit" size="lg" disabled={processing}>
                            {processing ? (
                                'Saving...'
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </div>

                    {recentlySuccessful && (
                        <div className="text-center p-4 bg-green-50 text-green-600 rounded-lg border border-green-200">
                            Settings saved successfully!
                        </div>
                    )}
                </form>
            </div>
        </AdminLayout>
    );
}
